import React, { useState } from 'react';
import { Settings, Save, Shield, CreditCard, Truck, Mail, User, Globe } from 'lucide-react';

interface SettingsViewProps {
  section?: 'general' | 'payment' | 'shipping' | 'tax' | 'email' | 'profile' | 'security';
  addToast: (message: string, type?: 'success' | 'error') => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ section = 'general', addToast }) => {
  const [activeTab, setActiveTab] = useState(section);
  const [storeName, setStoreName] = useState('EcoBazar Organic Store');
  const [email, setEmail] = useState('support@ecobazar.com');
  const [currency, setCurrency] = useState('USD ($)');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Settings updated successfully', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Store Settings & Configuration</h1>
        <p className="text-sm text-slate-500">Configure global store preferences, payment gateways, shipping zones, and security</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { key: 'general', label: 'General' },
          { key: 'payment', label: 'Payment' },
          { key: 'shipping', label: 'Shipping' },
          { key: 'tax', label: 'Tax' },
          { key: 'email', label: 'Email' },
          { key: 'profile', label: 'Admin Profile' },
          { key: 'security', label: 'Security' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${
              activeTab === tab.key ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-8 space-y-6 shadow-xs">
        {activeTab === 'general' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">General Store Settings</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Store Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Support Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-500"
              >
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="GBP (£)">GBP (£)</option>
                <option value="BDT (৳)">BDT (৳)</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Payment Gateway Integrations</h3>
            <div className="divide-y divide-slate-100">
              {[
                { name: 'Cash on Delivery (COD)', desc: 'Pay with cash upon physical delivery', enabled: true },
                { name: 'Stripe Credit Card', desc: 'Accept Visa, Mastercard, and Amex securely', enabled: true },
                { name: 'bKash Mobile Banking', desc: 'Popular mobile financial service gateway', enabled: true },
                { name: 'SSLCommerz', desc: 'Secure online payment gateway aggregator', enabled: false }
              ].map((gw, i) => (
                <div key={i} className="py-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{gw.name}</h4>
                    <p className="text-xs text-slate-500">{gw.desc}</p>
                  </div>
                  <input type="checkbox" defaultChecked={gw.enabled} className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Shipping Zones & Charges</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Standard Shipping Flat Fee ($)</label>
                <input type="number" defaultValue="4.99" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm tabular-nums" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Free Shipping Threshold ($)</label>
                <input type="number" defaultValue="50.00" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm tabular-nums" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tax' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Tax Settings</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Default VAT / Sales Tax Rate (%)</label>
              <input type="number" defaultValue="7.5" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm tabular-nums" />
            </div>
          </div>
        )}

        {activeTab === 'email' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">SMTP Email Notifications</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">SMTP Host</label>
              <input type="text" defaultValue="smtp.mailgun.org" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono" />
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Admin Profile</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Admin Name</label>
              <input type="text" defaultValue="Alexander Wright" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Security & Two-Factor Authentication</h3>
            <div className="flex items-center justify-between py-2">
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Two-Factor Authentication (2FA)</h4>
                <p className="text-xs text-slate-500">Secure admin login with authenticator app OTP</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500" />
            </div>
          </div>
        )}

        <div className="flex justify-end pt-6 border-t border-slate-100">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-md transition-colors"
          >
            <Save className="w-4 h-4" /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};
