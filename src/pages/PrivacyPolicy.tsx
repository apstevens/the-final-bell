// src/pages/PrivacyPolicy.tsx
import { Bell, Shield, Lock, Eye, ShoppingBag, Database } from 'lucide-react';
import img from '../assets/finalBellLogo.png'
import { useMeta } from '../lib/UseMeta';
export default function PrivacyPolicy() {

useMeta({
    title: "Privacy Policy | The Final Bell",
    description: "Read The Final Bell's Privacy Policy to understand how we collect, use, and protect your personal data when you visit our website or use our services.",
    canonical: "https://www.finalbell.co.uk/privacy-policy",
});

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100">
        <a className='' href='/'><img src={img} alt="The Final Bell Logo" className="mx-auto my-6 w-md hover:rotate-45 transition-transform duration-300"/></a>
        <main className="max-w-4xl mx-auto px-6 md:px-8 py-12">
        <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Privacy Policy</h1>
            <p className="text-neutral-400">
                Last updated: {new Date().toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
        </div>

        {/* Introduction */}
        <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-6 mb-10">
            <div className="flex items-start gap-4">
                <Shield className="h-8 w-8 text-secondary flex-shrink-0 mt-1" />
                <div>
                    <h2 className="text-xl font-semibold text-secondary mb-2">Your Privacy Matters</h2>
                    <p className="text-neutral-300 leading-relaxed">
                        This Privacy Policy explains how <strong>The Final Bell</strong> ("we", "us", "our") collects,
                        uses, and protects your personal data when you visit our website, book training sessions, or purchase
                        products from our online shop. We comply with UK data protection law, including the UK GDPR and the Data Protection Act 2018.
                    </p>
                </div>
            </div>
        </div>

        <section className="space-y-10">

        {/* Who We Are */}
        <article className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-secondary mb-4 flex items-center gap-2">
                <Database className="h-6 w-6" />
                Who We Are &amp; Contact
            </h2>
            <div className="space-y-2 text-neutral-300">
                <p><strong className="text-neutral-100">Controller:</strong> The Final Bell</p>
                <p><strong className="text-neutral-100">Email:</strong> <a className="text-secondary hover:text-primary hover:underline" href="mailto:hello@finalbell.co.uk">hello@finalbell.co.uk</a></p>
                <p><strong className="text-neutral-100">Location:</strong> Chelmsford, United Kingdom</p>
            </div>
        </article>

        {/* Personal Data We Collect */}
        <article className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-secondary mb-4 flex items-center gap-2">
                <Eye className="h-6 w-6" />
                Personal Data We Collect
            </h2>

            <div className="space-y-4">
                {/* Training Services Data */}
                <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-4">
                    <p className="font-semibold text-neutral-100 mb-2 flex items-center gap-2">
                        <Bell className="h-4 w-4 text-secondary" />
                        Training Services:
                    </p>
                    <ul className="space-y-1 text-sm text-neutral-300 pl-6">
                        <li className="flex items-start"><span className="text-secondary mr-2">•</span><strong className="mr-1">Identity &amp; contact:</strong> name, email, phone</li>
                        <li className="flex items-start"><span className="text-secondary mr-2">•</span><strong className="mr-1">Booking details:</strong> selected service, date/time, notes you provide</li>
                        <li className="flex items-start"><span className="text-secondary mr-2">•</span><strong className="mr-1">Payment info:</strong> processed by Stripe; we do not store card numbers</li>
                        <li className="flex items-start"><span className="text-secondary mr-2">•</span><strong className="mr-1">Communications:</strong> messages sent via email, Calendly, or social media</li>
                    </ul>
                </div>

                {/* Online Shop Data */}
                <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-4">
                    <p className="font-semibold text-neutral-100 mb-2 flex items-center gap-2">
                        <ShoppingBag className="h-4 w-4 text-secondary" />
                        Online Shop:
                    </p>
                    <ul className="space-y-1 text-sm text-neutral-300 pl-6">
                        <li className="flex items-start"><span className="text-secondary mr-2">•</span><strong className="mr-1">Order details:</strong> products ordered, quantities, prices</li>
                        <li className="flex items-start"><span className="text-secondary mr-2">•</span><strong className="mr-1">Delivery information:</strong> shipping address, delivery instructions</li>
                        <li className="flex items-start"><span className="text-secondary mr-2">•</span><strong className="mr-1">Purchase history:</strong> previous orders and preferences</li>
                        <li className="flex items-start"><span className="text-secondary mr-2">•</span><strong className="mr-1">Payment records:</strong> transaction IDs, payment status (via Stripe)</li>
                    </ul>
                </div>

                {/* General Data */}
                <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-4">
                    <p className="font-semibold text-neutral-100 mb-2">General Website Usage:</p>
                    <ul className="space-y-1 text-sm text-neutral-300 pl-6">
                        <li className="flex items-start"><span className="text-secondary mr-2">•</span><strong className="mr-1">Usage data:</strong> device, browser, IP address, and analytics/cookies</li>
                    </ul>
                </div>
            </div>
        </article>

        {/* How We Use Your Data */}
        <article className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-secondary mb-4">How We Use Your Data</h2>
            <p className="text-neutral-300 mb-4">We process your data for the following purposes with their lawful bases:</p>
            <div className="space-y-3">
                <div className="bg-neutral-950 border-l-4 border-secondary rounded-r-lg p-4">
                    <p className="text-neutral-100 font-medium mb-1">Provide services & manage bookings</p>
                    <p className="text-sm text-neutral-400">Lawful basis: <span className="text-secondary">Contract</span></p>
                </div>
                <div className="bg-neutral-950 border-l-4 border-secondary rounded-r-lg p-4">
                    <p className="text-neutral-100 font-medium mb-1">Process and fulfill product orders</p>
                    <p className="text-sm text-neutral-400">Lawful basis: <span className="text-secondary">Contract</span></p>
                </div>
                <div className="bg-neutral-950 border-l-4 border-secondary rounded-r-lg p-4">
                    <p className="text-neutral-100 font-medium mb-1">Arrange delivery and shipping</p>
                    <p className="text-sm text-neutral-400">Lawful basis: <span className="text-secondary">Contract</span></p>
                </div>
                <div className="bg-neutral-950 border-l-4 border-secondary rounded-r-lg p-4">
                    <p className="text-neutral-100 font-medium mb-1">Take payments & issue receipts</p>
                    <p className="text-sm text-neutral-400">Lawful basis: <span className="text-secondary">Contract / Legal Obligation</span></p>
                </div>
                <div className="bg-neutral-950 border-l-4 border-secondary rounded-r-lg p-4">
                    <p className="text-neutral-100 font-medium mb-1">Handle returns and refunds</p>
                    <p className="text-sm text-neutral-400">Lawful basis: <span className="text-secondary">Contract / Legal Obligation</span></p>
                </div>
                <div className="bg-neutral-950 border-l-4 border-secondary rounded-r-lg p-4">
                    <p className="text-neutral-100 font-medium mb-1">Customer support & communications</p>
                    <p className="text-sm text-neutral-400">Lawful basis: <span className="text-secondary">Legitimate Interests / Contract</span></p>
                </div>
                <div className="bg-neutral-950 border-l-4 border-secondary rounded-r-lg p-4">
                    <p className="text-neutral-100 font-medium mb-1">Safety, security, fraud prevention</p>
                    <p className="text-sm text-neutral-400">Lawful basis: <span className="text-secondary">Legitimate Interests / Legal Obligation</span></p>
                </div>
                <div className="bg-neutral-950 border-l-4 border-secondary rounded-r-lg p-4">
                    <p className="text-neutral-100 font-medium mb-1">Order confirmations and shipping updates</p>
                    <p className="text-sm text-neutral-400">Lawful basis: <span className="text-secondary">Contract</span></p>
                </div>
                <div className="bg-neutral-950 border-l-4 border-secondary rounded-r-lg p-4">
                    <p className="text-neutral-100 font-medium mb-1">Marketing with your consent (you can opt out anytime)</p>
                    <p className="text-sm text-neutral-400">Lawful basis: <span className="text-secondary">Consent</span></p>
                </div>
                <div className="bg-neutral-950 border-l-4 border-secondary rounded-r-lg p-4">
                    <p className="text-neutral-100 font-medium mb-1">Analytics & site improvement</p>
                    <p className="text-sm text-neutral-400">Lawful basis: <span className="text-secondary">Legitimate Interests</span></p>
                </div>
            </div>
        </article>

        {/* Third Parties */}
        <article className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-secondary mb-4">Third Parties &amp; International Transfers</h2>
            <p className="text-neutral-300 mb-4">We share data with trusted providers solely to deliver our services:</p>

            <div className="space-y-3">
                <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-4">
                    <p className="font-semibold text-neutral-100 mb-2">Payment Processing:</p>
                    <ul className="space-y-2 text-sm text-neutral-300">
                        <li className="flex items-start">
                            <span className="text-secondary mr-2">•</span>
                            <div>
                                <strong>Stripe</strong> - Payment processing for bookings and shop orders
                                <p className="text-xs text-neutral-400 mt-1">Your card details are never stored on our servers. Stripe is PCI-DSS Level 1 compliant.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-4">
                    <p className="font-semibold text-neutral-100 mb-2">Booking &amp; Scheduling:</p>
                    <ul className="space-y-2 text-sm text-neutral-300">
                        <li className="flex items-start">
                            <span className="text-secondary mr-2">•</span>
                            <strong>Calendly</strong> - Booking and scheduling system for training sessions
                        </li>
                    </ul>
                </div>

                <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-4">
                    <p className="font-semibold text-neutral-100 mb-2">Product Fulfillment &amp; Delivery:</p>
                    <ul className="space-y-2 text-sm text-neutral-300">
                        <li className="flex items-start">
                            <span className="text-secondary mr-2">•</span>
                            <strong>Playwell</strong> - Product supplier for order fulfillment and stock management
                        </li>
                        <li className="flex items-start">
                            <span className="text-secondary mr-2">•</span>
                            <strong>Courier Services</strong> - DPD / Royal Mail for delivery
                        </li>
                    </ul>
                </div>

                <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-4">
                    <p className="font-semibold text-neutral-100 mb-2">Website &amp; Communications:</p>
                    <ul className="space-y-2 text-sm text-neutral-300">
                        <li className="flex items-start">
                            <span className="text-secondary mr-2">•</span>
                            <strong>Netlify</strong> - Website hosting and deployment
                        </li>
                        <li className="flex items-start">
                            <span className="text-secondary mr-2">•</span>
                            <strong>Email providers</strong> - For communications
                        </li>
                    </ul>
                </div>
            </div>

            <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4 mt-4">
                <p className="text-sm text-neutral-300">
                    <strong className="text-secondary">International Transfers:</strong> Some providers may process data outside the UK.
                    Where relevant, appropriate safeguards (e.g., Standard Contractual Clauses) are used to protect your information.
                </p>
            </div>
        </article>

        {/* Cookies & Analytics */}
        <article className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-secondary mb-4">Cookies &amp; Analytics</h2>
            <p className="text-neutral-300 leading-relaxed">
                We may use essential cookies (for site functionality) and optional analytics (to improve services).
                You can control cookies via your browser settings. If we add a cookie banner, your preferences will be respected.
            </p>
        </article>

        {/* Data Retention */}
        <article className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-secondary mb-4">Data Retention</h2>
            <p className="text-neutral-300 leading-relaxed mb-3">
                We keep personal data only as long as necessary for the purposes above, including meeting legal
                and accounting requirements (e.g., invoices).
            </p>
            <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-4">
                <p className="text-sm text-neutral-300">
                    <strong className="text-neutral-100">Retention Period:</strong> Booking, order, and payment records may be retained for up to <strong className="text-secondary">6 years</strong> (tax and legal requirements).
                </p>
            </div>
        </article>

        {/* Your Rights */}
        <article className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-secondary mb-4 flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Your Rights (UK GDPR)
            </h2>
            <p className="text-neutral-300 mb-4">Under UK GDPR, you have the following rights:</p>
            <div className="space-y-2">
                <div className="flex items-start gap-3 bg-neutral-950 border border-neutral-700 rounded-lg p-3">
                    <span className="text-secondary text-lg">✓</span>
                    <p className="text-sm text-neutral-300"><strong className="text-neutral-100">Access:</strong> Request a copy of your personal data</p>
                </div>
                <div className="flex items-start gap-3 bg-neutral-950 border border-neutral-700 rounded-lg p-3">
                    <span className="text-secondary text-lg">✓</span>
                    <p className="text-sm text-neutral-300"><strong className="text-neutral-100">Rectify:</strong> Correct inaccurate or incomplete data</p>
                </div>
                <div className="flex items-start gap-3 bg-neutral-950 border border-neutral-700 rounded-lg p-3">
                    <span className="text-secondary text-lg">✓</span>
                    <p className="text-sm text-neutral-300"><strong className="text-neutral-100">Erase:</strong> Request deletion of your data (where applicable)</p>
                </div>
                <div className="flex items-start gap-3 bg-neutral-950 border border-neutral-700 rounded-lg p-3">
                    <span className="text-secondary text-lg">✓</span>
                    <p className="text-sm text-neutral-300"><strong className="text-neutral-100">Restrict:</strong> Limit how we process your data</p>
                </div>
                <div className="flex items-start gap-3 bg-neutral-950 border border-neutral-700 rounded-lg p-3">
                    <span className="text-secondary text-lg">✓</span>
                    <p className="text-sm text-neutral-300"><strong className="text-neutral-100">Portability:</strong> Receive your data in a usable format</p>
                </div>
                <div className="flex items-start gap-3 bg-neutral-950 border border-neutral-700 rounded-lg p-3">
                    <span className="text-secondary text-lg">✓</span>
                    <p className="text-sm text-neutral-300"><strong className="text-neutral-100">Withdraw consent:</strong> Where processing is based on consent</p>
                </div>
                <div className="flex items-start gap-3 bg-neutral-950 border border-neutral-700 rounded-lg p-3">
                    <span className="text-secondary text-lg">✓</span>
                    <p className="text-sm text-neutral-300"><strong className="text-neutral-100">Complain:</strong> Lodge a complaint with the <a className="text-secondary hover:underline" href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ICO</a></p>
                </div>
            </div>
            <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4 mt-4">
                <p className="text-sm text-neutral-300">
                    To exercise any of these rights, contact us at <a className="text-secondary hover:underline font-medium" href="mailto:hello@finalbell.co.uk">hello@finalbell.co.uk</a>
                </p>
            </div>
        </article>

        {/* Additional Sections */}
        <article className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-secondary mb-4">Children</h2>
            <p className="text-neutral-300 leading-relaxed">
                Our services are intended for adults. If you believe a child's data has been provided, please contact us so we can delete it.
            </p>
        </article>

        <article className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-secondary mb-4 flex items-center gap-2">
                <Lock className="h-6 w-6" />
                Security
            </h2>
            <p className="text-neutral-300 leading-relaxed">
                We use reasonable technical and organisational measures to protect your data. However, no method of transmission or storage is 100% secure.
                We continuously review and update our security practices to protect your information.
            </p>
        </article>

        <article className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-secondary mb-4">Changes to This Policy</h2>
            <p className="text-neutral-300 leading-relaxed">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date at the top.
                Please review this policy periodically for any updates.
            </p>
        </article>

        </section>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-secondary mb-4">Privacy Questions?</h2>
            <p className="text-neutral-300 mb-4">
                For privacy questions, data requests, or to exercise your rights:
            </p>
            <div className="flex flex-col gap-2">
                <a href="mailto:hello@finalbell.co.uk" className="text-secondary hover:text-primary hover:underline font-medium text-lg">
                    hello@finalbell.co.uk
                </a>
                <p className="text-sm text-neutral-400">We aim to respond to all data requests within 30 days</p>
            </div>
        </div>

        {/* Return Home */}
        <div className="w-full flex flex-col items-center group transition-colors mt-12">
            <a href="/" className="flex flex-col items-center">
                <Bell className="h-8 w-8 text-secondary mb-2 transition-all group-hover:text-primary group-hover:rotate-12" />
                <p className="text-neutral-400 transition-colors group-hover:text-primary font-medium">Return to Home</p>
            </a>
        </div>
        </main>
    </div>
  );
}
