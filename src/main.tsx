import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import MembersBook from "./pages/MembersBook.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsOfService from "./pages/TermsOfService.tsx";
import About from "./pages/About.tsx";
import Pricing from "./pages/Pricing.tsx";
import BookNow from "./pages/BookNow.tsx";
import Contact from "./pages/Contact.tsx";
import ExerciseCard from "./pages/ExerciseCard.tsx";
import MembersApp from "./pages/MembersApp.tsx";
import Login from "./pages/Login.tsx";
import AuthGuard from "./pages/AuthGuard.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<About />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/book" element={<BookNow />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/members/book" element={<MembersBook />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route
        path="/exercises"
        element={
          <ExerciseCard
            exercise={{
              id: "1",
              name: "Heavy Bag",
              category: "Muay Thai",
              youtube: undefined,
              cues: undefined,
            }}
          />
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/members/app"
        element={
          <AuthGuard>
            <MembersApp />
          </AuthGuard>
        }
      />
      <Route
        path="*"
        element={
          <h1 className="min-h-screen flex items-center justify-center bg-neutral-900 text-neutral-100">
            404 - Page Not Found
          </h1>
        }
      />
    </Routes>
  </BrowserRouter>
);
