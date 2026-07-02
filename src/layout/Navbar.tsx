import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { routePaths } from "@/config/routes";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", path: routePaths.home },
  { label: "Ecosystem", path: routePaths.ecosystem },
  { label: "NFTs", path: routePaths.nfts },
  { label: "Marketplace", path: routePaths.marketplace },
  { label: "DeFiHub", path: routePaths.defihub },
] as const;

interface NavbarProps {
  onConnectWallet: () => void;
}

export function Navbar({ onConnectWallet }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg = scrolled
    ? "bg-background/80 backdrop-blur-xl border-b border-border"
    : "bg-transparent";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        navBg
      )}
      style={{ height: "var(--navbar-h)" }}
    >
      <div className="section-container h-full flex items-center justify-between gap-6">
        <Link
          to={routePaths.home}
          className="text-xl font-heading font-bold tracking-tight text-foreground hover:opacity-90 transition-opacity shrink-0"
          aria-label="Arn-Apex Home"
        >
          <span className="text-gradient">Arn-Apex</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Main">
          {navItems.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                location.pathname === path
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Button
            asChild
            size="sm"
            className="rounded-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link to={routePaths.gameplay}>Play</Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-lg text-muted-foreground hover:text-foreground"
            onClick={onConnectWallet}
          >
            Connect Wallet
          </Button>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(320px,100vw)] flex flex-col gap-6 pt-8">
            <nav className="flex flex-col gap-1" aria-label="Main mobile">
              {navItems.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-base font-medium transition-colors",
                    location.pathname === path
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:bg-muted/50"
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2 mt-auto">
              <Button asChild className="rounded-lg font-semibold" size="lg">
                <Link to={routePaths.gameplay} onClick={() => setMobileOpen(false)}>
                  Play
                </Link>
              </Button>
              <Button variant="outline" className="rounded-lg" onClick={() => { onConnectWallet(); setMobileOpen(false); }}>
                Connect Wallet
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
