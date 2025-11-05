# Learn Security: Hands-On Tutorial

**A Step-by-Step Guide to Securing Your Application**

*Learn by doing - understand WHY, not just HOW*

---

## Table of Contents

1. [Understanding the Threat Landscape](#understanding-the-threat-landscape)
2. [Tutorial 1: Basic Security Headers](#tutorial-1-basic-security-headers)
3. [Tutorial 2: CORS Protection](#tutorial-2-cors-protection)
4. [Tutorial 3: Rate Limiting](#tutorial-3-rate-limiting)
5. [Tutorial 4: Input Validation](#tutorial-4-input-validation)
6. [Tutorial 5: Server Firewall Setup](#tutorial-5-server-firewall-setup)
7. [Tutorial 6: SSL/HTTPS Configuration](#tutorial-6-sslhttps-configuration)
8. [Tutorial 7: Testing Your Security](#tutorial-7-testing-your-security)
9. [Common Attacks Explained](#common-attacks-explained)
10. [Learning Exercises](#learning-exercises)

---

## Understanding the Threat Landscape

Before we start coding, let's understand what we're protecting against:

### Real-World Attack Example

Imagine your shop is a physical store:

```
🏪 YOUR SHOP (No Security)
├─ No locks on doors → Anyone can enter (No firewall)
├─ No ID checks → Thieves can return stolen goods (No CORS)
├─ No limits → One person buys everything (No rate limiting)
├─ Accepts fake money → Gets scammed (No input validation)
└─ Glass windows → Everyone sees inside (No HTTPS)

🏪 YOUR SHOP (With Security)
├─ Locked doors with guards → Only customers enter (Firewall)
├─ ID checks at returns → Verify legitimate customers (CORS)
├─ Purchase limits → Fair access for everyone (Rate limiting)
├─ Money checker → Detect counterfeit (Input validation)
└─ Tinted windows → Privacy for transactions (HTTPS)
```

### Common Attacks Against Web Applications

| Attack | What It Is | Real-World Example |
|--------|-----------|-------------------|
| **DDoS** | Overwhelm server with traffic | 10,000 people rush into your shop at once |
| **SQL Injection** | Inject malicious database queries | Customer writes "delete all products" on order form |
| **XSS** | Inject malicious scripts | Customer leaves a note that steals other customers' info |
| **CSRF** | Trick user into unwanted actions | Someone forges your signature on checks |
| **Brute Force** | Guess passwords repeatedly | Trying every key to open a lock |
| **Man-in-the-Middle** | Intercept communications | Postman reads your mail |

Now let's learn how to defend against these!

---

## Tutorial 1: Basic Security Headers

### What Are Security Headers?

Security headers are instructions you send to browsers telling them "here's how to protect this website."

### Step-by-Step Implementation

#### Step 1: Create a New File

Create `server-secure.js` in your project root:

```javascript
const express = require('express');
const app = express();

// We'll add security step by step
```

#### Step 2: Install Helmet

```bash
npm install helmet
```

**What is Helmet?**
Helmet is like a security guard that automatically adds protective headers to your responses.

#### Step 3: Add Helmet (Basic)

```javascript
const express = require('express');
const helmet = require('helmet');

const app = express();

// 🔒 SECURITY STEP 1: Basic helmet protection
app.use(helmet());

app.get('/', (req, res) => {
  res.send('Hello, Secure World!');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

**Try it:**
```bash
node server-secure.js
```

Then in another terminal:
```bash
curl -I http://localhost:3000
```

**What you'll see:**
```
HTTP/1.1 200 OK
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 0
...
```

### Understanding Each Header

Let's break down what each header does:

#### X-Frame-Options

**Without protection:**
```
Evil site → <iframe src="yoursite.com"> → User thinks they're on your site
         → Clicks "Pay £1000" → Actually paying the evil site!
```

**With X-Frame-Options: DENY:**
```
Evil site → <iframe src="yoursite.com"> → Browser blocks it!
         → "Cannot display in frame"
```

**Code:**
```javascript
app.use(helmet({
  frameguard: {
    action: 'deny' // Don't allow your site in iframes
  }
}));
```

#### X-Content-Type-Options

**The Problem:**
Browser tries to be "helpful" and guesses file types. Attacker uploads "image.jpg" that's actually malicious JavaScript.

**The Solution:**
```javascript
app.use(helmet({
  noSniff: true // Browser must trust the Content-Type header
}));
```

#### Strict-Transport-Security (HSTS)

**The Problem:**
User types "thefinalbell.co.uk" → Goes to HTTP first → Attacker intercepts

**The Solution:**
```javascript
app.use(helmet({
  hsts: {
    maxAge: 31536000, // Remember for 1 year
    includeSubDomains: true, // Apply to all subdomains
    preload: true // Add to browser's preload list
  }
}));
```

**What this does:**
- First visit: HTTP → HTTPS redirect
- Browser remembers: "Always use HTTPS for this site"
- Next 365 days: Browser automatically uses HTTPS

#### Content-Security-Policy (CSP)

**The Problem:**
Attacker injects `<script>alert('hacked')</script>` into your page.

**The Solution:**
Tell browser exactly what scripts are allowed.

```javascript
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      // Only load scripts from your domain and Stripe
      scriptSrc: ["'self'", "https://js.stripe.com"],

      // Only load styles from your domain and Google Fonts
      styleSrc: ["'self'", "https://fonts.googleapis.com"],

      // Only load images from your domain and HTTPS sources
      imgSrc: ["'self'", "https:", "data:"],

      // Don't allow any plugins (Flash, etc.)
      objectSrc: ["'none'"],

      // Only allow forms to submit to your domain
      formAction: ["'self'"],
    }
  }
}));
```

### 🎯 Exercise 1: Test Headers

**Your Task:**
1. Copy the code above into `server-secure.js`
2. Start the server: `node server-secure.js`
3. Test each header:

```bash
# Test 1: Check headers
curl -I http://localhost:3000

# Test 2: Try to load in iframe (should fail)
# Create test.html:
# <iframe src="http://localhost:3000"></iframe>
# Open in browser - should see error

# Test 3: Try XSS attack
curl "http://localhost:3000?input=<script>alert('xss')</script>"
```

**Expected Results:**
- ✅ Headers are present
- ✅ Iframe is blocked
- ✅ Script tags don't execute

---

## Tutorial 2: CORS Protection

### What is CORS?

**Cross-Origin Resource Sharing** = Rules for who can access your API from other websites.

### The Problem

Without CORS protection:
```
Evil website (evil.com)
└─ Loads in victim's browser
   └─ Makes request to YOUR API (thefinalbell.co.uk/api/checkout)
      └─ Uses victim's cookies/session
         └─ Places order without victim knowing!
```

### The Solution

Only allow specific websites to access your API.

#### Step 1: Install CORS

```bash
npm install cors
```

#### Step 2: Basic CORS Setup

```javascript
const cors = require('cors');

// ❌ DANGEROUS - Allows everyone
app.use(cors());

// ✅ SAFE - Only allow specific origins
const corsOptions = {
  origin: 'https://thefinalbell.co.uk', // Your frontend
  credentials: true, // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
```

#### Step 3: Advanced CORS (Multiple Origins)

```javascript
const allowedOrigins = [
  'https://thefinalbell.co.uk',
  'https://www.thefinalbell.co.uk',
  'http://localhost:5173', // For development
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true); // Allow this origin
    } else {
      callback(new Error('Not allowed by CORS')); // Block this origin
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
```

### Understanding CORS Flow

```
1. Browser makes request
   ┌─────────────────────────────────────┐
   │ OPTIONS /api/checkout               │
   │ Origin: https://thefinalbell.co.uk  │
   └─────────────────────────────────────┘
                    ↓
2. Server checks if origin is allowed
   ┌─────────────────────────────────────┐
   │ if (allowedOrigins.includes(origin))│
   │   → Yes: Send CORS headers          │
   │   → No: Block request               │
   └─────────────────────────────────────┘
                    ↓
3. Browser receives response
   ┌─────────────────────────────────────┐
   │ Access-Control-Allow-Origin: ...    │
   │ Access-Control-Allow-Methods: ...   │
   └─────────────────────────────────────┘
                    ↓
4. If headers match, browser allows request
```

### 🎯 Exercise 2: Test CORS

**Your Task:**

1. Add this to `server-secure.js`:

```javascript
const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    console.log('Request from origin:', origin);

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS'));
    }
  }
}));

app.get('/api/test', (req, res) => {
  res.json({ message: 'CORS test successful' });
});
```

2. Test it:

```bash
# Test 1: No origin (should work)
curl http://localhost:3000/api/test

# Test 2: Allowed origin (should work)
curl -H "Origin: http://localhost:5173" http://localhost:3000/api/test

# Test 3: Blocked origin (should fail)
curl -H "Origin: http://evil.com" http://localhost:3000/api/test
```

**Expected Results:**
- ✅ No origin: Works
- ✅ Allowed origin: Works
- ❌ Evil origin: Blocked

---

## Tutorial 3: Rate Limiting

### What is Rate Limiting?

**Rate limiting** = Restricting how many requests someone can make in a time period.

### Why Do We Need It?

**Scenario without rate limiting:**
```
Attacker's bot:
├─ Sends 10,000 requests/second to /api/checkout
├─ Creates fake orders
├─ Crashes your server
└─ Legitimate customers can't access site
```

**Scenario with rate limiting:**
```
Attacker's bot:
├─ Sends request #1: ✅ Allowed
├─ Sends request #2: ✅ Allowed
├─ Sends request #3: ✅ Allowed
...
├─ Sends request #101: ❌ BLOCKED - "Too many requests"
└─ Must wait 15 minutes before trying again
```

### Step-by-Step Implementation

#### Step 1: Install Express Rate Limit

```bash
npm install express-rate-limit
```

#### Step 2: Basic Rate Limiter

```javascript
const rateLimit = require('express-rate-limit');

// Create a limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes (in milliseconds)
  max: 100, // Max 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});

// Apply to all routes
app.use(limiter);
```

**Breaking down the math:**
```javascript
windowMs: 15 * 60 * 1000
         ├─ 15 minutes
         ├─ × 60 seconds per minute = 900 seconds
         └─ × 1000 milliseconds per second = 900,000 ms

max: 100
    └─ 100 requests allowed in those 15 minutes

Result: Each IP can make 100 requests per 15 minutes
        = ~6.67 requests per minute
        = ~1 request every 9 seconds (on average)
```

#### Step 3: Different Limits for Different Routes

```javascript
// General API limiter - generous for normal browsing
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many API requests',
});

