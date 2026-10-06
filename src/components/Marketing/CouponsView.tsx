import React, { useState } from 'react';
import { Plus, Trash2, Percent, Tag } from 'lucide-react';
import { Coupon } from '../../types';

interface CouponsViewProps {
  coupons: Coupon[];
  setCoupons: React.Dispatch<React.SetStateAction<Coupon[]>>;
  addToast: (message: string, type?: 'success' | 'error') => void;
}

export const CouponsView: React.FC<CouponsViewProps> = ({ coupons, setCoupons, addToast }) => {
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState('15');
  const [minPurchase, setMinPurchase] = useState('30');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    const newCoupon: Coupon = {
      id: `COUP-${Date.now()}`,
      code: code.toUpperCase(),
      discountType: 'Percentage',
      discountAmount: parseFloat(discountAmount),
      minPurchase: parseFloat(minPurchase),
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-12-31',
      usageLimit: 200,
      usedCount: 0,
      status: 'Active'
    };
    setCoupons([newCoupon, ...coupons]);
    setCode('');
    setShowModal(false);
    addToast('Coupon created successfully', 'success');
  };

  const handleDelete = (id: string) => {
    setCoupons(coupons.filter(c => c.id !== id));
    addToast('Coupon deleted successfully', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Discount Coupons</h1>
          <p className="text-sm text-slate-500">Create promotional discount codes and voucher campaigns</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-md transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in duration-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Create New Coupon</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SUMMER25"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono uppercase text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Discount Percentage (%)</label>
                <input
                  type="number"
                  required
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-500 tabular-nums"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Minimum Purchase ($)</label>
                <input
                  type="number"
                  required
                  value={minPurchase}
                  onChange={(e) => setMinPurchase(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-500 tabular-nums"
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
                  Save Coupon
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
              <th className="py-3 px-4">Coupon Code</th>
              <th className="py-3 px-4">Discount</th>
              <th className="py-3 px-4">Min Purchase</th>
              <th className="py-3 px-4">Usage Count</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {coupons.map((coup) => (
              <tr key={coup.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{coup.code}</td>
                <td className="py-3.5 px-4 font-semibold text-emerald-600 tabular-nums">
                  {coup.discountType === 'Percentage' ? `${coup.discountAmount}% OFF` : `$${coup.discountAmount} OFF`}
                </td>
                <td className="py-3.5 px-4 tabular-nums">${coup.minPurchase.toFixed(2)}</td>
                <td className="py-3.5 px-4 tabular-nums">{coup.usedCount} / {coup.usageLimit}</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    coup.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {coup.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => handleDelete(coup.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete Coupon"
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
