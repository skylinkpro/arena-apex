import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConnectWalletModal from "@/components/ConnectWalletModal";

const MainLayout = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const location = useLocation();

  const handleConnectWallet = () => {
    setIsWalletModalOpen(true);
  };

  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar onConnectWallet={handleConnectWallet} />
      <ConnectWalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
      <main className={`flex-grow ${location.pathname === "/" ? "" : "pt-24"}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
