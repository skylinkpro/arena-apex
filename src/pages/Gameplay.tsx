import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import SimpleBattleGame from "@/components/SimpleBattleGame";
import GameplaySection from "@/components/GameplaySection";
import LeaderboardSection from "@/components/LeaderboardSection";
import {
  RecentGameActivity,
  LiveStatsStrip,
} from "@/components/game-content";
import { routePaths } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Swords,
  Trophy,
  Users,
  Shield,
  Zap,
  Clock,
  Target,
  ChevronRight,
  Play,
  Crown,
  Flame,
} from "lucide-react";

export default function Gameplay() {
  const [showMatchTypes, setShowMatchTypes] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  const gameModes = [
    {
      id: "quick",
      name: "Quick Battle",
      icon: Zap,
      duration: "3–5 min",
      players: "1v1",
      rewards: "50–100 FROZ",
      description: "Fast-paced matches for testing strategies and warming up.",
    },
    {
      id: "ranked",
      name: "Ranked Arena",
      icon: Trophy,
      duration: "10–15 min",
      players: "1v1",
      rewards: "200–500 FROZ + Rank Points",
      description: "Competitive matches that affect your global ranking and season rewards.",
    },
    {
      id: "tournament",
      name: "Tournaments",
      icon: Crown,
      duration: "1–2 hours",
      players: "16–64 players",
      rewards: "5,000–50,000 FROZ + Exclusive NFTs",
      description: "Weekly tournaments with elimination brackets. Top 10 win big prizes.",
    },
    {
      id: "guild",
      name: "Guild Wars",
      icon: Users,
      duration: "3–7 days",
      players: "Guild vs Guild",
      rewards: "Territory Control + Guild Treasury",
      description: "Coordinate with your guild to control zones on the world map.",
    },
  ];

  const rewardBreakdown = [
    { place: "1st Place", froz: "10,000", nft: "Exclusive Legendary Mon", badge: "Champion Title" },
    { place: "2nd–3rd", froz: "5,000", nft: "Epic Mon or Part", badge: "Elite Title" },
    { place: "4th–10th", froz: "2,000", nft: "Rare Materials Pack", badge: "Competitor Badge" },
    { place: "11th–50th", froz: "500", nft: "—", badge: "Participant Badge" },
  ];

  return (
    <div className="min-h-screen bg-background pt-[var(--navbar-h)]">
      {/* Page header */}
      <section className="section border-b border-border bg-card/30">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                Gameplay
              </h1>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Quick battles, ranked matches, and community servers. Play with the community and climb the leaderboard.
              </p>
            </div>
            <Button asChild className="shrink-0 w-fit">
              <Link to={routePaths.nfts}>Equip Mons</Link>
            </Button>
          </div>
        </div>
      </section>

      <LiveStatsStrip />

      {/* Game Explanation */}
      <section className="section bg-background">
        <div className="section-container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              How to Play
            </h2>
            <div className="content-read space-y-3 text-muted-foreground">
              <p>
                <strong className="text-foreground">Arn-Apex gameplay</strong> is built around strategic battles where you deploy Mons with 
                unique abilities and stats. Each match is real-time: you choose when to use abilities, when to defend, and when to go all-in.
              </p>
              <p>
                <strong className="text-foreground">Combat System:</strong> Battles use a turn-based system with real-time ability activation. 
                Your Mon's STR determines physical damage, AGI affects speed and evasion, INT powers abilities, and DEF reduces incoming damage. 
                Timing your abilities and reading your opponent's strategy is key to victory.
              </p>
              <p>
                <strong className="text-foreground">Progression:</strong> Win battles to earn XP for your Mons and FROZ tokens for yourself. 
                As your Mons level up, they unlock new abilities and stat boosts. Reach Level 25, 50, or 75 to trigger evolution stages.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <Button onClick={() => setShowMatchTypes(!showMatchTypes)} variant="outline">
                {showMatchTypes ? "Hide" : "Show"} Match Types
              </Button>
              <Button onClick={() => setShowRewards(!showRewards)} variant="outline">
                {showRewards ? "Hide" : "View"} Reward Structure
              </Button>
            </div>

            <AnimatePresence>
              {showMatchTypes && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 overflow-hidden"
                >
                  <Card className="p-6 bg-card/60 border-border">
                    <h3 className="text-lg font-heading font-bold mb-4">Match Types</h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li>
                        <strong className="text-foreground">1v1 Duel:</strong> Standard format. Best of 3 rounds. First to 2 wins takes the match.
                      </li>
                      <li>
                        <strong className="text-foreground">3v3 Team Battle:</strong> Deploy a team of 3 Mons. Switch between them mid-battle 
                        to counter your opponent's lineup.
                      </li>
                      <li>
                        <strong className="text-foreground">Survival Mode:</strong> Face waves of AI opponents. See how far you can go. 
                        Leaderboard tracks longest streaks.
                      </li>
                      <li>
                        <strong className="text-foreground">Territory Siege:</strong> Attack or defend a zone on the world map. 
                        Winning team controls the zone and earns passive FROZ.
                      </li>
                    </ul>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showRewards && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 overflow-hidden"
                >
                  <Card className="p-6 bg-card/60 border-border">
                    <h3 className="text-lg font-heading font-bold mb-4">Tournament Rewards</h3>
                    <div className="space-y-3">
                      {rewardBreakdown.map((r) => (
                        <div key={r.place} className="flex flex-wrap items-center gap-3 pb-3 border-b border-border last:border-0">
                          <Badge className="shrink-0">{r.place}</Badge>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-foreground font-medium">{r.froz} FROZ</div>
                            <div className="text-xs text-muted-foreground">{r.nft} • {r.badge}</div>
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

      {/* Game Modes Grid */}
      <section className="section bg-muted/20 border-t border-border">
        <div className="section-container">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
            Game Modes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gameModes.map((mode) => (
              <Card
                key={mode.id}
                className={`p-6 bg-card/60 border-border cursor-pointer transition-all hover:border-primary/40 hover:bg-card/80 ${
                  selectedMode === mode.id ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => setSelectedMode(selectedMode === mode.id ? null : mode.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <mode.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-1">{mode.name}</h3>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {mode.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {mode.players}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{mode.description}</p>
                    <Badge variant="outline" className="text-xs">
                      Rewards: {mode.rewards}
                    </Badge>
                  </div>
                </div>
                <AnimatePresence>
                  {selectedMode === mode.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-border overflow-hidden"
                    >
                      <Button size="sm" className="w-full" asChild>
                        <Link to={routePaths.gameplay}>
                          <Play className="h-4 w-4 mr-2" />
                          Start {mode.name}
                        </Link>
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Play now section */}
      <section className="section bg-background border-t border-border">
        <div className="section-container max-w-2xl mx-auto text-center">
          <motion.h2
            className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Try a Quick Battle
          </motion.h2>
          <motion.p
            className="text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            Attack to deal damage — reduce the enemy to 0 HP to win.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <SimpleBattleGame />
          </motion.div>
        </div>
      </section>

      <GameplaySection />
      <LeaderboardSection />
      <RecentGameActivity />
    </div>
  );
}
