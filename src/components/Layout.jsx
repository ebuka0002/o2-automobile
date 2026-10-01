import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import StickyMobileBar from "./StickyMobileBar";
import CompareBar from "./CompareBar";
import EnquiryModal from "./EnquiryModal";
import Toast from "./Toast";
import ScrollToTop from "./ScrollToTop";

export default function Layout() {
  return (
    <>
      <a href="#main" className="sr-only z-[100] bg-accent px-4 py-2 text-on-accent focus:not-sr-only focus:fixed focus:left-3 focus:top-3">
        Skip to content
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main">
        <Suspense fallback={<div className="grid min-h-[60vh] place-items-center text-sm text-muted">Loading…</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
      <StickyMobileBar />
      <CompareBar />
      <EnquiryModal />
      <Toast />
    </>
  );
}
