import React, { useState } from 'react';
import { Search, Eye, Filter } from 'lucide-react';
import { Order, OrderStatus } from '../../types';

interface OrdersViewProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
  statusFilter?: OrderStatus | 'All';
  addToast: (message: string, type?: 'success' | 'error') => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({ orders, onSelectOrder, statusFilter = 'All', addToast }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>(statusFilter);

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) || o.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || o.orderStatus === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Orders Management</h1>
          <p className="text-sm text-slate-500">Track and fulfill customer e-commerce orders and shipments</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search Order ID or Customer Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No orders found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-xs font-semibold text-slate-900">{order.id}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-900 block">{order.customerName}</span>
                      <span className="text-xs text-slate-500">{order.customerEmail}</span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600">{order.createdAt}</td>
                    <td className="py-3.5 px-4">
                      <span className="text-xs font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900 tabular-nums">${order.total.toFixed(2)}</td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.orderStatus === 'Delivered' ? 'bg-emerald-50 text-emerald-700' :
                        order.orderStatus === 'Shipped' ? 'bg-blue-50 text-blue-700' :
                        order.orderStatus === 'Processing' ? 'bg-amber-50 text-amber-700' :
                        order.orderStatus === 'Refunded' ? 'bg-purple-50 text-purple-700' :
                        order.orderStatus === 'Cancelled' ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onSelectOrder(order)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" /> Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
