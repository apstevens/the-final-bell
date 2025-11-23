import { useState, useMemo } from "react";
import { X, ShoppingCart, Minus, Plus, Trash2, Truck, Package } from "lucide-react";
import { useCart, type CartItem } from "../contexts/CartContext";
import { calculateShipping, FREE_SHIPPING_THRESHOLD, formatWeight } from "../data/shipping";
import { createCheckoutSession } from "../services/api";

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();

  const handleCheckout = async () => {
    setIsProcessing(true);

    try {
      console.log("[Checkout] Starting checkout process...");

      // Call backend to create a Stripe checkout session
      console.log("[Checkout] Creating checkout session with items:", cart.length);
      const response = await createCheckoutSession(
        cart.map((item: CartItem) => ({
          id: String(item.id),
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        }))
      );

      console.log("[Checkout] Response:", response);

      // Redirect to Stripe Checkout URL
      if (response.url) {
        console.log("[Checkout] Redirecting to Stripe Checkout URL:", response.url);
        window.location.href = response.url;
      } else if (response.sessionId) {
        // Fallback: construct Stripe checkout URL manually
        console.log("[Checkout] Constructing Stripe URL from session ID:", response.sessionId);
        const stripeUrl = `https://checkout.stripe.com/pay/${response.sessionId}`;
        console.log("[Checkout] Redirecting to:", stripeUrl);
        window.location.href = stripeUrl;
      } else {
        throw new Error("No checkout URL or session ID received from server");
      }
    } catch (error) {
      console.error("[Checkout] Error:", error);
      const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      alert(errorMessage);
      setIsProcessing(false);
    }
  };

  const cartCount = getCartCount();
  const cartTotal = getCartTotal();

  // Calculate total weight and shipping
  const { totalWeight, shippingCost, shippingInfo, grandTotal } = useMemo(() => {
    const weight = cart.reduce((total, item) => {
      const itemWeight = item.weight || 500; // Default 500g if weight not specified
      return total + itemWeight * item.quantity;
    }, 0);

    const shipping = calculateShipping(weight);
    const shippingFee = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : shipping.cost;
    const total = cartTotal + shippingFee;

    return {
      totalWeight: weight,
      shippingCost: shippingFee,
      shippingInfo: shipping,
      grandTotal: total,
    };
  }, [cart, cartTotal]);

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-secondary px-4 py-3 font-bold text-neutral-900 shadow-lg transition-all duration-200 hover:bg-amber-400 hover:shadow-xl"
      >
        <ShoppingCart className="h-5 w-5" />
        {cartCount > 0 && (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-white">
            {cartCount}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Cart Panel */}
          <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-neutral-900 shadow-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 p-6">
              <h2 className="text-2xl font-bold text-neutral-100">
                Shopping Cart
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart className="h-16 w-16 text-neutral-700 mb-4" />
                  <p className="text-neutral-400 text-lg">Your cart is empty</p>
                  <p className="text-neutral-500 text-sm mt-2">
                    Add some gear to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item: CartItem, index: number) => (
                    <div
                      key={`${item.id}-${item.selectedSize || index}`}
                      className="flex gap-4 rounded-lg bg-neutral-800 p-4"
                    >
                      {/* Product Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-lg object-cover"
                      />

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-neutral-100">
                          {item.name}
                        </h3>
                        {item.selectedSize && (
                          <p className="text-xs text-secondary font-medium mt-1">
                            Size: {item.selectedSize}
                          </p>
                        )}
                        <p className="text-sm text-neutral-400">
                          £{item.price.toFixed(2)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity - 1,
                                item.selectedSize
                              )
                            }
                            className="rounded-md bg-neutral-700 p-1 hover:bg-neutral-600"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity + 1,
                                item.selectedSize
                              )
                            }
                            className="rounded-md bg-neutral-700 p-1 hover:bg-neutral-600"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() =>
                              removeFromCart(item.id, item.selectedSize)
                            }
                            className="ml-auto rounded-md p-1 text-red-500 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with Checkout */}
            {cart.length > 0 && (
              <div className="border-t border-neutral-800 p-6 space-y-4">
                {/* Shipping Info */}
                <div className="bg-neutral-800 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <Package className="h-4 w-4 text-secondary" />
                    <span>Total Weight: {formatWeight(totalWeight)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <Truck className="h-4 w-4 text-secondary" />
                    <span>{shippingInfo.name}</span>
                  </div>
                  <div className="text-xs text-neutral-500">
                    Estimated delivery: {shippingInfo.estimatedDays}
                  </div>
                  {cartTotal < FREE_SHIPPING_THRESHOLD && (
                    <div className="text-xs text-secondary font-medium">
                      Spend £{(FREE_SHIPPING_THRESHOLD - cartTotal).toFixed(2)}{" "}
                      more for FREE shipping!
                    </div>
                  )}
                  {cartTotal >= FREE_SHIPPING_THRESHOLD && (
                    <div className="text-xs text-green-500 font-medium">
                      🎉 You qualify for FREE shipping!
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-neutral-400">
                    <span>Subtotal:</span>
                    <span>£{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-neutral-400">
                    <span>Shipping:</span>
                    <span
                      className={
                        shippingCost === 0 ? "text-green-500 font-medium" : ""
                      }
                    >
                      {shippingCost === 0
                        ? "FREE"
                        : `£${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="border-t border-neutral-700 pt-2 flex items-center justify-between">
                    <span className="font-semibold text-neutral-200">
                      Total:
                    </span>
                    <span className="text-2xl font-bold text-secondary">
                      £{grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-3 mb-4 text-xs text-neutral-400">
                  <p className="mb-1">
                    <strong className="text-neutral-300">
                      Secure Checkout
                    </strong>
                  </p>
                  <p>
                    You'll be redirected to our secure payment partner (Stripe)
                    to enter your delivery address and payment details. See our{" "}
                    <a
                      href="/privacy-policy"
                      className="text-secondary hover:underline"
                    >
                      Privacy Policy
                    </a>{" "}
                    for how we handle your data.
                  </p>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full rounded-lg bg-secondary py-3 font-bold text-neutral-900 transition-colors hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? "Processing..." : "Proceed to Checkout"}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
