import { XCircle } from "lucide-react";
import NavBar from "../components/NavBar";
import finalBellLogo from "../assets/finalBellLogo.png";

export default function Cancel() {
  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100">
      <NavBar logoSrc={finalBellLogo} />

      <div className="mx-auto max-w-2xl px-6 py-16 md:px-8">
        <div className="text-center space-y-6">
          {/* Cancel Icon */}
          <div className="flex justify-center">
            <XCircle className="h-24 w-24 text-red-500" />
          </div>

          {/* Cancel Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-100">
            Payment Cancelled
          </h1>
          <p className="text-lg text-neutral-300">
            Your payment was cancelled. No charges were made to your account.
          </p>

          {/* Info Box */}
          <div className="mt-8 rounded-2xl bg-neutral-900 p-6 ring-1 ring-neutral-700">
            <h2 className="text-xl font-semibold text-neutral-100 mb-4">
              Need help?
            </h2>
            <p className="text-neutral-400">
              If you experienced any issues during checkout, please don't
              hesitate to contact us. We're here to help!
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a
              href="/shop"
              className="inline-block rounded-lg bg-secondary px-6 py-3 font-bold text-neutral-900 transition-colors hover:bg-amber-400"
            >
              Return to Shop
            </a>
            <a
              href="/contact"
              className="inline-block rounded-lg border border-secondary px-6 py-3 font-semibold text-secondary transition-colors hover:bg-secondary hover:text-neutral-900"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
