import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, TrendingUp, ShieldCheck, Zap, Coins, SlidersHorizontal, Search, Filter, Sparkles, Activity } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AssetDetailModal, type AssetDetail } from "@/components/AssetDetailModal";

const MarketplaceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedListingId, setSelectedListingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const features = [
    {
      icon: TrendingUp,
      title: "Live Pricing",
      description: "Real-time market data powered by AI analytics",
    },
    {
      icon: ShieldCheck,
      title: "Verified Authenticity",
      description: "Smart contracts guarantee digital ownership",
    },
    {
      icon: Coins,
      title: "Instant Liquidity",
      description: "Swap assets for tokens instantly via AMM pools",
    },
  ];

  const suggestItems = [
    { id: 1, name: "Neural Chip v4", price: "450 FROZ", type: "Upgrade", rarity: "Epic", reason: "Matches your 'Cyber-Draco' build" },
    { id: 2, name: "Plasma Core", price: "2,100 FROZ", type: "Material", rarity: "Legendary", reason: "Standard for high-tier crafting" },
    { id: 3, name: "Stealth Module", price: "320 FROZ", type: "Add-on", rarity: "Rare", reason: "Frequent purchase by Assassins" },
  ];

  const allMarketListings = [
    { id: 101, name: "Unit-734", price: "12,500 FROZ", type: "Unit", rarity: "Rare", image: "/assets/nft-mon-1.png", seller: "NeonTrader" },
    { id: 102, name: "Void Essence", price: "5,000 FROZ", type: "Material", rarity: "Epic", image: "/assets/item-core.png", seller: "VoidWalker" },
    { id: 103, name: "Mech-Legs Mk.II", price: "1,200 FROZ", type: "Part", rarity: "Common", image: "/assets/item-legs.png", seller: "ScrapLord" },
    { id: 104, name: "Cyber-Eye", price: "800 FROZ", type: "Part", rarity: "Common", image: "/assets/item-eye.png", seller: "OpticTech" },
    { id: 105, name: "Data-Scroll", price: "3,300 FROZ", type: "Consumable", rarity: "Rare", image: "/assets/item-scroll.png", seller: "CodeMaster" },
    { id: 106, name: "Fusion Core", price: "8,900 FROZ", type: "Material", rarity: "Legendary", image: "/assets/item-cell.png", seller: "CoreDump" },
    { id: 107, name: "Nano-Fiber", price: "150 FROZ", type: "Material", rarity: "Common", image: "/assets/item-cloak.png", seller: "Weaver" },
    { id: 108, name: "Titanium Plating", price: "2,400 FROZ", type: "Part", rarity: "Rare", image: "/assets/item-legs.png", seller: "Armorer" },
    { id: 109, name: "Energy Cell", price: "50 FROZ", type: "Consumable", rarity: "Common", image: "/assets/item-cell.png", seller: "PowerUp" },
    { id: 110, name: "Quantum Drive", price: "50,000 FROZ", type: "Part", rarity: "Mythic", image: "/assets/item-chip.png", seller: "StarTraveler" },
    { id: 111, name: "Recruit-Alpha", price: "800 FROZ", type: "Unit", rarity: "Common", image: "/assets/nft-mon-3.png", seller: "DraftBoard" },
    { id: 112, name: "Shadow Cloak", price: "6,700 FROZ", type: "Part", rarity: "Epic", image: "/assets/item-cloak.png", seller: "NightOwl" },
  ];

  const filteredListings = useMemo(() => {
    return allMarketListings.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || item.type.includes(activeCategory.slice(0, -1)); // Simple check: "Units" -> "Unit"
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const [selectedSuggestItem, setSelectedSuggestItem] = useState<(typeof suggestItems)[number] | null>(null);

  const selectedAsset: AssetDetail | null = useMemo(() => {
    if (selectedListingId != null) {
      const listing = allMarketListings.find((l) => l.id === selectedListingId);
      if (!listing) return null;
      return {
        id: listing.id,
        name: listing.name,
        image: listing.image,
        rarity: listing.rarity,
        description: `Tradable ${listing.type?.toLowerCase() ?? "asset"} on the global marketplace. Listed by ${listing.seller}.`,
        price: listing.price,
        seller: listing.seller,
        type: listing.type,
      };
    }
    if (selectedSuggestItem != null) {
      return {
        id: selectedSuggestItem.id,
        name: selectedSuggestItem.name,
        image: "/assets/item-core.png",
        rarity: selectedSuggestItem.rarity,
        description: `Recommended: ${selectedSuggestItem.reason}`,
        price: selectedSuggestItem.price,
        type: selectedSuggestItem.type,
      };
    }
    return null;
  }, [selectedListingId, selectedSuggestItem]);

  return (
    <section id="marketplace" className="section bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,255,100,0.05),transparent_70%)]" />

      <div className="section-container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono mb-4">
            <ShoppingBag size={14} /> AI-POWERED COMMERCE
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-4">
            Global Marketplace
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Buy, sell, and trade assets with instant liquidity. Our AI engine recommends items tailored to your gameplay style.
          </p>
        </motion.div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 bg-card/40 border-primary/20 backdrop-blur-sm hover:border-primary/50 transition-colors h-full">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* AI Suggestions Row */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="text-yellow-500 fill-current" />
            <h3 className="text-xl font-bold">Recommended For You</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {suggestItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  onClick={() => setSelectedSuggestItem(item)}
                >
                  <Card className="cursor-pointer overflow-hidden border-primary/20 hover:border-primary/50 transition-all hover:bg-card/70 bg-card/50">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-sm text-primary font-mono mb-1">{item.type}</div>
                          <h4 className="text-xl font-bold">{item.name}</h4>
                        </div>
                        <div className="px-2 py-1 bg-white/10 rounded text-xs font-bold text-white">{item.rarity}</div>
                      </div>
                      <div className="text-2xl font-bold text-gradient mb-4">{item.price}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 p-2 rounded">
                        <Sparkles size={12} className="text-yellow-400" />
                        AI Reason: {item.reason}
                      </div>
                      <div className="pt-4 mt-4 border-t border-white/10 flex gap-2">
                        <Button size="sm" className="w-full">View details</Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
            ))}
          </div>
        </div>

        {/* Full Market Browser */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
            <div>
              <h3 className="text-3xl font-heading font-bold">Browse Listings</h3>
              <p className="text-muted-foreground text-sm">{filteredListings.length} listings matched</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search assets..."
                  className="pl-10 w-[200px] md:w-[300px] bg-card/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter size={16} /> Filters
              </Button>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal size={16} /> Sort
              </Button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Filters */}
            <div className="lg:w-64 space-y-6">
              <Card className="p-4 bg-card/30 backdrop-blur">
                <h4 className="font-bold mb-4 flex items-center gap-2">Category</h4>
                <div className="space-y-2">
                  {['All', 'Units', 'Parts', 'Materials', 'Consumables'].map(c => (
                    <div
                      key={c}
                      className={`flex items-center gap-2 text-sm cursor-pointer p-2 rounded transition-colors ${activeCategory === c ? 'bg-primary/20 text-white' : 'text-muted-foreground hover:bg-white/5 hover:text-white'}`}
                      onClick={() => setActiveCategory(c)}
                    >
                      <div className={`w-4 h-4 rounded border ${activeCategory === c ? 'border-primary bg-primary' : 'border-white/20'}`} /> {c}
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-4 bg-card/30 backdrop-blur">
                <h4 className="font-bold mb-4">Rarity</h4>
                <div className="space-y-2">
                  {['Common', 'Rare', 'Epic', 'Legendary', 'Mythic'].map(c => (
                    <div key={c} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white cursor-pointer p-2 hover:bg-white/5 rounded">
                      <div className="w-4 h-4 rounded border border-white/20" /> {c}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Listings Grid */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {filteredListings.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => setSelectedListingId(item.id)}
                  >
                    <Card className="group bg-card/30 border-transparent hover:border-primary/30 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer overflow-hidden relative h-full flex flex-col">
                      <div className="aspect-square bg-gradient-to-br from-black/60 to-purple-900/20 relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 rounded text-[10px] font-bold uppercase tracking-wider">{item.type}</div>
                      </div>
                      <div className="p-3 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <div className="text-xs text-muted-foreground truncate max-w-[100px]">{item.rarity}</div>
                          <div className="text-xs text-primary/80">#{item.id}</div>
                        </div>
                        <h4 className="font-bold text-sm mb-3 truncate">{item.name}</h4>
                        <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
                          <div className="flex items-center gap-1">
                            <Coins size={12} className="text-yellow-500" />
                            <span className="font-mono font-bold text-sm">{item.price.split(' ')[0]}</span>
                          </div>
                          <div className="text-[10px] text-muted-foreground truncate max-w-[60px]">{item.seller}</div>
                        </div>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 py-2 bg-primary text-primary-foreground text-center text-xs font-bold uppercase opacity-0 group-hover:opacity-100 transition-all translate-y-full group-hover:translate-y-0">
                        View details
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
        <AssetDetailModal
          open={selectedListingId != null || selectedSuggestItem != null}
          onClose={() => { setSelectedListingId(null); setSelectedSuggestItem(null); }}
          asset={selectedAsset}
        />
              {filteredListings.length === 0 && (
                <div className="col-span-full py-12 text-center text-muted-foreground">
                  <Activity className="mx-auto w-12 h-12 opacity-20 mb-4" />
                  <p>No listings found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSection;
