import React, { useState } from 'react';
import { Plus, Trash2, Edit, CheckCircle } from 'lucide-react';
import { Category } from '../../types';

interface CategoriesViewProps {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  addToast: (message: string, type?: 'success' | 'error') => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({ categories, setCategories, addToast }) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=150&auto=format&fit=crop&q=80');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const newCat: Category = {
      id: `CAT-${Date.now()}`,
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      parent: 'None',
      productsCount: 0,
      status: 'Active',
      image,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCategories([newCat, ...categories]);
    setName('');
    setShowModal(false);
    addToast('Category created successfully', 'success');
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
    addToast('Category deleted successfully', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Product Categories</h1>
          <p className="text-sm text-slate-500">Organize store products into logical hierarchical categories</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-md transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in duration-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Add New Category</h3>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Organic Beverages"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Image URL</label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
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
                  Save Category
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
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Slug</th>
              <th className="py-3 px-4">Products</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 flex items-center gap-3">
                  <img src={cat.image} alt={cat.name} className="w-10 h-10 rounded-lg object-cover border border-slate-200" />
                  <span className="font-semibold text-slate-900">{cat.name}</span>
                </td>
                <td className="py-3 px-4 font-mono text-xs text-slate-600">{cat.slug}</td>
                <td className="py-3 px-4 tabular-nums font-semibold">{cat.productsCount}</td>
                <td className="py-3 px-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                    {cat.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete Category"
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
