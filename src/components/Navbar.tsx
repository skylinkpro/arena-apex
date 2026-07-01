import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {
  onConnectWallet: () => void;
  onNavigate?: (section: string) => void;
}

const Navbar = ({ onConnectWallet, onNavigate }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Ecosystem", path: "/ecosystem" },
    { label: "NFTs", path: "/nfts" },
    { label: "Marketplace", path: "/marketplace" },
    { label: "DeFiHub", path: "/defihub" },
  ];

  const playPath = "/gameplay";

  const handleNavClick = (path: string) => {
    if (path.startsWith("#") && onNavigate) {
      onNavigate(path.substring(1));
    } else {
      navigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-primary/20"
          : "bg-transparent"
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="text-2xl font-heading font-bold text-gradient cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNavClick("/")}
          >
            Arn-Apex
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => handleNavClick(playPath)}
              variant="default"
              className="glow-cta bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shrink-0"
            >
              Play
            </Button>
          </div>

          {/* Connect Wallet Button */}
          <div className="hidden md:block">
            <Button
              onClick={onConnectWallet}
              variant="outline"
              className="border-primary/30 hover:bg-primary/10 text-primary font-medium"
            >
              Connect Wallet
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden mt-4 pb-4 space-y-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className="block w-full text-left text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => handleNavClick(playPath)}
              className="w-full glow-cta bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              Play
            </Button>
            <Button
              onClick={onConnectWallet}
              variant="outline"
              className="w-full border-primary/30 hover:bg-primary/10 text-primary"
            >
              Connect Wallet
            </Button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