// Strict limiter - for sensitive actions
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Only 5 login attempts
  message: 'Too many login attempts, try again later',
  skipSuccessfulRequests: true, // Don't count successful logins
});

// Very strict - for checkout
const checkoutLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Only 10 checkouts per hour
  message: 'Too many checkout attempts',
});

// Apply to specific routes
app.use('/api/', apiLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/create-checkout-session', checkoutLimiter);
```

#### Step 4: Advanced Rate Limiter with Custom Logic

```javascript
const smartLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: async (req) => {
    // Dynamic limits based on user
    if (req.user && req.user.isPremium) {
      return 200; // Premium users get higher limit
    }
    return 100; // Regular users
  },

  handler: (req, res) => {
    // Custom response when limit exceeded
    const retryAfter = Math.ceil(req.rateLimit.resetTime / 1000);

    res.status(429).json({
      error: 'Too many requests',
      retryAfter: retryAfter,
      limit: req.rateLimit.limit,
      remaining: req.rateLimit.remaining,
    });
  },

  skip: (req) => {
    // Don't rate limit these requests
    const whitelist = ['127.0.0.1', '::1']; // Localhost
    return whitelist.includes(req.ip);
  },

  keyGenerator: (req) => {
    // Use user ID instead of IP if logged in
    return req.user ? req.user.id : req.ip;
  },
});
```

### Understanding Rate Limit Storage

Rate limiters need to remember request counts:

```javascript
// In-memory (simple, but resets on server restart)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  // Uses memory by default
});

