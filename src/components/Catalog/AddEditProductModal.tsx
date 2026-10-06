import React, { useState } from 'react';
import { Package, ArrowLeft, Save, Sparkles } from 'lucide-react';
import { Product, ActiveView } from '../../types';

interface AddEditProductModalProps {
  editingProduct?: Product | null;
  onSave: (product: Product) => void;
  setActiveView: (view: ActiveView) => void;
  addToast: (message: string, type?: 'success' | 'error') => void;
}

export const AddEditProductModal: React.FC<AddEditProductModalProps> = ({
  editingProduct,
  onSave,
  setActiveView,
  addToast
}) => {
  const [name, setName] = useState(editingProduct?.name || '');
  const [sku, setSku] = useState(editingProduct?.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`);
  const [category, setCategory] = useState(editingProduct?.category || 'Fresh Produce');
  const [brand, setBrand] = useState(editingProduct?.brand || 'NatureBest');
  const [price, setPrice] = useState(editingProduct?.price ? editingProduct.price.toString() : '');
  const [salePrice, setSalePrice] = useState(editingProduct?.salePrice ? editingProduct.salePrice.toString() : '');
  const [stock, setStock] = useState(editingProduct?.stock ? editingProduct.stock.toString() : '50');
  const [minStock, setMinStock] = useState(editingProduct?.minStock ? editingProduct.minStock.toString() : '10');
  const [status, setStatus] = useState<'Published' | 'Draft' | 'Out of Stock'>(editingProduct?.status || 'Published');
  const [image, setImage] = useState(editingProduct?.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80');
  const [description, setDescription] = useState(editingProduct?.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) {
      addToast('Please fill in required fields (Name, Price)', 'error');
      return;
    }

    const product: Product = {
      id: editingProduct ? editingProduct.id : `PROD-${Math.floor(100 + Math.random() * 900)}`,
      name,
      sku,
      category,
      brand,
      price: parseFloat(price),
      salePrice: salePrice ? parseFloat(salePrice) : undefined,
      stock: parseInt(stock, 10),
      minStock: parseInt(minStock, 10),
      status,
      image,
      createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString().split('T')[0],
      description
    };

    onSave(product);
    addToast(editingProduct ? 'Product updated successfully' : 'Product created successfully', 'success');
    setActiveView('products');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Navigation Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveView('products')}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </button>
        <h1 className="text-xl font-bold text-slate-900">
          {editingProduct ? 'Edit Product Details' : 'Add New Product'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Product Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Organic Fresh Hass Avocados (1kg)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* SKU */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">SKU Code</label>
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-500"
            >
              <option value="Fresh Produce">Fresh Produce</option>
              <option value="Bakery">Bakery</option>
              <option value="Groceries">Groceries</option>
              <option value="Dairy & Eggs">Dairy & Eggs</option>
              <option value="Snacks">Snacks</option>
            </select>
          </div>

          {/* Brand */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Brand</label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-500"
            >
              <option value="NatureBest">NatureBest</option>
              <option value="Golden Crust">Golden Crust</option>
              <option value="Apiary Gold">Apiary Gold</option>
              <option value="PureHarvest">PureHarvest</option>
              <option value="HappyHen">HappyHen</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Product Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-500"
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          {/* Regular Price */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Regular Price ($) *</label>
            <input
              type="number"
              step="0.01"
              required
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-500 tabular-nums"
            />
          </div>

          {/* Sale Price */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Sale Price ($)</label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-500 tabular-nums"
            />
          </div>

          {/* Stock Quantity */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Initial Stock Quantity</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-500 tabular-nums"
            />
          </div>

          {/* Min Stock Threshold */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Low Stock Alert Threshold</label>
            <input
              type="number"
              value={minStock}
              onChange={(e) => setMinStock(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-500 tabular-nums"
            />
          </div>

          {/* Image URL */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Product Image URL</label>
            <div className="flex gap-4 items-center">
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-500"
              />
              <img src={image} alt="Preview" className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0" />
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Product Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description of the product..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setActiveView('products')}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-md transition-colors"
          >
            <Save className="w-4 h-4" /> Save Product
          </button>
        </div>
      </form>
    </div>
  );
};
