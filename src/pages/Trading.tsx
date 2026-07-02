import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Coins, ShieldCheck, ArrowLeft, Zap, Swords, Package, TrendingUp, CheckCircle2, AlertCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { routePaths } from "@/config/routes";
import type { AssetDetail } from "@/components/AssetDetailModal";

/** Sample similar items and recent game content for the trading page */
const SIMILAR_ITEMS: { id: number; name: string; price: string; image: string; rarity: string }[] = [
  { id: 101, name: "Neural Chip v4", price: "450 FROZ", image: "/assets/item-chip.png", rarity: "Epic" },
  { id: 102, name: "Plasma Core", price: "2,100 FROZ", image: "/assets/item-core.png", rarity: "Legendary" },
  { id: 103, name: "Stealth Module", price: "320 FROZ", image: "/assets/item-cloak.png", rarity: "Rare" },
  { id: 104, name: "Titanium Plating", price: "2,400 FROZ", image: "/assets/item-legs.png", rarity: "Rare" },
];

const RECENT_TRADES = [
  { from: "NeonTrader", to: "VoidWalker", item: "Cyber-Draco", price: "12,500 FROZ", time: "2m ago" },
  { from: "ScrapLord", to: "Armorer", item: "Mech-Legs Mk.II", price: "1,200 FROZ", time: "5m ago" },
  { from: "CodeMaster", to: "DraftBoard", item: "Data-Scroll", price: "3,300 FROZ", time: "8m ago" },
  { from: "CoreDump", to: "Weaver", item: "Fusion Core", price: "8,900 FROZ", time: "12m ago" },
];

const PAYMENT_METHODS = [
  { id: "froz", name: "FROZ Token", balance: "5,240 FROZ", fee: "0%", recommended: true },
  { id: "eth", name: "Ethereum (ETH)", balance: "0.45 ETH", fee: "0.5%", recommended: false },
  { id: "usdt", name: "USDT", balance: "1,250 USDT", fee: "0.3%", recommended: false },
];

