import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Brand } from '../../types';

interface BrandsViewProps {
  brands: Brand[];
  setBrands: React.Dispatch<React.SetStateAction<Brand[]>>;
  addToast: (message: string, type?: 'success' | 'error') => void;
}

export const BrandsView: React.FC<BrandsViewProps> = ({ brands, setBrands, addToast }) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [logo, setLogo] = useState('🌟');

  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const newBrand: Brand = {
      id: `BRD-${Date.now()}`,
      name,
      logo,
      productsCount: 0,
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setBrands([newBrand, ...brands]);
    setName('');
    setShowModal(false);
    addToast('Brand added successfully', 'success');
  };

  const handleDelete = (id: string) => {
    setBrands(brands.filter(b => b.id !== id));
    addToast('Brand deleted successfully', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Product Brands</h1>
          <p className="text-sm text-slate-500">Manage manufacturers and product brands</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-md transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Brand
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in duration-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Add New Brand</h3>
            <form onSubmit={handleAddBrand} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Brand Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. GreenFarm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Logo Symbol / Emoji</label>
                <input
                  type="text"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-md transition-colors"
                >
                  Save Brand
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
              <th className="py-3 px-4">Brand Logo & Name</th>
              <th className="py-3 px-4">Products</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {brands.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg font-bold border border-emerald-100">
                    {b.logo}
                  </span>
                  <span className="font-semibold text-slate-900">{b.name}</span>
                </td>
                <td className="py-3 px-4 tabular-nums font-semibold">{b.productsCount}</td>
                <td className="py-3 px-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                    {b.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete Brand"
                  >
                    <Trash2 className="w-4 h-4" />
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
