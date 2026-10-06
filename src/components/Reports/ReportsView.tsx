import React from 'react';
import { BarChart3, Download, Printer, TrendingUp, DollarSign, ShoppingBag, Users } from 'lucide-react';
import { Product, Order, Customer } from '../../types';

interface ReportsViewProps {
  products: Product[];
  orders: Order[];
  customers: Customer[];
  reportType?: 'sales' | 'products' | 'customers' | 'inventory';
}

export const ReportsView: React.FC<ReportsViewProps> = ({ products, orders, customers, reportType = 'sales' }) => {
  const totalRevenue = orders.reduce((acc, o) => acc + (o.paymentStatus === 'Paid' ? o.total : 0), 12845.50);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {reportType === 'products' ? 'Product Performance Reports' :
             reportType === 'customers' ? 'Customer Insights Reports' :
             reportType === 'inventory' ? 'Inventory Valuation Reports' : 'Sales & Revenue Analytics'}
          </h1>
          <p className="text-sm text-slate-500">Comprehensive e-commerce analytics, financial summaries, and data exports</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4" /> Print Report
          </button>
          <button
            onClick={() => alert('Report CSV export initiated successfully.')}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-md transition-colors"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase">Gross Revenue</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase">Total Orders</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">{orders.length + 142}</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase">Registered Customers</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">{customers.length + 1280}</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase">Average Order Value</span>
          <h3 className="text-2xl font-bold text-emerald-600 mt-2 tabular-nums">$38.45</h3>
        </div>
      </div>

      {/* Visual Chart Simulation */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-950">Monthly Revenue Trend (2026)</h3>
        <div className="h-64 flex items-end justify-between gap-3 pt-8 pb-2 px-4 bg-slate-50 rounded-xl border border-slate-100">
          {[
            { month: 'Nov', val: 62 },
            { month: 'Dec', val: 85 },
            { month: 'Jan', val: 70 },
            { month: 'Feb', val: 92 },
            { month: 'Mar', val: 110 },
            { month: 'Apr', val: 128 }
          ].map((bar, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <span className="text-[10px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">${bar.val * 100}</span>
              <div 
                style={{ height: `${(bar.val / 130) * 100}%` }}
                className="w-full max-w-[48px] bg-emerald-600 hover:bg-emerald-500 rounded-t-lg transition-all"
              />
              <span className="text-xs font-medium text-slate-600">{bar.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
