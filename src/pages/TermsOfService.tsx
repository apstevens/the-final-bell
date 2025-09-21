
export default function TermsOfService() {
  return (
    <div className="min-h-screen w-full bg-neutral-900 text-neutral-100">
        <main className="max-w-3xl mx-auto px-6 md:px-8 py-12 text-neutral-200">
            <h1 className="text-3xl font-bold text-secondary">The Final Bell – Terms &amp; Conditions</h1>
            <p className="mt-2 text-sm text-neutral-400">
            Effective date: {new Date().toLocaleDateString("en-GB")}
            </p>

            <section className="mt-10 space-y-8">
            <article>
                <h2 className="text-2xl font-semibold text-secondary">1. Services</h2>
                <p className="mt-2">
                We provide boxing &amp; Muay Thai fitness personal training in Chelmsford (1:1, 30/60 mins, and small groups 2–4).
                Sessions run mainly on Saturdays and may occur outdoors or indoors as advised.
                </p>
            </article>

            <article>
                <h2 className="text-2xl font-semibold text-secondary">2. Bookings</h2>
                <p className="mt-2">
                Sessions must be booked in advance via our online system (Calendly). Your slot is confirmed only after payment is received
                (see Payments). You are responsible for providing accurate contact details.
                </p>
            </article>

            <article>
                <h2 className="text-2xl font-semibold text-secondary">3. Payments</h2>
                <p className="mt-2">
                Payments are processed securely via Stripe. Prices are shown at the time of booking and may change. Where applicable,
                packages or promotions are subject to stated expiry dates and terms.
                </p>
            </article>

            <article>
                <h2 className="text-2xl font-semibold text-secondary">4. Cancellations &amp; Refunds</h2>
                <p className="mt-2">
                <strong>Client cancellations:</strong> 24+ hours’ notice → full refund or free reschedule. Less than 24 hours → fee forfeited. <br />
                <strong>No-shows / lateness:</strong> Arriving 15+ minutes late may shorten or forfeit your session without refund. <br />
                <strong>Coach cancellations:</strong> Full refund or reschedule offered. Refunds are returned to the original payment method.
                </p>
            </article>

            <article>
                <h2 className="text-2xl font-semibold text-secondary">5. Health &amp; Safety</h2>
                <p className="mt-2">
                You confirm you are fit to participate and will disclose relevant medical conditions or injuries in advance. Follow coaching
                instructions and use equipment safely. Hydration, appropriate footwear/clothing, and any personal medications are your responsibility.
                </p>
            </article>

            <article>
                <h2 className="text-2xl font-semibold text-secondary">6. Assumption of Risk &amp; Liability</h2>
                <p className="mt-2">
                Exercise carries inherent risks. To the extent permitted by law, The Final Bell is not liable for injuries, losses, or damages
                arising from your participation where due care and skill have been exercised. We hold appropriate insurance cover.
                </p>
            </article>

            <article>
                <h2 className="text-2xl font-semibold text-secondary">7. Small Group Sessions</h2>
                <p className="mt-2">
                Charged per person. All attendees should arrive on time. Cancellations and refunds follow Section 4; one person’s late cancellation
                does not entitle other attendees to a free session unless stated otherwise.
                </p>
            </article>

            <article>
                <h2 className="text-2xl font-semibold text-secondary">8. Weather &amp; Location Changes</h2>
                <p className="mt-2">
                Outdoor sessions may be moved, adapted, or postponed for safety (e.g., severe weather). We will notify you as early as reasonable.
                If we cancel, you may reschedule or receive a refund (see Section 4).
                </p>
            </article>

            <article>
                <h2 className="text-2xl font-semibold text-secondary">9. Age &amp; Consent</h2>
                <p className="mt-2">
                Services are intended for adults (18+). Under-18s require written parental/guardian consent and may require a guardian present at sessions.
                </p>
            </article>

            <article>
                <h2 className="text-2xl font-semibold text-secondary">10. Conduct</h2>
                <p className="mt-2">
                We reserve the right to refuse service or end a session without refund in cases of unsafe behaviour, intoxication, abuse, or non-compliance
                with instructions that affect safety or session quality.
                </p>
            </article>

            <article>
                <h2 className="text-2xl font-semibold text-secondary">11. Media</h2>
                <p className="mt-2">
                We may request to capture photos/video for marketing. We will only do so with your consent. You may withdraw consent at any time for future use.
                </p>
            </article>

            <article>
                <h2 className="text-2xl font-semibold text-secondary">12. Data Protection</h2>
                <p className="mt-2">
                Personal data is processed in line with our{" "}
                <a href="/privacy-policy" className="text-secondary hover:text-primary hover:underline">Privacy Policy</a>.
                Third-party providers include Calendly (booking), Stripe (payments), and Netlify (hosting).
                </p>
            </article>

            <article>
                <h2 className="text-2xl font-semibold text-secondary">13. Force Majeure</h2>
                <p className="mt-2">
                We are not liable for delays or failures caused by events beyond our reasonable control (e.g., extreme weather, illness, transport disruption).
                </p>
            </article>

            <article>
                <h2 className="text-2xl font-semibold text-secondary">14. Changes to These Terms</h2>
                <p className="mt-2">
                We may update these Terms occasionally. Updates take effect upon posting. The effective date appears at the top of this page.
                </p>
            </article>

            <article>
                <h2 className="text-2xl font-semibold text-secondary">15. Governing Law</h2>
                <p className="mt-2">
                These Terms are governed by the laws of England and Wales. Disputes are subject to the exclusive jurisdiction of the English courts.
                </p>
            </article>

            <article className="rounded-xl bg-neutral-900/60 p-5 ring-1 ring-neutral-800">
                <h2 className="text-xl font-semibold text-secondary">Contact</h2>
                <p className="mt-2">
                For questions about these Terms, email{" "}
                <a href="mailto:hello@thefinalbell.co.uk" className="text-secondary hover:text-primary hover:underline">
                    hello@thefinalbell.co.uk
                </a>.
                </p>
            </article>
            </section>
        </main>
    </div>
  );
}
