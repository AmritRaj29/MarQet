"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Settings } from "lucide-react";
import Logo from "@/components/Logo";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const links = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/dashboard/products", icon: Package },
    { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <ProtectedRoute requireSeller={true}>
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-card border-r border-white/10 flex flex-col">
          <div className="p-6 border-b border-white/10">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {links.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? "bg-primary/20 text-primary font-medium"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
