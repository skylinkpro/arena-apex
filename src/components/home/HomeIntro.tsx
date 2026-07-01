import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

/**
 * Readable intro block for long-time review. Frames Arn-Apex as
 * community (Discord-style) + global trading game.
 */
export default function HomeIntro() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="section bg-background" ref={ref} aria-label="About Arn-Apex">
      <div className="section-container">
        <motion.div
          className="content-read max-w-3xl mx-auto text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg md:text-xl text-foreground/95 leading-relaxed mb-4">
            Arn-Apex is a <strong className="text-foreground font-semibold">community-first game</strong> you play with friends—and a <strong className="text-foreground font-semibold">global trading layer</strong> where players and traders move assets 24/7. Join servers, run strategies, and trade on the same economy.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Whether you’re here for the Discord vibe, the battles, or the markets, everything connects: in-game items, NFTs, and tokens flow across one live ecosystem. No walled gardens—just one hub to play and trade.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
