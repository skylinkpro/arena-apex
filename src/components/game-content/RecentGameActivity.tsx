import { Link } from "react-router-dom";
import { Activity, Swords, Coins } from "lucide-react";
import { routePaths } from "@/config/routes";

const RECENT = [
  { type: "trade", from: "NeonTrader", to: "VoidWalker", item: "Cyber-Draco", time: "2m ago" },
  { type: "battle", winner: "NeuralKnight", vs: "CryptoSamurai", time: "4m ago" },
  { type: "trade", from: "ScrapLord", to: "Armorer", item: "Mech-Legs Mk.II", time: "6m ago" },
  { type: "battle", winner: "AIAgent_007", vs: "BitMaster", time: "8m ago" },
];

export default function RecentGameActivity() {
  return (
    <section className="section border-t border-border bg-muted/20" aria-label="Recent game activity">
      <div className="section-container">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-heading font-semibold text-foreground flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Recent game activity
          </h3>
          <Link to={routePaths.marketplace} className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RECENT.map((e, i) => (
            <li
              key={i}
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card/40 text-sm"
            >
              {e.type === "trade" ? (
                <Coins className="h-4 w-4 text-primary shrink-0" />
              ) : (
                <Swords className="h-4 w-4 text-secondary shrink-0" />
              )}
              <div className="min-w-0 flex-1">
                {e.type === "trade" ? (
                  <p className="text-foreground truncate">
                    {e.from} → {e.to}
                  </p>
                ) : (
                  <p className="text-foreground truncate">
                    {e.winner} beat {e.vs}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">{e.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