// Redis (recommended for production - persistent)
const RedisStore = require('rate-limit-redis');
const redis = require('redis');

const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379,
});

const limiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
    prefix: 'rl:', // Keys will be 'rl:127.0.0.1'
  }),
  windowMs: 15 * 60 * 1000,
  max: 100,
});
```

**Why Redis?**
```
In-Memory Storage:
├─ Server restarts → Counts reset
├─ Multiple servers → Each has own count (can bypass limit)
└─ ❌ Not suitable for production

Redis Storage:
├─ Server restarts → Counts persist
├─ Multiple servers → Share same Redis (accurate count)
└─ ✅ Production-ready
```

### 🎯 Exercise 3: Test Rate Limiting

**Your Task:**

1. Add this to `server-secure.js`:

```javascript
const rateLimit = require('express-rate-limit');

// Very strict limit for testing (5 requests per minute)
const testLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: { error: 'Rate limit exceeded' },
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many requests',
      limit: req.rateLimit.limit,
      remaining: req.rateLimit.remaining,
      resetTime: new Date(req.rateLimit.resetTime),
    });
  },
});

app.use('/api/', testLimiter);

app.get('/api/test', (req, res) => {
  res.json({
    message: 'Success',
    requestsRemaining: req.rateLimit.remaining,
  });
});
```

2. Test it:

```bash
# Send 6 requests quickly
for i in {1..6}; do
  echo "Request $i:"
  curl http://localhost:3000/api/test
  echo ""
done
```

**Expected Results:**
- Requests 1-5: ✅ Success (with decreasing `remaining` count)
- Request 6: ❌ 429 Too Many Requests

3. **Monitor the rate limit:**

```bash
# Watch it update in real-time
watch -n 1 'curl -s http://localhost:3000/api/test | jq'
```

---

## Tutorial 4: Input Validation

### Why Validate Input?

**Never trust user input!** Users might:
1. Make mistakes (enter "abc" for age)
2. Be malicious (inject SQL/scripts)
3. Send unexpected formats (break your app)

### Common Attack: SQL Injection

**Vulnerable code:**
```javascript
// ❌ DANGEROUS - Never do this!
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  db.query(query, (err, results) => {
    // ...
  });
});
```

**The attack:**
```javascript
// Attacker sends:
{
  "username": "admin' OR '1'='1",
  "password": "anything"
}

// Query becomes:
SELECT * FROM users WHERE username = 'admin' OR '1'='1' AND password = 'anything'
                                              ↑ Always true!
// Result: Attacker logs in as admin without password!
```

### The Solution: Input Validation

#### Step 1: Install Express Validator

```bash
npm install express-validator
```

#### Step 2: Basic Validation

```javascript
const { body, validationResult } = require('express-validator');

app.post('/api/bookings',
  [
    // Validate each field
    body('name')
      .trim() // Remove whitespace
      .notEmpty().withMessage('Name is required')
      .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters')
      .escape(), // Convert HTML to safe entities

    body('email')
      .trim()
      .isEmail().withMessage('Invalid email')
      .normalizeEmail(), // Convert to lowercase, remove dots in Gmail

    body('phone')
      .trim()
      .matches(/^[0-9]{10,11}$/).withMessage('Phone must be 10-11 digits'),
  ],
  (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Input is now safe to use
    const { name, email, phone } = req.body;
    // ... create booking
  }
);
```

#### Step 3: Understanding Each Validator

Let's break down what each validator does:

##### `.trim()`
```javascript
Input:  "  John Doe  "
Output: "John Doe"

Why? Remove accidental whitespace from copy-paste
```

##### `.notEmpty()`
```javascript
Input:  ""
Result: ❌ Error: "Name is required"

Input:  "John"
Result: ✅ Pass
```

##### `.isLength({ min: 2, max: 100 })`
```javascript
Input:  "A"
Result: ❌ Error: "Name must be 2-100 characters"

Input:  "John Doe"
Result: ✅ Pass (8 characters, within range)

Input:  "Very long name that exceeds the maximum..."
Result: ❌ Error: "Name must be 2-100 characters"
```

##### `.escape()`
```javascript
Input:  "<script>alert('xss')</script>"
Output: "&lt;script&gt;alert(&#x27;xss&#x27;)&lt;/script&gt;"

Why? Prevents XSS attacks - HTML is converted to safe text
```

##### `.isEmail()`
```javascript
Input:  "john@example.com"
Result: ✅ Pass

Input:  "not-an-email"
Result: ❌ Error: "Invalid email"

