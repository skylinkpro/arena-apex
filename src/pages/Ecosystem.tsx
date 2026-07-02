import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import EcosystemMap from "@/components/EcosystemMap";
import AIGameStats from "@/components/AIGameStats";
import {
  LiveStatsStrip,
  RecentGameActivity,
  TrendingListingsStrip,
} from "@/components/game-content";
import { routePaths } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  Gamepad2,
  ShoppingCart,
  Coins,
  Users,
  Zap,
  Brain,
  Shield,
  TrendingUp,
  ChevronRight,
  Network,
  Layers,
} from "lucide-react";

export default function Ecosystem() {
  const [showGameSystems, setShowGameSystems] = useState(false);
  const [showIntegration, setShowIntegration] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);

  const ecosystemLayers = [
    {
      id: "game",
      name: "Game Layer",
      icon: Gamepad2,
      description: "Battles, Mons, servers, tournaments, and progression systems.",
      components: ["Combat Engine", "AI Neural Networks", "Matchmaking", "Leaderboards"],
    },
    {
      id: "marketplace",
      name: "Trading Layer",
      icon: ShoppingCart,
      description: "Global marketplace for assets, NFTs, and in-game items.",
      components: ["Order Books", "AMM Pools", "Price Discovery", "Escrow Contracts"],
    },
    {
      id: "defi",
      name: "DeFi Layer",
      icon: Coins,
      description: "Staking, liquidity pools, yield farming, and token economics.",
      components: ["Staking Pools", "LP Rewards", "Governance", "Treasury"],
    },
    {
      id: "social",
      name: "Social Layer",
      icon: Users,
      description: "Discord-style servers, guilds, chat, and community features.",
      components: ["Servers", "Guilds", "Chat/Voice", "Events"],
    },
  ];

  const integrationPoints = [
    {
      title: "Play to Earn",
      description: "Win battles → Earn FROZ → Buy items on marketplace → Upgrade Mons → Win more battles.",
    },
    {
      title: "Trade to Play",
      description: "Buy rare Mons on marketplace → Use in battles → Level up → Sell for profit → Reinvest in better Mons.",
    },
    {
      title: "Stake to Earn",
      description: "Stake FROZ in DeFi pools → Earn passive rewards → Use rewards to buy items → Enhance gameplay.",
    },
    {
      title: "Community Governance",
      description: "Hold FROZ → Vote on proposals → Shape game updates → Earn governance rewards.",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-[var(--navbar-h)]">
      {/* Page header */}
      <section className="section border-b border-border bg-card/30">
        <div className="section-container">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Ecosystem
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            The Arn-Apex ecosystem connects gameplay, NFTs, and global trading. Servers, Mons, marketplace, and DeFi run on one live economy.
          </p>
        </div>
      </section>

      <LiveStatsStrip />

      {/* Ecosystem Explanation */}
      <section className="section bg-background">
        <div className="section-container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              How Everything Connects
            </h2>
            <div className="content-read space-y-3 text-muted-foreground">
              <p>
                <strong className="text-foreground">Arn-Apex</strong> isn't just a game, a marketplace, or a DeFi protocol—it's all three 
                working together as one unified ecosystem. Every action you take in one layer affects the others.
              </p>
              <p>
                When you <strong className="text-foreground">win a battle</strong>, you earn FROZ tokens that you can immediately use to 
                <strong className="text-foreground"> buy items</strong> on the marketplace. Those items make your Mons stronger, helping you 
                <strong className="text-foreground"> win more battles</strong>. Or you can <strong className="text-foreground">stake your FROZ</strong> 
                in DeFi pools to earn passive rewards while you play.
              </p>
              <p>
                <strong className="text-foreground">Community servers</strong> let you create custom game modes, tournaments, and economies. 
                Server owners can set entry fees, prize pools, and rules. Players earn server-specific rewards that can be traded globally.
              </p>
              <p>
                Everything—Mons, items, FROZ, server memberships—is on-chain. You truly own your assets and can trade them anytime, anywhere.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <Button onClick={() => setShowGameSystems(!showGameSystems)} variant="outline">
                {showGameSystems ? "Hide" : "Explore"} Game Systems
              </Button>
              <Button onClick={() => setShowIntegration(!showIntegration)} variant="outline">
                {showIntegration ? "Hide" : "View"} Integration Flow
              </Button>
            </div>

            <AnimatePresence>
              {showGameSystems && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 overflow-hidden"
                >
                  <Card className="p-6 bg-card/60 border-border">
                    <h3 className="text-lg font-heading font-bold mb-4">Core Game Systems</h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li>
                        <strong className="text-foreground">Combat Engine:</strong> Real-time battles with ability cooldowns, status effects, 
                        and AI-driven opponent behavior.
                      </li>
                      <li>
                        <strong className="text-foreground">Neural Networks:</strong> Each Mon has a unique neural network that learns from battles. 
                        Over time, your Mon adapts its strategy.
                      </li>
                      <li>
                        <strong className="text-foreground">Progression System:</strong> XP, levels, evolution stages, and unlockable abilities. 
                        Max level is 100.
                      </li>
                      <li>
                        <strong className="text-foreground">Breeding & Genetics:</strong> Combine Mons to create offspring with inherited traits. 
                        Genetic algorithms determine outcomes.
                      </li>
                      <li>
                        <strong className="text-foreground">Territory Control:</strong> Deploy Mons to control zones on the world map. 
                        Earn passive FROZ from controlled territories.
                      </li>
                    </ul>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showIntegration && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 overflow-hidden"
                >
                  <Card className="p-6 bg-card/60 border-border">
                    <h3 className="text-lg font-heading font-bold mb-4">Integration Flow</h3>
                    <div className="space-y-4">
                      {integrationPoints.map((point, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Badge className="shrink-0 mt-0.5">{i + 1}</Badge>
                          <div>
                            <div className="text-sm font-semibold text-foreground mb-1">{point.title}</div>
                            <div className="text-xs text-muted-foreground">{point.description}</div>
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

      {/* Ecosystem Layers */}
      <section className="section bg-background border-t border-border">
        <div className="section-container">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6 text-center">
            Ecosystem Layers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ecosystemLayers.map((layer) => (
              <Card
                key={layer.id}
                className={`p-6 bg-card/60 border-border cursor-pointer transition-all hover:border-primary/40 hover:bg-card/80 ${
                  selectedSystem === layer.id ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => setSelectedSystem(selectedSystem === layer.id ? null : layer.id)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <layer.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-1">{layer.name}</h3>
                    <p className="text-sm text-muted-foreground">{layer.description}</p>
                  </div>
                </div>
                <AnimatePresence>
                  {selectedSystem === layer.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-4 border-t border-border overflow-hidden"
                    >
                      <div className="text-xs text-muted-foreground mb-3">Key Components:</div>
                      <div className="flex flex-wrap gap-2">
                        {layer.components.map((comp) => (
                          <Badge key={comp} variant="outline" className="text-xs">
                            {comp}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <EcosystemMap />
      <AIGameStats />
      <TrendingListingsStrip />
      <RecentGameActivity />
    </div>
  );
}
