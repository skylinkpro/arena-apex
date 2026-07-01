import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Medal, Star, TrendingUp } from "lucide-react";

const LeaderboardSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const players = [
    { rank: 1, name: "NeuralKnight", wins: 142, earnings: "12.5 ETH", winRate: "85%", change: "+2" },
    { rank: 2, name: "CryptoSamurai", wins: 138, earnings: "11.2 ETH", winRate: "82%", change: "-1" },
    { rank: 3, name: "AIAgent_007", wins: 135, earnings: "10.8 ETH", winRate: "88%", change: "0" },
    { rank: 4, name: "BitMaster", wins: 128, earnings: "9.5 ETH", winRate: "79%", change: "+5" },
    { rank: 5, name: "VoidWalker", wins: 122, earnings: "8.9 ETH", winRate: "76%", change: "-2" },
    { rank: 6, name: "CyberGhost", wins: 118, earnings: "8.2 ETH", winRate: "74%", change: "+1" },
  ];

  return (
    <section className="section bg-background" ref={ref}>
      <div className="section-container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-4">
            Elite Leaderboard
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The top performers in the Arn-Apex arena. Real-time ranking based on wins, earnings, and AI strategy efficiency.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Top 3 Podium */}
          {players.slice(0, 3).map((player, index) => (
            <motion.div
              key={player.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className={`p-8 text-center relative overflow-hidden transition-all duration-300 hover:glow-primary ${
                index === 0 ? "border-primary/50 bg-primary/5 scale-110 z-10" : "border-primary/20 bg-card/50"
              }`}>
                {index === 0 && (
                  <div className="absolute top-0 right-0 p-4">
                     <Trophy className="text-primary w-8 h-8" />
                  </div>
                )}
                <div className="mb-4 flex justify-center">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 ${
                    index === 0 ? "border-primary bg-primary/20" : 
                    index === 1 ? "border-secondary bg-secondary/20" : "border-accent bg-accent/20"
                  }`}>
                    {index === 0 ? <Medal size={40} className="text-primary" /> :
                     index === 1 ? <Star size={40} className="text-secondary" /> :
                     <Star size={40} className="text-accent" />
                    }
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{player.name}</h3>
                <div className="text-primary font-mono text-xl mb-4">{player.earnings}</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-muted-foreground">Wins: <span className="text-foreground font-bold">{player.wins}</span></div>
                  <div className="text-muted-foreground">Rate: <span className="text-foreground font-bold">{player.winRate}</span></div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-card/50 border-primary/20 overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-20">Rank</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead>Total Wins</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead>Win Rate</TableHead>
                  <TableHead className="text-right">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {players.map((player) => (
                  <TableRow key={player.rank} className="hover:bg-primary/5 transition-colors group">
                    <TableCell className="font-bold">#{player.rank}</TableCell>
                    <TableCell className="font-medium group-hover:text-primary transition-colors">
                      {player.name}
                    </TableCell>
                    <TableCell>{player.wins}</TableCell>
                    <TableCell className="font-mono text-primary">{player.earnings}</TableCell>
                    <TableCell>{player.winRate}</TableCell>
                    <TableCell className="text-right">
                      <span className={`flex items-center justify-end space-x-1 ${
                        player.change.startsWith("+") ? "text-green-500" : 
                        player.change.startsWith("-") ? "text-red-500" : "text-muted-foreground"
                      }`}>
                        {player.change !== "0" && <TrendingUp size={14} />}
                        <span className="text-xs font-bold">{player.change === "0" ? "STABLE" : player.change}</span>
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default LeaderboardSection;