Input:  "john@"
Result: ❌ Error: "Invalid email"
```

##### `.normalizeEmail()`
```javascript
Input:  "John.Doe@Gmail.COM"
Output: "johndoe@gmail.com"

Why? Prevents duplicate accounts (Gmail ignores dots and case)
```

##### `.matches(regex)`
```javascript
body('phone').matches(/^[0-9]{10,11}$/)

Input:  "07123456789"  (11 digits)
Result: ✅ Pass

Input:  "0712345678"   (10 digits)
Result: ✅ Pass

Input:  "071234"       (6 digits)
Result: ❌ Error

Input:  "abc123"       (contains letters)
Result: ❌ Error
```

#### Step 4: Custom Validators

```javascript
body('date')
  .isISO8601().withMessage('Invalid date format')
  .toDate() // Convert string to Date object
  .custom((value) => {
    // Must be in the future
    if (value < new Date()) {
      throw new Error('Date must be in the future');
    }

    // Must be within next 90 days
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 90);

    if (value > maxDate) {
      throw new Error('Date must be within next 90 days');
    }

    // Must not be Sunday (shop closed)
    if (value.getDay() === 0) {
      throw new Error('Shop is closed on Sundays');
    }

    return true; // Validation passed
  }),
```

#### Step 5: Sanitization vs Validation

```javascript
// SANITIZATION = Clean/format the input
.trim()           // Remove whitespace
.escape()         // Convert HTML entities
.normalizeEmail() // Standardize format
.toDate()         // Convert type

// VALIDATION = Check if input meets criteria
.notEmpty()       // Must have value
.isEmail()        // Must be email format
.isLength()       // Must be certain length
.matches()        // Must match pattern
.custom()         // Custom rules
```

### 🎯 Exercise 4: Test Input Validation

**Your Task:**

1. Create a validation test endpoint:

```javascript
const { body, validationResult } = require('express-validator');

app.post('/api/test-validation',
  [
    body('name')
      .trim()
      .notEmpty().withMessage('Name required')
      .isLength({ min: 2 }).withMessage('Name too short')
      .escape(),

    body('email')
      .trim()
      .isEmail().withMessage('Invalid email')
      .normalizeEmail(),

    body('age')
      .isInt({ min: 18, max: 120 }).withMessage('Age must be 18-120'),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    res.json({
      success: true,
      sanitized: req.body,
    });
  }
);
```

2. Test valid input:

```bash
curl -X POST http://localhost:3000/api/test-validation \
  -H "Content-Type: application/json" \
  -d '{
    "name": "  John Doe  ",
    "email": "John.Doe@GMAIL.COM",
    "age": 25
  }'
```

**Expected response:**
```json
{
  "success": true,
  "sanitized": {
    "name": "John Doe",
    "email": "johndoe@gmail.com",
    "age": 25
  }
}
```

3. Test invalid input:

```bash
curl -X POST http://localhost:3000/api/test-validation \
  -H "Content-Type: application/json" \
  -d '{
    "name": "A",
    "email": "not-an-email",
    "age": 15
  }'
```

**Expected response:**
```json
{
  "success": false,
  "errors": [
    {
      "msg": "Name too short",
      "param": "name",
      "location": "body"
    },
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Age must be 18-120",
      "param": "age",
      "location": "body"
    }
  ]
}
```

4. Test XSS attack:

```bash
curl -X POST http://localhost:3000/api/test-validation \
  -H "Content-Type: application/json" \
  -d '{
    "name": "<script>alert(\"xss\")</script>",
    "email": "test@example.com",
    "age": 25
  }'
```

**Expected response:**
```json
{
  "success": true,
  "sanitized": {
    "name": "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;",
    "email": "test@example.com",
    "age": 25
  }
}
```

Notice the script tags are escaped!

---

## Tutorial 5: Server Firewall Setup

### What is a Firewall?

A firewall is like a security guard at your server's door:

```
Internet → [FIREWALL] → Your Server
           ↓
           Checks each request:
           ├─ Port 22 (SSH): Who are you? Show ID!
           ├─ Port 80 (HTTP): Come in!
           ├─ Port 443 (HTTPS): Come in!
           └─ Port 3306 (MySQL): BLOCKED! No public access!
```

### Why Do We Need It?

**Without firewall:**
```
Your Server (All ports open):
├─ Port 22 (SSH) → Hackers try to login
├─ Port 3000 (App) → Accessible
├─ Port 3306 (MySQL) → Direct database access! ⚠️
├─ Port 5432 (PostgreSQL) → Direct database access! ⚠️
└─ Port 6379 (Redis) → Direct cache access! ⚠️
```

**With firewall:**
```
Your Server (Only necessary ports open):
├─ Port 22 (SSH) → Rate-limited, key-only
├─ Port 80 (HTTP) → Open
├─ Port 443 (HTTPS) → Open
└─ All other ports → BLOCKED ✅
```

### Step-by-Step: UFW Firewall Setup

#### Step 1: Connect to Your Server

```bash
# Replace with your server IP
ssh your-username@your-server-ip
```

#### Step 2: Check Current Firewall Status

```bash
# Check if UFW is installed
sudo ufw status

# If not installed (Ubuntu/Debian):
sudo apt update
sudo apt install ufw
```

#### Step 3: Configure Default Policies

**IMPORTANT:** Do this BEFORE enabling the firewall!

```bash
# Block all incoming traffic by default
sudo ufw default deny incoming

# Allow all outgoing traffic by default
sudo ufw default allow outgoing
```

**What this means:**
```
Incoming: DENY (default)
├─ Someone tries to connect to ANY port → BLOCKED
└─ Unless we specifically allow it

