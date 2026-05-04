import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CartDrawer from "@/components/CartDrawer";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/NoiseOverlay";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({ subsets: ["latin"] });



export const metadata: Metadata = {
  title: "MarQet - Hyperlocal Marketplace",
  description: "Your local marketplace for everything",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} antialiased selection:bg-primary selection:text-primary-foreground`}>
          <SmoothScroll>
            <CustomCursor />
            <NoiseOverlay />
            <ScrollProgress />
            {children}
            <CartDrawer />
          </SmoothScroll>
      </body>
    </html>
  );
}
