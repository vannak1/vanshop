import { createContext, useContext, useState, ReactNode } from 'react';
import type { Product, CartItem } from '@/types/product';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, variation: Product["variations"][number]) => void;
  removeFromCart: (productId: string, variation: Product["variations"][number]) => void;
  updateQuantity: (productId: string, variation: Product["variations"][number], quantity: number) => void;
  clearCart: () => void;
  getTotalAmount: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, variation: Product["variations"][number]) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(
        item => item.product.id === product.id && item.variation === variation
      );

      if (existingItem) {
        return currentItems.map(item =>
          item.product.id === product.id && item.variation === variation
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { product, variation, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string, variation: Product["variations"][number]) => {
    setItems(currentItems =>
      currentItems.filter(
        item => !(item.product.id === productId && item.variation === variation)
      )
    );
  };

  const updateQuantity = (
    productId: string, 
    variation: Product["variations"][number], 
    quantity: number
  ) => {
    if (quantity < 1) {
      removeFromCart(productId, variation);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.product.id === productId && item.variation === variation
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalAmount = () => {
    return items.reduce((sum, item) => {
      // In a real app, price would come from the product data
      const basePrice = 59.99;
      return sum + (item.quantity * basePrice);
    }, 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addToCart, 
        removeFromCart, 
        updateQuantity,
        clearCart, 
        getTotalAmount,
        getItemCount 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}