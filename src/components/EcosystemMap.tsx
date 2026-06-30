import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Users, Zap, Shield, X, MapPin, Swords, Trophy, Activity, Target, Cpu } from "lucide-react";

const EcosystemMap = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [activeView, setActiveView] = useState("exploration"); // exploration, combat, economy

    // Simulated Live Feed Data
    const [feed, setFeed] = useState([
        { id: 1, text: "Player 'Neo' won a Legendary Battle", type: "combat" },
        { id: 2, text: "New Region Discovered: Cyber-Waste", type: "exploration" },
        { id: 3, text: "Market Surge: FROZ +5%", type: "economy" },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            const events = [
                { text: "Server Event: Double XP Active", type: "system" },
                { text: "Player 'Trinity' captured a Rare Mon", type: "collection" },
                { text: "Guild War started in Sector 7", type: "combat" },
                { text: "Whale Alert: 50k FROZ moved", type: "economy" },
            ];
            const newEvent = { id: Date.now(), ...events[Math.floor(Math.random() * events.length)] };
            setFeed(prev => [newEvent, ...prev.slice(0, 4)]);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const regions = [
        {
            id: "ai-training",
            name: "AI Training & Evolution",
            icon: Cpu,
            status: "High Activity",
            players: 1240,
            type: "Tech Hub",
            features: ["Train Agents", "Upgrade Skills", "Neural Net Optimization"],
            description: "The hub of technological advancement. Train your AI agents to adapt to new combat styles and market conditions.",
            color: "text-blue-500",
            borderColor: "border-blue-500",
            bgGradient: "from-blue-500/20 to-transparent",
            position: { top: '30%', left: '20%' }
        },
        {
            id: "battle-arena",
            name: "PvP Battle Arenas",
            icon: Swords,
            status: "Combat Zone",
            players: 3850,
            type: "Combat",
            features: ["Ranked 1v1", "Guild Wars", "Tournament Halls"],
            description: "Hostile environment where the strongest prove their worth. Engage in epic battles against legends and players worldwide.",
            color: "text-red-500",
            borderColor: "border-red-500",
            bgGradient: "from-red-500/20 to-transparent",
            position: { top: '40%', left: '70%' }
        },
        {
            id: "breeding-grounds",
            name: "Genetic Labs",
            icon: Activity,
            status: "Peaceful",
            players: 920,
            type: "Science",
            features: ["Genome Splicing", "Egg Incubation", "Rare Species Discovery"],
            description: "A sanctuary dedicated to creating the next generation of Mons. Fuse DNA to create powerful new hybrids.",
            color: "text-green-500",
            borderColor: "border-green-500",
            bgGradient: "from-green-500/20 to-transparent",
            position: { top: '70%', left: '40%' }
        },
        {
            id: "market-district",
            name: "Trade District",
            icon: Target,
            status: "Active",
            players: 2150,
            type: "Economy",
            features: ["P2P Exchange", "Auction House", "Item Fabrication"],
            description: "The economic heart of the ecosystem driven by AI commerce. Find rare items and trade with the proprietary AI algorithm.",
            color: "text-amber-500",
            borderColor: "border-amber-500",
            bgGradient: "from-amber-500/20 to-transparent",
            position: { top: '60%', left: '80%' }
        },
    ];

    return (
        <section className="py-20 bg-black overflow-hidden min-h-screen relative flex flex-col" ref={ref}>
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,20,40,1)_0%,rgba(0,0,0,1)_100%)]" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

            <div className="container mx-auto px-4 relative z-10 flex-grow flex flex-col">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono mb-4 animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        SYSTEM ONLINE: v4.2.0
                    </div>
                    <h2 className="text-4xl md:text-6xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-4 drop-shadow-[0_0_15px_rgba(100,50,255,0.5)]">
                        Immersive Ecosystem
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        The world's first living, breathing digital universe.
                        <span className="text-primary font-bold ml-1">Connect, Battle, Evolve, and Earn.</span>
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">
                    {/* Left HUD: Stats & Feed */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-3 space-y-4"
                    >
                        <Card className="bg-black/40 backdrop-blur-md border-white/10 p-4">
                            <h3 className="text-sm font-mono text-muted-foreground uppercase mb-3">Live Network Feed</h3>
                            <div className="space-y-3">
                                <AnimatePresence mode="popLayout">
                                    {feed.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="text-xs font-mono border-l-2 border-primary pl-3 py-1"
                                        >
                                            <span className="text-primary/80">[{item.type.toUpperCase()}]</span> {item.text}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </Card>

                        <Card className="bg-black/40 backdrop-blur-md border-white/10 p-4">
                            <h3 className="text-sm font-mono text-muted-foreground uppercase mb-3">Global Stats</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-2 bg-white/5 rounded">
                                    <div className="text-xs text-muted-foreground">Active Users</div>
                                    <div className="text-xl font-bold text-blue-400">12.4K</div>
                                </div>
                                <div className="text-center p-2 bg-white/5 rounded">
                                    <div className="text-xs text-muted-foreground">Battles/Hr</div>
                                    <div className="text-xl font-bold text-red-400">842</div>
                                </div>
                                <div className="text-center p-2 bg-white/5 rounded">
                                    <div className="text-xs text-muted-foreground">Market Vol</div>
                                    <div className="text-xl font-bold text-amber-400">$2.1M</div>
                                </div>
                                <div className="text-center p-2 bg-white/5 rounded">
                                    <div className="text-xs text-muted-foreground">AI Agents</div>
                                    <div className="text-xl font-bold text-green-400">5.6K</div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Center: Tech Globe Visualization */}
                    <div className="lg:col-span-6 relative flex items-center justify-center min-h-[500px]">
                        {/* Rotating Globe Effect */}
                        <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] animate-[spin_60s_linear_infinite]">
                            {/* Wireframe Spheres */}
                            <div className="absolute inset-0 rounded-full border border-blue-500/30 opacity-50" />
                            <div className="absolute inset-4 rounded-full border border-dashed border-purple-500/30 opacity-50 animate-[spin_20s_linear_infinite_reverse]" />
                            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent)]" />

                            {/* Core */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                        </div>

                        {/* Floating Region Pins (Static positioning relative to container for usability, simulated 3D) */}
                        {regions.map((region, i) => (
                            <motion.button
                                key={region.id}
                                className={`absolute group z-20`}
                                style={{ top: region.position.top, left: region.position.left }}
                                whileHover={{ scale: 1.1 }}
                                onClick={() => setSelectedRegion(region.id)}
                            >
                                <div className={`relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/80 border-2 ${region.borderColor} shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(0,100,255,0.6)]`}>
                                    <region.icon className={`w-6 h-6 md:w-8 md:h-8 ${region.color}`} />
                                    <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${region.bgGradient.replace('from-', 'bg-')}`} />
                                </div>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 text-white text-xs px-2 py-1 rounded border border-white/20 whitespace-nowrap">
                                    {region.name}
                                </div>
                            </motion.button>
                        ))}

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 bg-black/60 backdrop-blur rounded-full p-2 border border-white/10">
                            {['exploration', 'combat', 'economy'].map(view => (
                                <button
                                    key={view}
                                    onClick={() => setActiveView(view)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all ${activeView === view ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-white'}`}
                                >
                                    {view}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Panel: Selected Detail */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-3"
                    >
                        <AnimatePresence mode="wait">
                            {selectedRegion ? (
                                regions.filter(r => r.id === selectedRegion).map(region => (
                                    <motion.div
                                        key={region.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="h-full"
                                    >
                                        <Card className={`h-full bg-black/60 backdrop-blur-xl border ${region.borderColor} p-6 flex flex-col relative overflow-hidden`}>
                                            <div className={`absolute inset-0 bg-gradient-to-b ${region.bgGradient} opacity-10`} />

                                            <div className="flex justify-between items-start mb-6 relative z-10">
                                                <div>
                                                    <h3 className="text-2xl font-bold font-heading">{region.name}</h3>
                                                    <div className={`text-xs font-bold uppercase tracking-wider ${region.color} mt-1`}>{region.type}</div>
                                                </div>
                                                <Button variant="ghost" size="icon" onClick={() => setSelectedRegion(null)}>
                                                    <X className="w-5 h-5" />
                                                </Button>
                                            </div>

                                            <div className="flex-grow space-y-6 relative z-10">
                                                <p className="text-muted-foreground text-sm leading-relaxed tracking-wide">
                                                    {region.description}
                                                </p>

                                                {region.id === "ai-training" && (
                                                    <div className="bg-black/50 border border-primary/30 rounded-lg p-3 space-y-2">
                                                        <div className="flex justify-between items-center text-xs uppercase font-bold text-primary">
                                                            <span>Training Console</span>
                                                            <span className="animate-pulse">● Connected</span>
                                                        </div>
                                                        <div className="h-24 bg-black/80 rounded border border-white/5 font-mono text-[10px] p-2 overflow-y-auto text-green-400">
                                                            <div>{">"} Initializing Neural Link...</div>
                                                            <div>{">"} Agent "Unit-734" loaded.</div>
                                                            <div>{">"} Simulation: Combat Tactics v9.0</div>
                                                            <div className="animate-pulse">{">"} Learning rate: 0.045...</div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button size="sm" className="w-full text-xs h-7 bg-primary/20 hover:bg-primary/40 text-primary border border-primary/50">
                                                                Train Soldier
                                                            </Button>
                                                            <Button size="sm" className="w-full text-xs h-7 bg-secondary/20 hover:bg-secondary/40 text-secondary border border-secondary/50">
                                                                Create Agent
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="space-y-3">
                                                    <div className="text-xs font-semibold text-white/50 uppercase">Zone Features</div>
                                                    {region.features.map((feature, i) => (
                                                        <div key={i} className="flex items-center gap-3 p-2 rounded bg-white/5 border border-white/5 hover:border-white/20 transition-colors cursor-pointer group/feat">
                                                            <div className={`w-1.5 h-1.5 rounded-full bg-${region.color.split('-')[1]}-500 group-hover/feat:scale-150 transition-transform`} />
                                                            <span className="text-sm font-medium group-hover/feat:text-white transition-colors">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="grid grid-cols-2 gap-3 mt-4">
                                                    <div className="p-3 rounded bg-white/5 text-center">
                                                        <div className="text-2xl font-bold">{region.players}</div>
                                                        <div className="text-[10px] uppercase text-muted-foreground">Players</div>
                                                    </div>
                                                    <div className="p-3 rounded bg-white/5 text-center">
                                                        <div className="text-2xl font-bold">{region.status === 'Combat Zone' ? 'PvP' : 'Safe'}</div>
                                                        <div className="text-[10px] uppercase text-muted-foreground">Status</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <Button className={`w-full mt-6 font-bold ${region.color.replace('text', 'bg')} hover:brightness-110 text-white border-none`}>
                                                {region.id === 'battle-arena' ? 'Enter Arena' : region.id === 'market-district' ? 'Open Market' : region.id === 'ai-training' ? 'Access Mainframe' : 'Explore Zone'}
                                            </Button>
                                        </Card>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-full flex flex-col justify-center items-center text-center p-8 bg-white/5 border border-white/10 rounded-xl"
                                >
                                    <Globe className="w-16 h-16 text-muted-foreground/30 mb-4 animate-pulse" />
                                    <h3 className="text-xl font-bold text-muted-foreground">System Idle</h3>
                                    <p className="text-sm text-muted-foreground/60 mt-2">Select a neural node to access subsystem data</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default EcosystemMap;
