import { Product } from './types';
import { v4 as uuidv4 } from 'uuid';

const categories = [
  'Electronics',
  'Clothing',
  'Home & Kitchen',
  'Books',
  'Sports',
  'Beauty',
  'Toys',
  'Automotive',
];

const productNames = [
  'Premium Wireless Headphones',
  'Ultra HD Smart TV',
  'Professional DSLR Camera',
  'Ergonomic Office Chair',
  'Stainless Steel Cookware Set',
  'Organic Cotton T-Shirt',
  'Bluetooth Portable Speaker',
  'Leather Messenger Bag',
  'Smart Home Security System',
  'Fitness Tracker Watch',
  'Memory Foam Mattress',
  'Ceramic Coffee Mug Set',
  'Wireless Gaming Mouse',
  'Bamboo Cutting Board',
  'Noise-Cancelling Earbuds',
  'Vintage Vinyl Record Player',
  'Handcrafted Wooden Desk',
  'Polarized Sunglasses',
  'Insulated Water Bottle',
  'Mechanical Keyboard',
  'Aromatherapy Essential Oil Diffuser',
  'Compact Air Purifier',
  'Adjustable Dumbbell Set',
  'Gourmet Chocolate Gift Box',
  'Waterproof Hiking Boots',
  'Silk Pillowcase Set',
  'Portable Power Bank',
  'Cast Iron Skillet',
  'Wireless Charging Pad',
  'Luxury Bath Towel Set',
];

const generateRandomProduct = (): Product => {
  const name = productNames[Math.floor(Math.random() * productNames.length)];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const price = parseFloat((Math.random() * 1000 + 10).toFixed(2));
  const stock = Math.floor(Math.random() * 100);
  const rating = parseFloat((Math.random() * 4 + 1).toFixed(1));
  
  // Generate a date within the last year
  const createdAt = new Date(
    Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
  ).toISOString();
  
  return {
    id: uuidv4(),
    name,
    description: `High-quality ${name.toLowerCase()} with premium features and exceptional performance.`,
    price,
    category,
    stock,
    rating,
    createdAt,
    imageUrl: `https://source.unsplash.com/random/300x200?${encodeURIComponent(name.toLowerCase())}`,
  };
};

export const generateProducts = (count: number): Product[] => {
  return Array.from({ length: count }, generateRandomProduct);
};

// Initial data
const initialProducts = generateProducts(50);

// Local storage key
const STORAGE_KEY = 'product-management-data';

// Load products from localStorage or use initial data
export const loadProducts = (): Product[] => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (storedData) {
    return JSON.parse(storedData);
  }
  
  // Save initial data to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
  return initialProducts;
};

// Save products to localStorage
export const saveProducts = (products: Product[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

// Add a new product
export const addProduct = (product: Omit<Product, 'id' | 'createdAt'>): Product => {
  const products = loadProducts();
  const newProduct: Product = {
    ...product,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
};

// Update an existing product
export const updateProduct = (product: Product): Product => {
  const products = loadProducts();
  const index = products.findIndex(p => p.id === product.id);
  
  if (index !== -1) {
    products[index] = product;
    saveProducts(products);
    return product;
  }
  
  throw new Error(`Product with ID ${product.id} not found`);
};

// Delete a product
export const deleteProduct = (id: string): void => {
  const products = loadProducts();
  const filteredProducts = products.filter(p => p.id !== id);
  
  if (filteredProducts.length < products.length) {
    saveProducts(filteredProducts);
  } else {
    throw new Error(`Product with ID ${id} not found`);
  }
};