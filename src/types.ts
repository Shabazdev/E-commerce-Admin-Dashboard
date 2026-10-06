export type ProductStatus = 'Published' | 'Draft' | 'Out of Stock';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  brand: string;
  price: number;
  salePrice?: number;
  stock: number;
  minStock: number;
  status: ProductStatus;
  image: string;
  createdAt: string;
  description?: string;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';
export type PaymentStatus = 'Paid' | 'Pending' | 'Failed' | 'Refunded';
export type PaymentMethod = 'COD' | 'bKash' | 'Nagad' | 'SSLCommerz' | 'Stripe';

export interface OrderItem {
  productId: string;
  productName: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    district: string;
    postalCode: string;
    country: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt: string;
  timeline: {
    status: string;
    timestamp: string;
    completed: boolean;
  }[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  ordersCount: number;
  totalSpent: number;
  registrationDate: string;
  status: 'Active' | 'Inactive' | 'Blocked';
  address: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent: string;
  productsCount: number;
  status: 'Active' | 'Inactive';
  image: string;
  createdAt: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  productsCount: number;
  status: 'Active' | 'Inactive';
  createdAt: string;
}

export interface Review {
  id: string;
  customerName: string;
  customerAvatar: string;
  productName: string;
  rating: number;
  reviewText: string;
  date: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'Percentage' | 'Fixed Amount';
  discountAmount: number;
  minPurchase: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usedCount: number;
  status: 'Active' | 'Expired' | 'Disabled';
}

export interface Promotion {
  id: string;
  campaignName: string;
  productCategory: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Scheduled' | 'Ended';
}

export interface Banner {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  position: 'Hero Slider' | 'Sidebar Promo' | 'Footer Banner';
  startDate: string;
  endDate: string;
  status: 'Active' | 'Inactive';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  image: string;
  content: string;
  date: string;
  status: 'Published' | 'Draft';
}

export interface PageContent {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'Published' | 'Draft';
  lastUpdated: string;
}

export type ActiveView = 
  | 'dashboard'
  // Catalog
  | 'products'
  | 'add-product'
  | 'edit-product'
  | 'categories'
  | 'brands'
  | 'reviews'
  // Orders
  | 'orders'
  | 'order-details'
  | 'pending-orders'
  | 'processing-orders'
  | 'shipped-orders'
  | 'delivered-orders'
  | 'cancelled-orders'
  | 'refunds'
  // Customers
  | 'customers'
  | 'customer-details'
  // Marketing
  | 'marketing'
  | 'coupons'
  | 'promotions'
  | 'banners'
  // Inventory
  | 'inventory'
  | 'low-stock'
  | 'out-of-stock'
  // Reports
  | 'sales-reports'
  | 'product-reports'
  | 'customer-reports'
  | 'inventory-reports'
  // Content
  | 'homepage-content'
  | 'content-banners'
  | 'blog'
  | 'add-blog'
  | 'edit-blog'
  | 'pages'
  | 'edit-page'
  // Settings
  | 'general-settings'
  | 'payment-settings'
  | 'shipping-settings'
  | 'tax-settings'
  | 'email-settings'
  | 'admin-profile'
  | 'security-settings';
