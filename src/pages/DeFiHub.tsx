import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import DeFiDashboard from "@/components/DeFiDashboard";
import {
  LiveStatsStrip,
  RecentGameActivity,
  TrendingListingsStrip,
} from "@/components/game-content";
import { routePaths } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Coins,
  TrendingUp,
  Wallet,
  Zap,
  Shield,
  PieChart,
  ArrowUpDown,
  ChevronRight,
  Percent,
  Lock,
} from "lucide-react";

export default function DeFiHub() {
  const [showStaking, setShowStaking] = useState(false);
  const [showLiquidity, setShowLiquidity] = useState(false);
  const [selectedPool, setSelectedPool] = useState<string | null>(null);

  const stakingPools = [
    { id: "froz", token: "FROZ", apy: "45%", tvl: "$2.4M", rewards: "FROZ", lockPeriod: "None" },
    { id: "froz-eth", token: "FROZ-ETH LP", apy: "120%", tvl: "$1.8M", rewards: "FROZ + Fees", lockPeriod: "None" },
    { id: "froz-usdt", token: "FROZ-USDT LP", apy: "85%", tvl: "$3.1M", rewards: "FROZ + Fees", lockPeriod: "None" },
    { id: "locked", token: "Locked FROZ", apy: "200%", tvl: "$890K", rewards: "FROZ + NFTs", lockPeriod: "90 days" },
  ];

  const tradingPairs = [
    { pair: "FROZ/USDT", price: "$0.4521", change: "+5.2%", volume: "$1.24M", positive: true },
    { pair: "FROZ/ETH", price: "0.00012", change: "+3.8%", volume: "$890K", positive: true },
    { pair: "FROZ/BNB", price: "0.00089", change: "-1.2%", volume: "$450K", positive: false },
  ];

  const defiFeatures = [
    {
      title: "Single-Asset Staking",
      description: "Stake FROZ to earn more FROZ. No impermanent loss. Withdraw anytime.",
      apy: "45%",
      risk: "Low",
    },
    {
      title: "Liquidity Providing",
      description: "Provide liquidity for FROZ pairs. Earn trading fees + FROZ rewards.",
      apy: "85–120%",
      risk: "Medium",
    },
    {
      title: "Locked Staking",
      description: "Lock FROZ for 90 days. Earn 200% APY + exclusive NFT drops.",
      apy: "200%",
      risk: "Low (time lock)",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-[var(--navbar-h)]">
      {/* Page header */}
      <section className="section border-b border-border bg-card/30">
        <div className="section-container">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            DeFi Hub
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Stake, swap, and track the game economy. FROZ and in-game assets are fully tradable with real-time analytics and liquidity.
          </p>
        </div>
      </section>

      <LiveStatsStrip />

      {/* DeFi Explanation */}
      <section className="section bg-background">
        <div className="section-container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              What is DeFi in Arn-Apex?
            </h2>
            <div className="content-read space-y-3 text-muted-foreground">
              <p>
                <strong className="text-foreground">DeFi (Decentralized Finance)</strong> in Arn-Apex lets you earn passive income from your 
                FROZ tokens and in-game assets. Instead of just holding tokens, you can stake them in pools, provide liquidity for trading pairs, 
                or participate in yield farming—all while continuing to play the game.
              </p>
              <p>
                <strong className="text-foreground">Staking:</strong> Lock your FROZ in a staking pool to earn rewards. Single-asset staking 
                has no impermanent loss and you can withdraw anytime. Locked staking (90 days) offers higher APY and exclusive NFT drops.
              </p>
              <p>
                <strong className="text-foreground">Liquidity Providing:</strong> Add FROZ + another token (ETH, USDT, BNB) to a liquidity pool. 
                You earn a share of trading fees plus FROZ rewards. Higher risk (impermanent loss) but higher returns (85–120% APY).
              </p>
              <p>
                <strong className="text-foreground">Governance:</strong> FROZ holders vote on game updates, new features, and treasury allocations. 
                Voting power is proportional to your staked FROZ.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <Button onClick={() => setShowStaking(!showStaking)} variant="outline">
                {showStaking ? "Hide" : "View"} Staking Pools
              </Button>
              <Button onClick={() => setShowLiquidity(!showLiquidity)} variant="outline">
                {showLiquidity ? "Hide" : "Learn About"} Liquidity
              </Button>
            </div>

            <AnimatePresence>
              {showStaking && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 overflow-hidden"
                >
                  <Card className="p-6 bg-card/60 border-border">
                    <h3 className="text-lg font-heading font-bold mb-4">Staking Pools</h3>
                    <div className="space-y-4">
                      {stakingPools.map((pool) => (
                        <div key={pool.id} className="flex flex-wrap items-center gap-4 pb-4 border-b border-border last:border-0">
                          <div className="flex-1 min-w-[180px]">
                            <div className="text-sm font-semibold text-foreground">{pool.token}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              TVL: {pool.tvl} • Lock: {pool.lockPeriod}
                            </div>
                          </div>
                          <Badge className="shrink-0 text-primary bg-primary/10 border-primary/30">
                            {pool.apy} APY
                          </Badge>
                          <Button size="sm" variant="outline" className="shrink-0">
                            Stake
                          </Button>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showLiquidity && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 overflow-hidden"
                >
                  <Card className="p-6 bg-card/60 border-border">
                    <h3 className="text-lg font-heading font-bold mb-4">Liquidity Providing</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      When you provide liquidity, you deposit equal values of two tokens (e.g., FROZ + ETH) into a pool. 
                      Traders use this pool to swap between the tokens, and you earn a share of the trading fees (0.3% per swap) 
                      plus FROZ rewards distributed by the protocol.
                    </p>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p><strong className="text-foreground">Pros:</strong> High APY (85–120%), earn from fees + rewards.</p>
                      <p><strong className="text-foreground">Cons:</strong> Impermanent loss if token prices diverge significantly.</p>
                      <p><strong className="text-foreground">Best for:</strong> Users who believe in long-term growth and want passive income.</p>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Trading Pairs */}
      <section className="section bg-muted/20 border-t border-border">
        <div className="section-container max-w-3xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
            Trading Pairs
          </h2>
          <Card className="p-6 bg-card/60 border-border">
            <div className="space-y-4">
              {tradingPairs.map((pair) => (
                <div key={pair.pair} className="flex flex-wrap items-center gap-4 pb-4 border-b border-border last:border-0">
                  <div className="flex-1 min-w-[140px]">
                    <div className="text-sm font-semibold text-foreground">{pair.pair}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">24h Vol: {pair.volume}</div>
                  </div>
                  <div className="text-sm font-mono text-foreground">{pair.price}</div>
                  <Badge
                    variant="outline"
                    className={pair.positive ? "text-green-500 border-green-500/30" : "text-red-500 border-red-500/30"}
                  >
                    {pair.change}
                  </Badge>
                  <Button size="sm" variant="outline" className="shrink-0">
                    Trade
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* DeFi Features */}
      <section className="section bg-background border-t border-border">
        <div className="section-container">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6 text-center">
            DeFi Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {defiFeatures.map((feature, i) => (
              <Card
                key={i}
                className="p-6 bg-card/60 border-border cursor-pointer hover:border-primary/40 hover:bg-card/80 transition-all"
                onClick={() => setSelectedPool(selectedPool === feature.title ? null : feature.title)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-heading font-semibold text-foreground">{feature.title}</h3>
                  <Badge variant="outline" className="text-xs">{feature.risk}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">APY</span>
                  <span className="text-lg font-bold font-mono text-primary">{feature.apy}</span>
                </div>
                <AnimatePresence>
                  {selectedPool === feature.title && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-border overflow-hidden"
                    >
                      <Button size="sm" className="w-full">
                        Start Earning
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <DeFiDashboard />
      <TrendingListingsStrip />
      <RecentGameActivity />
    </div>
  );
}
