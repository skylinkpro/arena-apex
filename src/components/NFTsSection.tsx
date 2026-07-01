import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sword, Brain, Dna, TrendingUp, Zap } from "lucide-react";
import { AssetDetailModal, type AssetDetail } from "@/components/AssetDetailModal";

const NFTsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedMon, setSelectedMon] = useState<number | null>(null);

  const mons = [
    {
      id: 1,
      name: "Cyber-Draco",
      role: "Assault / Tank",
      rarity: "Legendary",
      image: "/assets/nft-mon-1.png",
      stats: { str: 95, agi: 60, int: 40, def: 85 },
      description: "A heavyweight combat unit reinforced with titanium plating. Specializes in frontline generated assaults.",
      abilities: ["Inferno Breath", "Titan Shield", "Seismic Stomp"],
      dna: "Draconic-X7"
    },
    {
      id: 2,
      name: "Neon-Viper",
      role: "Assassin / Scout",
      rarity: "Epic",
      image: "/assets/nft-mon-2.png",
      stats: { str: 55, agi: 98, int: 65, def: 30 },
      description: "Stealth unit capable of optical camouflage. Deals critical damage to enemy backlines.",
      abilities: ["Shadow Strike", "Venom Byte", "Flash Step"],
      dna: "Serpent-V2"
    },
    {
      id: 3,
      name: "Mecha-Kong",
      role: "Brawler / Siege",
      rarity: "Rare",
      image: "/assets/nft-mon-3.png",
      stats: { str: 90, agi: 50, int: 35, def: 75 },
      description: "Siege breaker unit designed to destroy fortifications. Extremely durable in close combat.",
      abilities: ["Rocket Punch", "Primal Rage", "Ground Slam"],
      dna: "Primate-K9"
    },
    {
      id: 4,
      name: "Aether-Wisp",
      role: "Support / Controller",
      rarity: "Mythic",
      image: "/assets/nft-mon-4.png", // Using newly generated asset
      stats: { str: 40, agi: 90, int: 99, def: 45 },
      description: "A being of pure energy and code. It manipulates the battlefield by hacking enemy systems and boosting allies.",
      abilities: ["System Overload", "Firewall", "Data Drain"],
      dna: "Spectral-01"
    }
  ];

  const selectedAsset: AssetDetail | null = useMemo(() => {
    if (selectedMon == null) return null;
    const m = mons.find((mo) => mo.id === selectedMon);
    if (!m) return null;
    return {
      id: m.id,
      name: m.name,
      image: m.image,
      rarity: m.rarity,
      description: m.description,
      geneticId: m.dna,
      stats: m.stats,
      abilities: m.abilities,
    };
  }, [selectedMon, mons]);

  return (
    <section id="nfts" className="section bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1),transparent_70%)]" />

      <div className="section-container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-4">
            Genetically Engineered Mons
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Own unique, evolvable 3D Mons. Each Mon has its own neural network that learns from battle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
          {mons.map((mon, index) => (
            <motion.div
              key={mon.id}
              initial={{ opacity: 0, rotateY: 90 }}
              animate={isInView ? { opacity: 1, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.05, rotateY: 5, z: 50 }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedMon(mon.id)}
            >
              <Card className="bg-card/30 backdrop-blur border-primary/20 overflow-hidden h-[400px] flex flex-col relative group-hover:border-primary transition-colors">
                <div className="absolute top-2 right-2 z-10">
                  <Badge variant="outline" className="bg-black/50 border-white/20 text-xs backdrop-blur">
                    #{mon.id.toString().padStart(4, '0')}
                  </Badge>
                </div>

                <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-black/50 to-primary/5">
                  <img
                    src={mon.image}
                    alt={mon.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>

                <div className="p-4 relative z-10">
                  <div className="text-xs font-mono text-primary mb-1 tracking-wider uppercase">{mon.rarity} Class</div>
                  <h3 className="text-2xl font-bold font-heading mb-2">{mon.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Sword size={14} /> {mon.role}
                  </div>
                </div>

                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </Card>
            </motion.div>
          ))}
        </div>

        <AssetDetailModal
          open={selectedMon != null}
          onClose={() => setSelectedMon(null)}
          asset={selectedAsset}
        />
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
              <Brain className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-heading">Neural Growth</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
              Unlike static NFTs, your Mon's neural network actually learns from every battle. Its strategy evolves based on your commands and opponent data.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto text-accent">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-heading">True Value</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
              Verified utility and rarity. A Level 50 Mon with a unique trained combat style holds significantly more market value than a fresh mint.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto text-secondary">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-heading">Combat Power</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
              Deploy your best Agents to govern zones, defend resources, or mercenary for other players. Your asset is a functional unit in the ecosystem.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NFTsSection;
