import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const WALLET_ICONS = {
  metamask: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
  walletconnect: "https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/master/Logo/Blue%20(Default)/Logo.svg",
  coinbase: "https://www.coinbase.com/favicon.ico",
  trustwallet: "https://trustwallet.com/assets/images/media/assets/TWT.png",
  rabby: "https://rabby.io/assets/logos/symbol-new.svg",
} as const;

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConnectWalletModal = ({ isOpen, onClose }: ConnectWalletModalProps) => {
  const [step, setStep] = useState<"select" | "password">("select");
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [password, setPassword] = useState("");

  const wallets = [
    {
      name: "MetaMask",
      icon: WALLET_ICONS.metamask,
      description: "Connect with MetaMask wallet",
    },
    {
      name: "WalletConnect",
      icon: WALLET_ICONS.walletconnect,
      description: "Scan with WalletConnect",
    },
    {
      name: "Coinbase Wallet",
      icon: WALLET_ICONS.coinbase,
      description: "Connect with Coinbase",
    },
    {
      name: "Trust Wallet",
      icon: WALLET_ICONS.trustwallet,
      description: "Connect with Trust Wallet",
    },
    {
      name: "Rabby Wallet",
      icon: WALLET_ICONS.rabby,
      description: "Connect with Rabby wallet",
    },
  ];

  const handleWalletConnect = (walletName: string) => {
    setSelectedWallet(walletName);
    setStep("password");
  };

  const handleFinalConnect = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Connecting to ${selectedWallet} with password...`);
    // Reset state and close
    setStep("select");
    setSelectedWallet(null);
    setPassword("");
    onClose();
  };

  const handleBack = () => {
    setStep("select");
    setSelectedWallet(null);
    setPassword("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="bg-card border border-primary/20 rounded-2xl p-6 max-w-md w-full glow-primary">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  {step === "password" && (
                    <button
                      onClick={handleBack}
                      className="text-muted-foreground hover:text-foreground transition-colors mr-2"
                    >
                      <ArrowLeft size={20} />
                    </button>
                  )}
                  <h2 className="text-2xl font-heading font-bold text-gradient">
                    {step === "select" ? "Connect Wallet" : "Enter Password"}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <AnimatePresence mode="wait">
                {step === "select" ? (
                  <motion.div
                    key="select"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-3"
                  >
                    {wallets.map((wallet, index) => (
                      <motion.button
                        key={wallet.name}
                        onClick={() => handleWalletConnect(wallet.name)}
                        className="w-full bg-muted/50 hover:bg-muted border border-primary/10 hover:border-primary/30 rounded-xl p-4 transition-all duration-200 flex items-center space-x-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <img 
                          src={wallet.icon} 
                          alt={wallet.name}
                          className="w-12 h-12 object-contain"
                        />
                        <div className="text-left flex-1">
                          <div className="font-semibold text-foreground">
                            {wallet.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {wallet.description}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.form
                    key="password"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleFinalConnect}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-center p-4 bg-muted/30 rounded-xl mb-6">
                      <img 
                        src={wallets.find(w => w.name === selectedWallet)?.icon} 
                        alt={selectedWallet || ""}
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                        <Lock size={14} />
                        <span>Confirm password for {selectedWallet}</span>
                      </div>
                      <Input
                        type="password"
                        placeholder="Enter your wallet password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-muted/50 border-primary/20 focus:border-primary h-12"
                        autoFocus
                        required
                      />
                    </div>

                    <Button 
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground glow-primary font-semibold"
                    >
                      Unlock & Connect
                    </Button>

                    <div className="text-xs text-center text-muted-foreground">
                      Your password is only used locally and never stored.
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Footer */}
              {step === "select" && (
                <div className="mt-6 text-center text-sm text-muted-foreground">
                  By connecting, you agree to our Terms of Service
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConnectWalletModal;
