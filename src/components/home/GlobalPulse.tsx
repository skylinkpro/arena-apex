import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, MessageCircle, TrendingUp } from "lucide-react";

/**
 * Single live strip: servers + trades + volume. Discord + global trading vibe.
 * Different from 4-card grids—one compact row for long-time scan.
 */
const METRICS = [
  { key: "servers", label: "Servers online", icon: MessageCircle, value: "127" },
  { key: "trades", label: "24h trades", icon: TrendingUp, value: "42.8K" },
  { key: "volume", label: "24h volume", icon: Globe, value: "$1.24M" },
] as const;

function usePulseValues() {
  const [values, setValues] = useState({ servers: 127, trades: 42800, volume: 1.24 });
  useEffect(() => {
    const id = setInterval(() => {
      setValues((prev) => ({
        servers: Math.max(100, prev.servers + (Math.random() > 0.5 ? 1 : -1)),
        trades: Math.max(30000, prev.trades + Math.floor((Math.random() - 0.5) * 400)),
        volume: Math.max(1, Number((prev.volume + (Math.random() - 0.5) * 0.02).toFixed(2))),
      }));
    }, 3000);
    return () => clearInterval(id);
  }, []);
  return values;
}

export default function GlobalPulse() {
  const live = usePulseValues();

  return (
    <section className="border-y border-border bg-muted/30" aria-label="Live activity">
      <div className="section-container py-4 md:py-5">
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" aria-hidden />
            Live
          </div>
          {METRICS.map(({ key, label, icon: Icon }) => (
            <div key={key} className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-muted-foreground shrink-0" aria-hidden />
              <span className="text-muted-foreground text-sm">{label}</span>
              <span className="font-mono font-semibold text-foreground tabular-nums">
                {key === "servers" && live.servers}
                {key === "trades" && `${(live.trades / 1000).toFixed(1)}K`}
                {key === "volume" && `$${live.volume.toFixed(2)}M`}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
