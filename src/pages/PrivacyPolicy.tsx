// src/pages/PrivacyPolicy.tsx
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen w-full bg-neutral-900 text-neutral-100">
        <main className="max-w-3xl mx-auto px-6 md:px-8 py-12 text-neutral-200">
        <h1 className="text-3xl font-bold text-secondary">Privacy Policy</h1>
        <p className="mt-2 text-sm text-neutral-400">Last updated: {new Date().toLocaleDateString("en-GB")}</p>

        <p className="mt-6">
            This Privacy Policy explains how <strong>The Final Bell</strong> (“we”, “us”, “our”) collects,
            uses, and protects your personal data when you visit our website, make a booking, or purchase
            our services. We comply with UK data protection law, including the UK GDPR and the Data Protection Act 2018.
        </p>

        <section className="mt-10">
            <h2 className="text-2xl font-semibold text-secondary">Who we are & contact</h2>
            <p className="mt-3">
            Controller: <strong>The Final Bell</strong><br />
            Email: <a className="text-secondary hover:text-primary hover:underline" href="mailto:hello@thefinalbell.co.uk">hello@thefinalbell.co.uk</a><br />
            Location: Chelmsford, United Kingdom
            </p>
        </section>

        <section className="mt-10">
            <h2 className="text-2xl font-semibold text-secondary">Personal data we collect</h2>
            <ul className="mt-3 space-y-2 list-disc pl-6">
            <li><strong>Identity & contact</strong>: name, email, phone.</li>
            <li><strong>Booking details</strong>: selected service, date/time, notes you provide.</li>
            <li><strong>Payment info</strong>: processed by Stripe; we do not store card numbers.</li>
            <li><strong>Usage data</strong>: device, browser, IP address, and analytics/cookies.</li>
            <li><strong>Communications</strong>: messages sent via email, Calendly, or social media.</li>
            </ul>
        </section>

        <section className="mt-10">
            <h2 className="text-2xl font-semibold text-secondary">How we use your data (purposes & lawful bases)</h2>
            <ul className="mt-3 space-y-2 list-disc pl-6">
            <li><strong>Provide services & manage bookings</strong> (contract).</li>
            <li><strong>Take payments & issue receipts</strong> (contract / legal obligation).</li>
            <li><strong>Customer support & communications</strong> (legitimate interests / contract).</li>
            <li><strong>Safety, security, fraud prevention</strong> (legitimate interests / legal obligation).</li>
            <li><strong>Marketing with your consent</strong> (consent; you can opt out anytime).</li>
            <li><strong>Analytics & site improvement</strong> (legitimate interests).</li>
            </ul>
        </section>

        <section className="mt-10">
            <h2 className="text-2xl font-semibold text-secondary">Third parties & international transfers</h2>
            <p className="mt-3">We share data with trusted providers solely to deliver our services:</p>
            <ul className="mt-3 space-y-2 list-disc pl-6">
            <li><strong>Calendly</strong> (booking & scheduling).</li>
            <li><strong>Stripe</strong> (payment processing).</li>
            <li><strong>Netlify</strong> (website hosting/deployment).</li>
            <li><strong>Email & productivity tools</strong> (e.g., email provider) for communications.</li>
            </ul>
            <p className="mt-3">
            Some providers may process data outside the UK. Where relevant, appropriate safeguards (e.g.,
            Standard Contractual Clauses) are used to protect your information.
            </p>
        </section>

        <section className="mt-10">
            <h2 className="text-2xl font-semibold text-secondary">Cookies & analytics</h2>
            <p className="mt-3">
            We may use essential cookies (for site functionality) and optional analytics (to improve services).
            You can control cookies via your browser settings. If we add a cookie banner, your preferences will be respected.
            </p>
        </section>

        <section className="mt-10">
            <h2 className="text-2xl font-semibold text-secondary">Data retention</h2>
            <p className="mt-3">
            We keep personal data only as long as necessary for the purposes above, including meeting legal
            and accounting requirements (e.g., invoices). Booking and payment records may be retained for up to 6 years.
            </p>
        </section>

        <section className="mt-10">
            <h2 className="text-2xl font-semibold text-secondary">Your rights (UK GDPR)</h2>
            <ul className="mt-3 space-y-2 list-disc pl-6">
            <li>Access your data and request a copy.</li>
            <li>Rectify inaccurate or incomplete data.</li>
            <li>Erase data (where applicable).</li>
            <li>Restrict or object to certain processing.</li>
            <li>Data portability (receive your data in a usable format).</li>
            <li>Withdraw consent where processing is based on consent.</li>
            <li>Lodge a complaint with the ICO: <a className="text-secondary hover:text-primary hover:underline" href="https://ico.org.uk">ico.org.uk</a>.</li>
            </ul>
            <p className="mt-3">
            To exercise rights, contact <a className="text-secondary hover:text-primary hover:underline" href="mailto:hello@thefinalbell.co.uk">hello@thefinalbell.co.uk</a>.
            </p>
        </section>

        <section className="mt-10">
            <h2 className="text-2xl font-semibold text-secondary">Children</h2>
            <p className="mt-3">
            Our services are intended for adults. If you believe a child’s data has been provided, please contact us so we can delete it.
            </p>
        </section>

        <section className="mt-10">
            <h2 className="text-2xl font-semibold text-secondary">Security</h2>
            <p className="mt-3">
            We use reasonable technical and organisational measures to protect your data. No method of transmission or storage is 100% secure.
            </p>
        </section>

        <section className="mt-10">
            <h2 className="text-2xl font-semibold text-secondary">Changes to this policy</h2>
            <p className="mt-3">
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.
            </p>
        </section>

        <section className="mt-10 rounded-xl bg-neutral-900/60 p-5 ring-1 ring-neutral-800">
            <h3 className="text-xl font-semibold text-secondary">Contact</h3>
            <p className="mt-2">
            For privacy questions or requests, email{" "}
            <a className="text-secondary hover:text-primary hover:underline" href="mailto:hello@thefinalbell.co.uk">
                hello@thefinalbell.co.uk
            </a>.
            </p>
        </section>
        </main>
    </div>
  );
}
