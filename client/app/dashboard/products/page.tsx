"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { motion } from "framer-motion";

export default function ProductsManager() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { token, user } = useAuthStore();

  useEffect(() => {
    // In a real app, we'd have an endpoint to fetch products for the specific shop.
    // For now, let's fetch all products and mock filter (or just show all for demo).
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(products.filter(p => p._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground">Manage your store's inventory.</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="bg-card border border-white/5 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-9 pr-4 py-2 text-sm bg-secondary/50 border border-white/5 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading products...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/5 bg-secondary/20 text-muted-foreground text-sm">
                  <th className="p-4 font-medium">Product Name</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">Price</th>
                  <th className="p-4 font-medium">Stock</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <motion.tr 
                    key={product._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-white/5 hover:bg-secondary/10 transition-colors"
                  >
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary overflow-hidden">
                        {product.images?.[0] && (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <span className="font-medium text-foreground whitespace-nowrap">{product.name}</span>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{product.category}</td>
                    <td className="p-4 font-medium">${product.price.toFixed(2)}</td>
                    <td className="p-4 text-sm">
                      <span className={`px-2 py-1 rounded-full whitespace-nowrap ${product.stock > 10 ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-primary">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(product._id)} className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