Outgoing: ALLOW (default)
├─ Your server makes requests to internet → ALLOWED
└─ (e.g., downloading packages, API calls)
```

#### Step 4: Allow SSH (CRITICAL!)

**⚠️ WARNING:** If you enable the firewall without allowing SSH, you'll be locked out!

```bash
# Method 1: Allow SSH on port 22
sudo ufw allow 22/tcp

# Method 2: Allow SSH by service name
sudo ufw allow ssh

# Method 3: Allow SSH with rate limiting (recommended)
sudo ufw limit 22/tcp
```

**What is rate limiting?**
```
Without rate limiting:
├─ Hacker tries password 1: FAILED
├─ Hacker tries password 2: FAILED
├─ Hacker tries password 3: FAILED
... (tries 10,000 passwords)

With rate limiting (limit 22/tcp):
├─ Attempt 1: ALLOWED
├─ Attempt 2: ALLOWED
├─ Attempt 3: ALLOWED
├─ Attempt 4: ALLOWED
├─ Attempt 5: ALLOWED
├─ Attempt 6: BLOCKED for 30 seconds
└─ Makes brute force attacks impractical
```

#### Step 5: Allow HTTP and HTTPS

```bash
# Allow HTTP (port 80)
sudo ufw allow 80/tcp

# Allow HTTPS (port 443)
sudo ufw allow 443/tcp

# Or use service names:
sudo ufw allow http
sudo ufw allow https
```

#### Step 6: Review Rules Before Enabling

```bash
# Check what rules will be applied
sudo ufw show added
```

**You should see:**
```
ufw limit 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
```

#### Step 7: Enable the Firewall

```bash
# Enable firewall
sudo ufw enable

# You'll see a warning:
# "Command may disrupt existing ssh connections. Proceed with operation (y|n)?"
# Type: y
```

#### Step 8: Verify It's Working

```bash
# Check status
sudo ufw status verbose

# You should see:
Status: active
Logging: on (low)
Default: deny (incoming), allow (outgoing), disabled (routed)
New profiles: skip

To                         Action      From
--                         ------      ----
22/tcp                     LIMIT       Anywhere
80/tcp                     ALLOW       Anywhere
443/tcp                    ALLOW       Anywhere
```

### Advanced Firewall Rules

#### Allow Specific IP Only

```bash
# Only allow your office IP to SSH
sudo ufw allow from 203.0.113.100 to any port 22

# Allow a range of IPs (CIDR notation)
sudo ufw allow from 192.168.1.0/24 to any port 22
```

#### Allow Application on Specific Port

```bash
# If your Node.js app runs on port 3000
sudo ufw allow 3000/tcp

# But only from localhost (if using Nginx reverse proxy)
sudo ufw allow from 127.0.0.1 to any port 3000
```

#### Block Specific IP

```bash
# Block an IP address
sudo ufw deny from 198.51.100.50

# Block IP range
sudo ufw deny from 198.51.100.0/24
```

#### Delete Rules

```bash
# View numbered rules
sudo ufw status numbered

# Output:
# [1] 22/tcp        LIMIT       Anywhere
# [2] 80/tcp        ALLOW       Anywhere
# [3] 443/tcp       ALLOW       Anywhere
# [4] 3000/tcp      ALLOW       Anywhere

# Delete rule #4
sudo ufw delete 4

# Or delete by specification
sudo ufw delete allow 3000/tcp
```

#### Logging

```bash
# Enable logging
sudo ufw logging on

# Set log level (low, medium, high, full)
sudo ufw logging medium

# View logs
sudo tail -f /var/log/ufw.log

# Example log entry:
# [UFW BLOCK] IN=eth0 OUT= SRC=192.168.1.100 DST=10.0.0.5 PROTO=TCP DPT=3306
#             ↑ Blocked  ↑ From 192.168.1.100  ↑ Trying to access MySQL port
```

### 🎯 Exercise 5: Test Your Firewall

**Your Task:**

1. **Test from outside your server:**

```bash
# Test port scanning (from your local machine)
nmap -p 1-65535 your-server-ip

# You should ONLY see:
# 22/tcp   open  ssh
# 80/tcp   open  http
# 443/tcp  open  https
```

2. **Test SSH rate limiting:**

```bash
# Try connecting 6 times quickly with wrong password
for i in {1..6}; do
  ssh wrong-user@your-server-ip
done

# Connections 1-5: "Permission denied"
# Connection 6: Connection refused (rate limited!)
```

3. **Test blocked ports:**

```bash
# Try accessing MySQL (should be blocked)
telnet your-server-ip 3306
# Should timeout or be refused

# Try accessing your app if not exposed
telnet your-server-ip 3000
# Should timeout or be refused
```

---

## Tutorial 6: SSL/HTTPS Configuration

### What is HTTPS?

**HTTP** = Sending postcards (anyone can read them)
**HTTPS** = Sending sealed letters (only recipient can read)

### Why HTTPS Matters

**Without HTTPS (HTTP):**
```
Your Computer → WiFi Router → ISP → Internet → Server
                  ↑
                  Attacker can see:
                  ├─ Passwords
                  ├─ Credit card numbers
                  ├─ Personal data
                  └─ Everything in plain text!
```

**With HTTPS:**
```
Your Computer → [Encrypted] → WiFi Router → ISP → Internet → Server
                              ↑
                              Attacker sees: �#%$@&*!^
                              (Encrypted gibberish)
```

### Step-by-Step: Let's Encrypt (Free SSL)

#### Prerequisites

- A domain name pointing to your server
- Server running Ubuntu/Debian
- UFW firewall allowing ports 80 and 443

#### Step 1: Install Certbot

```bash
# Update package list
sudo apt update

