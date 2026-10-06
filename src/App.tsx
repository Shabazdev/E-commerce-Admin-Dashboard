import React, { useState } from 'react';
import { 
  ActiveView, 
  Product, 
  Order, 
  Customer, 
  Category, 
  Brand, 
  Review, 
  Coupon, 
  Promotion, 
  Banner, 
  BlogPost, 
  PageContent,
  OrderStatus 
} from './types';
import { 
  initialProducts, 
  initialOrders, 
  initialCustomers, 
  initialCategories, 
  initialBrands, 
  initialReviews, 
  initialCoupons, 
  initialPromotions, 
  initialBanners, 
  initialBlogPosts, 
  initialPages 
} from './mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardHome } from './components/DashboardHome';
import { ToastContainer, ToastMessage } from './components/Toast';

// Catalog
import { ProductsView } from './components/Catalog/ProductsView';
import { AddEditProductModal } from './components/Catalog/AddEditProductModal';
import { CategoriesView } from './components/Catalog/CategoriesView';
import { BrandsView } from './components/Catalog/BrandsView';
import { ReviewsView } from './components/Catalog/ReviewsView';

// Orders
import { OrdersView } from './components/Orders/OrdersView';
import { OrderDetailsView } from './components/Orders/OrderDetailsView';

// Customers
import { CustomersView } from './components/Customers/CustomersView';

// Marketing
import { CouponsView } from './components/Marketing/CouponsView';
import { PromotionsView } from './components/Marketing/PromotionsView';
import { BannersView } from './components/Marketing/BannersView';

// Inventory
import { InventoryView } from './components/Inventory/InventoryView';

// Reports
import { ReportsView } from './components/Reports/ReportsView';

// Content
import { ContentView } from './components/Content/ContentView';

