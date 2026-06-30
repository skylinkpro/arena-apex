import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Swords, Trophy, Users, Zap } from "lucide-react";

const GameplaySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const features = [
    {
      icon: Swords,
      title: "Epic Battles",
      description: "Engage in thrilling battles with your Mons against legendary opponents",
    },
    {
      icon: Trophy,
      title: "Earn Rewards",
      description: "Win battles and tournaments to earn valuable NFTs and tokens",
    },
    {
      icon: Users,
      title: "Multiplayer Arena",
      description: "Challenge players worldwide in real-time PvP battles",
    },
    {
      icon: Zap,
      title: "Power-Ups",
      description: "Collect and use powerful items to boost your Mons' abilities",
    },
  ];

  return (
    <section id="gameplay" className="section bg-cosmic" ref={ref}>
      <div className="section-container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-4">
            Immersive Gameplay
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience a new dimension of gaming with dynamic battles, strategic gameplay, and endless adventures
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-card/50 border-primary/20 hover:border-primary/40 p-6 h-full transition-all duration-300 hover:scale-105 hover:glow-primary cursor-pointer">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-primary/10 rounded-full glow-primary">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            size="lg"
            asChild
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground glow-secondary font-semibold"
          >
            <Link to="/gameplay">Play Now</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default GameplaySection;