# Install Certbot
sudo apt install certbot python3-certbot-nginx
```

**What is Certbot?**
Certbot is a tool that automatically gets, installs, and renews SSL certificates from Let's Encrypt (a free certificate authority).

#### Step 2: Obtain SSL Certificate

**If using Nginx:**
```bash
# Certbot will automatically configure Nginx
sudo certbot --nginx -d thefinalbell.co.uk -d www.thefinalbell.co.uk
```

**If NOT using Nginx (standalone):**
```bash
# Stop your app temporarily (Certbot needs port 80)
sudo systemctl stop your-app

# Get certificate
sudo certbot certonly --standalone -d thefinalbell.co.uk -d www.thefinalbell.co.uk

# Restart your app
sudo systemctl start your-app
```

**You'll be prompted:**
```
1. Enter email: (for renewal notifications)
2. Agree to terms: A
3. Share email: N
4. Select domains: Press Enter to confirm
```

#### Step 3: Verify Certificate

```bash
# Certificates are stored here:
ls -la /etc/letsencrypt/live/thefinalbell.co.uk/

# You should see:
# cert.pem       → Your certificate
# chain.pem      → Certificate chain
# fullchain.pem  → cert.pem + chain.pem (use this!)
# privkey.pem    → Your private key (keep secret!)
```

#### Step 4: Configure Node.js to Use HTTPS

Create `server-https.js`:

```javascript
const https = require('https');
const http = require('http');
const fs = require('fs');
const express = require('express');

const app = express();

// Your app routes here
app.get('/', (req, res) => {
  res.send('Hello from HTTPS!');
});

// Read SSL certificates
const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/thefinalbell.co.uk/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/thefinalbell.co.uk/fullchain.pem'),
};

// Create HTTPS server (port 443)
https.createServer(sslOptions, app).listen(443, () => {
  console.log('HTTPS server running on port 443');
});

// Create HTTP server that redirects to HTTPS (port 80)
http.createServer((req, res) => {
  res.writeHead(301, {
    Location: 'https://' + req.headers.host + req.url
  });
  res.end();
}).listen(80, () => {
  console.log('HTTP redirect server running on port 80');
});
```

**What this does:**
```
User types: http://thefinalbell.co.uk
           ↓
HTTP Server (port 80): "Redirect to HTTPS"
           ↓
User browser: Goes to https://thefinalbell.co.uk
           ↓
HTTPS Server (port 443): Serves encrypted content
```

#### Step 5: Run with Proper Permissions

```bash
# HTTPS needs to bind to port 443 (privileged port)
# Option 1: Run as root (NOT recommended)
sudo node server-https.js

# Option 2: Give Node permission to bind to low ports (Better)
sudo setcap 'cap_net_bind_service=+ep' $(which node)
node server-https.js

# Option 3: Use a reverse proxy (Best - see below)
```

#### Step 6: Set Up Auto-Renewal

Let's Encrypt certificates expire after 90 days. Set up automatic renewal:

```bash
# Test renewal (dry run)
sudo certbot renew --dry-run

# If successful, Certbot automatically sets up renewal via systemd timer
# Check if it's enabled:
sudo systemctl status certbot.timer

# You should see:
# Active: active (waiting)
```

**Renewal happens automatically** twice a day. If certificate is within 30 days of expiry, it will be renewed.

### Using Nginx as Reverse Proxy (Recommended)

Instead of running Node.js with root privileges, use Nginx:

#### Step 1: Install Nginx

```bash
sudo apt install nginx
```

#### Step 2: Configure Nginx

Create `/etc/nginx/sites-available/thefinalbell`:

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name thefinalbell.co.uk www.thefinalbell.co.uk;

    return 301 https://$server_name$request_uri;
}

# HTTPS server
server {
    listen 443 ssl http2;
    server_name thefinalbell.co.uk www.thefinalbell.co.uk;

    # SSL certificates (Certbot will add these)
    ssl_certificate /etc/letsencrypt/live/thefinalbell.co.uk/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/thefinalbell.co.uk/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Proxy to Node.js app
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Step 3: Enable Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/thefinalbell /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# If OK, restart Nginx
sudo systemctl restart nginx
```

#### Step 4: Run Node.js App (No Root Needed!)

```bash
# Now your app only needs to run on port 3000
node server.js
# Nginx handles ports 80 and 443
```

### 🎯 Exercise 6: Test HTTPS

**Your Task:**

1. **Test SSL certificate:**

```bash
# Check certificate info
openssl s_client -connect thefinalbell.co.uk:443 -servername thefinalbell.co.uk

# Look for:
# subject=CN = thefinalbell.co.uk
# issuer=C = US, O = Let's Encrypt
```

2. **Test SSL grade:**

Visit: https://www.ssllabs.com/ssltest/analyze.html?d=thefinalbell.co.uk

**Target grade:** A or A+

3. **Test HTTP to HTTPS redirect:**

```bash
# Request HTTP
curl -I http://thefinalbell.co.uk

# Should see:
# HTTP/1.1 301 Moved Permanently
# Location: https://thefinalbell.co.uk
```

4. **Test security headers:**

```bash
curl -I https://thefinalbell.co.uk

# Should include:
# Strict-Transport-Security: max-age=31536000
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
```

---

## Tutorial 7: Testing Your Security

### Security Testing Tools

#### 1. npm audit (Dependency Vulnerabilities)

