import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Coins } from "lucide-react";
import { routePaths } from "@/config/routes";

/** Trending / recent fashion items in the game – shown on home as game content */
const TRENDING_ITEMS = [
  { id: 110, name: "Quantum Drive", price: "50,000", image: "/assets/item-chip.png", rarity: "Mythic", type: "Part" },
  { id: 112, name: "Shadow Cloak", price: "6,700", image: "/assets/item-cloak.png", rarity: "Epic", type: "Part" },
  { id: 106, name: "Fusion Core", price: "8,900", image: "/assets/item-cell.png", rarity: "Legendary", type: "Material" },
  { id: 101, name: "Cyber-Draco", price: "12,500", image: "/assets/nft-mon-1.png", rarity: "Legendary", type: "Unit" },
  { id: 105, name: "Data-Scroll", price: "3,300", image: "/assets/item-scroll.png", rarity: "Rare", type: "Consumable" },
  { id: 108, name: "Titanium Plating", price: "2,400", image: "/assets/item-legs.png", rarity: "Rare", type: "Part" },
];

export default function RecentFashionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="section bg-background border-t border-border" ref={ref} aria-label="Recent fashion">
      <div className="section-container">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              Recent fashion
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Trending items and hot picks in the game right now
            </p>
          </div>
          <Link
            to={routePaths.marketplace}
            className="text-sm font-medium text-primary hover:underline shrink-0"
          >
            View all →
          </Link>
        </motion.div>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {TRENDING_ITEMS.map((item, i) => (
            <Link
              key={item.id}
              to={routePaths.marketplace}
              className="group block rounded-xl border border-border bg-card/50 overflow-hidden hover:border-primary/40 hover:bg-card/80 transition-all"
            >
              <div className="aspect-square bg-black/30 relative flex items-center justify-center p-4">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-primary/20 text-primary border border-primary/30">
                  {item.type}
                </span>
              </div>
              <div className="p-3">
                <p className="text-xs text-muted-foreground mb-0.5">{item.rarity}</p>
                <p className="text-sm font-semibold text-foreground truncate">{item.name}</p>
                <div className="flex items-center gap-1 mt-1 text-primary font-mono text-xs">
                  <Coins className="h-3 w-3" />
                  {item.price} FROZ
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
