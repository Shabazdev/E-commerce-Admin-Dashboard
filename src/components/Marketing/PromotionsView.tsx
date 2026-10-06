import React from 'react';
import { Megaphone } from 'lucide-react';
import { Promotion } from '../../types';

interface PromotionsViewProps {
  promotions: Promotion[];
}

export const PromotionsView: React.FC<PromotionsViewProps> = ({ promotions }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Marketing Promotions</h1>
        <p className="text-sm text-slate-500">Active store promotional campaigns and seasonal discounts</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
              <th className="py-3 px-4">Campaign Name</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Discount</th>
              <th className="py-3 px-4">Duration</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {promotions.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-slate-900">{p.campaignName}</td>
                <td className="py-3.5 px-4 text-slate-700">{p.productCategory}</td>
                <td className="py-3.5 px-4 font-semibold text-emerald-600 tabular-nums">{p.discountPercentage}% OFF</td>
                <td className="py-3.5 px-4 text-xs text-slate-600">{p.startDate} to {p.endDate}</td>
                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