```bash
# Check for vulnerable packages
npm audit

# Example output:
# found 3 vulnerabilities (1 low, 2 high)
# run `npm audit fix` to fix them

# Fix automatically
npm audit fix

# Fix even breaking changes (careful!)
npm audit fix --force
```

**What it checks:**
- Known security vulnerabilities in your dependencies
- Outdated packages with security patches

#### 2. OWASP ZAP (Web Application Scanner)

Free, open-source security scanner.

**Install:**
```bash
# Download from: https://www.zaproxy.org/download/
```

**Basic scan:**
1. Open ZAP
2. Quick Start → Automated Scan
3. Enter your URL: https://thefinalbell.co.uk
4. Click "Attack"

**What it finds:**
- SQL injection vulnerabilities
- XSS vulnerabilities
- Security misconfigurations
- Missing security headers

#### 3. Nmap (Port Scanner)

```bash
# Install
sudo apt install nmap

# Scan your server
nmap -sV your-server-ip

# Expected output (secure):
# 22/tcp   open  ssh      OpenSSH 8.2
# 80/tcp   open  http     nginx 1.18.0
# 443/tcp  open  ssl/http nginx 1.18.0

# ❌ Bad if you see:
# 3306/tcp open  mysql    MySQL 5.7
# 5432/tcp open  postgresql PostgreSQL 12
```

#### 4. curl (Manual Testing)

**Test CORS:**
```bash
# Should be blocked
curl -H "Origin: http://evil.com" \
     -H "Access-Control-Request-Method: POST" \
     -X OPTIONS \
     https://thefinalbell.co.uk/api/checkout
```

**Test rate limiting:**
```bash
# Send 101 requests
for i in {1..101}; do
  curl https://thefinalbell.co.uk/api/test
done
# Request 101 should return 429
```

**Test XSS protection:**
```bash
curl "https://thefinalbell.co.uk/search?q=<script>alert('xss')</script>"
# Should escape the script tag
```

**Test SQL injection:**
```bash
curl -X POST https://thefinalbell.co.uk/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin'\'' OR '\''1'\''='\''1","password":"anything"}'
# Should return validation error, not login success
```

### Manual Security Checklist

```bash
# 1. Check for exposed files
curl https://thefinalbell.co.uk/.env
curl https://thefinalbell.co.uk/.git/config
curl https://thefinalbell.co.uk/package.json
# All should return 404

# 2. Check security headers
curl -I https://thefinalbell.co.uk
# Should include HSTS, X-Frame-Options, etc.

# 3. Check SSL redirect
curl -I http://thefinalbell.co.uk
# Should return 301 to HTTPS

# 4. Check HTTPS enforced
curl -k https://thefinalbell.co.uk
# Should work

# 5. Check firewall
nmap -p 1-65535 your-server-ip
# Should only show 22, 80, 443
```

---

## Common Attacks Explained

### 1. DDoS (Distributed Denial of Service)

**The Attack:**
```
Attacker's botnet (1000 computers)
├─ Computer 1: Sends 100 requests/second
├─ Computer 2: Sends 100 requests/second
├─ Computer 3: Sends 100 requests/second
...
└─ Computer 1000: Sends 100 requests/second

Total: 100,000 requests/second → Server crashes
```

**Defense:**
- Rate limiting (per IP)
- Cloudflare (DDoS protection)
- Auto-scaling (handle traffic spikes)
- Load balancer (distribute traffic)

### 2. SQL Injection

**The Attack:**
```javascript
// Vulnerable query
const query = `SELECT * FROM users WHERE id = ${req.params.id}`;

// Attacker sends: id = 1 OR 1=1
// Query becomes: SELECT * FROM users WHERE id = 1 OR 1=1
// Result: Returns ALL users
```

**Defense:**
```javascript
// Use parameterized queries
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [req.params.id]);
```

### 3. XSS (Cross-Site Scripting)

**The Attack:**
```javascript
// User submits comment: <script>alert(document.cookie)</script>
// Website displays it without escaping
// Every visitor sees the script execute
// Attacker steals cookies/session tokens
```

**Defense:**
```javascript
// Escape HTML
const escape = (str) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

// Or use express-validator's .escape()
```

### 4. CSRF (Cross-Site Request Forgery)

**The Attack:**
```html
<!-- Evil website creates hidden form -->
<form action="https://thefinalbell.co.uk/api/order" method="POST">
  <input type="hidden" name="product" value="expensive-item">
  <input type="hidden" name="quantity" value="100">
</form>
<script>document.forms[0].submit();</script>

<!-- If victim is logged in, order is placed! -->
```

**Defense:**
```javascript
const csrf = require('csurf');

// Add CSRF protection
app.use(csrf({ cookie: true }));

// All forms must include CSRF token
app.get('/checkout', (req, res) => {
  res.render('checkout', { csrfToken: req.csrfToken() });
});

// <input type="hidden" name="_csrf" value="{{csrfToken}}">
```

### 5. Brute Force

**The Attack:**
```
Attacker tries to guess password:
├─ Attempt 1: password123 ❌
├─ Attempt 2: password1234 ❌
├─ Attempt 3: password12345 ❌
...
└─ Attempt 10,000: correct-password ✅
```

**Defense:**
```javascript
// Rate limit login endpoint
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Only 5 attempts
});

app.post('/login', loginLimiter, (req, res) => {
  // Login logic
});

// Account lockout after failed attempts
let failedAttempts = {};

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (failedAttempts[username] >= 5) {
    return res.status(429).json({
      error: 'Account locked. Try again in 1 hour.'
    });
  }

  if (wrongPassword) {
    failedAttempts[username] = (failedAttempts[username] || 0) + 1;
  } else {
    failedAttempts[username] = 0; // Reset on success
  }
});
```

