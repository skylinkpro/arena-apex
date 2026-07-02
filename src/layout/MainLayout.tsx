import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import ConnectWalletModal from "@/components/ConnectWalletModal";

export default function MainLayout() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onConnectWallet={() => setIsWalletModalOpen(true)} />
      <ConnectWalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
      <main
        className="flex-1 w-full"
        style={{ paddingTop: isHome ? 0 : "var(--navbar-h)" }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
