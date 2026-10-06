import React from 'react';
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Package, 
  TrendingUp, 
  ArrowUpRight, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  Eye,
  Plus
} from 'lucide-react';
import { Product, Order, Customer, ActiveView } from '../types';

interface DashboardHomeProps {
  products: Product[];
  orders: Order[];
  customers: Customer[];
  setActiveView: (view: ActiveView) => void;
  onSelectOrder: (order: Order) => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({ products, orders, customers, setActiveView, onSelectOrder }) => {
  const totalRevenue = orders.reduce((acc, o) => acc + (o.paymentStatus === 'Paid' ? o.total : 0), 12845.50);
  const totalOrdersCount = orders.length + 142;
  const totalCustomersCount = customers.length + 1280;
  const totalProductsCount = products.length + 56;

  const lowStockProducts = products.filter(p => p.stock <= p.minStock);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-950 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-400 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-4">
            <TrendingUp className="w-3.5 h-3.5" /> EcoBazar Admin Command Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Welcome back, Alexander!</h1>
          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            Your store is performing exceptionally well today. You have <span className="text-emerald-400 font-semibold">12 new orders</span> pending processing and 2 low stock items requiring restock.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveView('add-product')}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
          <button
            onClick={() => setActiveView('orders')}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-xl border border-slate-700 transition-all cursor-pointer"
          >
            View Orders
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Revenue</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-slate-900 tabular-nums">${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +14.2% from last month
            </span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Orders</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-slate-900 tabular-nums">{totalOrdersCount}</h3>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +8.1% from last month
            </span>
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Customers</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-slate-900 tabular-nums">{totalCustomersCount}</h3>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +12.4% new signups
            </span>
          </div>
        </div>

        {/* Catalog Products */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Products</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-slate-900 tabular-nums">{totalProductsCount}</h3>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 mt-1">
              Across 5 main categories
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Orders & Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders (2 columns) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Orders</h2>
              <p className="text-xs text-slate-500">Latest customer orders requiring fulfillment</p>
            </div>
            <button
              onClick={() => setActiveView('orders')}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
                  <th className="pb-3 pl-2">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 pr-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 pl-2 font-mono text-xs font-semibold text-slate-900">{order.id}</td>
                    <td className="py-3.5">
                      <span className="font-medium text-slate-900 block">{order.customerName}</span>
                      <span className="text-xs text-slate-500">{order.customerEmail}</span>
                    </td>
                    <td className="py-3.5 font-semibold text-slate-900 tabular-nums">${order.total.toFixed(2)}</td>
                    <td className="py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.orderStatus === 'Delivered' ? 'bg-emerald-50 text-emerald-700' :
                        order.orderStatus === 'Shipped' ? 'bg-blue-50 text-blue-700' :
                        order.orderStatus === 'Processing' ? 'bg-amber-50 text-amber-700' :
                        order.orderStatus === 'Refunded' ? 'bg-purple-50 text-purple-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-3.5 pr-2 text-right">
                      <button
                        onClick={() => onSelectOrder(order)}
                        className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="View Order Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Warning Card (1 column) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h2 className="text-base font-bold text-slate-900">Inventory Alerts</h2>
              </div>
              <span className="text-xs font-medium px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                {lowStockProducts.length} Items
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">Products falling below minimum threshold</p>

            <div className="space-y-3">
              {lowStockProducts.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-slate-900 truncate">{p.name}</h4>
                      <span className="text-[10px] text-amber-600 font-medium">Stock: {p.stock} (Min: {p.minStock})</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveView('inventory')}
                    className="px-2.5 py-1 text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200 transition-colors shrink-0"
                  >
                    Restock
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={() => setActiveView('inventory')}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors text-center"
            >
              Manage Full Inventory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