---

## Learning Exercises

### Exercise 1: Build a Secure Login System

**Goal:** Create a login endpoint with all security features.

**Requirements:**
1. Rate limiting (5 attempts per 15 minutes)
2. Input validation (email format, password length)
3. Password hashing (bcrypt)
4. Account lockout (after 5 failed attempts)
5. Security headers (Helmet)

**Starter code:**

```javascript
const express = require('express');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

// TODO: Add Helmet

// TODO: Add rate limiting

// TODO: Add validation

app.post('/api/login', async (req, res) => {
  // TODO: Check validation errors

  // TODO: Check if account is locked

  // TODO: Find user in database

  // TODO: Compare password with bcrypt

  // TODO: Handle failed attempt

  // TODO: Handle successful login
});

app.listen(3000);
```

**Solution hints:**
- Use `bcrypt.hash()` to hash passwords on registration
- Use `bcrypt.compare()` to verify passwords on login
- Store failed attempts in Redis or database
- Use JWT tokens for sessions

### Exercise 2: Prevent SQL Injection

**Given this vulnerable code:**

```javascript
app.get('/api/products/:category', (req, res) => {
  const { category } = req.params;

  const query = `SELECT * FROM products WHERE category = '${category}'`;

  db.query(query, (err, results) => {
    res.json(results);
  });
});
```

**Your task:**
1. Identify the vulnerability
2. Fix it using parameterized queries
3. Add input validation
4. Test with malicious input

**Malicious input to test:**
```
category = ' OR '1'='1
category = '; DROP TABLE products; --
category = ' UNION SELECT * FROM users --
```

### Exercise 3: Implement HTTPS Redirect

**Goal:** Force all traffic to use HTTPS

**Your task:**
1. Create an HTTP server (port 80)
2. Redirect all requests to HTTPS
3. Add HSTS header
4. Test with curl

**Expected behavior:**
```bash
curl -I http://thefinalbell.co.uk
# → 301 Moved Permanently
# → Location: https://thefinalbell.co.uk

curl -I https://thefinalbell.co.uk
# → 200 OK
# → Strict-Transport-Security: max-age=31536000
```

### Exercise 4: Security Audit

**Your task:**
Run a complete security audit on your application.

**Checklist:**
```bash
# 1. Check for vulnerable dependencies
npm audit

# 2. Scan for open ports
nmap -sV your-server-ip

# 3. Test SSL configuration
https://www.ssllabs.com/ssltest/

# 4. Check security headers
curl -I https://your-domain.com

# 5. Test rate limiting
for i in {1..101}; do curl https://your-domain.com/api/test; done

# 6. Test CORS
curl -H "Origin: http://evil.com" https://your-domain.com/api/

# 7. Test XSS prevention
curl "https://your-domain.com/search?q=<script>alert('xss')</script>"

# 8. Check for exposed files
curl https://your-domain.com/.env
curl https://your-domain.com/.git/config

# 9. Run OWASP ZAP scan

# 10. Review firewall rules
sudo ufw status verbose
```

**Create a report** documenting:
- What you found
- Vulnerabilities discovered
- Fixes implemented
- Security score before/after

---

## Summary: Security Checklist

Print this out and check off as you implement:

### Application Level
- [ ] Helmet.js installed and configured
- [ ] CORS restricted to specific origins
- [ ] Rate limiting on all endpoints
- [ ] Stricter rate limiting on auth/payment
- [ ] Input validation on all user inputs
- [ ] XSS protection (escape HTML)
- [ ] SQL injection protection (parameterized queries)
- [ ] CSRF protection (if using cookies)
- [ ] Request body size limits
- [ ] Environment variables secured
- [ ] Error messages don't leak info
- [ ] Logging enabled for security events

### Server Level
- [ ] Firewall (UFW) enabled
- [ ] Only necessary ports open (22, 80, 443)
- [ ] SSH rate limited
- [ ] SSH key authentication (password disabled)
- [ ] Database not publicly accessible
- [ ] Redis not publicly accessible
- [ ] fail2ban installed
- [ ] Automatic security updates enabled

### SSL/TLS
- [ ] SSL certificate installed (Let's Encrypt)
- [ ] HTTP redirects to HTTPS
- [ ] HSTS header enabled
- [ ] SSL grade A or A+
- [ ] Auto-renewal configured

### Monitoring
- [ ] Error tracking (Sentry)
- [ ] Uptime monitoring
- [ ] Log monitoring
- [ ] Security alerts configured
- [ ] Regular `npm audit` runs

---

## Next Steps

1. **Practice:** Work through all exercises
2. **Implement:** Add security to your real project
3. **Test:** Use the testing tools regularly
4. **Learn more:** Read OWASP Top 10
5. **Stay updated:** Follow security news

---

## Resources

### Learning
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security) (Free!)
- [NodeJS Security Best Practices](https://github.com/goldbergyoni/nodebestpractices#6-security-best-practices)

### Tools
- [OWASP ZAP](https://www.zaproxy.org/)
- [Burp Suite Community](https://portswigger.net/burp/communitydownload)
- [Nmap](https://nmap.org/)
- [SSL Labs](https://www.ssllabs.com/ssltest/)

### Stay Informed
- [CVE Database](https://cve.mitre.org/)
- [npm Security Advisories](https://www.npmjs.com/advisories)
- [Snyk Vulnerability DB](https://security.snyk.io/)

---

**Document Version:** 1.0
**Last Updated:** November 5, 2025

**Remember:** Security is not a one-time task. It's an ongoing process. Keep learning, keep testing, keep improving!
