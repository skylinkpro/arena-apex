import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { routePaths } from "@/config/routes";
import { ChevronRight } from "lucide-react";

const LINKS = [
  { label: "Gameplay", path: routePaths.gameplay, desc: "Battles, servers, ranks" },
  { label: "Marketplace", path: routePaths.marketplace, desc: "Assets, NFTs, liquidity" },
  { label: "DeFi Hub", path: routePaths.defihub, desc: "Stake, swap, analytics" },
] as const;

/**
 * Three minimal explore links. No heavy cards—quick scan for long-time review.
 */
export default function HomeExplore() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="section border-t border-border bg-muted/20" ref={ref} aria-label="Explore">
      <div className="section-container">
        <motion.p
          className="text-center text-sm font-medium text-muted-foreground mb-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          Explore
        </motion.p>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {LINKS.map(({ label, path, desc }) => (
            <Link
              key={path}
              to={path}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-card/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <span>{label}</span>
              <span className="text-muted-foreground font-normal">— {desc}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
