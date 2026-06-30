import { motion } from "framer-motion";
import { Swords, Trophy, Users, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const FeaturesGrid = () => {
    const features = [
        {
            icon: Swords,
            title: "Epic Battles",
            description: "Engage in thrilling battles with your Mons against legendary opponents.",
            color: "text-red-500",
            bg: "bg-red-500/10",
            border: "border-red-500/20"
        },
        {
            icon: Trophy,
            title: "Earn Rewards",
            description: "Win battles and tournaments to earn valuable NFTs and tokens.",
            color: "text-yellow-500",
            bg: "bg-yellow-500/10",
            border: "border-yellow-500/20"
        },
        {
            icon: Users,
            title: "Multiplayer Arena",
            description: "Challenge players worldwide in real-time PvP battles.",
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20"
        },
        {
            icon: Zap,
            title: "Power-Ups",
            description: "Collect and use powerful items to boost your Mons' abilities.",
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20"
        },
    ];

    return (
        <section className="section bg-background relative z-10">
            <div className="section-container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className={`h-full p-6 bg-card/50 backdrop-blur border ${feature.border} hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}>
                                <div className={`w-12 h-12 rounded-lg ${feature.bg} flex items-center justify-center mb-4`}>
                                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                                </div>
                                <h3 className="text-xl font-bold font-heading mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesGrid;
