import React, { useState } from 'react';
import { Menu, Search, Bell, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ActiveView } from '../types';

interface HeaderProps {
  onToggleMobile: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setActiveView: (view: ActiveView) => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobile, searchTerm, setSearchTerm, setActiveView }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'New Order Received', desc: 'Order #9824 placed by David Kim ($25.45)', time: '5m ago' },
    { id: 2, title: 'Low Stock Alert', desc: 'Artisan Sourdough Country Loaf is down to 8 units', time: '1h ago' },
    { id: 3, title: 'New Customer Review', desc: 'Sarah Jenkins left a 5-star review on Avocados', time: '3h ago' }
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-6 shadow-xs">
      {/* Left: Mobile hamburger & Global Search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button
          onClick={onToggleMobile}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search products, orders, customers, or SKUs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right: Quick actions & Notifications */}
      <div className="flex items-center gap-3">
        {/* Storefront view button */}
        <button
          onClick={() => setActiveView('dashboard')}
          className="hidden md:flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          title="View Storefront Preview"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Storefront</span>
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl py-3 z-50 animate-in fade-in duration-150">
              <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
                <span className="text-[10px] font-medium bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">3 New</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer">
                    <p className="text-xs font-semibold text-slate-900">{n.title}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{n.desc}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                  </div>
                ))}
              </div>
              <div className="px-4 pt-2 border-t border-slate-100 text-center">
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Admin profile quick badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
            AW
          </div>
          <div className="hidden lg:block text-left">
            <span className="block text-xs font-semibold text-slate-900 leading-tight">Alexander W.</span>
            <span className="block text-[10px] text-slate-500 leading-tight flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" /> Super Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
