'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/utils/types';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getTotalItems: () => number;
  confirmationItem: CartItem | null;
  isConfirmationOpen: boolean;
  closeConfirmation: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (value: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [confirmationItem, setConfirmationItem] = useState<CartItem | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      let updatedItem: CartItem;
      
      if (existingItem) {
        // If item already exists, increase quantity
        updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
        const updatedItems = prevItems.map((item) =>
          item.id === product.id ? updatedItem : item
        );
        setConfirmationItem(updatedItem);
        setIsConfirmationOpen(true);
        return updatedItems;
      } else {
        // If item doesn't exist, add it with quantity 1
        updatedItem = { ...product, quantity: 1 };
        setConfirmationItem(updatedItem);
        setIsConfirmationOpen(true);
        return [...prevItems, updatedItem];
      }
    });
  };

  const closeConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalItems,
        confirmationItem,
        isConfirmationOpen,
        closeConfirmation,
        isCartOpen,
        setIsCartOpen,
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

