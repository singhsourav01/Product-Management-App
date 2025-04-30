import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import DeleteConfirmation from './components/DeleteConfirmation';
import Notification, { NotificationType } from './components/Notification';
import { Product } from './types';
import { loadProducts, addProduct, updateProduct, deleteProduct } from './data';
import { Package } from 'lucide-react';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: NotificationType;
    message: string;
  } | null>(null);

  // Load products on mount
  useEffect(() => {
    const data = loadProducts();
    setProducts(data);
  }, []);

  // Handle add product
  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  // Handle edit product
  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  // Handle delete product
  const handleDeleteClick = (id: string) => {
    setProductToDelete(id);
    setIsDeleteConfirmOpen(true);
  };

  // Confirm delete product
  const confirmDelete = () => {
    if (productToDelete) {
      try {
        deleteProduct(productToDelete);
        setProducts(prevProducts => 
          prevProducts.filter(product => product.id !== productToDelete)
        );
        showNotification('success', 'Product deleted successfully');
      } catch (error) {
        showNotification('error', 'Failed to delete product');
      }
    }
    setIsDeleteConfirmOpen(false);
    setProductToDelete(null);
  };

  // Handle form submission
  const handleFormSubmit = (productData: Omit<Product, 'id' | 'createdAt'> | Product) => {
    try {
      if ('id' in productData) {
        // Update existing product
        const updated = updateProduct(productData as Product);
        setProducts(prevProducts =>
          prevProducts.map(product => 
            product.id === updated.id ? updated : product
          )
        );
        showNotification('success', 'Product updated successfully');
      } else {
        // Add new product
        const newProduct = addProduct(productData);
        setProducts(prevProducts => [...prevProducts, newProduct]);
        showNotification('success', 'Product added successfully');
      }
      setIsFormOpen(false);
    } catch (error) {
      showNotification('error', 'Failed to save product');
    }
  };

  // Show notification
  const showNotification = (type: NotificationType, message: string) => {
    setNotification({ type, message });
  };

  // Close notification
  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <Package size={32} className="text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductList
          products={products}
          onEdit={handleEditProduct}
          onDelete={handleDeleteClick}
          onAdd={handleAddProduct}
        />
      </main>
      
      {/* Product Form Modal */}
      {isFormOpen && (
        <ProductForm
          product={selectedProduct || undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
      
      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <DeleteConfirmation
          onConfirm={confirmDelete}
          onCancel={() => setIsDeleteConfirmOpen(false)}
        />
      )}
      
      {/* Notification */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={closeNotification}
        />
      )}
    </div>
  );
}

export default App;