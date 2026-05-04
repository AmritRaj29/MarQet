import type { Metadata } from "next";
import DenseNavbar from "@/components/shop/amazon-layout/DenseNavbar";

export const metadata: Metadata = {
  title: "MarQet Marketplace",
  description: "Hyperlocal marketplace for all your needs.",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col relative selection:bg-teal-400/30 text-zinc-900 dark:text-white">
      <DenseNavbar />
      <main className="flex-1 w-full bg-white dark:bg-zinc-900">
        {children}
      </main>
    </div>
  );
}
