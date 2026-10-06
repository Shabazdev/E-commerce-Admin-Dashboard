import { Product, Order, Customer, Category, Brand, Review, Coupon, Promotion, Banner, BlogPost, PageContent } from './types';

export const initialProducts: Product[] = [
  {
    id: 'PROD-101',
    name: 'Organic Fresh Hass Avocados (1kg)',
    sku: 'FRU-AVO-001',
    category: 'Fresh Produce',
    brand: 'NatureBest',
    price: 6.99,
    salePrice: 5.49,
    stock: 145,
    minStock: 20,
    status: 'Published',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&auto=format&fit=crop&q=80',
    createdAt: '2026-01-15',
    description: 'Hand-picked creamy organic Hass avocados packed with healthy fats and nutrients.'
  },
  {
    id: 'PROD-102',
    name: 'Artisan Sourdough Country Loaf',
    sku: 'BAK-SRD-002',
    category: 'Bakery',
    brand: 'Golden Crust',
    price: 4.50,
    stock: 8,
    minStock: 15,
    status: 'Published',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80',
    createdAt: '2026-02-01',
    description: 'Traditional slow-fermented sourdough bread with a crispy crust and chewy crumb.'
  },
  {
    id: 'PROD-103',
    name: 'Wildflower Raw Organic Honey (500g)',
    sku: 'GRO-HON-003',
    category: 'Groceries',
    brand: 'Apiary Gold',
    price: 12.99,
    salePrice: 10.99,
    stock: 0,
    minStock: 10,
    status: 'Out of Stock',
    image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=300&auto=format&fit=crop&q=80',
    createdAt: '2025-11-20',
    description: 'Pure, unfiltered raw wildflower honey harvested from pristine alpine meadows.'
  },
  {
    id: 'PROD-104',
    name: 'Organic Almond Milk Unsweetened (1L)',
    sku: 'DAI-ALM-004',
    category: 'Dairy & Eggs',
    brand: 'PureHarvest',
    price: 3.99,
    stock: 62,
    minStock: 25,
    status: 'Published',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&auto=format&fit=crop&q=80',
    createdAt: '2026-02-10',
    description: 'Silky smooth organic almond milk with zero added sugars or artificial preservatives.'
  },
  {
    id: 'PROD-105',
    name: 'Free-Range Pasture Raised Eggs (Dozen)',
    sku: 'DAI-EGG-005',
    category: 'Dairy & Eggs',
    brand: 'HappyHen',
    price: 5.99,
    stock: 12,
    minStock: 20,
    status: 'Published',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=300&auto=format&fit=crop&q=80',
    createdAt: '2026-01-28',
    description: 'Fresh grade-A eggs from hens raised on open green pastures with natural feed.'
  },
  {
    id: 'PROD-106',
    name: 'Organic Cold-Pressed Extra Virgin Olive Oil',
    sku: 'GRO-OIL-006',
    category: 'Groceries',
    brand: 'Mediterranean Gold',
    price: 18.50,
    salePrice: 15.99,
    stock: 84,
    minStock: 15,
    status: 'Published',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&auto=format&fit=crop&q=80',
    createdAt: '2026-01-05',
    description: 'Early harvest cold-pressed extra virgin olive oil with rich antioxidant notes.'
  },
  {
    id: 'PROD-107',
    name: 'Fresh Organic Baby Spinach (250g)',
    sku: 'FRU-SPI-007',
    category: 'Fresh Produce',
    brand: 'NatureBest',
    price: 3.49,
    stock: 95,
    minStock: 30,
    status: 'Published',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&auto=format&fit=crop&q=80',
    createdAt: '2026-02-18',
    description: 'Pre-washed tender baby spinach leaves, perfect for salads and green smoothies.'
  },
  {
    id: 'PROD-108',
    name: 'Artisan Dark Chocolate 85% Cacao',
    sku: 'SNK-CHO-008',
    category: 'Snacks',
    brand: 'CacaoNoir',
    price: 4.99,
    stock: 5,
    minStock: 12,
    status: 'Published',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&auto=format&fit=crop&q=80',
    createdAt: '2026-02-05',
    description: 'Intense single-origin dark chocolate with subtle notes of roasted espresso.'
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ORD-9821',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.j@example.com',
    customerPhone: '+1 (555) 234-5678',
    shippingAddress: {
      street: '742 Evergreen Terrace',
      city: 'Springfield',
      district: 'Oregon',
      postalCode: '97477',
      country: 'United States'
    },
    items: [
      { productId: 'PROD-101', productName: 'Organic Fresh Hass Avocados (1kg)', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&auto=format&fit=crop&q=80', price: 5.49, quantity: 2 },
      { productId: 'PROD-104', productName: 'Organic Almond Milk Unsweetened (1L)', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&auto=format&fit=crop&q=80', price: 3.99, quantity: 1 }
    ],
    subtotal: 14.97,
    discount: 1.50,
    shippingFee: 4.99,
    tax: 1.20,
    total: 19.66,
    paymentMethod: 'Stripe',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    createdAt: '2026-03-28 14:22',
    timeline: [
      { status: 'Order Placed', timestamp: '2026-03-28 14:22', completed: true },
      { status: 'Payment Confirmed', timestamp: '2026-03-28 14:23', completed: true },
      { status: 'Processing', timestamp: '2026-03-28 15:00', completed: true },
      { status: 'Shipped', timestamp: '2026-03-29 09:30', completed: true },
      { status: 'Delivered', timestamp: '2026-03-30 14:15', completed: true }
    ]
  },
  {
    id: 'ORD-9822',
    customerName: 'Michael Chang',
    customerEmail: 'mchang@example.com',
    customerPhone: '+1 (555) 876-5432',
    shippingAddress: {
      street: '1288 Mission Street, Apt 4B',
      city: 'San Francisco',
      district: 'California',
      postalCode: '94103',
      country: 'United States'
    },
    items: [
      { productId: 'PROD-106', productName: 'Organic Cold-Pressed Extra Virgin Olive Oil', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&auto=format&fit=crop&q=80', price: 15.99, quantity: 1 },
      { productId: 'PROD-102', productName: 'Artisan Sourdough Country Loaf', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80', price: 4.50, quantity: 2 }
    ],
    subtotal: 24.99,
    discount: 0.00,
    shippingFee: 5.99,
    tax: 2.10,
    total: 33.08,
    paymentMethod: 'bKash',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    createdAt: '2026-03-30 10:15',
    timeline: [
      { status: 'Order Placed', timestamp: '2026-03-30 10:15', completed: true },
      { status: 'Payment Confirmed', timestamp: '2026-03-30 10:18', completed: true },
      { status: 'Processing', timestamp: '2026-03-30 11:30', completed: true },
      { status: 'Shipped', timestamp: '2026-03-31 08:45', completed: true },
      { status: 'Delivered', timestamp: '', completed: false }
    ]
  },
  {
    id: 'ORD-9823',
    customerName: 'Emily Rodriguez',
    customerEmail: 'emily.r@example.com',
    customerPhone: '+1 (555) 345-6789',
    shippingAddress: {
      street: '450 Grand Avenue',
      city: 'New York',
      district: 'New York',
      postalCode: '10001',
      country: 'United States'
    },
    items: [
      { productId: 'PROD-108', productName: 'Artisan Dark Chocolate 85% Cacao', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&auto=format&fit=crop&q=80', price: 4.99, quantity: 3 }
    ],
    subtotal: 14.97,
    discount: 2.00,
    shippingFee: 3.99,
    tax: 1.10,
    total: 18.06,
    paymentMethod: 'SSLCommerz',
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    createdAt: '2026-03-31 16:40',
    timeline: [
      { status: 'Order Placed', timestamp: '2026-03-31 16:40', completed: true },
      { status: 'Payment Confirmed', timestamp: '2026-03-31 16:42', completed: true },
      { status: 'Processing', timestamp: '2026-03-31 17:00', completed: true },
      { status: 'Shipped', timestamp: '', completed: false },
      { status: 'Delivered', timestamp: '', completed: false }
    ]
  },
  {
    id: 'ORD-9824',
    customerName: 'David Kim',
    customerEmail: 'david.k@example.com',
    customerPhone: '+1 (555) 901-2345',
    shippingAddress: {
      street: '88 Pine Street',
      city: 'Seattle',
      district: 'Washington',
      postalCode: '98101',
      country: 'United States'
    },
    items: [
      { productId: 'PROD-105', productName: 'Free-Range Pasture Raised Eggs (Dozen)', image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=300&auto=format&fit=crop&q=80', price: 5.99, quantity: 2 },
      { productId: 'PROD-107', productName: 'Fresh Organic Baby Spinach (250g)', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&auto=format&fit=crop&q=80', price: 3.49, quantity: 2 }
    ],
    subtotal: 18.96,
    discount: 0.00,
    shippingFee: 4.99,
    tax: 1.50,
    total: 25.45,
    paymentMethod: 'COD',
    paymentStatus: 'Pending',
    orderStatus: 'Pending',
    createdAt: '2026-04-01 09:10',
    timeline: [
      { status: 'Order Placed', timestamp: '2026-04-01 09:10', completed: true },
      { status: 'Payment Confirmed', timestamp: '', completed: false },
      { status: 'Processing', timestamp: '', completed: false },
      { status: 'Shipped', timestamp: '', completed: false },
      { status: 'Delivered', timestamp: '', completed: false }
    ]
  },
  {
    id: 'ORD-9825',
    customerName: 'Amanda Watson',
    customerEmail: 'amanda.w@example.com',
    customerPhone: '+1 (555) 456-7890',
    shippingAddress: {
      street: '321 Ocean Drive',
      city: 'Miami',
      district: 'Florida',
      postalCode: '33139',
      country: 'United States'
    },
    items: [
      { productId: 'PROD-103', productName: 'Wildflower Raw Organic Honey (500g)', image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=300&auto=format&fit=crop&q=80', price: 12.99, quantity: 1 }
    ],
    subtotal: 12.99,
    discount: 0.00,
    shippingFee: 4.99,
    tax: 1.00,
    total: 18.98,
    paymentMethod: 'Stripe',
    paymentStatus: 'Refunded',
    orderStatus: 'Refunded',
    createdAt: '2026-03-20 11:05',
    timeline: [
      { status: 'Order Placed', timestamp: '2026-03-20 11:05', completed: true },
      { status: 'Cancelled', timestamp: '2026-03-21 10:00', completed: true },
      { status: 'Refunded', timestamp: '2026-03-22 14:30', completed: true }
    ]
  }
];

export const initialCustomers: Customer[] = [
  {
    id: 'CUST-101',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    ordersCount: 12,
    totalSpent: 480.50,
    registrationDate: '2025-10-12',
    status: 'Active',
    address: '742 Evergreen Terrace, Springfield, OR'
  },
  {
    id: 'CUST-102',
    name: 'Michael Chang',
    email: 'mchang@example.com',
    phone: '+1 (555) 876-5432',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    ordersCount: 8,
    totalSpent: 320.00,
    registrationDate: '2025-11-05',
    status: 'Active',
    address: '1288 Mission Street, San Francisco, CA'
  },
  {
    id: 'CUST-103',
    name: 'Emily Rodriguez',
    email: 'emily.r@example.com',
    phone: '+1 (555) 345-6789',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    ordersCount: 5,
    totalSpent: 195.20,
    registrationDate: '2025-12-18',
    status: 'Active',
    address: '450 Grand Avenue, New York, NY'
  },
  {
    id: 'CUST-104',
    name: 'David Kim',
    email: 'david.k@example.com',
    phone: '+1 (555) 901-2345',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    ordersCount: 2,
    totalSpent: 64.50,
    registrationDate: '2026-02-14',
    status: 'Active',
    address: '88 Pine Street, Seattle, WA'
  },
  {
    id: 'CUST-105',
    name: 'Amanda Watson',
    email: 'amanda.w@example.com',
    phone: '+1 (555) 456-7890',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    ordersCount: 15,
    totalSpent: 890.00,
    registrationDate: '2025-08-22',
    status: 'Active',
    address: '321 Ocean Drive, Miami, FL'
  }
];

export const initialCategories: Category[] = [
  {
    id: 'CAT-1',
    name: 'Fresh Produce',
    slug: 'fresh-produce',
    parent: 'None',
    productsCount: 24,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-09-01'
  },
  {
    id: 'CAT-2',
    name: 'Bakery',
    slug: 'bakery',
    parent: 'None',
    productsCount: 14,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-09-01'
  },
  {
    id: 'CAT-3',
    name: 'Groceries',
    slug: 'groceries',
    parent: 'None',
    productsCount: 45,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-09-01'
  },
  {
    id: 'CAT-4',
    name: 'Dairy & Eggs',
    slug: 'dairy-eggs',
    parent: 'None',
    productsCount: 18,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-09-01'
  },
  {
    id: 'CAT-5',
    name: 'Snacks',
    slug: 'snacks',
    parent: 'None',
    productsCount: 22,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-09-01'
  }
];

export const initialBrands: Brand[] = [
  { id: 'BRD-1', name: 'NatureBest', logo: '🌿', productsCount: 18, status: 'Active', createdAt: '2025-09-10' },
  { id: 'BRD-2', name: 'Golden Crust', logo: '🍞', productsCount: 8, status: 'Active', createdAt: '2025-09-12' },
  { id: 'BRD-3', name: 'Apiary Gold', logo: '🍯', productsCount: 5, status: 'Active', createdAt: '2025-09-15' },
  { id: 'BRD-4', name: 'PureHarvest', logo: '🥛', productsCount: 12, status: 'Active', createdAt: '2025-10-01' },
  { id: 'BRD-5', name: 'HappyHen', logo: '🥚', productsCount: 4, status: 'Active', createdAt: '2025-10-05' }
];

export const initialReviews: Review[] = [
  {
    id: 'REV-1',
    customerName: 'Sarah Jenkins',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    productName: 'Organic Fresh Hass Avocados (1kg)',
    rating: 5,
    reviewText: 'Extremely fresh and creamy! Arrived in perfect condition. Will definitely buy again.',
    date: '2026-03-29',
    status: 'Approved'
  },
  {
    id: 'REV-2',
    customerName: 'Michael Chang',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    productName: 'Artisan Sourdough Country Loaf',
    rating: 4,
    reviewText: 'Great crust and texture. Tastes like it came straight from a European bakery.',
    date: '2026-03-31',
    status: 'Approved'
  },
  {
    id: 'REV-3',
    customerName: 'Emily Rodriguez',
    customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    productName: 'Artisan Dark Chocolate 85% Cacao',
    rating: 5,
    reviewText: 'Rich and intense flavor. High quality cacao with no bitterness.',
    date: '2026-04-01',
    status: 'Pending'
  }
];

export const initialCoupons: Coupon[] = [
  {
    id: 'COUP-1',
    code: 'ECOBAZAR20',
    discountType: 'Percentage',
    discountAmount: 20,
    minPurchase: 30,
    maxDiscount: 15,
    startDate: '2026-04-01',
    endDate: '2026-04-30',
    usageLimit: 500,
    usedCount: 142,
    status: 'Active'
  },
  {
    id: 'COUP-2',
    code: 'FREESHIP',
    discountType: 'Fixed Amount',
    discountAmount: 5,
    minPurchase: 25,
    startDate: '2026-04-01',
    endDate: '2026-04-15',
    usageLimit: 200,
    usedCount: 88,
    status: 'Active'
  },
  {
    id: 'COUP-3',
    code: 'SPRING10',
    discountType: 'Percentage',
    discountAmount: 10,
    minPurchase: 20,
    startDate: '2026-03-01',
    endDate: '2026-03-31',
    usageLimit: 1000,
    usedCount: 954,
    status: 'Expired'
  }
];

export const initialPromotions: Promotion[] = [
  {
    id: 'PROM-1',
    campaignName: 'Spring Organic Produce Week',
    productCategory: 'Fresh Produce',
    discountPercentage: 15,
    startDate: '2026-04-01',
    endDate: '2026-04-10',
    status: 'Active'
  },
  {
    id: 'PROM-2',
    campaignName: 'Weekend Bakery Special',
    productCategory: 'Bakery',
    discountPercentage: 10,
    startDate: '2026-04-05',
    endDate: '2026-04-07',
    status: 'Scheduled'
  }
];

export const initialBanners: Banner[] = [
  {
    id: 'BAN-1',
    title: '100% Organic & Farm Fresh Products',
    description: 'Get healthy organic groceries delivered directly to your doorstep within 2 hours.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
    link: '/products',
    position: 'Hero Slider',
    startDate: '2026-04-01',
    endDate: '2026-04-30',
    status: 'Active'
  },
  {
    id: 'BAN-2',
    title: 'Super Weekend Dairy Sale',
    description: 'Up to 30% off on all organic milk, cheese, and farm eggs.',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800&auto=format&fit=crop&q=80',
    link: '/category/dairy-eggs',
    position: 'Sidebar Promo',
    startDate: '2026-04-04',
    endDate: '2026-04-06',
    status: 'Active'
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: 'BLOG-1',
    title: '10 Health Benefits of Switching to Organic Foods in 2026',
    slug: 'health-benefits-organic-foods',
    category: 'Healthy Living',
    author: 'Dr. Jennifer Vance',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=80',
    content: 'Discover how choosing pesticide-free organic produce can boost immunity, improve skin vitality, and support long-term wellness.',
    date: '2026-03-25',
    status: 'Published'
  },
  {
    id: 'BLOG-2',
    title: 'The Art of Artisan Sourdough: Why Slow Fermentation Matters',
    slug: 'art-of-artisan-sourdough',
    category: 'Culinary Arts',
    author: 'Chef Thomas Laurent',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    content: 'Explore the traditional baking techniques behind natural wild yeast fermentation and digestible bread making.',
    date: '2026-03-28',
    status: 'Published'
  }
];

export const initialPages: PageContent[] = [
  {
    id: 'PAGE-1',
    title: 'About Us',
    slug: 'about-us',
    content: 'EcoBazar is your premier online destination for 100% certified organic groceries, farm-fresh produce, and sustainable artisan goods. Founded in 2025, our mission is to connect local sustainable farmers directly with conscious consumers.',
    status: 'Published',
    lastUpdated: '2026-01-10'
  },
  {
    id: 'PAGE-2',
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    content: 'We take your privacy seriously. EcoBazar protects your personal information with industry-standard SSL encryption and never sells customer data to third parties.',
    status: 'Published',
    lastUpdated: '2026-01-15'
  },
  {
    id: 'PAGE-3',
    title: 'Terms & Conditions',
    slug: 'terms-and-conditions',
    content: 'By using EcoBazar services, you agree to our fair usage policy, timely delivery terms, and customer satisfaction guarantee.',
    status: 'Published',
    lastUpdated: '2026-01-15'
  },
  {
    id: 'PAGE-4',
    title: 'Shipping Policy',
    slug: 'shipping-policy',
    content: 'We offer express 2-hour delivery for local zones and standard next-day refrigerated delivery for regional orders. Free shipping on orders over $50.',
    status: 'Published',
    lastUpdated: '2026-02-01'
  }
];
