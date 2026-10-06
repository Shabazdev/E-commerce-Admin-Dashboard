import React, { useState } from 'react';
import { Warehouse, AlertTriangle, PackageX, Plus, Minus, Search, CheckCircle } from 'lucide-react';
import { Product } from '../../types';

interface InventoryViewProps {
  products: Product[];
  onUpdateStock: (productId: string, newStock: number) => void;
  filterMode?: 'all' | 'low' | 'out';
  addToast: (message: string, type?: 'success' | 'error') => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({ products, onUpdateStock, filterMode = 'all', addToast }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [adjustingProduct, setAdjustingProduct] = useState<Product | null>(null);
  const [adjustmentAmount, setAdjustmentAmount] = useState('10');

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterMode === 'low') return matchesSearch && p.stock <= p.minStock && p.stock > 0;
    if (filterMode === 'out') return matchesSearch && p.stock === 0;
    return matchesSearch;
  });

  const handleStockAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustingProduct) return;
    const delta = parseInt(adjustmentAmount, 10);
    const newStock = Math.max(0, adjustingProduct.stock + delta);
    onUpdateStock(adjustingProduct.id, newStock);
    addToast(`Successfully updated stock for ${adjustingProduct.name}`, 'success');
    setAdjustingProduct(null);
    setAdjustmentAmount('10');
  };

  const totalItems = products.reduce((acc, p) => acc + p.stock, 0);
  const lowStockCount = products.filter(p => p.stock <= p.minStock && p.stock > 0).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;
  const totalValuation = products.reduce((acc, p) => acc + (p.price * p.stock), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {filterMode === 'low' ? 'Low Stock Inventory' : filterMode === 'out' ? 'Out of Stock Inventory' : 'Inventory Management'}
          </h1>
          <p className="text-sm text-slate-500">Monitor stock levels, warehouse quantities, and adjust item inventory</p>
        </div>
      </div>

      {/* Inventory Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase">Total Products</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">{products.length}</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase">Low Stock Alerts</span>
          <h3 className="text-2xl font-bold text-amber-600 mt-2 tabular-nums">{lowStockCount}</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase">Out of Stock</span>
          <h3 className="text-2xl font-bold text-rose-600 mt-2 tabular-nums">{outOfStockCount}</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase">Total Inventory Value</span>
          <h3 className="text-2xl font-bold text-emerald-600 mt-2 tabular-nums">${totalValuation.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
        </div>
      </div>

      {/* Stock Adjustment Modal */}
      {adjustingProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in duration-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Adjust Stock</h3>
            <p className="text-xs text-slate-500 mb-4">{adjustingProduct.name} (Current: {adjustingProduct.stock})</p>
            <form onSubmit={handleStockAdjustment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Quantity to Add / Restock</label>
                <input
                  type="number"
                  required
                  value={adjustmentAmount}
                  onChange={(e) => setAdjustmentAmount(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-500 tabular-nums"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAdjustingProduct(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-md transition-colors"
                >
                  Confirm Restock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search inventory by product name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Current Stock</th>
              <th className="py-3 px-4">Min Threshold</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredProducts.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 flex items-center gap-3">
                  <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover border" />
                  <span className="font-semibold text-slate-900">{p.name}</span>
                </td>
                <td className="py-3.5 px-4 font-mono text-xs text-slate-600">{p.sku}</td>
                <td className="py-3.5 px-4 text-slate-700">{p.category}</td>
                <td className="py-3.5 px-4 font-bold tabular-nums">
                  <span className={p.stock === 0 ? 'text-rose-600' : p.stock <= p.minStock ? 'text-amber-600' : 'text-slate-900'}>
                    {p.stock} units
                  </span>
                </td>
                <td className="py-3.5 px-4 tabular-nums text-slate-500">{p.minStock} units</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    p.stock === 0 ? 'bg-rose-50 text-rose-700' :
                    p.stock <= p.minStock ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {p.stock === 0 ? 'Out of Stock' : p.stock <= p.minStock ? 'Low Stock' : 'In Stock'}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => setAdjustingProduct(p)}
                    className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-xl transition-colors"
                  >
                    Adjust Stock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
