import { Link } from "react-router-dom";
import { Twitter, MessageCircle, Send } from "lucide-react";
import { routePaths } from "@/config/routes";

const quickLinks = [
  { label: "About Us", to: routePaths.about },
  { label: "Whitepaper", to: routePaths.whitepaper },
  { label: "Contact", to: routePaths.contact },
] as const;

const legalLinks = [
  { label: "Terms of Use", to: routePaths.terms },
  { label: "Privacy Policy", to: routePaths.privacy },
] as const;

const linkClass =
  "text-sm text-muted-foreground hover:text-foreground transition-colors";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="section-container section">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link
              to={routePaths.home}
              className="text-lg font-heading font-bold text-foreground hover:opacity-90"
            >
              <span className="text-gradient">Arn-Apex</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-[240px]">
              Your adventure in the game starts here.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Connect
            </h3>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Discord"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Telegram"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <Send className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Arn-Apex. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
