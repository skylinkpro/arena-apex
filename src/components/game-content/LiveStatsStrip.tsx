import { useState, useEffect } from "react";
import { MessageCircle, TrendingUp, Globe } from "lucide-react";

const METRICS = [
  { key: "servers", label: "Servers online", icon: MessageCircle, value: 127 },
  { key: "trades", label: "24h trades", icon: TrendingUp, value: 42800 },
  { key: "volume", label: "24h volume", icon: Globe, value: "1.24M" },
] as const;

export default function LiveStatsStrip() {
  const [servers, setServers] = useState(127);
  const [trades, setTrades] = useState(42800);
  useEffect(() => {
    const id = setInterval(() => {
      setServers((s) => Math.max(100, s + (Math.random() > 0.5 ? 1 : -1)));
      setTrades((t) => Math.max(30000, t + Math.floor((Math.random() - 0.5) * 400)));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="border-y border-border bg-muted/30 py-4" aria-label="Live stats">
      <div className="section-container">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" aria-hidden />
            Live
          </span>
          <div className="flex items-center gap-3">
            <MessageCircle className="h-5 w-5 text-muted-foreground shrink-0" />
            <span className="text-sm text-muted-foreground">Servers online</span>
            <span className="font-mono font-semibold tabular-nums">{servers}</span>
          </div>
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-muted-foreground shrink-0" />
            <span className="text-sm text-muted-foreground">24h trades</span>
            <span className="font-mono font-semibold tabular-nums">{(trades / 1000).toFixed(1)}K</span>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-muted-foreground shrink-0" />
            <span className="text-sm text-muted-foreground">24h volume</span>
            <span className="font-mono font-semibold tabular-nums">${METRICS[2].value}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
