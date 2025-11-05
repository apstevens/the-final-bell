# Application Security & Firewall Configuration Guide

**Comprehensive Security Setup for The Final Bell**

---

## Table of Contents

1. [Security Layers Overview](#security-layers-overview)
2. [Application-Level Security (Express.js)](#application-level-security-expressjs)
3. [Server Firewall (Infrastructure)](#server-firewall-infrastructure)
4. [Cloud Provider Firewalls](#cloud-provider-firewalls)
5. [Rate Limiting & DDoS Protection](#rate-limiting--ddos-protection)
6. [SSL/TLS Configuration](#ssltls-configuration)
7. [Environment Security](#environment-security)
8. [Security Checklist](#security-checklist)

---

## Security Layers Overview

Your application should have multiple layers of security:

```
┌─────────────────────────────────────────────────────────┐
│                    INTERNET                              │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  LAYER 1: CDN/DDoS Protection (Cloudflare)              │
│  - DDoS mitigation                                       │
│  - Rate limiting                                         │
│  - SSL termination                                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  LAYER 2: Cloud Firewall (AWS Security Groups/etc)      │
│  - IP whitelisting                                       │
│  - Port restrictions                                     │
│  - Network-level filtering                               │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  LAYER 3: Server Firewall (UFW/iptables)               │
│  - OS-level port management                             │
│  - Connection limits                                     │
│  - Intrusion detection                                   │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  LAYER 4: Application Security (Express middleware)     │
│  - Helmet.js (security headers)                          │
│  - CORS configuration                                    │
│  - Rate limiting                                         │
│  - Input validation                                      │
│  - SQL injection prevention                              │
│  - XSS protection                                        │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  YOUR APPLICATION                                        │
└─────────────────────────────────────────────────────────┘
```

---

## Application-Level Security (Express.js)

### 1. Install Security Packages

```bash
npm install helmet express-rate-limit express-mongo-sanitize xss-clean hpp cors dotenv
```

### 2. Create Secure Server Configuration

**File:** `server.js`

```javascript
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ============================================
// 1. SECURITY HEADERS (Helmet.js)
// ============================================
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'", "https://js.stripe.com"],
      frameSrc: ["https://js.stripe.com", "https://hooks.stripe.com"],
      connectSrc: ["'self'", "https://api.stripe.com"],
    },
  },
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
  frameguard: {
    action: 'deny', // Prevent clickjacking
  },
  noSniff: true, // Prevent MIME sniffing
  xssFilter: true, // Enable XSS filter
}));

// ============================================
// 2. CORS CONFIGURATION
// ============================================
const allowedOrigins = [
  'https://thefinalbell.co.uk',
  'https://www.thefinalbell.co.uk',
];

// Add localhost for development
if (process.env.NODE_ENV === 'development') {
  allowedOrigins.push('http://localhost:5173');
  allowedOrigins.push('http://localhost:3000');
}

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400, // 24 hours
};

app.use(cors(corsOptions));

// ============================================
// 3. RATE LIMITING
// ============================================

// General API rate limiter
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per 15 minutes
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  // Skip rate limiting for trusted IPs (optional)
  skip: (req) => {
    const trustedIPs = ['127.0.0.1']; // Add your IPs
    return trustedIPs.includes(req.ip);
  },
});

// Strict rate limiter for authentication/payment endpoints
const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 requests per 15 minutes
  message: 'Too many attempts, please try again later.',
  skipSuccessfulRequests: true, // Don't count successful requests
});

// Apply rate limiters
app.use('/api/', generalLimiter);
app.use('/api/auth/', strictLimiter);
app.use('/create-checkout-session', strictLimiter);

// ============================================
// 4. BODY PARSING & SIZE LIMITS
// ============================================

// Prevent large payload attacks
app.use(express.json({
  limit: '10kb', // Limit body size to 10KB
  verify: (req, res, buf) => {
    // Store raw body for webhook signature verification
    if (req.originalUrl === '/webhook') {
      req.rawBody = buf.toString('utf8');
    }
  }
}));

app.use(express.urlencoded({
  extended: true,
  limit: '10kb'
}));

// ============================================
// 5. DATA SANITIZATION
// ============================================

// Prevent NoSQL injection attacks
app.use(mongoSanitize({
  replaceWith: '_',
  onSanitize: ({ req, key }) => {
    console.warn(`Sanitized ${key} in ${req.path}`);
  },
}));

// Prevent XSS attacks
app.use(xss());

// Prevent HTTP Parameter Pollution
app.use(hpp({
  whitelist: ['category', 'price', 'size'], // Allow these params to appear multiple times
}));

// ============================================
// 6. CUSTOM SECURITY MIDDLEWARE
// ============================================

// IP Blacklist middleware
const blacklistedIPs = new Set([
  // Add malicious IPs here
  // '123.456.789.0',
]);

app.use((req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;

  if (blacklistedIPs.has(clientIP)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  next();
});

// Request logging for security auditing
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const ip = req.ip || req.connection.remoteAddress;
  const method = req.method;
  const path = req.path;

  console.log(`[${timestamp}] ${ip} - ${method} ${path}`);
  next();
});

// ============================================
// 7. INPUT VALIDATION
// ============================================

const { body, validationResult } = require('express-validator');

// Validation middleware
const validateBooking = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be 2-100 characters')
    .escape(), // Escape HTML entities

  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email address'),

  body('phone')
    .trim()
    .matches(/^[\d\s\-\+\(\)]{10,15}$/)
    .withMessage('Invalid phone number'),

  body('service')
    .trim()
    .isIn(['1-on-1', 'group', 'online'])
    .withMessage('Invalid service type'),

  body('date')
    .isISO8601()
    .toDate()
    .custom(value => {
      if (value < new Date()) {
        throw new Error('Date must be in the future');
      }
      return true;
    }),

  body('time')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Invalid time format'),

  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .escape(),
];

// Apply validation to booking endpoint
app.post('/api/bookings', validateBooking, (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Proceed with booking creation
  // ... your booking logic
});

// ============================================
// 8. WEBHOOK SECURITY (Stripe)
// ============================================

app.post('/webhook',
  express.raw({ type: 'application/json' }),
  (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      // Verify webhook signature
      event = stripe.webhooks.constructEvent(
        req.rawBody || req.body,
        sig,
        webhookSecret
      );
    } catch (err) {
      console.error('⚠️ Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Process verified event
    // ... your webhook logic

    res.json({ received: true });
  }
);

// ============================================
// 9. ERROR HANDLING
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);

  // Don't leak error details in production
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : err.message;

  res.status(err.statusCode || 500).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ============================================
// 10. SERVER STARTUP
// ============================================

const PORT = process.env.PORT || 3000;

// Only bind to localhost in development, or 0.0.0.0 in production
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

const server = app.listen(PORT, HOST, () => {
  console.log(`🔒 Secure server running on ${HOST}:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = app;
```

---

## Server Firewall (Infrastructure)

### Option 1: UFW (Ubuntu/Debian) - Recommended for Beginners

UFW (Uncomplicated Firewall) is the easiest firewall for Ubuntu servers.

```bash
# 1. Install UFW (if not already installed)
sudo apt update
sudo apt install ufw

# 2. Set default policies
sudo ufw default deny incoming   # Block all incoming
sudo ufw default allow outgoing  # Allow all outgoing

# 3. Allow SSH (IMPORTANT - do this BEFORE enabling firewall!)
sudo ufw allow 22/tcp
# Or limit SSH to prevent brute force
sudo ufw limit 22/tcp

# 4. Allow HTTP and HTTPS
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS

# 5. Allow your Node.js app port (if directly exposed)
sudo ufw allow 3000/tcp

# 6. Enable the firewall
sudo ufw enable

# 7. Check status
sudo ufw status verbose

# 8. View numbered rules (for deletion)
sudo ufw status numbered

# 9. Delete a rule (e.g., rule #4)
sudo ufw delete 4

# 10. Allow specific IP only
sudo ufw allow from 203.0.113.0 to any port 22
sudo ufw allow from 203.0.113.0 to any port 3000

# 11. Block specific IP
sudo ufw deny from 198.51.100.0

# 12. Allow IP range (CIDR notation)
sudo ufw allow from 192.168.1.0/24

# 13. Logging (for security auditing)
sudo ufw logging on
sudo ufw logging medium

# View logs
sudo tail -f /var/log/ufw.log
```

**Production UFW Setup Example:**

```bash
#!/bin/bash
# Setup script for production server

# Reset UFW (careful!)
sudo ufw --force reset

# Default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH (with rate limiting)
sudo ufw limit 22/tcp comment 'SSH with rate limiting'

# Allow HTTP/HTTPS
sudo ufw allow 80/tcp comment 'HTTP'
sudo ufw allow 443/tcp comment 'HTTPS'

# Allow Node.js app (only from localhost if using nginx reverse proxy)
# sudo ufw allow from 127.0.0.1 to any port 3000

# Enable firewall
sudo ufw --force enable

# Show status
sudo ufw status verbose
```

### Option 2: iptables (Advanced)

More complex but more powerful than UFW.

```bash
# Save current rules (backup)
sudo iptables-save > ~/iptables-backup.txt

# Flush existing rules
sudo iptables -F

# Set default policies
sudo iptables -P INPUT DROP     # Drop all incoming by default
sudo iptables -P FORWARD DROP
sudo iptables -P OUTPUT ACCEPT  # Allow all outgoing

# Allow loopback
sudo iptables -A INPUT -i lo -j ACCEPT

# Allow established connections
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Allow SSH (with rate limiting)
sudo iptables -A INPUT -p tcp --dport 22 -m state --state NEW -m recent --set
sudo iptables -A INPUT -p tcp --dport 22 -m state --state NEW -m recent --update --seconds 60 --hitcount 4 -j DROP
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Allow HTTP/HTTPS
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Allow Node.js app
sudo iptables -A INPUT -p tcp --dport 3000 -j ACCEPT

# Drop invalid packets
sudo iptables -A INPUT -m state --state INVALID -j DROP

# Protect against SYN flood
sudo iptables -A INPUT -p tcp --syn -m limit --limit 1/s --limit-burst 3 -j ACCEPT

# Save rules (Ubuntu/Debian)
sudo apt install iptables-persistent
sudo netfilter-persistent save

# View rules
sudo iptables -L -v -n
```

---

## Cloud Provider Firewalls

### AWS Security Groups

**Inbound Rules:**
```
Type            Protocol    Port Range    Source          Description
SSH             TCP         22            Your IP         SSH access
HTTP            TCP         80            0.0.0.0/0       Web traffic
HTTPS           TCP         443           0.0.0.0/0       Secure web traffic
Custom TCP      TCP         3000          Security Group  App (from load balancer only)
```

**Outbound Rules:**
```
Type            Protocol    Port Range    Destination     Description
All traffic     All         All           0.0.0.0/0       Allow all outbound
```

### DigitalOcean Cloud Firewalls

```bash
# Via DigitalOcean Dashboard:
# 1. Go to Networking → Firewalls
# 2. Create Firewall
# 3. Add Inbound Rules:
#    - SSH (TCP 22) from your IP
#    - HTTP (TCP 80) from all IPv4/IPv6
#    - HTTPS (TCP 443) from all IPv4/IPv6
# 4. Add Outbound Rules:
#    - All TCP/UDP/ICMP to all destinations
# 5. Apply to your Droplets
```

### Cloudflare (CDN + WAF)

Cloudflare provides DDoS protection and Web Application Firewall.

**Setup:**
1. Add your domain to Cloudflare
2. Update nameservers
3. Enable "Proxy" (orange cloud) for your records
4. Configure Firewall Rules:

```
# Block bad bots
(cf.client.bot) and not (cf.verified_bot_category in {"Search Engine Crawler"})

# Rate limit API
(http.request.uri.path contains "/api/" and rate(5m) > 100)

# Geo-blocking (example: allow UK only)
(ip.geoip.country ne "GB")

# Block known malicious IPs
(ip.src in $threat_score_high)

# Challenge suspicious requests
(cf.threat_score > 50)
```

---

## Rate Limiting & DDoS Protection

### Application-Level Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const redis = require('redis');

// Create Redis client (for distributed systems)
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

// Advanced rate limiter with Redis
const apiLimiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
    prefix: 'rl:', // Rate limit prefix
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: async (req) => {
    // Dynamic limits based on user type
    if (req.user && req.user.isPremium) {
      return 200; // Higher limit for premium users
    }
    return 100; // Standard limit
  },
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many requests',
      retryAfter: req.rateLimit.resetTime,
    });
  },
  skip: (req) => {
    // Skip rate limiting for health checks
    return req.path === '/health';
  },
});

app.use('/api/', apiLimiter);
```

### Nginx Rate Limiting

If using Nginx as reverse proxy:

```nginx
# /etc/nginx/nginx.conf

http {
    # Define rate limit zones
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=auth:10m rate=5r/m;

    # Connection limits
    limit_conn_zone $binary_remote_addr zone=addr:10m;

    server {
        listen 80;
        server_name thefinalbell.co.uk;

        # Redirect to HTTPS
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name thefinalbell.co.uk;

        # SSL configuration
        ssl_certificate /etc/letsencrypt/live/thefinalbell.co.uk/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/thefinalbell.co.uk/privkey.pem;

        # Security headers
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
        add_header X-Frame-Options "DENY" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;

        # Rate limiting
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            limit_conn addr 10;

            proxy_pass http://localhost:3000;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $host;
        }

        location /api/auth/ {
            limit_req zone=auth burst=5 nodelay;

            proxy_pass http://localhost:3000;
        }

        # Static files
        location / {
            root /var/www/thefinalbell;
            try_files $uri $uri/ /index.html;
        }
    }
}
```

---

## SSL/TLS Configuration

### Using Let's Encrypt (Free SSL)

```bash
# 1. Install Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# 2. Obtain certificate (Nginx)
sudo certbot --nginx -d thefinalbell.co.uk -d www.thefinalbell.co.uk

# 3. Test auto-renewal
sudo certbot renew --dry-run

# 4. Auto-renewal is set up via cron
# Check with:
sudo systemctl status certbot.timer
```

### SSL Configuration in Node.js (Direct)

```javascript
const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();

// Load SSL certificates
const privateKey = fs.readFileSync('/etc/letsencrypt/live/thefinalbell.co.uk/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/thefinalbell.co.uk/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/thefinalbell.co.uk/chain.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
});

// Redirect HTTP to HTTPS
const http = require('http');
http.createServer((req, res) => {
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
  res.end();
}).listen(80);
```

---

## Environment Security

### Secure .env File

```bash
# .env file permissions (only owner can read/write)
chmod 600 .env
chown youruser:youruser .env

# Never commit .env to git
echo ".env" >> .gitignore
```

### Environment Variables

```bash
# .env
NODE_ENV=production
PORT=3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/finalbell
DATABASE_SSL=true

# Stripe
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
STRIPE_PUBLIC_KEY=pk_live_xxxxxxxxxxxxx

# Session/JWT
SESSION_SECRET=your-super-secret-random-string-min-32-chars
JWT_SECRET=another-super-secret-random-string

# CORS
ALLOWED_ORIGINS=https://thefinalbell.co.uk,https://www.thefinalbell.co.uk

# Email (if using)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=noreply@thefinalbell.co.uk
EMAIL_PASS=app-specific-password

# Redis (for rate limiting)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password

# Security
BCRYPT_ROUNDS=12
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_DURATION=3600000  # 1 hour in ms

# Monitoring
SENTRY_DSN=https://xxxxxxxxxxxxx@sentry.io/xxxxxx
```

### Generate Secure Secrets

```bash
# Generate random secret (32 bytes)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use OpenSSL
openssl rand -hex 32
```

---

## Security Checklist

### Pre-Deployment

- [ ] Install and configure Helmet.js
- [ ] Set up CORS with specific origins
- [ ] Implement rate limiting on all endpoints
- [ ] Add input validation on all user inputs
- [ ] Sanitize data (prevent XSS, SQL injection)
- [ ] Use HTTPS everywhere (redirect HTTP → HTTPS)
- [ ] Set secure environment variables
- [ ] Remove console.logs in production
- [ ] Set NODE_ENV=production
- [ ] Configure proper error handling (don't leak info)

### Server/Infrastructure

- [ ] Set up UFW or iptables firewall
- [ ] Configure cloud provider firewall (Security Groups)
- [ ] Enable SSH key authentication (disable password auth)
- [ ] Change default SSH port (optional but recommended)
- [ ] Set up fail2ban for SSH protection
- [ ] Configure automatic security updates
- [ ] Set up log monitoring
- [ ] Configure database firewall rules
- [ ] Use private networks for internal communication

### Application

- [ ] Hash passwords with bcrypt (min 12 rounds)
- [ ] Implement CSRF protection
- [ ] Use secure session cookies (httpOnly, secure, sameSite)
- [ ] Validate webhook signatures (Stripe)
- [ ] Limit request body size
- [ ] Implement account lockout after failed logins
- [ ] Add 2FA for admin accounts
- [ ] Sanitize file uploads
- [ ] Use parameterized queries (prevent SQL injection)

### Monitoring

- [ ] Set up error tracking (Sentry)
- [ ] Configure uptime monitoring
- [ ] Enable access logging
- [ ] Set up security alerts
- [ ] Regular security audits with `npm audit`
- [ ] Monitor unusual traffic patterns
- [ ] Set up database backups

### Compliance

- [ ] GDPR compliance (Privacy Policy)
- [ ] Cookie consent banner
- [ ] Data encryption at rest and in transit
- [ ] PCI DSS compliance (use Stripe)
- [ ] Regular penetration testing

---

## Quick Setup Script

Save this as `setup-security.sh`:

```bash
#!/bin/bash

echo "🔒 Setting up security for The Final Bell..."

# Update system
echo "📦 Updating system..."
sudo apt update && sudo apt upgrade -y

# Install firewall
echo "🛡️ Installing UFW firewall..."
sudo apt install ufw -y

# Configure UFW
echo "⚙️ Configuring firewall rules..."
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw limit 22/tcp comment 'SSH with rate limiting'
sudo ufw allow 80/tcp comment 'HTTP'
sudo ufw allow 443/tcp comment 'HTTPS'

# Enable UFW
echo "✅ Enabling firewall..."
sudo ufw --force enable

# Install fail2ban
echo "🚫 Installing fail2ban..."
sudo apt install fail2ban -y

# Configure fail2ban
sudo cat > /etc/fail2ban/jail.local <<EOF
[sshd]
enabled = true
port = 22
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
EOF

sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Install and configure Let's Encrypt
echo "🔐 Installing Certbot..."
sudo apt install certbot python3-certbot-nginx -y

# Set up automatic security updates
echo "🔄 Configuring automatic security updates..."
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure -plow unattended-upgrades

echo "✅ Security setup complete!"
echo ""
echo "Next steps:"
echo "1. Run: sudo certbot --nginx -d yourdomain.com"
echo "2. Test firewall: sudo ufw status verbose"
echo "3. Check fail2ban: sudo fail2ban-client status"
```

Run with:
```bash
chmod +x setup-security.sh
sudo ./setup-security.sh
```

---

## Testing Security

### 1. Test Firewall

```bash
# From another machine
nmap -sV your-server-ip

# Should only show ports 22, 80, 443 open
```

### 2. Test Rate Limiting

```bash
# Send 101 requests quickly (should be rate limited)
for i in {1..101}; do
  curl https://thefinalbell.co.uk/api/test
done
```

### 3. Test SSL

```bash
# Check SSL configuration
curl -I https://thefinalbell.co.uk

# SSL Labs test
# Visit: https://www.ssllabs.com/ssltest/analyze.html?d=thefinalbell.co.uk
```

### 4. Security Headers

```bash
curl -I https://thefinalbell.co.uk

# Should see:
# Strict-Transport-Security: max-age=31536000
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
```

---

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Node.js Security Checklist](https://github.com/goldbergyoni/nodebestpractices#6-security-best-practices)
- [Mozilla SSL Configuration Generator](https://ssl-config.mozilla.org/)

---

**Document Version:** 1.0
**Last Updated:** November 5, 2025