// Settings
import { SettingsView } from './components/Settings/SettingsView';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // App Data States
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [pages, setPages] = useState<PageContent[]>(initialPages);

  // Selected Item States
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Product Handlers
  const handleSaveProduct = (product: Product) => {
    const exists = products.some(p => p.id === product.id);
    if (exists) {
      setProducts(products.map(p => p.id === product.id ? product : p));
    } else {
      setProducts([product, ...products]);
    }
    setEditingProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setActiveView('edit-product');
  };

  const handleDuplicateProduct = (product: Product) => {
    const duplicate: Product = {
      ...product,
      id: `PROD-${Math.floor(100 + Math.random() * 900)}`,
      name: `${product.name} (Copy)`,
      sku: `${product.sku}-COPY`
    };
    setProducts([duplicate, ...products]);
    addToast('Product duplicated successfully', 'success');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    addToast('Product deleted successfully', 'success');
  };

  const handleBulkDeleteProducts = (ids: string[]) => {
    setProducts(products.filter(p => !ids.includes(p.id)));
  };

  // Order Handlers
  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
    setActiveView('order-details');
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, orderStatus: newStatus } : o));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
    }
  };

  // Inventory Stock Update Handler
  const handleUpdateStock = (productId: string, newStock: number) => {
    setProducts(products.map(p => p.id === productId ? { ...p, stock: newStock, status: newStock === 0 ? 'Out of Stock' : p.status } : p));
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        isOpenMobile={isOpenMobile} 
        setIsOpenMobile={setIsOpenMobile} 
      />

      {/* Main Content Viewport */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <Header 
          onToggleMobile={() => setIsOpenMobile(!isOpenMobile)} 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          setActiveView={setActiveView}
        />

        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeView === 'dashboard' && (
            <DashboardHome 
              products={products} 
              orders={orders} 
              customers={customers} 
              setActiveView={setActiveView} 
              onSelectOrder={handleSelectOrder}
            />
          )}

          {/* Catalog Views */}
          {activeView === 'products' && (
            <ProductsView 
              products={products} 
              setActiveView={setActiveView} 
              onEditProduct={handleEditProduct}
              onDuplicateProduct={handleDuplicateProduct}
              onDeleteProduct={handleDeleteProduct}
              onBulkDelete={handleBulkDeleteProducts}
              addToast={addToast}
            />
          )}
          {(activeView === 'add-product' || activeView === 'edit-product') && (
            <AddEditProductModal 
              editingProduct={editingProduct}
              onSave={handleSaveProduct}
              setActiveView={setActiveView}
              addToast={addToast}
            />
          )}
          {activeView === 'categories' && (
            <CategoriesView categories={categories} setCategories={setCategories} addToast={addToast} />
          )}
          {activeView === 'brands' && (
            <BrandsView brands={brands} setBrands={setBrands} addToast={addToast} />
          )}
          {activeView === 'reviews' && (
            <ReviewsView reviews={reviews} setReviews={setReviews} addToast={addToast} />
          )}

          {/* Orders Views */}
          {activeView === 'orders' && (
            <OrdersView orders={orders} onSelectOrder={handleSelectOrder} statusFilter="All" addToast={addToast} />
          )}
          {activeView === 'pending-orders' && (
            <OrdersView orders={orders} onSelectOrder={handleSelectOrder} statusFilter="Pending" addToast={addToast} />
          )}
          {activeView === 'processing-orders' && (
            <OrdersView orders={orders} onSelectOrder={handleSelectOrder} statusFilter="Processing" addToast={addToast} />
          )}
          {activeView === 'shipped-orders' && (
            <OrdersView orders={orders} onSelectOrder={handleSelectOrder} statusFilter="Shipped" addToast={addToast} />
          )}
          {activeView === 'delivered-orders' && (
            <OrdersView orders={orders} onSelectOrder={handleSelectOrder} statusFilter="Delivered" addToast={addToast} />
          )}
          {activeView === 'cancelled-orders' && (
            <OrdersView orders={orders} onSelectOrder={handleSelectOrder} statusFilter="Cancelled" addToast={addToast} />
          )}
          {activeView === 'refunds' && (
            <OrdersView orders={orders} onSelectOrder={handleSelectOrder} statusFilter="Refunded" addToast={addToast} />
          )}
          {activeView === 'order-details' && selectedOrder && (
            <OrderDetailsView 
              order={selectedOrder} 
              onBack={() => setActiveView('orders')} 
              onUpdateStatus={handleUpdateOrderStatus}
              addToast={addToast}
            />
          )}

          {/* Customers Views */}
          {activeView === 'customers' && (
            <CustomersView customers={customers} setCustomers={setCustomers} addToast={addToast} />
          )}

          {/* Marketing Views */}
          {activeView === 'coupons' && (
            <CouponsView coupons={coupons} setCoupons={setCoupons} addToast={addToast} />
          )}
          {activeView === 'promotions' && (
            <PromotionsView promotions={promotions} />
          )}
          {activeView === 'banners' && (
            <BannersView banners={banners} />
          )}

          {/* Inventory Views */}
          {activeView === 'inventory' && (
            <InventoryView products={products} onUpdateStock={handleUpdateStock} filterMode="all" addToast={addToast} />
          )}
          {activeView === 'low-stock' && (
            <InventoryView products={products} onUpdateStock={handleUpdateStock} filterMode="low" addToast={addToast} />
          )}
          {activeView === 'out-of-stock' && (
            <InventoryView products={products} onUpdateStock={handleUpdateStock} filterMode="out" addToast={addToast} />
          )}

          {/* Reports Views */}
          {activeView === 'sales-reports' && (
            <ReportsView products={products} orders={orders} customers={customers} reportType="sales" />
          )}
          {activeView === 'product-reports' && (
            <ReportsView products={products} orders={orders} customers={customers} reportType="products" />
          )}
          {activeView === 'customer-reports' && (
            <ReportsView products={products} orders={orders} customers={customers} reportType="customers" />
          )}
          {activeView === 'inventory-reports' && (
            <ReportsView products={products} orders={orders} customers={customers} reportType="inventory" />
          )}

          {/* Content Views */}
          {(activeView === 'homepage-content' || activeView === 'content-banners' || activeView === 'blog' || activeView === 'add-blog' || activeView === 'edit-blog' || activeView === 'pages' || activeView === 'edit-page') && (
            <ContentView 
              blogPosts={blogPosts} 
              setBlogPosts={setBlogPosts} 
              pages={pages} 
              setPages={setPages} 
              addToast={addToast}
            />
          )}

          {/* Settings Views */}
          {activeView === 'general-settings' && <SettingsView section="general" addToast={addToast} />}
          {activeView === 'payment-settings' && <SettingsView section="payment" addToast={addToast} />}
          {activeView === 'shipping-settings' && <SettingsView section="shipping" addToast={addToast} />}
          {activeView === 'tax-settings' && <SettingsView section="tax" addToast={addToast} />}
          {activeView === 'email-settings' && <SettingsView section="email" addToast={addToast} />}
          {activeView === 'admin-profile' && <SettingsView section="profile" addToast={addToast} />}
          {activeView === 'security-settings' && <SettingsView section="security" addToast={addToast} />}

        </main>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