export default function Trading() {
  const location = useLocation();
  const navigate = useNavigate();
  const asset = (location.state as { asset?: AssetDetail } | null)?.asset ?? null;

  const [quantity, setQuantity] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("froz");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const handleConfirmPurchase = () => {
    if (!agreeTerms) {
      alert("Please agree to the terms before purchasing.");
      return;
    }
    setPurchaseComplete(true);
    setTimeout(() => {
      navigate(routePaths.marketplace);
    }, 3000);
  };

  const basePrice = asset?.price ? parseFloat(asset.price.replace(/[^0-9.]/g, "")) : 0;
  const totalPrice = basePrice * quantity;
  const fee = selectedPayment === "froz" ? 0 : basePrice * 0.005 * quantity;
  const finalPrice = totalPrice + fee;

  return (
    <div className="min-h-screen bg-background pt-[var(--navbar-h)]">
      <div className="section-container section">
        {!purchaseComplete ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main: item + checkout */}
            <div className="lg:col-span-2 space-y-6">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-foreground -ml-2"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Marketplace
              </Button>

              {asset ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Item Summary */}
                  <Card className="overflow-hidden border-border bg-card/60 p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                      <div className="relative min-h-[240px] md:min-h-[320px] bg-black/40 flex items-center justify-center p-8">
                        <img
                          src={asset.image}
                          alt={asset.name}
                          className="max-w-full max-h-[200px] md:max-h-[260px] object-contain"
                        />
                      </div>
                      <div className="p-6 md:p-8 flex flex-col justify-center">
                        <span className="inline-block w-fit px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30 mb-3">
                          {asset.rarity}
                        </span>
                        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
                          {asset.name}
                        </h1>
                        <p className="text-muted-foreground text-sm mb-4">{asset.description}</p>
                        {asset.price && (
                          <div className="flex items-center gap-2 mb-4">
                            <Coins className="h-5 w-5 text-primary" />
                            <span className="font-mono font-bold text-lg text-foreground">{asset.price}</span>
                          </div>
                        )}
                        {asset.seller && (
                          <p className="text-sm text-muted-foreground mb-6">
                            Seller: <span className="text-foreground font-medium">{asset.seller}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>

                  {/* Checkout Section */}
                  <Card className="p-6 border-border bg-card/60">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-heading font-bold text-foreground">Checkout</h2>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowCheckout(!showCheckout)}
                      >
                        {showCheckout ? "Hide" : "Show"} Details
                      </Button>
                    </div>

                    {/* Quantity */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Quantity</label>
                        <Input
                          type="number"
                          min="1"
                          max="10"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          className="max-w-[120px]"
                        />
                      </div>

                      {/* Payment Method */}
                      <div>
                        <label className="text-sm font-medium text-foreground mb-3 block">Payment Method</label>
                        <div className="space-y-2">
                          {PAYMENT_METHODS.map((method) => (
                            <button
                              key={method.id}
                              onClick={() => setSelectedPayment(method.id)}
                              className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                                selectedPayment === method.id
                                  ? "border-primary bg-primary/10"
                                  : "border-border bg-card/40 hover:border-primary/40"
                              }`}
                            >
                              <div className="text-left">
                                <div className="text-sm font-semibold text-foreground flex items-center gap-2">
                                  {method.name}
                                  {method.recommended && (
                                    <Badge variant="outline" className="text-xs">Recommended</Badge>
                                  )}
                                </div>
                                <div className="text-xs text-muted-foreground mt-0.5">
                                  Balance: {method.balance} • Fee: {method.fee}
                                </div>
                              </div>
                              <div className={`h-5 w-5 rounded-full border-2 ${
                                selectedPayment === method.id
                                  ? "border-primary bg-primary"
                                  : "border-muted-foreground"
                              }`} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {showCheckout && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mb-6 overflow-hidden"
                        >
                          <div className="space-y-2 text-sm p-4 bg-muted/30 rounded-lg">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Item price</span>
                              <span className="font-mono text-foreground">{basePrice.toLocaleString()} FROZ</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Quantity</span>
                              <span className="font-mono text-foreground">×{quantity}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Subtotal</span>
                              <span className="font-mono text-foreground">{totalPrice.toLocaleString()} FROZ</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Trading fee</span>
                              <span className="font-mono text-foreground">{fee.toFixed(2)} FROZ</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-border">
                              <span className="font-semibold text-foreground">Total</span>
                              <span className="font-mono font-bold text-foreground">{finalPrice.toLocaleString()} FROZ</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Terms */}
                    <div className="flex items-start gap-3 mb-6">
                      <Checkbox
                        id="terms"
                        checked={agreeTerms}
                        onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                      />
                      <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                        I agree to the{" "}
                        <Link to={routePaths.terms} className="text-primary hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and understand that this transaction is final and on-chain.
                      </label>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                        onClick={handleConfirmPurchase}
                        disabled={!agreeTerms}
                      >
                        Confirm Purchase
                      </Button>
                      <Button variant="outline" className="flex-1" asChild>
                        <Link to={routePaths.marketplace}>Cancel</Link>
                      </Button>
                    </div>
                  </Card>

                  {/* Secure Trade Info */}
                  <Card className="p-6 border-border bg-card/40">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-4">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      Secure Trade
                    </h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        <strong className="text-foreground">On-Chain Execution:</strong> This transaction is executed via smart contract. 
                        Your wallet will be prompted to confirm. Assets are transferred atomically—either the full trade succeeds or it reverts.
                      </p>
                      <p>
                        <strong className="text-foreground">Escrow Protection:</strong> Payment is held in escrow until the seller confirms delivery. 
                        If there's a dispute, the contract can be arbitrated by the DAO.
                      </p>
                      <p>
                        <strong className="text-foreground">Gas Fees:</strong> You'll pay a small gas fee (typically $1–5 USD in ETH) to execute 
                        the transaction on the blockchain. This fee goes to network validators, not to Arn-Apex.
                      </p>
                    </div>
                  </Card>

                  {/* Why Buy This Item */}
                  <Card className="p-6 border-border bg-card/40">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-4">
                      <Zap className="h-4 w-4 text-primary" />
                      Why Buy This Item?
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Verified authenticity via smart contract</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Instant delivery to your wallet after confirmation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Can be used in-game immediately or resold on the marketplace</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Seller has 98% positive rating (245 successful trades)</span>
                      </li>
                    </ul>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-6">No item selected for purchase.</p>
                  <Button asChild>
                    <Link to={routePaths.marketplace}>Go to Marketplace</Link>
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Sidebar: recommendations & activity */}
            <div className="space-y-6">
              <Card className="p-6 border-border bg-card/40">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-4">
                  <Zap className="h-4 w-4 text-primary" />
                  Similar Items
                </h3>
                <ul className="space-y-3">
                  {SIMILAR_ITEMS.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={routePaths.marketplace}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <img
                          src={item.image}
                          alt=""
                          className="h-10 w-10 rounded object-cover bg-muted"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.rarity} · {item.price}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" size="sm" className="w-full mt-3" asChild>
                  <Link to={routePaths.marketplace}>
                    View more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </Card>

              <Card className="p-6 border-border bg-card/40">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-4">
                  <Swords className="h-4 w-4 text-primary" />
                  Recent Trades
                </h3>
                <ul className="space-y-3 text-sm">
                  {RECENT_TRADES.map((t, i) => (
                    <li key={i} className="pb-3 border-b border-border last:border-0">
                      <div className="flex justify-between gap-2 mb-1">
                        <span className="text-foreground font-medium truncate">{t.item}</span>
                        <span className="text-xs text-muted-foreground shrink-0">{t.time}</span>
                      </div>
                      <div className="flex justify-between gap-2 text-xs text-muted-foreground">
                        <span className="truncate">{t.from} → {t.to}</span>
                        <span className="shrink-0 font-mono">{t.price}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" size="sm" className="w-full mt-3" asChild>
                  <Link to={routePaths.marketplace}>View all activity</Link>
                </Button>
              </Card>

              {/* Trading Tips */}
              <Card className="p-6 border-border bg-card/40">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-4">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Trading Tips
                </h3>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>• Check seller ratings before purchasing</li>
                  <li>• Compare prices across multiple listings</li>
                  <li>• Use FROZ to avoid trading fees</li>
                  <li>• Rare items tend to appreciate over time</li>
                  <li>• Join Discord to negotiate bulk deals</li>
                </ul>
              </Card>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center py-16"
          >
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
              Purchase Complete!
            </h2>
            <p className="text-muted-foreground mb-6">
              Your asset has been transferred to your wallet. Redirecting to marketplace...
            </p>
            <Button asChild>
              <Link to={routePaths.marketplace}>Back to Marketplace</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
