import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Swords, Zap, Gamepad2 } from "lucide-react";
import { routePaths } from "@/config/routes";

/** Featured game content: mons, battles, live activity */
const FEATURED_MONS = [
  { id: 1, name: "Cyber-Draco", image: "/assets/nft-mon-1.png", rarity: "Legendary", role: "Assault / Tank" },
  { id: 2, name: "Neon-Viper", image: "/assets/nft-mon-2.png", rarity: "Epic", role: "Assassin / Scout" },
  { id: 3, name: "Mecha-Kong", image: "/assets/nft-mon-3.png", rarity: "Rare", role: "Brawler / Siege" },
];

export default function FeaturedGameContentSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="section bg-muted/20 border-t border-border" ref={ref} aria-label="Featured game content">
      <div className="section-container">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
            Game content
          </h2>
          <p className="text-muted-foreground text-sm mt-1 max-w-xl mx-auto">
            Featured Mons, live battles, and what’s hot in the arena
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Link
              to={routePaths.gameplay}
              className="flex items-center gap-4 p-6 rounded-xl border border-border bg-card/50 hover:border-primary/40 hover:bg-card/80 transition-all group"
            >
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                <Gamepad2 className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">Play now</h3>
                <p className="text-sm text-muted-foreground">Quick battle, servers, ranks</p>
              </div>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <Link
              to={routePaths.nfts}
              className="flex items-center gap-4 p-6 rounded-xl border border-border bg-card/50 hover:border-primary/40 hover:bg-card/80 transition-all group"
            >
              <div className="h-14 w-14 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
                <Zap className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">Featured Mons</h3>
                <p className="text-sm text-muted-foreground">Genetically engineered units</p>
              </div>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Link
              to={routePaths.marketplace}
              className="flex items-center gap-4 p-6 rounded-xl border border-border bg-card/50 hover:border-primary/40 hover:bg-card/80 transition-all group"
            >
              <div className="h-14 w-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
                <Swords className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">Marketplace</h3>
                <p className="text-sm text-muted-foreground">Trade assets, NFTs, parts</p>
              </div>
            </Link>
          </motion.div>
        </div>
        <motion.div
          className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          {FEATURED_MONS.map((mon) => (
            <Link
              key={mon.id}
              to={routePaths.nfts}
              className="rounded-xl border border-border bg-card/40 overflow-hidden hover:border-primary/30 hover:bg-card/60 transition-all group"
            >
              <div className="aspect-square bg-black/40 flex items-center justify-center p-6">
                <img
                  src={mon.image}
                  alt=""
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{mon.rarity}</p>
                <p className="font-heading font-semibold text-foreground">{mon.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{mon.role}</p>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
