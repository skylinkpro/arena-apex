import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { routePaths } from "@/config/routes";

/** Shared asset shape for both gameplay (stats, abilities) and trading (price, seller). */
export interface AssetDetail {
  id: number | string;
  name: string;
  image: string;
  rarity: string;
  description: string;
  /** e.g. Draconic-X7 */
  geneticId?: string;
  /** Combat stats for gameplay view */
  stats?: { str: number; agi: number; int: number; def: number };
  /** Active abilities for gameplay view */
  abilities?: string[];
  /** For trading view */
  price?: string;
  seller?: string;
  type?: string;
}

interface AssetDetailModalProps {
  open: boolean;
  onClose: () => void;
  asset: AssetDetail | null;
}

const STAT_LABELS: Record<keyof NonNullable<AssetDetail["stats"]>, string> = {
  str: "STR",
  agi: "AGI",
  int: "INT",
  def: "DEF",
};

export function AssetDetailModal({ open, onClose, asset }: AssetDetailModalProps) {
  const navigate = useNavigate();
  if (!asset) return null;

  const hasGameplay = asset.stats != null || (asset.abilities != null && asset.abilities.length > 0);
  const hasTrading = asset.price != null;

  const handlePurchase = () => {
    onClose();
    navigate(routePaths.trading, { state: { asset } });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
          aria-modal="true"
          role="dialog"
          aria-labelledby="asset-detail-title"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            className={cn(
              "relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl",
              "bg-card border border-primary/30 shadow-[0_0_40px_hsl(var(--primary)/0.25)]",
              "flex flex-col md:flex-row"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 rounded-full bg-background/80 hover:bg-background text-foreground"
              onClick={onClose}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Left: Asset image + Genetic ID */}
            <div className="relative w-full md:w-[45%] min-h-[280px] md:min-h-[420px] bg-black/50 flex flex-col">
              <div className="flex-1 flex items-center justify-center p-6 md:p-8">
                <img
                  src={asset.image}
                  alt={asset.name}
                  className="max-w-full max-h-[240px] md:max-h-[320px] object-contain drop-shadow-[0_0_24px_hsl(var(--primary)/0.4)]"
                />
              </div>
              <div className="p-4 md:p-6 border-t border-border bg-background/40">
                <div className="text-xs text-muted-foreground font-mono tracking-wider">
                  GENETIC_SEQ_ID
                </div>
                <div className="text-base md:text-lg font-mono text-primary font-medium mt-0.5">
                  {asset.geneticId ?? "—"}
                </div>
              </div>
            </div>

            {/* Right: Details, stats, abilities, actions */}
            <div className="w-full md:w-[55%] flex flex-col overflow-y-auto">
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <span
                    className={cn(
                      "inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3",
                      "bg-primary/20 text-primary border border-primary/30"
                    )}
                  >
                    {asset.rarity}
                  </span>
                  <h2 id="asset-detail-title" className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
                    {asset.name}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {asset.description}
                  </p>
                  {asset.type && (
                    <p className="text-xs text-muted-foreground mt-2 font-mono">{asset.type}</p>
                  )}
                </div>

                {/* Combat Stats Analysis — gameplay */}
                {hasGameplay && asset.stats && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" aria-hidden />
                      Combat Stats Analysis
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {(Object.entries(asset.stats) as [keyof typeof asset.stats, number][]).map(
                        ([key, value]) => (
                          <div key={key}>
                            <div className="flex justify-between text-xs mb-1.5 text-muted-foreground uppercase tracking-wider">
                              <span>{STAT_LABELS[key]}</span>
                              <span className="text-foreground font-mono tabular-nums">
                                {value}/100
                              </span>
                            </div>
                            <Progress
                              value={value}
                              className="h-2 bg-muted [&>div]:bg-primary"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Active Abilities — gameplay */}
                {asset.abilities && asset.abilities.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" aria-hidden />
                      Active Abilities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {asset.abilities.map((ability) => (
                        <span
                          key={ability}
                          className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/15 text-primary border border-primary/25"
                        >
                          {ability}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trading: price / seller */}
                {hasTrading && (
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    {asset.price && (
                      <span className="font-mono font-bold text-foreground">{asset.price}</span>
                    )}
                    {asset.seller && (
                      <span className="text-muted-foreground">Seller: {asset.seller}</span>
                    )}
                  </div>
                )}

                {/* Actions: Purchase Asset + View Lineage */}
                <div className="pt-4 border-t border-border flex flex-col sm:flex-row gap-3">
                  <Button
                    className="flex-1 rounded-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={handlePurchase}
                  >
                    Purchase Asset
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 rounded-lg border-border hover:bg-muted/50"
                    onClick={() => {}}
                  >
                    View Lineage
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
