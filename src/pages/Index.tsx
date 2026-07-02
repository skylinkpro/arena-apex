import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import {
  GlobalPulse,
  RecentFashionSection,
  FeaturedGameContentSection,
  HomeExplore,
} from "@/components/home";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Gamepad2,
  ShoppingCart,
  Coins,
  Users,
  TrendingUp,
  Zap,
  ChevronRight,
  Play,
  Trophy,
  Shield,
} from "lucide-react";
import { routePaths } from "@/config/routes";

export default function Index() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [showGameModes, setShowGameModes] = useState(false);
  const [showEconomy, setShowEconomy] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Hero onTryNow={() => navigate("/gameplay")} />
      <GlobalPulse />

      {/* Game Explanation Section */}
      <section className="section bg-background border-t border-border">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-heading font-bold text-foreground mb-6 text-center">
              What is Arn-Apex?
            </h2>
            <div className="content-read space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">Arn-Apex</strong> is a
                community-first online game where you battle with genetically
                engineered Mons, trade assets on a global marketplace, and
                participate in a living blockchain economy. Think Discord
                servers meets competitive gaming meets real-time trading—all in
                one unified hub.
              </p>
              <p>
                Every Mon you own is a unique NFT with its own neural network
                that learns from battles. As you play, your Mon evolves
                strategies, unlocks abilities, and increases in value. Win
                tournaments to earn FROZ tokens, trade items with players
                worldwide, and stake your assets in DeFi pools for passive
                rewards.
              </p>
              <p>
                Join servers, form guilds, challenge rivals in ranked matches,
                or simply browse the marketplace for rare parts and materials.
                The game runs 24/7 with live pricing, AI-driven recommendations,
                and instant liquidity for all assets.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center mt-8">
              <Button
                onClick={() => setShowGameModes(!showGameModes)}
                variant="outline"
              >
                {showGameModes ? "Hide" : "Show"} Game Modes
              </Button>
              <Button
                onClick={() => setShowEconomy(!showEconomy)}
                variant="outline"
              >
                {showEconomy ? "Hide" : "Show"} Economy Details
              </Button>
              <Button asChild>
                <Link to={routePaths.whitepaper}>Read Full Whitepaper</Link>
              </Button>
            </div>

            <AnimatePresence>
              {showGameModes && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 overflow-hidden"
                >
                  <Card className="p-6 bg-card/60 border-border">
                    <h3 className="text-xl font-heading font-bold mb-4">
                      Game Modes
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Play className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-foreground">
                            Quick Battle:
                          </strong>
                          <span className="text-muted-foreground ml-2">
                            Jump into a fast 1v1 match. Perfect for testing new
                            strategies or warming up.
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Trophy className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-foreground">
                            Ranked Arena:
                          </strong>
                          <span className="text-muted-foreground ml-2">
                            Climb the leaderboard in competitive matches. Earn
                            seasonal rewards and exclusive titles.
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-foreground">
                            Community Servers:
                          </strong>
                          <span className="text-muted-foreground ml-2">
                            Join Discord-style servers with custom rules,
                            tournaments, and guild battles.
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-foreground">
                            Territory Control:
                          </strong>
                          <span className="text-muted-foreground ml-2">
                            Deploy Mons to control zones on the world map. Earn
                            passive FROZ from controlled territories.
                          </span>
                        </div>
                      </li>
                    </ul>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showEconomy && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 overflow-hidden"
                >
                  <Card className="p-6 bg-card/60 border-border">
                    <h3 className="text-xl font-heading font-bold mb-4">
                      Game Economy
                    </h3>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>
                        <strong className="text-foreground">FROZ Token:</strong>{" "}
                        The primary currency for all transactions. Earn FROZ by
                        winning battles, completing quests, or staking assets.
                        Use it to buy items, upgrade Mons, or trade on the
                        marketplace.
                      </p>
                      <p>
                        <strong className="text-foreground">NFT Mons:</strong>{" "}
                        Each Mon is a unique ERC-721 token with on-chain stats
                        and abilities. Mons can be bred, evolved, and traded.
                        Rare genetic combinations command premium prices.
                      </p>
                      <p>
                        <strong className="text-foreground">
                          In-Game Items:
                        </strong>{" "}
                        Parts, materials, consumables, and upgrades are ERC-1155
                        tokens. They're fully tradable and can be used to
                        enhance your Mons or sold for profit.
                      </p>
                      <p>
                        <strong className="text-foreground">
                          DeFi Integration:
                        </strong>{" "}
                        Stake FROZ in liquidity pools, provide liquidity for
                        trading pairs, or participate in yield farming. All DeFi
                        rewards are automatically distributed on-chain.
                      </p>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Interactive Features Tabs */}
      <section className="section bg-muted/20 border-t border-border">
        <div className="section-container">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6 text-center">
            Core Features
          </h2>
          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="w-full"
          >
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trading">Trading</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 bg-card/60 border-border">
                  <Gamepad2 className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-lg font-heading font-bold mb-2">
                    Play & Earn
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Battle with Mons, win tournaments, and earn FROZ tokens.
                    Every match rewards skill and strategy.
                  </p>
                  <Button size="sm" asChild className="w-full">
                    <Link to={routePaths.gameplay}>Start Playing</Link>
                  </Button>
                </Card>
                <Card className="p-6 bg-card/60 border-border">
                  <ShoppingCart className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-lg font-heading font-bold mb-2">
                    Trade Assets
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Buy and sell Mons, parts, and items on the global
                    marketplace with instant liquidity.
                  </p>
                  <Button size="sm" asChild className="w-full">
                    <Link to={routePaths.marketplace}>Browse Market</Link>
                  </Button>
                </Card>
                <Card className="p-6 bg-card/60 border-border">
                  <Coins className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-lg font-heading font-bold mb-2">
                    Stake & Earn
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Stake FROZ tokens or provide liquidity to earn passive
                    rewards from the DeFi protocol.
                  </p>
                  <Button size="sm" asChild className="w-full">
                    <Link to={routePaths.defihub}>Open DeFi Hub</Link>
                  </Button>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trading" className="space-y-6">
              <Card className="p-6 bg-card/60 border-border">
                <h3 className="text-xl font-heading font-bold mb-4">
                  Trading Features
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">
                        Real-Time Pricing:
                      </strong>
                      <p className="text-sm text-muted-foreground mt-1">
                        AI-powered price discovery updates every second based on
                        supply, demand, and market sentiment.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">
                        Instant Swaps:
                      </strong>
                      <p className="text-sm text-muted-foreground mt-1">
                        Trade any asset for FROZ or other tokens instantly via
                        automated market maker (AMM) pools.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">
                        Secure Escrow:
                      </strong>
                      <p className="text-sm text-muted-foreground mt-1">
                        All trades execute via smart contracts. Assets are held
                        in escrow until both parties confirm.
                      </p>
                    </div>
                  </li>
                </ul>
                <Button className="w-full mt-6" asChild>
                  <Link to={routePaths.marketplace}>
                    Explore Marketplace{" "}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </Card>
            </TabsContent>
            <TabsContent value="community" className="space-y-6">
              <Card className="p-6 bg-card/60 border-border">
                <h3 className="text-xl font-heading font-bold mb-4">
                  Community Features
                </h3>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">
                      Discord-Style Servers:
                    </strong>{" "}
                    Create or join community servers with custom rules,
                    tournaments, and private channels. Each server can have its
                    own economy and governance.
                  </p>
                  <p>
                    <strong className="text-foreground">
                      Guilds & Alliances:
                    </strong>{" "}
                    Form guilds with other players to compete in territory
                    control, guild wars, and seasonal events. Share resources
                    and strategies.
                  </p>
                  <p>
                    <strong className="text-foreground">
                      Live Chat & Voice:
                    </strong>{" "}
                    Built-in chat and voice channels for coordinating battles,
                    negotiating trades, and hanging out with the community.
                  </p>
                  <p>
                    <strong className="text-foreground">
                      Tournaments & Events:
                    </strong>{" "}
                    Weekly tournaments with prize pools in FROZ. Special events
                    introduce limited-edition items and exclusive Mons.
                  </p>
                </div>
                <Button className="w-full mt-6" asChild>
                  <Link to={routePaths.ecosystem}>
                    View Ecosystem <ChevronRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <RecentFashionSection />
      <FeaturedGameContentSection />
      <HomeExplore />
    </div>
  );
}
