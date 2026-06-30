import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Activity, Brain, Users, Cpu, Globe, Zap } from "lucide-react";

const AIGameStats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [stats, setStats] = useState({
    activeAgents: 4250,
    dailyTransactions: 125430,
    totalPrizePool: 1542000,
    computingPower: 85.2,
  });

  // Static stats as per latest network data
  useEffect(() => {
    // Optional: Add real-time polling here in future
  }, []);

  const statItems = [
    {
      label: "Autonomous AI Agents",
      value: "4,269",
      icon: Brain,
      color: "text-primary",
      bg: "bg-primary/10",
      description: "Independently learning and evolving in-game characters",
    },
    {
      label: "24h Transactions",
      value: "125,477",
      icon: Activity,
      color: "text-secondary",
      bg: "bg-secondary/10",
      description: "High-frequency blockchain interactions and trades",
    },
    {
      label: "Total Prize Pool",
      value: "$1,542,448",
      icon: Zap,
      color: "text-accent",
      bg: "bg-accent/10",
      description: "Distributed across tournaments and season rewards",
    },
    {
      label: "Global AI Network",
      value: "85.3%",
      icon: Globe,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      description: "System efficiency and decentralized computing power",
    },
  ];

  return (
    <section className="section bg-background/50 border-y border-border" ref={ref}>
      <div className="section-container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 bg-primary/20 text-primary px-4 py-1 rounded-full mb-4 text-sm font-bold">
            <Cpu size={16} />
            <span>REAL-TIME AI NETWORK DATA</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-4">
            The Living Ecosystem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI models process millions of data points every second to create a truly dynamic and unpredictable gaming world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 bg-card/40 border-primary/20 hover:border-primary/40 transition-all duration-300 group hover:glow-primary h-full">
                <div className={`p-3 rounded-xl w-fit ${item.bg} mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                    {item.label}
                  </div>
                  <div className="text-3xl font-bold text-foreground font-mono">
                    {item.value}
                  </div>
                  <p className="text-xs text-muted-foreground pt-2">
                    {item.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIGameStats;
