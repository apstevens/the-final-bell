import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import NavBar from "../components/NavBar";
import finalBellLogo from "../assets/finalBellLogo.png";
import { useCart } from "../contexts/CartContext";

export default function Success() {
  const { clearCart } = useCart();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    // Get session ID from URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("session_id");
    setSessionId(id);

    // Clear the cart after successful payment
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100">
      <NavBar logoSrc={finalBellLogo} />

      <div className="mx-auto max-w-2xl px-6 py-16 md:px-8">
        <div className="text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <CheckCircle className="h-24 w-24 text-green-500" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-100">
            Payment Successful!
          </h1>
          <p className="text-lg text-neutral-300">
            Thank you for your order. We've received your payment and will
            process your order shortly.
          </p>

          {/* Order Details */}
          <div className="mt-8 rounded-2xl bg-neutral-900 p-6 ring-1 ring-secondary">
            <h2 className="text-xl font-semibold text-secondary mb-4">
              What happens next?
            </h2>
            <ul className="space-y-3 text-left text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-secondary">1.</span>
                <span>You'll receive a confirmation email shortly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary">2.</span>
                <span>We'll prepare your order for shipment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary">3.</span>
                <span>You'll get tracking information once it ships</span>
              </li>
            </ul>
          </div>

          {sessionId && (
            <p className="text-sm text-neutral-500">
              Order reference: {sessionId.substring(0, 20)}...
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a
              href="/shop"
              className="inline-block rounded-lg bg-secondary px-6 py-3 font-bold text-neutral-900 transition-colors hover:bg-amber-400"
            >
              Continue Shopping
            </a>
            <a
              href="/"
              className="inline-block rounded-lg border border-secondary px-6 py-3 font-semibold text-secondary transition-colors hover:bg-secondary hover:text-neutral-900"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
