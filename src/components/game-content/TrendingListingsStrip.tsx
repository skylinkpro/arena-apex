import { Link } from "react-router-dom";
import { Coins } from "lucide-react";
import { routePaths } from "@/config/routes";

const TRENDING = [
  { id: 110, name: "Quantum Drive", price: "50,000", image: "/assets/item-chip.png", rarity: "Mythic" },
  { id: 112, name: "Shadow Cloak", price: "6,700", image: "/assets/item-cloak.png", rarity: "Epic" },
  { id: 106, name: "Fusion Core", price: "8,900", image: "/assets/item-cell.png", rarity: "Legendary" },
  { id: 101, name: "Cyber-Draco", price: "12,500", image: "/assets/nft-mon-1.png", rarity: "Legendary" },
];

export default function TrendingListingsStrip() {
  return (
    <section className="section border-t border-border bg-background" aria-label="Trending listings">
      <div className="section-container">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-heading font-semibold text-foreground">Trending this week</h3>
          <Link to={routePaths.marketplace} className="text-sm text-primary hover:underline">
            Browse marketplace
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TRENDING.map((item) => (
            <Link
              key={item.id}
              to={routePaths.marketplace}
              className="rounded-xl border border-border bg-card/50 overflow-hidden hover:border-primary/40 hover:bg-card/80 transition-all group"
            >
              <div className="aspect-square bg-black/30 flex items-center justify-center p-4">
                <img src={item.image} alt="" className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-3">
                <p className="text-xs text-muted-foreground">{item.rarity}</p>
                <p className="text-sm font-semibold text-foreground truncate">{item.name}</p>
                <div className="flex items-center gap-1 mt-1 text-primary font-mono text-xs">
                  <Coins className="h-3 w-3" />
                  {item.price} FROZ
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
