import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Gamepad2, LineChart } from "lucide-react";
import { routePaths } from "@/config/routes";
import { Button } from "@/components/ui/button";

/**
 * Two paths: Play (community / Discord game) and Trade (global market).
 * Different layout from 4-card grids—two large areas for long-time clarity.
 */
export default function HomePlayAndTrade() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="section bg-background" ref={ref} aria-label="Play or trade">
      <div className="section-container">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Link
            to={routePaths.gameplay}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-8 md:p-10 transition-colors hover:border-primary/40 hover:bg-card/80 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Gamepad2 className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                Play with the community
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
                Join servers, run matches, and climb ranks. Discord-style hubs and global matchmaking in one place.
              </p>
              <Button variant="secondary" size="sm" className="rounded-lg">
                Play now
              </Button>
            </div>
          </Link>

          <Link
            to={routePaths.marketplace}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-8 md:p-10 transition-colors hover:border-primary/40 hover:bg-card/80 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <LineChart className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                Trade globally
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
                One marketplace for in-game assets, NFTs, and tokens. Real-time pricing and liquidity across regions.
              </p>
              <Button variant="secondary" size="sm" className="rounded-lg">
                Open marketplace
              </Button>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
