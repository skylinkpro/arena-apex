import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { routePaths } from "@/config/routes";
import {
  FileText,
  ChevronDown,
  ChevronRight,
  Brain,
  Coins,
  Users,
  Shield,
  TrendingUp,
  Zap,
  Globe,
} from "lucide-react";

export default function Whitepaper() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const sections = [
    { id: "intro", title: "1. Introduction", icon: FileText },
    { id: "architecture", title: "2. AI Architecture", icon: Brain },
    { id: "tokenomics", title: "3. Tokenomics", icon: Coins },
    { id: "gameplay", title: "4. Gameplay Mechanics", icon: Zap },
    { id: "marketplace", title: "5. Marketplace & Trading", icon: TrendingUp },
    { id: "defi", title: "6. DeFi Protocol", icon: Shield },
    { id: "governance", title: "7. Governance", icon: Users },
    { id: "roadmap", title: "8. Roadmap", icon: Globe },
  ];

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background pt-[var(--navbar-h)]">
      <div className="section-container section">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Badge className="mb-4">Version 2.0 • Updated Jan 2026</Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Arn-Apex Whitepaper
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              The comprehensive technical and strategic guide to the Arn-Apex ecosystem, covering AI architecture, tokenomics, gameplay mechanics, 
              and the integration of gaming, NFTs, and DeFi.
            </p>
          </motion.div>

          {/* Table of Contents */}
          <Card className="p-6 bg-card/60 border-border mb-8">
            <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full text-left"
                  >
                    <section.icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{section.title}</span>
                    {expandedSection === section.id ? (
                      <ChevronDown className="h-4 w-4 shrink-0" />
                    ) : (
                      <ChevronRight className="h-4 w-4 shrink-0" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          {/* Content Sections */}
          <div className="space-y-6">
            {/* Section 1: Introduction */}
            <Card className="overflow-hidden border-border bg-card/60">
              <button
                onClick={() => toggleSection("intro")}
                className="w-full p-6 flex items-center justify-between hover:bg-card/80 transition-colors"
              >
                <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  1. Introduction
                </h2>
                {expandedSection === "intro" ? (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              <AnimatePresence>
                {expandedSection === "intro" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-4 text-sm text-muted-foreground content-read">
                      <p>
                        Arn-Apex represents the convergence of AI, gaming, and decentralized finance into a single, cohesive ecosystem. 
                        Traditional games operate in silos: you play, you earn in-game currency, but you can't truly own or trade your assets. 
                        Traditional DeFi protocols offer financial tools but lack engaging use cases. Arn-Apex bridges this gap.
                      </p>
                      <p>
                        <strong className="text-foreground">Our Vision:</strong> A living, breathing digital universe where player actions 
                        truly matter. Every Mon you own, every battle you fight, every trade you make affects the global economy. 
                        Community-driven servers let players create custom game modes and economies. AI-powered NPCs and market makers ensure 
                        the world feels alive even when you're offline.
                      </p>
                      <p>
                        <strong className="text-foreground">Key Innovations:</strong> Neural networks for each Mon (they learn from battles), 
                        on-chain asset ownership (true property rights), integrated DeFi (earn while you play), and Discord-style social features 
                        (servers, guilds, voice chat).
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Section 2: AI Architecture */}
            <Card className="overflow-hidden border-border bg-card/60">
              <button
                onClick={() => toggleSection("architecture")}
                className="w-full p-6 flex items-center justify-between hover:bg-card/80 transition-colors"
              >
                <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-3">
                  <Brain className="h-5 w-5 text-primary" />
                  2. AI Architecture
                </h2>
                {expandedSection === "architecture" ? (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              <AnimatePresence>
                {expandedSection === "architecture" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-4 text-sm text-muted-foreground content-read">
                      <p>
                        <strong className="text-foreground">Neural Engine:</strong> Our proprietary AI system powers every NPC, market transaction, 
                        and dynamic event in the world. Each Mon has its own neural network (a lightweight model trained on battle data) that adapts 
                        its combat strategy over time.
                      </p>
                      <p>
                        <strong className="text-foreground">How It Works:</strong> When you battle, your Mon's neural network observes your commands 
                        (which abilities you use, when you defend, etc.) and the opponent's behavior. After each match, the network updates its weights 
                        to favor strategies that led to victory. Over hundreds of battles, your Mon develops a unique playstyle.
                      </p>
                      <p>
                        <strong className="text-foreground">Market AI:</strong> The marketplace uses machine learning to recommend items based on 
                        your Mons, recent purchases, and win rate. Price discovery algorithms analyze supply, demand, and recent sales to suggest 
                        fair market values.
                      </p>
                      <p>
                        <strong className="text-foreground">NPC Behavior:</strong> Enemy NPCs in PvE modes use reinforcement learning to adapt to 
                        player strategies. If many players use the same tactic, NPCs learn to counter it, keeping the game challenging.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Section 3: Tokenomics */}
            <Card className="overflow-hidden border-border bg-card/60">
              <button
                onClick={() => toggleSection("tokenomics")}
                className="w-full p-6 flex items-center justify-between hover:bg-card/80 transition-colors"
              >
                <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-3">
                  <Coins className="h-5 w-5 text-primary" />
                  3. Tokenomics
                </h2>
                {expandedSection === "tokenomics" ? (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              <AnimatePresence>
                {expandedSection === "tokenomics" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-4 text-sm text-muted-foreground content-read">
                      <p>
                        <strong className="text-foreground">$FROZ Token:</strong> The governance and utility token of the Arn-Apex ecosystem. 
                        Total supply: 1 billion FROZ. Distribution: 40% community rewards, 25% liquidity, 20% team (4-year vest), 10% treasury, 5% initial sale.
                      </p>
                      <p>
                        <strong className="text-foreground">Utility:</strong> FROZ is used for all in-game transactions (buying items, breeding Mons, 
                        entering tournaments), marketplace fees (0.5% of each trade goes to FROZ stakers), DeFi staking (earn passive rewards), 
                        and governance (vote on game updates and treasury allocations).
                      </p>
                      <p>
                        <strong className="text-foreground">Earning FROZ:</strong> Win battles (50–500 FROZ per match), complete quests (100–1,000 FROZ), 
                        win tournaments (5,000–50,000 FROZ), control territories (passive income), stake FROZ (45–200% APY), provide liquidity (85–120% APY).
                      </p>
                      <p>
                        <strong className="text-foreground">Burning Mechanism:</strong> 10% of all marketplace fees are burned, reducing total supply over time. 
                        This creates deflationary pressure and increases scarcity.
                      </p>
                      <p>
                        <strong className="text-foreground">NFT Economy:</strong> Mons and items are NFTs (ERC-721 for Mons, ERC-1155 for items). 
                        They can be traded on the marketplace or external platforms (OpenSea, Blur). All royalties (2.5%) go to the treasury.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Section 4: Gameplay Mechanics */}
            <Card className="overflow-hidden border-border bg-card/60">
              <button
                onClick={() => toggleSection("gameplay")}
                className="w-full p-6 flex items-center justify-between hover:bg-card/80 transition-colors"
              >
                <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-3">
                  <Zap className="h-5 w-5 text-primary" />
                  4. Gameplay Mechanics
                </h2>
                {expandedSection === "gameplay" ? (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              <AnimatePresence>
                {expandedSection === "gameplay" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-4 text-sm text-muted-foreground content-read">
                      <p>
                        <strong className="text-foreground">Combat System:</strong> Battles are real-time with ability cooldowns. Each Mon has 4 stats 
                        (STR, AGI, INT, DEF) and 3–5 active abilities. Players choose when to attack, defend, or use abilities. Timing and strategy 
                        determine the outcome.
                      </p>
                      <p>
                        <strong className="text-foreground">Match Types:</strong> Quick Battle (3–5 min, 1v1), Ranked Arena (10–15 min, affects ranking), 
                        Tournaments (1–2 hours, 16–64 players), Guild Wars (3–7 days, guild vs guild), Territory Siege (attack/defend zones on world map).
                      </p>
                      <p>
                        <strong className="text-foreground">Progression:</strong> Mons gain XP from battles and level up (max level 100). 
                        At levels 25, 50, and 75, Mons can evolve into more powerful forms. Evolution requires special items (Evolution Stones, Rare materials).
                      </p>
                      <p>
                        <strong className="text-foreground">Breeding:</strong> Combine two Mons to create offspring. Offspring inherits 50–70% of parent stats 
                        and has a 5% chance of mutation (new ability or stat boost). Breeding costs 500 FROZ + materials. Each Mon can breed up to 7 times.
                      </p>
                      <p>
                        <strong className="text-foreground">Territory Control:</strong> Deploy Mons to control zones on the world map. Controlled zones 
                        generate passive FROZ income (10–100 FROZ per hour depending on zone value). Other players can challenge your Mons to take control.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Section 5: Marketplace & Trading */}
            <Card className="overflow-hidden border-border bg-card/60">
              <button
                onClick={() => toggleSection("marketplace")}
                className="w-full p-6 flex items-center justify-between hover:bg-card/80 transition-colors"
              >
                <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  5. Marketplace & Trading
                </h2>
                {expandedSection === "marketplace" ? (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              <AnimatePresence>
                {expandedSection === "marketplace" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-4 text-sm text-muted-foreground content-read">
                      <p>
                        <strong className="text-foreground">Decentralized Marketplace:</strong> Players list Mons, parts, materials, and consumables 
                        for sale using FROZ. All listings are on-chain. Smart contracts handle escrow, ensuring secure trades.
                      </p>
                      <p>
                        <strong className="text-foreground">Order Book + AMM:</strong> The marketplace uses a hybrid model. Players can place limit orders 
                        (traditional order book) or use the AMM for instant swaps. The AMM uses liquidity pools to provide instant liquidity for any asset.
                      </p>
                      <p>
                        <strong className="text-foreground">Fees:</strong> 0.5% trading fee on all sales. Of this, 0.3% goes to liquidity providers, 
                        0.1% goes to FROZ stakers, and 0.1% is burned.
                      </p>
                      <p>
                        <strong className="text-foreground">AI Recommendations:</strong> The recommendation engine analyzes your playstyle, current Mons, 
                        and recent purchases to suggest items. If you own a Cyber-Draco (Assault/Tank), the AI recommends defensive parts and high-STR upgrades.
                      </p>
                      <p>
                        <strong className="text-foreground">Price Discovery:</strong> AI algorithms analyze recent sales, supply/demand, and market sentiment 
                        to suggest fair prices for listings. Sellers can accept the suggested price or set their own.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Section 6: DeFi Protocol */}
            <Card className="overflow-hidden border-border bg-card/60">
              <button
                onClick={() => toggleSection("defi")}
                className="w-full p-6 flex items-center justify-between hover:bg-card/80 transition-colors"
              >
                <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  6. DeFi Protocol
                </h2>
                {expandedSection === "defi" ? (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              <AnimatePresence>
                {expandedSection === "defi" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-4 text-sm text-muted-foreground content-read">
                      <p>
                        <strong className="text-foreground">Staking Pools:</strong> Single-asset staking (45% APY, no lock), 
                        LP staking (85–120% APY, no lock), and locked staking (200% APY, 90-day lock). Rewards are distributed every block.
                      </p>
                      <p>
                        <strong className="text-foreground">Liquidity Pools:</strong> FROZ pairs with ETH, USDT, BNB, and other major tokens. 
                        LPs earn 0.3% of trading fees + FROZ rewards. Impermanent loss is mitigated by high trading volume and reward incentives.
                      </p>
                      <p>
                        <strong className="text-foreground">Yield Farming:</strong> Provide liquidity and stake your LP tokens to earn double rewards. 
                        Some pools offer bonus NFT drops (exclusive Mons or items) for long-term LPs.
                      </p>
                      <p>
                        <strong className="text-foreground">Treasury:</strong> 10% of initial supply is held in the treasury. The DAO votes on 
                        treasury allocations (marketing, development, partnerships, buybacks). Treasury also receives 0.1% of marketplace fees.
                      </p>
                      <p>
                        <strong className="text-foreground">Governance:</strong> FROZ holders vote on proposals (game updates, new features, 
                        fee adjustments, treasury spending). Voting power is proportional to staked FROZ. Proposals require 10% quorum and 60% approval.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Section 7: Governance */}
            <Card className="overflow-hidden border-border bg-card/60">
              <button
                onClick={() => toggleSection("governance")}
                className="w-full p-6 flex items-center justify-between hover:bg-card/80 transition-colors"
              >
                <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  7. Governance
                </h2>
                {expandedSection === "governance" ? (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              <AnimatePresence>
                {expandedSection === "governance" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-4 text-sm text-muted-foreground content-read">
                      <p>
                        <strong className="text-foreground">DAO Structure:</strong> Arn-Apex is governed by a decentralized autonomous organization (DAO). 
                        FROZ holders propose and vote on changes to the game, marketplace, and protocol.
                      </p>
                      <p>
                        <strong className="text-foreground">Proposal Types:</strong> Game updates (new features, balance changes), marketplace adjustments 
                        (fee rates, listing rules), treasury spending (marketing, partnerships, buybacks), and protocol upgrades (smart contract changes).
                      </p>
                      <p>
                        <strong className="text-foreground">Voting Process:</strong> Proposals are submitted on-chain and open for 7 days of discussion. 
                        Voting lasts 3 days. Requires 10% quorum (10% of staked FROZ must vote) and 60% approval to pass. Voting power is proportional 
                        to staked FROZ (1 staked FROZ = 1 vote).
                      </p>
                      <p>
                        <strong className="text-foreground">Incentives:</strong> Active voters earn bonus FROZ rewards. Proposals that pass grant the 
                        proposer a bounty (500–5,000 FROZ depending on impact).
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Section 8: Roadmap */}
            <Card className="overflow-hidden border-border bg-card/60">
              <button
                onClick={() => toggleSection("roadmap")}
                className="w-full p-6 flex items-center justify-between hover:bg-card/80 transition-colors"
              >
                <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary" />
                  8. Roadmap
                </h2>
                {expandedSection === "roadmap" ? (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              <AnimatePresence>
                {expandedSection === "roadmap" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-6 text-sm text-muted-foreground content-read">
                      <div>
                        <Badge className="mb-2">Q1 2026 (Current)</Badge>
                        <ul className="space-y-1 ml-4 list-disc">
                          <li>Launch marketplace and DeFi staking</li>
                          <li>Release first 1,000 Genesis Mons</li>
                          <li>Open Quick Battle and Ranked Arena</li>
                        </ul>
                      </div>
                      <div>
                        <Badge className="mb-2">Q2 2026</Badge>
                        <ul className="space-y-1 ml-4 list-disc">
                          <li>Launch breeding system and Mon evolution</li>
                          <li>Introduce Guild Wars and Territory Control</li>
                          <li>Add liquidity pools for FROZ pairs</li>
                          <li>Release mobile app (iOS + Android)</li>
                        </ul>
                      </div>
                      <div>
                        <Badge className="mb-2">Q3 2026</Badge>
                        <ul className="space-y-1 ml-4 list-disc">
                          <li>Launch DAO governance and voting</li>
                          <li>Introduce community servers (custom game modes)</li>
                          <li>Add voice chat and streaming integration</li>
                          <li>Release 5,000 new Mons (Gen 2)</li>
                        </ul>
                      </div>
                      <div>
                        <Badge className="mb-2">Q4 2026 & Beyond</Badge>
                        <ul className="space-y-1 ml-4 list-disc">
                          <li>Cross-chain expansion (Polygon, Arbitrum, Base)</li>
                          <li>VR/AR support for immersive battles</li>
                          <li>Esports tournaments with $1M+ prize pools</li>
                          <li>AI-generated content (procedural Mons, dynamic events)</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">Ready to join the Arn-Apex ecosystem?</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to={routePaths.gameplay}>Start Playing</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to={routePaths.marketplace}>Browse Marketplace</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to={routePaths.contact}>Contact Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
