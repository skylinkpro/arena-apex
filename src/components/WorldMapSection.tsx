import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Globe, MapPin, Users, Zap, Shield } from "lucide-react";

const WorldMapSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const regions = [
    {
      name: "Neo-Tokyo Sector",
      status: "High Activity",
      players: 1240,
      control: "AI Alliance",
      danger: "Low",
      description:
        "The hub of technological advancement and AI training centers.",
      color: "border-blue-500",
    },
    {
      name: "Crimson Wastelands",
      status: "Battle Zone",
      players: 850,
      control: "Rebel Bots",
      danger: "Extreme",
      description:
        "Hostile environment where the strongest AI agents compete for resources.",
      color: "border-red-500",
    },
    {
      name: "Azure Archipelago",
      status: "Stable",
      players: 420,
      control: "Neutral",
      danger: "Medium",
      description:
        "A series of floating islands dedicated to peaceful NFT breeding.",
      color: "border-cyan-500",
    },
    {
      name: "Void Dimension",
      status: "Unknown",
      players: 150,
      control: "Unknown",
      danger: "Critical",
      description: "A mysterious region where physics and AI logic breakdown.",
      color: "border-purple-500",
    },
  ];

  return (
    <section className="py-20 bg-cosmic overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-4">
            Explore the Universe
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Navigate through diverse sectors, each with its own economy, AI
            behavior, and challenges.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Visualization Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative bg-card/20 border border-primary/20 rounded-3xl p-8 flex items-center justify-center min-h-[400px] overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1)_0%,transparent_70%)]" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <Globe className="w-64 h-64 text-primary/20" />
            </motion.div>

            {regions.map((region, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="relative group">
                  <MapPin className="text-primary w-6 h-6" />
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-background/90 border border-primary/20 px-2 py-1 rounded text-xs font-bold">
                    {region.name}
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="absolute bottom-8 left-8 right-8 bg-background/40 backdrop-blur-md p-4 rounded-xl border border-primary/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold"
                      >
                        AI
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">
                    3,450 Agents Online
                  </span>
                </div>
                <div className="text-xs font-mono text-primary animate-pulse">
                  SYSTEM STABLE
                </div>
              </div>
            </div>
          </motion.div>

          {/* Region Data List */}
          <div className="space-y-4">
            {regions.map((region, index) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={`p-5 bg-card/40 border-l-4 ${region.color} hover:glow-primary transition-all cursor-pointer group`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                        {region.name}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {region.description}
                      </p>
                    </div>
                    {/* <Badge variant="outline" className="text-[10px] uppercase">{region.status}</Badge> */}
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-3 border-t border-white/5">
                    <div className="flex items-center space-x-2">
                      <Users size={12} className="text-muted-foreground" />
                      <span className="text-xs font-bold">
                        {region.players}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield size={12} className="text-muted-foreground" />
                      <span className="text-xs font-bold">
                        {region.control}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap size={12} className="text-muted-foreground" />
                      <span className="text-xs font-bold">{region.danger}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorldMapSection;
