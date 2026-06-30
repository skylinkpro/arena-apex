import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HolographicBackground from "@/components/HolographicBackground";
import useSoundEffects from "@/hooks/useSoundEffects";
import NeuralCore3D from "@/components/NeuralCore3D";

interface HeroProps {
  onTryNow: () => void;
}

const Hero = ({ onTryNow }: HeroProps) => {
  const { playHover, playClick, playSuccess } = useSoundEffects();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <HolographicBackground />

      {/* Overlay */}
      <div className="absolute inset-0 bg-background/30 backdrop-blur-[1px]" />

      {/* Content */}
      <div className="relative z-10 section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span className="animate-pulse mr-2">●</span> COMMUNITY GAME & GLOBAL TRADING
            </motion.div>
            <motion.h1
              className="text-5xl md:text-7xl font-heading font-bold text-gradient mb-6 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onMouseEnter={playHover}
            >
              Play together. Trade globally.
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-foreground/90 mb-8 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Arn-Apex is a community-first game and a global marketplace in one—servers, battles, and live trading on the same economy.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                onClick={() => {
                  playClick();
                  playSuccess();
                  onTryNow();
                }}
                onMouseEnter={playHover}
                className="glow-cta bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-bold text-lg px-8 py-6"
              >
                Try Now for Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-background/50 backdrop-blur border-white/10 hover:bg-white/10 text-lg px-8 py-6"
                onMouseEnter={playHover}
                onClick={playClick}
              >
                <Link to="/whitepaper">Read Whitepaper</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* 3D Core */}
          <motion.div
            className="hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
              <NeuralCore3D />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
