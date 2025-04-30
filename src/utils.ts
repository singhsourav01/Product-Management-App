import { FilterConfig, Product, SortConfig } from './types';

export const sortProducts = (products: Product[], sortConfig: SortConfig): Product[] => {
  return [...products].sort((a, b) => {
    const { field, direction } = sortConfig;
    const multiplier = direction === 'asc' ? 1 : -1;
    
    switch (field) {
      case 'name':
        return multiplier * a.name.localeCompare(b.name);
      case 'price':
        return multiplier * (a.price - b.price);
      case 'category':
        return multiplier * a.category.localeCompare(b.category);
      case 'stock':
        return multiplier * (a.stock - b.stock);
      case 'rating':
        return multiplier * (a.rating - b.rating);
      case 'createdAt':
        return multiplier * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      default:
        return 0;
    }
  });
};

export const filterProducts = (products: Product[], filterConfig: FilterConfig): Product[] => {
  return products.filter(product => {
    // Filter by name (case-insensitive)
    if (
      filterConfig.name &&
      !product.name.toLowerCase().includes(filterConfig.name.toLowerCase())
    ) {
      return false;
    }
    
    // Filter by category
    if (
      filterConfig.category &&
      product.category !== filterConfig.category
    ) {
      return false;
    }
    
    // Filter by price range
    if (
      (filterConfig.minPrice !== '' && product.price < filterConfig.minPrice) ||
      (filterConfig.maxPrice !== '' && product.price > filterConfig.maxPrice)
    ) {
      return false;
    }
    
    // Filter by stock range
    if (
      (filterConfig.minStock !== '' && product.stock < filterConfig.minStock) ||
      (filterConfig.maxStock !== '' && product.stock > filterConfig.maxStock)
    ) {
      return false;
    }
    
    // Filter by rating
    if (
      filterConfig.minRating !== '' && 
      product.rating < filterConfig.minRating
    ) {
      return false;
    }
    
    return true;
  });
};

// Format price as currency
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

// Format date
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};