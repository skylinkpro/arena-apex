import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import NFTsSection from "@/components/NFTsSection";
import {
  FeaturedMonsStrip,
  RecentGameActivity,
  LiveStatsStrip,
} from "@/components/game-content";
import { routePaths } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Dna,
  Zap,
  TrendingUp,
  Shield,
  Swords,
  ChevronDown,
  ChevronRight,
  Activity,
  Sparkles,
} from "lucide-react";

export default function NFTs() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showBreeding, setShowBreeding] = useState(false);
  const [showEvolution, setShowEvolution] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const monCategories = [
    { id: "all", label: "All Mons", count: 4269 },
    { id: "assault", label: "Assault", count: 1245 },
    { id: "support", label: "Support", count: 892 },
    { id: "scout", label: "Scout", count: 1034 },
    { id: "tank", label: "Tank", count: 1098 },
  ];

  const rarityDistribution = [
    { rarity: "Common", count: 2145, percentage: 50, color: "bg-gray-500" },
    { rarity: "Rare", count: 1284, percentage: 30, color: "bg-blue-500" },
    { rarity: "Epic", count: 640, percentage: 15, color: "bg-purple-500" },
    { rarity: "Legendary", count: 170, percentage: 4, color: "bg-orange-500" },
    { rarity: "Mythic", count: 30, percentage: 1, color: "bg-pink-500" },
  ];

  return (
    <div className="min-h-screen bg-background pt-[var(--navbar-h)]">
      {/* Page header */}
      <section className="section border-b border-border bg-card/30">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                Mons Collection
              </h1>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Genetically engineered units with neural networks that learn from battle. Own, evolve, and trade unique Mons in the Arn-Apex ecosystem.
              </p>
            </div>
            <Button asChild className="shrink-0 w-fit">
              <Link to={routePaths.marketplace}>Trade Mons</Link>
            </Button>
          </div>
        </div>
      </section>

      <LiveStatsStrip />

      {/* Game Explanation: What are Mons? */}
      <section className="section bg-background">
        <div className="section-container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              What are Mons?
            </h2>
            <div className="content-read space-y-3 text-muted-foreground">
              <p>
                Mons are <strong className="text-foreground">AI-powered combat units</strong> that you own as NFTs. Unlike static collectibles, 
                each Mon has a neural network that learns from every battle it fights. Your Mon's strategy, timing, and ability usage evolve 
                based on your playstyle and the opponents it faces.
              </p>
              <p>
                Every Mon has <strong className="text-foreground">combat stats</strong> (Strength, Agility, Intelligence, Defense), 
                <strong className="text-foreground"> active abilities</strong> (special moves with cooldowns), and a 
                <strong className="text-foreground"> genetic sequence</strong> (DNA) that determines its appearance and potential.
              </p>
              <p>
                Mons can be <strong className="text-foreground">bred</strong> to create offspring with combined traits, 
                <strong className="text-foreground"> evolved</strong> through experience and items, and 
                <strong className="text-foreground"> traded</strong> on the marketplace. A Level 50 Mon with a unique trained combat style 
                holds significantly more value than a fresh mint.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <Button onClick={() => setShowBreeding(!showBreeding)} variant="outline">
                {showBreeding ? "Hide" : "Learn About"} Breeding
              </Button>
              <Button onClick={() => setShowEvolution(!showEvolution)} variant="outline">
                {showEvolution ? "Hide" : "Learn About"} Evolution
              </Button>
              <Button onClick={() => setShowStats(!showStats)} variant="outline">
                {showStats ? "Hide" : "View"} Stat System
              </Button>
            </div>

            <AnimatePresence>
              {showBreeding && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 overflow-hidden"
                >
                  <Card className="p-6 bg-card/60 border-border">
                    <h3 className="text-lg font-heading font-bold mb-3 flex items-center gap-2">
                      <Dna className="h-5 w-5 text-primary" />
                      Breeding System
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Combine two Mons to create offspring with traits from both parents. Genetic algorithms determine which stats, 
                      abilities, and appearance features are passed down. Rare combinations can produce Mythic-tier offspring.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Breeding costs 500 FROZ + materials</li>
                      <li>• Offspring inherits 50–70% of parent stats</li>
                      <li>• 5% chance of mutation (new ability or stat boost)</li>
                      <li>• Each Mon can breed up to 7 times</li>
                    </ul>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showEvolution && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 overflow-hidden"
                >
                  <Card className="p-6 bg-card/60 border-border">
                    <h3 className="text-lg font-heading font-bold mb-3 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Evolution System
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Mons gain experience (XP) from battles and can level up to unlock stat increases and new abilities. 
                      At certain milestones (Level 25, 50, 75), Mons can evolve into more powerful forms with enhanced visuals.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Level 1–25: Base form, learns 2–3 abilities</li>
                      <li>• Level 25: First evolution (requires Evolution Stone)</li>
                      <li>• Level 50: Second evolution (requires Rare materials)</li>
                      <li>• Level 75+: Final form (Mythic-tier stats possible)</li>
                    </ul>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showStats && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 overflow-hidden"
                >
                  <Card className="p-6 bg-card/60 border-border">
                    <h3 className="text-lg font-heading font-bold mb-3 flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      Combat Stats Explained
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground flex items-center gap-2">
                            <Swords className="h-4 w-4 text-red-500" />
                            STR (Strength)
                          </span>
                          <span className="text-xs text-muted-foreground">Physical damage</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground flex items-center gap-2">
                            <Zap className="h-4 w-4 text-yellow-500" />
                            AGI (Agility)
                          </span>
                          <span className="text-xs text-muted-foreground">Speed & evasion</span>
                        </div>
                        <Progress value={70} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground flex items-center gap-2">
                            <Brain className="h-4 w-4 text-blue-500" />
                            INT (Intelligence)
                          </span>
                          <span className="text-xs text-muted-foreground">Ability power</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground flex items-center gap-2">
                            <Shield className="h-4 w-4 text-green-500" />
                            DEF (Defense)
                          </span>
                          <span className="text-xs text-muted-foreground">Damage reduction</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Mon Categories */}
      <section className="section bg-muted/20 border-t border-border">
        <div className="section-container">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {monCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-4 rounded-xl border transition-all ${
                  selectedCategory === cat.id
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-card/40 text-muted-foreground hover:border-primary/40 hover:bg-card/60"
                }`}
              >
                <div className="text-2xl font-bold font-mono">{cat.count.toLocaleString()}</div>
                <div className="text-sm mt-1">{cat.label}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Rarity Distribution */}
      <section className="section bg-background border-t border-border">
        <div className="section-container max-w-3xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6 text-center">
            Rarity Distribution
          </h2>
          <Card className="p-6 bg-card/60 border-border">
            <div className="space-y-4">
              {rarityDistribution.map((r) => (
                <div key={r.rarity}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`h-3 w-3 rounded-full ${r.color}`} />
                      <span className="text-sm font-medium text-foreground">{r.rarity}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{r.count.toLocaleString()} Mons</span>
                      <span className="text-sm font-mono text-foreground">{r.percentage}%</span>
                    </div>
                  </div>
                  <Progress value={r.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Main NFTs grid */}
      <NFTsSection />

      {/* Mon Abilities Explanation */}
      <section className="section bg-muted/20 border-t border-border">
        <div className="section-container max-w-4xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
            Active Abilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-card/60 border-border">
              <h3 className="text-lg font-heading font-semibold mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Offensive Abilities
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <strong className="text-foreground">Inferno Breath:</strong> Deals 120% STR damage to target and 40% splash to nearby enemies. 
                  Cooldown: 8 seconds.
                </li>
                <li>
                  <strong className="text-foreground">Shadow Strike:</strong> Teleports behind target and deals 200% AGI damage. 
                  Cooldown: 12 seconds.
                </li>
                <li>
                  <strong className="text-foreground">Rocket Punch:</strong> Launches a projectile dealing 150% STR damage and stunning for 2 seconds. 
                  Cooldown: 10 seconds.
                </li>
              </ul>
            </Card>
            <Card className="p-6 bg-card/60 border-border">
              <h3 className="text-lg font-heading font-semibold mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Defensive Abilities
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <strong className="text-foreground">Titan Shield:</strong> Grants 50% damage reduction for 5 seconds. 
                  Cooldown: 15 seconds.
                </li>
                <li>
                  <strong className="text-foreground">Firewall:</strong> Creates a barrier that blocks 1 incoming attack. 
                  Cooldown: 18 seconds.
                </li>
                <li>
                  <strong className="text-foreground">System Overload:</strong> Disables enemy abilities for 3 seconds. 
                  Cooldown: 20 seconds.
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive: How to Get Mons */}
      <section className="section bg-background border-t border-border">
        <div className="section-container">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6 text-center">
            How to Get Mons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-card/60 border-border hover:border-primary/40 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-heading font-semibold mb-2">Buy on Marketplace</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Browse listings from other players. Prices range from 800 FROZ (Common) to 50,000+ FROZ (Mythic).
              </p>
              <Button size="sm" variant="outline" asChild className="w-full">
                <Link to={routePaths.marketplace}>
                  Browse <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </Card>
            <Card className="p-6 bg-card/60 border-border hover:border-primary/40 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Dna className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-heading font-semibold mb-2">Breed New Mons</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Own two Mons? Breed them to create offspring with combined genetics. Requires 500 FROZ + materials.
              </p>
              <Button size="sm" variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </Card>
            <Card className="p-6 bg-card/60 border-border hover:border-primary/40 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Swords className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-heading font-semibold mb-2">Win in Tournaments</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Compete in weekly tournaments. Top 10 players win exclusive Mons and large FROZ prizes.
              </p>
              <Button size="sm" variant="outline" asChild className="w-full">
                <Link to={routePaths.gameplay}>
                  View Tournaments <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <FeaturedMonsStrip />
      <RecentGameActivity />
    </div>
  );
}
