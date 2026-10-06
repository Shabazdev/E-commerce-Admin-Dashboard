import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Megaphone, 
  Warehouse, 
  BarChart3, 
  FileText, 
  Settings, 
  ChevronDown, 
  ChevronRight, 
  Leaf,
  PlusCircle,
  Tag,
  Star,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  RotateCcw,
  Percent,
  Gift,
  AlertTriangle,
  FileSpreadsheet,
  Globe,
  Sliders,
  CreditCard,
  Shield,
  UserCheck,
  Mail
} from 'lucide-react';
import { ActiveView } from '../types';

interface SidebarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isOpenMobile, setIsOpenMobile }) => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    catalog: true,
    orders: true,
    customers: false,
    marketing: false,
    inventory: false,
    reports: false,
    content: false,
    settings: false
  });

  const toggleMenu = (key: string) => {
    setOpenMenus(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNav = (view: ActiveView) => {
    setActiveView(view);
    setIsOpenMobile(false);
  };

  const isActive = (view: ActiveView) => activeView === view;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-300 ease-in-out border-r border-slate-800
        ${isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0 bg-slate-950">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNav('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/30">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg text-white tracking-tight">EcoBazar</span>
              <span className="block text-[10px] text-emerald-400 font-medium uppercase tracking-wider">Admin Dashboard</span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-700">
          
          {/* Dashboard */}
          <button
            onClick={() => handleNav('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive('dashboard')
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          {/* Catalog Group */}
          <div className="pt-2">
            <button
              onClick={() => toggleMenu('catalog')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-emerald-400" />
                <span>Catalog</span>
              </div>
              {openMenus.catalog ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {openMenus.catalog && (
              <div className="pl-9 pr-2 py-1 space-y-1 text-xs font-medium">
                <button onClick={() => handleNav('products')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('products') || isActive('edit-product') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Products</button>
                <button onClick={() => handleNav('add-product')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('add-product') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Add Product</button>
                <button onClick={() => handleNav('categories')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('categories') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Categories</button>
                <button onClick={() => handleNav('brands')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('brands') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Brands</button>
                <button onClick={() => handleNav('reviews')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('reviews') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Reviews</button>
              </div>
            )}
          </div>

          {/* Orders Group */}
          <div className="pt-1">
            <button
              onClick={() => toggleMenu('orders')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-emerald-400" />
                <span>Orders</span>
              </div>
              {openMenus.orders ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {openMenus.orders && (
              <div className="pl-9 pr-2 py-1 space-y-1 text-xs font-medium">
                <button onClick={() => handleNav('orders')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('orders') || isActive('order-details') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>All Orders</button>
                <button onClick={() => handleNav('pending-orders')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('pending-orders') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Pending</button>
                <button onClick={() => handleNav('processing-orders')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('processing-orders') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Processing</button>
                <button onClick={() => handleNav('shipped-orders')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('shipped-orders') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Shipped</button>
                <button onClick={() => handleNav('delivered-orders')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('delivered-orders') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Delivered</button>
                <button onClick={() => handleNav('cancelled-orders')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('cancelled-orders') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Cancelled</button>
                <button onClick={() => handleNav('refunds')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('refunds') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Refunds</button>
              </div>
            )}
          </div>

          {/* Customers Group */}
          <div className="pt-1">
            <button
              onClick={() => toggleMenu('customers')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Customers</span>
              </div>
              {openMenus.customers ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {openMenus.customers && (
              <div className="pl-9 pr-2 py-1 space-y-1 text-xs font-medium">
                <button onClick={() => handleNav('customers')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('customers') || isActive('customer-details') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>All Customers</button>
              </div>
            )}
          </div>

          {/* Marketing Group */}
          <div className="pt-1">
            <button
              onClick={() => toggleMenu('marketing')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <Megaphone className="w-4 h-4 text-emerald-400" />
                <span>Marketing</span>
              </div>
              {openMenus.marketing ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {openMenus.marketing && (
              <div className="pl-9 pr-2 py-1 space-y-1 text-xs font-medium">
                <button onClick={() => handleNav('coupons')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('coupons') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Coupons</button>
                <button onClick={() => handleNav('promotions')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('promotions') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Promotions</button>
                <button onClick={() => handleNav('banners')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('banners') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Banners</button>
              </div>
            )}
          </div>

          {/* Inventory Group */}
          <div className="pt-1">
            <button
              onClick={() => toggleMenu('inventory')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <Warehouse className="w-4 h-4 text-emerald-400" />
                <span>Inventory</span>
              </div>
              {openMenus.inventory ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {openMenus.inventory && (
              <div className="pl-9 pr-2 py-1 space-y-1 text-xs font-medium">
                <button onClick={() => handleNav('inventory')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('inventory') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Inventory</button>
                <button onClick={() => handleNav('low-stock')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('low-stock') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Low Stock</button>
                <button onClick={() => handleNav('out-of-stock')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('out-of-stock') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Out of Stock</button>
              </div>
            )}
          </div>

          {/* Reports Group */}
          <div className="pt-1">
            <button
              onClick={() => toggleMenu('reports')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <span>Reports</span>
              </div>
              {openMenus.reports ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {openMenus.reports && (
              <div className="pl-9 pr-2 py-1 space-y-1 text-xs font-medium">
                <button onClick={() => handleNav('sales-reports')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('sales-reports') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Sales Reports</button>
                <button onClick={() => handleNav('product-reports')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('product-reports') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Product Reports</button>
                <button onClick={() => handleNav('customer-reports')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('customer-reports') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Customer Reports</button>
                <button onClick={() => handleNav('inventory-reports')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('inventory-reports') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Inventory Reports</button>
              </div>
            )}
          </div>

          {/* Content Group */}
          <div className="pt-1">
            <button
              onClick={() => toggleMenu('content')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Content</span>
              </div>
              {openMenus.content ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {openMenus.content && (
              <div className="pl-9 pr-2 py-1 space-y-1 text-xs font-medium">
                <button onClick={() => handleNav('homepage-content')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('homepage-content') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Homepage</button>
                <button onClick={() => handleNav('content-banners')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('content-banners') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Banners</button>
                <button onClick={() => handleNav('blog')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('blog') || isActive('add-blog') || isActive('edit-blog') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Blog</button>
                <button onClick={() => handleNav('pages')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('pages') || isActive('edit-page') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Pages</button>
              </div>
            )}
          </div>

          {/* Settings Group */}
          <div className="pt-1 pb-6">
            <button
              onClick={() => toggleMenu('settings')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4 text-emerald-400" />
                <span>Settings</span>
              </div>
              {openMenus.settings ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {openMenus.settings && (
              <div className="pl-9 pr-2 py-1 space-y-1 text-xs font-medium">
                <button onClick={() => handleNav('general-settings')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('general-settings') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>General</button>
                <button onClick={() => handleNav('payment-settings')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('payment-settings') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Payment</button>
                <button onClick={() => handleNav('shipping-settings')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('shipping-settings') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Shipping</button>
                <button onClick={() => handleNav('tax-settings')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('tax-settings') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Tax</button>
                <button onClick={() => handleNav('email-settings')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('email-settings') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Email</button>
                <button onClick={() => handleNav('admin-profile')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('admin-profile') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Profile</button>
                <button onClick={() => handleNav('security-settings')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${isActive('security-settings') ? 'text-emerald-400 bg-slate-800/80 font-semibold' : 'text-slate-400 hover:text-white'}`}>Security</button>
              </div>
            )}
          </div>

        </div>

        {/* Admin Footer User */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex items-center gap-3">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80" 
            alt="Admin Avatar" 
            className="w-10 h-10 rounded-full object-cover border border-emerald-500/30"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-white truncate">Alexander Wright</h4>
            <p className="text-xs text-emerald-400 truncate">Store Super Admin</p>
          </div>
        </div>
      </aside>
    </>
  );
};
