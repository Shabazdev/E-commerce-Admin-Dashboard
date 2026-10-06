import React from 'react';
import { Banner } from '../../types';

interface BannersViewProps {
  banners: Banner[];
}

export const BannersView: React.FC<BannersViewProps> = ({ banners }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Store Banners & Sliders</h1>
        <p className="text-sm text-slate-500">Manage promotional hero banners and homepage sliders</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((b) => (
          <div key={b.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between">
            <div className="relative h-48">
              <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                {b.position}
              </div>
            </div>
            <div className="p-6 space-y-3">
              <h3 className="text-base font-bold text-slate-900">{b.title}</h3>
              <p className="text-xs text-slate-600 line-clamp-2">{b.description}</p>
              <div className="flex items-center justify-between pt-2 border-t text-xs text-slate-500">
                <span>Active: {b.startDate} to {b.endDate}</span>
                <span className="text-emerald-600 font-semibold">{b.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
