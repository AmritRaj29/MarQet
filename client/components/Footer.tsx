import Link from "next/link";
import { Twitter, Instagram, Github } from "lucide-react";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/50 backdrop-blur-md pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <Link href="/">
            <Logo />
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs">
            Empowering local communities with a seamless and secure digital marketplace.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="w-5 h-5"/></a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="w-5 h-5"/></a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Github className="w-5 h-5"/></a>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Marketplace</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">All Categories</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Today's Deals</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Local Services</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Seller Directory</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Safety Center</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Community Guidelines</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} MarQet. All rights reserved.</p>
        <div className="flex gap-6">
          <span>Made with ❤️ for local communities</span>
        </div>
      </div>
    </footer>
  );
}
