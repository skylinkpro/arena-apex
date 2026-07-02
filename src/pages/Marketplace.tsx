import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MarketplaceSection from "@/components/MarketplaceSection";
import {
  TrendingListingsStrip,
  RecentGameActivity,
  LiveStatsStrip,
} from "@/components/game-content";
import { routePaths } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingBag,
  TrendingUp,
  Shield,
  Zap,
  Coins,
  ChevronRight,
  Package,
  Wrench,
  Sparkles,
  Activity,
} from "lucide-react";

export default function Marketplace() {
  const [selectedItemType, setSelectedItemType] = useState("all");
  const [showTradingGuide, setShowTradingGuide] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  const itemTypes = [
    { id: "all", label: "All Items", icon: Package, count: 12543 },
    { id: "units", label: "Units", icon: Activity, count: 4269 },
    { id: "parts", label: "Parts", icon: Wrench, count: 5234 },
    { id: "materials", label: "Materials", icon: Sparkles, count: 2140 },
    { id: "consumables", label: "Consumables", icon: Zap, count: 900 },
  ];

  const pricingTiers = [
    { range: "0–500 FROZ", items: "Common parts, basic consumables", volume: "45%" },
    { range: "500–2,000 FROZ", items: "Rare materials, upgrade modules", volume: "30%" },
    { range: "2,000–10,000 FROZ", items: "Epic parts, advanced items", volume: "18%" },
    { range: "10,000+ FROZ", items: "Legendary/Mythic units, rare Mons", volume: "7%" },
  ];

  return (
    <div className="min-h-screen bg-background pt-[var(--navbar-h)]">
      {/* Page header */}
      <section className="section border-b border-border bg-card/30">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                Global Marketplace
              </h1>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Buy, sell, and trade in-game assets, parts, materials, and Mons. Real-time pricing and instant liquidity on the global Arn-Apex market.
              </p>
            </div>
            <Button asChild variant="outline" className="shrink-0 w-fit">
              <Link to={routePaths.trading}>Trading</Link>
            </Button>
          </div>
        </div>
      </section>

      <LiveStatsStrip />

      {/* Marketplace Explanation */}
      <section className="section bg-background">
        <div className="section-container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              How the Marketplace Works
            </h2>
            <div className="content-read space-y-3 text-muted-foreground">
              <p>
                The <strong className="text-foreground">Arn-Apex Marketplace</strong> is a decentralized exchange where players buy and sell 
                in-game assets using FROZ tokens. Every item—whether it's a Mon, a part, or a consumable—is an NFT or fungible token on the blockchain, 
                giving you true ownership and the ability to trade freely.
              </p>
              <p>
                <strong className="text-foreground">AI-Powered Recommendations:</strong> Our recommendation engine analyzes your playstyle, 
                current Mons, and recent purchases to suggest items that match your strategy. If you own a Cyber-Draco (Assault/Tank), 
                the AI will recommend defensive parts and high-STR upgrades.
              </p>
              <p>
                <strong className="text-foreground">Instant Liquidity:</strong> Don't want to wait for a buyer? Use the AMM (Automated Market Maker) 
                to instantly swap any asset for FROZ at current market rates. Liquidity providers earn fees from every swap.
              </p>
              <p>
                <strong className="text-foreground">Verified Authenticity:</strong> All listings are verified on-chain. Smart contracts guarantee 
                that the item you see is the item you get—no scams, no counterfeits.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <Button onClick={() => setShowTradingGuide(!showTradingGuide)} variant="outline">
                {showTradingGuide ? "Hide" : "Show"} Trading Guide
              </Button>
              <Button onClick={() => setShowPricing(!showPricing)} variant="outline">
                {showPricing ? "Hide" : "View"} Pricing Tiers
              </Button>
            </div>

            <AnimatePresence>
              {showTradingGuide && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 overflow-hidden"
                >
                  <Card className="p-6 bg-card/60 border-border">
                    <h3 className="text-lg font-heading font-bold mb-4">Trading Guide</h3>
                    <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                      <li>
                        <strong className="text-foreground">Connect Wallet:</strong> Link your MetaMask, WalletConnect, or Coinbase wallet 
                        to access the marketplace.
                      </li>
                      <li>
                        <strong className="text-foreground">Browse & Search:</strong> Use filters (category, rarity, price) and search to find items. 
                        Click any item to view details.
                      </li>
                      <li>
                        <strong className="text-foreground">Purchase Asset:</strong> Click "Purchase Asset" to go to the trading page. 
                        Review the item, price, and seller, then confirm the transaction.
                      </li>
                      <li>
                        <strong className="text-foreground">Confirm On-Chain:</strong> Your wallet will prompt you to sign the transaction. 
                        Gas fees are paid in ETH or the native chain token.
                      </li>
                      <li>
                        <strong className="text-foreground">Receive Asset:</strong> Once confirmed, the asset is transferred to your wallet 
                        and appears in your inventory immediately.
                      </li>
                    </ol>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showPricing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 overflow-hidden"
                >
                  <Card className="p-6 bg-card/60 border-border">
                    <h3 className="text-lg font-heading font-bold mb-4">Pricing Tiers</h3>
                    <div className="space-y-3">
                      {pricingTiers.map((tier) => (
                        <div key={tier.range} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                          <Badge variant="outline" className="shrink-0 mt-0.5">{tier.volume}</Badge>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-foreground">{tier.range}</div>
                            <div className="text-xs text-muted-foreground mt-1">{tier.items}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Item Types */}
      <section className="section bg-muted/20 border-t border-border">
        <div className="section-container">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
            Item Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {itemTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedItemType(type.id)}
                className={`p-4 rounded-xl border transition-all ${
                  selectedItemType === type.id
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-card/40 text-muted-foreground hover:border-primary/40 hover:bg-card/60"
                }`}
              >
                <type.icon className="h-6 w-6 mx-auto mb-2" />
                <div className="text-lg font-bold font-mono">{type.count.toLocaleString()}</div>
                <div className="text-xs mt-1">{type.label}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main marketplace */}
      <MarketplaceSection />

      {/* Trading Features */}
      <section className="section bg-background border-t border-border">
        <div className="section-container">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6 text-center">
            Trading Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-card/60 border-border">
              <TrendingUp className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-heading font-semibold mb-2">Live Pricing</h3>
              <p className="text-sm text-muted-foreground">
                Real-time market data powered by AI analytics. Prices update every second based on supply, demand, and recent sales.
              </p>
            </Card>
            <Card className="p-6 bg-card/60 border-border">
              <Shield className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-heading font-semibold mb-2">Verified Authenticity</h3>
              <p className="text-sm text-muted-foreground">
                Smart contracts guarantee digital ownership. Every item is verified on-chain before listing.
              </p>
            </Card>
            <Card className="p-6 bg-card/60 border-border">
              <Coins className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-heading font-semibold mb-2">Instant Liquidity</h3>
              <p className="text-sm text-muted-foreground">
                Swap assets for tokens instantly via AMM pools. No waiting for buyers—trade anytime, 24/7.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <TrendingListingsStrip />
      <RecentGameActivity />
    </div>
  );
}
