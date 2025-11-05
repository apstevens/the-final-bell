import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// Import marketing pages
import Home from "./pages/App";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import BookNow from "./pages/BookNow";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Shop from "./pages/Shop";
import CategoryListing from "./pages/CategoryListing";
import ProductDetail from "./pages/ProductDetail";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

// Import Cart Provider
import { CartProvider } from "./contexts/CartContext";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CartProvider>
      <Routes>
        {/* Marketing Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/book" element={<BookNow />} />
        <Route path="/contact" element={<Contact />} />

        {/* Shop Pages */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:categoryId" element={<CategoryListing />} />
        <Route path="/shop/product/:productId" element={<ProductDetail />} />

        {/* Checkout Pages */}
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />

        {/* Legal Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />

      {/* 404 Page */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-neutral-100">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-secondary mb-4">404</h1>
              <p className="text-xl mb-8">Page Not Found</p>
              <a
                href="/"
                className="px-6 py-3 bg-secondary text-zinc-900 rounded-lg font-semibold hover:bg-primary hover:text-amber-50 transition"
              >
                Go Home
              </a>
            </div>
          </div>
        }
      />
    </Routes>
    </CartProvider>
  </BrowserRouter>
);
