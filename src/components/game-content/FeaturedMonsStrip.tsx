import { Link } from "react-router-dom";
import { routePaths } from "@/config/routes";

const MONS = [
  { id: 1, name: "Cyber-Draco", image: "/assets/nft-mon-1.png", rarity: "Legendary", role: "Assault / Tank" },
  { id: 2, name: "Neon-Viper", image: "/assets/nft-mon-2.png", rarity: "Epic", role: "Assassin / Scout" },
  { id: 3, name: "Mecha-Kong", image: "/assets/nft-mon-3.png", rarity: "Rare", role: "Brawler / Siege" },
  { id: 4, name: "Aether-Wisp", image: "/assets/nft-mon-4.png", rarity: "Mythic", role: "Support / Controller" },
];

export default function FeaturedMonsStrip() {
  return (
    <section className="section border-t border-border bg-muted/20" aria-label="Featured Mons">
      <div className="section-container">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-heading font-semibold text-foreground">Hot this week</h3>
          <Link to={routePaths.nfts} className="text-sm text-primary hover:underline">
            View all Mons
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {MONS.map((mon) => (
            <Link
              key={mon.id}
              to={routePaths.nfts}
              className="rounded-xl border border-border bg-card/40 overflow-hidden hover:border-primary/40 hover:bg-card/60 transition-all group"
            >
              <div className="aspect-square bg-black/40 flex items-center justify-center p-4">
                <img src={mon.image} alt="" className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{mon.rarity}</p>
                <p className="font-heading font-semibold text-foreground truncate">{mon.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{mon.role}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
