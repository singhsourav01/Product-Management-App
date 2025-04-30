export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  rating: number;
  createdAt: string;
  imageUrl: string;
}

export type SortField = 'name' | 'price' | 'category' | 'stock' | 'rating' | 'createdAt';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface FilterConfig {
  name: string;
  category: string;
  minPrice: number | '';
  maxPrice: number | '';
  minStock: number | '';
  maxStock: number | '';
  minRating: number | '';
}