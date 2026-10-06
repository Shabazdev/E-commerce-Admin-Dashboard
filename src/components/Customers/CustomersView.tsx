import React, { useState } from 'react';
import { Search, Mail, Phone, ShoppingBag, Eye, Trash2 } from 'lucide-react';
import { Customer } from '../../types';

interface CustomersViewProps {
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  addToast: (message: string, type?: 'success' | 'error') => void;
}

export const CustomersView: React.FC<CustomersViewProps> = ({ customers, setCustomers, addToast }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setCustomers(customers.filter(c => c.id !== id));
    addToast('Customer deleted successfully', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Customer Management</h1>
          <p className="text-sm text-slate-500">View registered store users, contact details, and lifetime order spend</p>
        </div>
      </div>

      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b">
              <div className="flex items-center gap-3">
                <img src={selectedCustomer.avatar} alt={selectedCustomer.name} className="w-12 h-12 rounded-full object-cover border" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedCustomer.name}</h3>
                  <span className="text-xs text-emerald-600 font-medium">Customer ID: {selectedCustomer.id}</span>
                </div>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">✕</button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Email Address:</span>
                <span className="font-semibold text-slate-900">{selectedCustomer.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Phone Number:</span>
                <span className="font-semibold text-slate-900">{selectedCustomer.phone}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Shipping Address:</span>
                <span className="font-semibold text-slate-900">{selectedCustomer.address}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Total Orders Placed:</span>
                <span className="font-semibold text-slate-900 tabular-nums">{selectedCustomer.ordersCount}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Lifetime Spent:</span>
                <span className="font-bold text-emerald-600 tabular-nums">${selectedCustomer.totalSpent.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500">Registration Date:</span>
                <span className="font-semibold text-slate-900">{selectedCustomer.registrationDate}</span>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search customers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Contact</th>
              <th className="py-3 px-4">Orders</th>
              <th className="py-3 px-4">Total Spent</th>
              <th className="py-3 px-4">Joined</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredCustomers.map((cust) => (
              <tr key={cust.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 flex items-center gap-3">
                  <img src={cust.avatar} alt={cust.name} className="w-10 h-10 rounded-full object-cover border" />
                  <div>
                    <span className="font-semibold text-slate-900 block">{cust.name}</span>
                    <span className="text-xs text-slate-500">ID: {cust.id}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="text-slate-900 block">{cust.email}</span>
                  <span className="text-xs text-slate-500">{cust.phone}</span>
                </td>
                <td className="py-3.5 px-4 font-semibold tabular-nums">{cust.ordersCount}</td>
                <td className="py-3.5 px-4 font-semibold text-emerald-600 tabular-nums">${cust.totalSpent.toFixed(2)}</td>
                <td className="py-3.5 px-4 text-xs text-slate-600">{cust.registrationDate}</td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => setSelectedCustomer(cust)}
                      className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      title="View Customer Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cust.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Customer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
