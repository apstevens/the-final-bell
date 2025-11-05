import { Bell, ShoppingBag, Package, RefreshCw } from 'lucide-react';
import img from '../assets/finalBellLogo.png'
import { useMeta } from '../lib/UseMeta';
export default function TermsOfService() {

useMeta({
    title: 'Terms & Conditions | The Final Bell',
    description: 'Read the terms and conditions for using The Final Bell personal training services and online shop in Chelmsford.',
    canonical: 'https://www.finalbell.co.uk/terms-of-service',
});

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100">
        <a href='/'><img src={img} alt="The Final Bell Logo" className="mx-auto my-6 w-md hover:rotate-45 transition-transform duration-300"/></a>
        <main className="max-w-4xl mx-auto px-6 md:px-8 py-12">
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Terms &amp; Conditions</h1>
                <p className="text-neutral-400">
                    Last updated: {new Date().toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
            </div>

            {/* Table of Contents */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-10">
                <h3 className="text-lg font-semibold text-secondary mb-4">Quick Navigation</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <a href="#training-services" className="text-neutral-300 hover:text-secondary transition">→ Training Services (Sections 1-9)</a>
                    <a href="#online-shop" className="text-neutral-300 hover:text-secondary transition">→ Online Shop (Sections 10-14)</a>
                    <a href="#general-terms" className="text-neutral-300 hover:text-secondary transition">→ General Terms (Sections 15-19)</a>
                </div>
            </div>

            <section className="space-y-12">

            {/* TRAINING SERVICES */}
            <div id="training-services" className="border-l-4 border-secondary pl-6">
                <h2 className="text-3xl font-bold text-secondary mb-6 flex items-center gap-2">
                    <Bell className="h-7 w-7" />
                    Training Services
                </h2>

                <article className="mb-8">
                    <h3 className="text-xl font-semibold text-neutral-100 mb-3">1. Services</h3>
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-5 text-neutral-300 leading-relaxed">
                        We provide boxing &amp; Muay Thai fitness personal training in Chelmsford (1:1, 30/60 mins, and small groups 2–4).
                        Sessions run mainly on Saturdays and may occur outdoors or indoors as advised.
                    </div>
                </article>

                <article className="mb-8">
                    <h3 className="text-xl font-semibold text-neutral-100 mb-3">2. Bookings</h3>
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-5 text-neutral-300 leading-relaxed">
                        Sessions must be booked in advance via our online system (Calendly). Your slot is confirmed only after payment is received.
                        You are responsible for providing accurate contact details.
                    </div>
                </article>

                <article className="mb-8">
                    <h3 className="text-xl font-semibold text-neutral-100 mb-3">3. Payments</h3>
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-5 text-neutral-300 leading-relaxed">
                        Payments are processed securely via Stripe. Prices are shown at the time of booking and may change. Where applicable,
                        packages or promotions are subject to stated expiry dates and terms.
                    </div>
                </article>

                <article className="mb-8">
                    <h3 className="text-xl font-semibold text-neutral-100 mb-3">4. Cancellations &amp; Refunds</h3>
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-5 text-neutral-300 leading-relaxed space-y-2">
                        <p><strong className="text-secondary">Client cancellations:</strong> 24+ hours' notice → full refund or free reschedule. Less than 24 hours → fee forfeited.</p>
                        <p><strong className="text-secondary">No-shows / lateness:</strong> Arriving 15+ minutes late may shorten or forfeit your session without refund.</p>
                        <p><strong className="text-secondary">Coach cancellations:</strong> Full refund or reschedule offered. Refunds are returned to the original payment method.</p>
                    </div>
                </article>

                <article className="mb-8">
                    <h3 className="text-xl font-semibold text-neutral-100 mb-3">5. Health &amp; Safety</h3>
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-5 text-neutral-300 leading-relaxed">
                        You confirm you are fit to participate and will disclose relevant medical conditions or injuries in advance. Follow coaching
                        instructions and use equipment safely. Hydration, appropriate footwear/clothing, and any personal medications are your responsibility.
                    </div>
                </article>

                <article className="mb-8">
                    <h3 className="text-xl font-semibold text-neutral-100 mb-3">6. Assumption of Risk &amp; Liability</h3>
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-5 text-neutral-300 leading-relaxed">
                        Exercise carries inherent risks. To the extent permitted by law, The Final Bell is not liable for injuries, losses, or damages
                        arising from your participation where due care and skill have been exercised. We hold appropriate insurance cover.
                    </div>
                </article>

                <article className="mb-8">
                    <h3 className="text-xl font-semibold text-neutral-100 mb-3">7. Small Group Sessions</h3>
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-5 text-neutral-300 leading-relaxed">
                        Charged per person. All attendees should arrive on time. Cancellations and refunds follow Section 4; one person's late cancellation
                        does not entitle other attendees to a free session unless stated otherwise.
                    </div>
                </article>

                <article className="mb-8">
                    <h3 className="text-xl font-semibold text-neutral-100 mb-3">8. Weather &amp; Location Changes</h3>
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-5 text-neutral-300 leading-relaxed">
                        Outdoor sessions may be moved, adapted, or postponed for safety (e.g., severe weather). We will notify you as early as reasonable.
                        If we cancel, you may reschedule or receive a refund (see Section 4).
                    </div>
                </article>

                <article className="mb-8">
                    <h3 className="text-xl font-semibold text-neutral-100 mb-3">9. Age &amp; Consent</h3>
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-5 text-neutral-300 leading-relaxed">
                        Services are intended for adults (18+). Under-18s require written parental/guardian consent and may require a guardian present at sessions.
                    </div>
                </article>
            </div>

            {/* ONLINE SHOP */}
            <div id="online-shop" className="border-l-4 border-secondary pl-6">
                <h2 className="text-3xl font-bold text-secondary mb-6 flex items-center gap-2">
                    <ShoppingBag className="h-7 w-7" />
                    Online Shop
                </h2>

                <article className="mb-8">
                    <h3 className="text-xl font-semibold text-neutral-100 mb-3">10. Product Sales &amp; Information</h3>
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-5 text-neutral-300 leading-relaxed space-y-3">
                        <p>All products listed on our website (boxing gloves, equipment, accessories) are subject to availability. We make every effort to ensure product descriptions, images, and prices are accurate, but errors may occur. We reserve the right to correct errors and update information without prior notice.</p>
                        <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-4 mt-3">
                            <p className="text-sm"><strong className="text-secondary">Product Prices:</strong></p>
                            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                                <li>Prices are shown in GBP (£) and include VAT where applicable</li>
                                <li>Prices are subject to change without notice</li>
                                <li>The price confirmed in your order confirmation email is the price you pay</li>
                                <li>We do not price match or honour pricing errors</li>
                            </ul>
                        </div>
                    </div>
                </article>

                <article className="mb-8">
                    <h3 className="text-xl font-semibold text-neutral-100 mb-3 flex items-center gap-2">
                        <Package className="h-5 w-5 text-secondary" />
                        11. Delivery &amp; Shipping
                    </h3>
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-5 text-neutral-300 leading-relaxed space-y-3">
                        <div>
                            <p className="font-semibold text-neutral-100 mb-2">UK Mainland Delivery:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Standard delivery: 3-5 working days</li>
                                <li>Shipping costs calculated at checkout based on weight</li>
                                <li><strong className="text-secondary">FREE shipping on orders over £100</strong></li>
                            </ul>
                        </div>
                        <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-4">
                            <p className="font-semibold text-neutral-100 mb-2">Delivery Address:</p>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                                <li>You are responsible for providing accurate delivery information</li>
                                <li>We deliver to UK mainland addresses only</li>
                                <li>Remote area postcodes may take longer</li>
                            </ul>
                        </div>
                        <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-4">
                            <p className="font-semibold text-neutral-100 mb-2">Failed Deliveries:</p>
                            <p className="text-sm">If delivery fails due to incorrect address or recipient unavailable, you may be charged for re-delivery. Parcels not collected from courier depot within the specified timeframe may be returned to us, and you will be charged for re-delivery.</p>
                        </div>
                    </div>
                </article>

                <article className="mb-8">
                    <h3 className="text-xl font-semibold text-neutral-100 mb-3 flex items-center gap-2">
                        <RefreshCw className="h-5 w-5 text-secondary" />
                        12. Returns, Refunds &amp; Consumer Rights
                    </h3>
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-5 text-neutral-300 leading-relaxed space-y-3">
                        <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4">
                            <p className="font-semibold text-secondary mb-2">Your Consumer Rights (Consumer Contracts Regulations 2013):</p>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                                <li>You have <strong>14 days</strong> from receiving your order to change your mind and return items</li>
                                <li>Items must be unused, in original condition, and in original packaging</li>
                                <li>You are responsible for return postage costs (unless item is faulty)</li>
                                <li>Refunds processed within 14 days of receiving your return</li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold text-neutral-100 mb-2">Excluded from Returns:</p>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                                <li>Products unsealed for hygiene reasons (e.g., hand wraps, inner gloves once opened)</li>
                                <li>Personalized or custom-made items</li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold text-neutral-100 mb-2">Faulty or Incorrect Items:</p>
                            <p className="text-sm">If you receive a faulty or incorrect item, contact us within 48 hours at <a href="mailto:hello@finalbell.co.uk" className="text-secondary hover:underline">hello@finalbell.co.uk</a>. We will arrange collection or provide a prepaid return label. Full refund or replacement offered at no cost to you.</p>
                        </div>
                        <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-4">
                            <p className="font-semibold text-neutral-100 mb-2">How to Return:</p>
                            <ol className="list-decimal pl-5 space-y-1 text-sm">
                                <li>Email <a href="mailto:hello@finalbell.co.uk" className="text-secondary hover:underline">hello@finalbell.co.uk</a> with your order number</li>
                                <li>Package item securely in original packaging</li>
                                <li>Include proof of purchase</li>
                                <li>Send to the address provided in our return confirmation email</li>
                                <li>We recommend using tracked delivery</li>
                            </ol>
                        </div>
                    </div>
                </article>

                <article className="mb-8">
                    <h3 className="text-xl font-semibold text-neutral-100 mb-3">13. Consumer Rights Act 2015</h3>
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-5 text-neutral-300 leading-relaxed space-y-3">
                        <p>Under the Consumer Rights Act 2015, products must be:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li><strong className="text-secondary">Of satisfactory quality</strong> - free from defects, safe, and durable</li>
                            <li><strong className="text-secondary">Fit for purpose</strong> - suitable for their intended use</li>
                            <li><strong className="text-secondary">As described</strong> - match the description given</li>
                        </ul>
                        <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-4 mt-3">
                            <p className="font-semibold text-neutral-100 mb-2">Your Rights:</p>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                                <li><strong>30 days:</strong> Full refund if item is faulty, not as described, or unfit for purpose</li>
                                <li><strong>6 months:</strong> Repair or replacement if fault develops (assumed fault existed at purchase)</li>
                                <li><strong>6 years:</strong> Claims for defects that were present at time of purchase</li>
                            </ul>
                        </div>
                        <p className="text-sm">Contact <a href="mailto:hello@finalbell.co.uk" className="text-secondary hover:underline">hello@finalbell.co.uk</a> with your order number, description of the issue, and photos if applicable.</p>
                    </div>
                </article>

                <article className="mb-8">
                    <h3 className="text-xl font-semibold text-neutral-100 mb-3">14. Product Liability</h3>
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-5 text-neutral-300 leading-relaxed space-y-2">
                        <p>While we take care to source quality products:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Products are sold "as described"</li>
                            <li>We are not liable for injuries resulting from misuse of equipment</li>
                            <li>Users must follow manufacturer guidelines and safety instructions</li>
                            <li>Equipment should be inspected before each use</li>
                            <li>Your statutory consumer rights are not affected</li>
                        </ul>
                    </div>
                </article>
            </div>

            {/* GENERAL TERMS */}
            <div id="general-terms" className="border-l-4 border-secondary pl-6">
                <h2 className="text-3xl font-bold text-secondary mb-6">General Terms</h2>

                <article className="mb-8">
                    <h3 className="text-xl font-semibold text-neutral-100 mb-3">15. Conduct</h3>
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-5 text-neutral-300 leading-relaxed">
                        We reserve the right to refuse service or end a session without refund in cases of unsafe behaviour, intoxication, abuse, or non-compliance
                        with instructions that affect safety or session quality.
                    </div>
                </article>

                <article className="mb-8">
                    <h3 className="text-xl font-semibold text-neutral-100 mb-3">16. Media</h3>
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-5 text-neutral-300 leading-relaxed">
                        We may request to capture photos/video for marketing. We will only do so with your consent. You may withdraw consent at any time for future use.
                    </div>
                </article>

                <article className="mb-8">
                    <h3 className="text-xl font-semibold text-neutral-100 mb-3">17. Data Protection</h3>
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-5 text-neutral-300 leading-relaxed">
                        Personal data is processed in line with our{" "}
                        <a href="/privacy-policy" className="text-secondary hover:text-primary hover:underline font-medium">Privacy Policy</a>.
                        Third-party providers include Calendly (booking), Stripe (payments), Netlify (hosting), and courier services (delivery).
                    </div>
                </article>

                <article className="mb-8">
                    <h3 className="text-xl font-semibold text-neutral-100 mb-3">18. Complaints</h3>
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-5 text-neutral-300 leading-relaxed space-y-2">
                        <p>If you have a complaint about our products or services:</p>
                        <ol className="list-decimal pl-5 space-y-1">
                            <li>Email <a href="mailto:hello@finalbell.co.uk" className="text-secondary hover:underline">hello@finalbell.co.uk</a> with details</li>
                            <li>We will acknowledge within 3 working days</li>
                            <li>We aim to resolve complaints within 14 days</li>
                        </ol>
                        <p className="text-sm pt-2">If unresolved, you may use Alternative Dispute Resolution via the <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Online Dispute Resolution platform</a>.</p>
                    </div>
                </article>

                <article className="mb-8">
                    <h3 className="text-xl font-semibold text-neutral-100 mb-3">19. Changes to These Terms</h3>
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-5 text-neutral-300 leading-relaxed">
                        We may update these Terms occasionally. Updates take effect upon posting. The effective date appears at the top of this page.
                    </div>
                </article>

                <article className="mb-8">
                    <h3 className="text-xl font-semibold text-neutral-100 mb-3">20. Governing Law</h3>
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-5 text-neutral-300 leading-relaxed">
                        These Terms are governed by the laws of England and Wales. Disputes are subject to the exclusive jurisdiction of the English courts.
                    </div>
                </article>
            </div>

            </section>

            {/* Contact Section */}
            <div className="mt-16 bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/30 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-secondary mb-4">Need Help?</h2>
                <p className="text-neutral-300 mb-4">
                    For questions about these Terms &amp; Conditions, our products, or services:
                </p>
                <div className="flex flex-col gap-2">
                    <a href="mailto:hello@finalbell.co.uk" className="text-secondary hover:text-primary hover:underline font-medium text-lg">
                        hello@finalbell.co.uk
                    </a>
                    <p className="text-sm text-neutral-400">We typically respond within 1-2 business days</p>
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
