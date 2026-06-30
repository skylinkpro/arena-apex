import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDownUp, TrendingUp, Wallet, Settings, Sparkles, Laptop, ArrowUpRight, Globe, PieChart } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell
} from "recharts";

const DeFiDashboard = () => {
  const [amount, setAmount] = useState("");
  const [priceData, setPriceData] = useState<{ time: string; value: number }[]>([]);
  const [currentPrice, setCurrentPrice] = useState(0.4521);

  // Simulate live data feed
  useEffect(() => {
    const initialData = Array.from({ length: 40 }, (_, i) => ({
      time: `${10 + i}:00`,
      value: 0.45 + Math.random() * 0.05,
    }));
    setPriceData(initialData);

    const interval = setInterval(() => {
      setPriceData(prev => {
        const lastTime = parseInt(prev[prev.length - 1].time.split(':')[0]);
        const newTime = `${(lastTime + 1) % 24}:00`;
        const newValue = 0.45 + Math.random() * 0.05;
        setCurrentPrice(newValue);
        return [...prev.slice(1), { time: newTime, value: newValue }];
      });
    }, 2000); // Faster updates for "live" feel

    return () => clearInterval(interval);
  }, []);

  const pieData = [
    { name: 'FROZ', value: 65, color: '#a855f7' },
    { name: 'ETH', value: 25, color: '#3b82f6' },
    { name: 'USDT', value: 10, color: '#22c55e' },
  ];

  const orderBook = {
    sells: Array.from({ length: 8 }, (_, i) => ({ price: (0.4525 + i * 0.0001).toFixed(4), amount: Math.floor(Math.random() * 5000) })),
    buys: Array.from({ length: 8 }, (_, i) => ({ price: (0.4515 - i * 0.0001).toFixed(4), amount: Math.floor(Math.random() * 5000) }))
  };

  return (
    <section id="defihub" className="section bg-background relative overflow-hidden text-foreground">
      {/* Sci-fi Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="section-container relative z-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-mono flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[pulse_2s_infinite]" />
                SYSTEM_ONLINE
              </div>
              <div className="text-xs text-muted-foreground font-mono">/ DEFI_PROTOCOL_V2</div>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
              Command Center
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              Manage your assets with institutional-grade tools powered by predictive AI.
            </p>
          </motion.div>

          {/* Quick Stats Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            <Card className="px-4 py-2 bg-card/50 border-white/5 backdrop-blur flex flex-col justify-center min-w-[140px]">
              <div className="text-[10px] text-muted-foreground font-mono uppercase">Net Worth</div>
              <div className="text-xl font-bold font-mono">$15,420.45</div>
            </Card>
            <Card className="px-4 py-2 bg-card/50 border-white/5 backdrop-blur flex flex-col justify-center min-w-[140px]">
              <div className="text-[10px] text-muted-foreground font-mono uppercase">24h PNL</div>
              <div className="text-xl font-bold font-mono text-green-400">+$1,240.20</div>
            </Card>
          </motion.div>
        </div>

        {/* Main Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[800px]">

          {/* 1. Main Chart (Large) */}
          <motion.div className="md:col-span-8 md:row-span-2 h-[400px] md:h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="h-full bg-card/30 backdrop-blur border-white/10 p-6 flex flex-col relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-white">FROZ / USD</h3>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">CORE</span>
                  </div>
                  <div className="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mt-2">
                    ${currentPrice.toFixed(4)}
                  </div>
                </div>
                <div className="flex gap-1 bg-black/40 p-1 rounded-lg">
                  {['1H', 'D', 'W', 'M', 'Y'].map(t => (
                    <button key={t} className="px-3 py-1 text-xs hover:bg-white/10 rounded transition-colors text-muted-foreground hover:text-white">{t}</button>
                  ))}
                </div>
              </div>

              <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={priceData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="time" hide />
                    <YAxis domain={['auto', 'auto']} hide />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#000', borderColor: '#333' }}
                      itemStyle={{ color: '#a855f7' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#a855f7"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* 2. Swap Interface (Top Right) */}
          <motion.div className="md:col-span-4 md:row-span-1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1 }}>
            <Card className="h-full bg-card/40 border-primary/20 p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 blur-[50px] rounded-full" />

              <div className="flex justify-between items-center mb-4 relative z-10">
                <h3 className="font-bold flex items-center gap-2"><ArrowDownUp size={18} /> Quick Swap</h3>
                <Settings size={16} className="text-muted-foreground cursor-pointer hover:text-white transition-colors" />
              </div>

              <div className="space-y-3 relative z-10">
                <div className="bg-black/40 p-3 rounded-lg border border-white/5 group focus-within:border-primary/50 transition-colors">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Pay</span>
                    <span>Max: 2.5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <input type="text" placeholder="0.0" className="bg-transparent border-none text-xl font-bold w-1/2 focus:outline-none" value={amount} onChange={e => setAmount(e.target.value)} />
                    <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-md text-sm cursor-pointer hover:bg-white/10">
                      <div className="w-4 h-4 rounded-full bg-blue-500" /> ETH
                    </div>
                  </div>
                </div>

                <div className="flex justify-center -my-4 z-20 relative">
                  <div className="bg-background border border-white/10 p-1.5 rounded-full cursor-pointer hover:scale-110 transition-transform">
                    <ArrowDownUp size={14} />
                  </div>
                </div>

                <div className="bg-black/40 p-3 rounded-lg border border-white/5 group focus-within:border-primary/50 transition-colors">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Receive</span>
                    <span>~ $0.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <input type="text" placeholder="0.0" className="bg-transparent border-none text-xl font-bold w-1/2 focus:outline-none" readOnly value={amount ? (parseFloat(amount) * 4500).toFixed(2) : ""} />
                    <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-md text-sm cursor-pointer hover:bg-white/10">
                      <div className="w-4 h-4 rounded-full bg-purple-500" /> FROZ
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-4 bg-primary hover:bg-primary/90 font-bold shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all">
                INITIATE SWAP
              </Button>
            </Card>
          </motion.div>

          {/* 3. Portfolio Allocation (Middle Right) */}
          <motion.div className="md:col-span-4 md:row-span-1 h-[300px]" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1 }}>
            <Card className="h-full bg-card/30 border-white/10 p-6 flex flex-col">
              <h3 className="font-bold flex items-center gap-2 mb-4"><PieChart size={18} /> Asset Allocation</h3>
              <div className="flex-1 flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={pieData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#000', borderRadius: '8px', border: 'none' }} />
                  </RePieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className="text-xl font-bold">100%</div>
                    <div className="text-[10px] text-muted-foreground">DIVERSIFIED</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-4 text-xs mt-2">
                {pieData.map(d => (
                  <div key={d.name} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} /> {d.name}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* 4. Live Order Book (Bottom Bar / Scrolling) */}
          <motion.div className="md:col-span-12 h-[200px]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1 }}>
            <Card className="h-full bg-black/60 border-white/10 p-0 flex flex-col font-mono text-xs overflow-hidden">
              <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex justify-between items-center text-muted-foreground">
                <span className="flex items-center gap-2"><Globe size={12} /> GLOBAL_ORDER_BOOK</span>
                <span className="flex items-center gap-1 text-green-500"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> LIVE</span>
              </div>
              <div className="flex-1 grid grid-cols-2 text-center relative">
                {/* Bids */}
                <div className="border-r border-white/10 p-2">
                  <div className="flex justify-between text-muted-foreground px-4 mb-2 opacity-50"><span>PRICE (USDT)</span><span>AMT (FROZ)</span></div>
                  <div className="space-y-1">
                    {orderBook.buys.map((order, i) => (
                      <div key={i} className="flex justify-between px-4 text-green-500/80 hover:bg-green-500/5 cursor-pointer transition-colors">
                        <span>{order.price}</span>
                        <span>{order.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Asks */}
                <div className="p-2">
                  <div className="flex justify-between text-muted-foreground px-4 mb-2 opacity-50"><span>PRICE (USDT)</span><span>AMT (FROZ)</span></div>
                  <div className="space-y-1">
                    {orderBook.sells.map((order, i) => (
                      <div key={i} className="flex justify-between px-4 text-red-500/80 hover:bg-red-500/5 cursor-pointer transition-colors">
                        <span>{order.price}</span>
                        <span>{order.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black border border-white/10 px-4 py-1 rounded-full text-white font-bold shadow-xl">
                  0.4521
                </div>
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default DeFiDashboard;
