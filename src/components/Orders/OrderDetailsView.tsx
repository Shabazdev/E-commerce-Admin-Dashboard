import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Truck, Package, Clock, ShieldCheck, Printer } from 'lucide-react';
import { Order, OrderStatus } from '../../types';

interface OrderDetailsViewProps {
  order: Order;
  onBack: () => void;
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
  addToast: (message: string, type?: 'success' | 'error') => void;
}

export const OrderDetailsView: React.FC<OrderDetailsViewProps> = ({ order, onBack, onUpdateStatus, addToast }) => {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order.orderStatus);

  const handleStatusChange = (status: OrderStatus) => {
    setCurrentStatus(status);
    onUpdateStatus(order.id, status);
    addToast(`Order status updated to ${status}`, 'success');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Orders
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
          >
            <Printer className="w-4 h-4" /> Print Invoice
          </button>
          <select
            value={currentStatus}
            onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
            className="px-4 py-2 bg-emerald-600 text-white font-semibold text-xs rounded-xl focus:outline-none shadow-md"
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider block mb-1">Order Summary</span>
          <h1 className="text-2xl font-bold text-slate-900 font-mono">{order.id}</h1>
          <p className="text-xs text-slate-500 mt-1">Placed on {order.createdAt} via {order.paymentMethod}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs font-medium text-slate-500 block">Payment Status</span>
            <span className="font-semibold text-emerald-600 text-sm">{order.paymentStatus}</span>
          </div>
          <div className="text-right border-l pl-4 border-slate-200">
            <span className="text-xs font-medium text-slate-500 block">Grand Total</span>
            <span className="font-bold text-slate-900 text-lg tabular-nums">${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Order Timeline</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {order.timeline.map((t, idx) => (
            <div key={idx} className={`p-4 rounded-xl border ${t.completed ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
              <div className="flex items-center gap-2 font-semibold text-xs mb-1">
                {t.completed ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Clock className="w-4 h-4" />}
                <span>{t.status}</span>
              </div>
              <p className="text-[10px] tabular-nums">{t.timestamp || 'Pending'}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Customer & Shipping Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Info */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Customer Details</h3>
          <div className="space-y-2 text-sm">
            <p className="font-semibold text-slate-900">{order.customerName}</p>
            <p className="text-slate-600">{order.customerEmail}</p>
            <p className="text-slate-600">{order.customerPhone}</p>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Shipping Address</h3>
          <div className="space-y-1 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">{order.shippingAddress.street}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.district} {order.shippingAddress.postalCode}</p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>
      </div>

      {/* Ordered Items Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Ordered Products</h3>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
              <th className="pb-3">Product</th>
              <th className="pb-3 text-center">Quantity</th>
              <th className="pb-3 text-right">Price</th>
              <th className="pb-3 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {order.items.map((item, idx) => (
              <tr key={idx}>
                <td className="py-3.5 flex items-center gap-3">
                  <img src={item.image} alt={item.productName} className="w-10 h-10 rounded-lg object-cover border" />
                  <span className="font-semibold text-slate-900">{item.productName}</span>
                </td>
                <td className="py-3.5 text-center tabular-nums">{item.quantity}</td>
                <td className="py-3.5 text-right tabular-nums">${item.price.toFixed(2)}</td>
                <td className="py-3.5 text-right tabular-nums font-semibold">${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col items-end space-y-1.5 text-sm">
          <div className="flex justify-between w-64 text-slate-600">
            <span>Subtotal:</span>
            <span className="tabular-nums font-semibold">${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between w-64 text-slate-600">
            <span>Discount:</span>
            <span className="tabular-nums font-semibold text-emerald-600">-${order.discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between w-64 text-slate-600">
            <span>Shipping Fee:</span>
            <span className="tabular-nums font-semibold">${order.shippingFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between w-64 text-slate-600">
            <span>Estimated Tax:</span>
            <span className="tabular-nums font-semibold">${order.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between w-64 text-slate-900 font-bold text-base pt-2 border-t">
            <span>Grand Total:</span>
            <span className="tabular-nums">${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
