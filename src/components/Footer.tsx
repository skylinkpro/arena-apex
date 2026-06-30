import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Twitter, MessageCircle, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card/30 border-t border-primary/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-gradient mb-4">
              Arn-Apex
            </h3>
            <p className="text-muted-foreground">
              Your adventure in the GAME starts here
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/whitepaper"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Whitepaper
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Roadmap
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Download */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              Connect With Us
            </h4>
            <div className="flex space-x-4 mb-6">
              <motion.a
                href="#"
                className="p-3 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter className="w-5 h-5 text-primary" />
              </motion.a>
              <motion.a
                href="#"
                className="p-3 bg-secondary/10 rounded-full hover:bg-secondary/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-5 h-5 text-secondary" />
              </motion.a>
              <motion.a
                href="#"
                className="p-3 bg-accent/10 rounded-full hover:bg-accent/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-5 h-5 text-accent" />
              </motion.a>
            </div>

            <div className="space-y-2">
              <a
                href="#"
                className="block px-4 py-2 bg-muted/30 rounded-lg text-center hover:bg-muted/50 transition-colors text-sm"
              >
                📱 Download on App Store
              </a>
              <a
                href="#"
                className="block px-4 py-2 bg-muted/30 rounded-lg text-center hover:bg-muted/50 transition-colors text-sm"
              >
                🤖 Get it on Google Play
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/10 pt-8 text-center text-muted-foreground text-sm">
          <p>
            &copy; 2025 Arn-Apex. All rights reserved. Built with ❤️ on the
            blockchain.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
