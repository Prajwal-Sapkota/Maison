"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import { apiRequest } from '../lib/queryClient';
import { Product } from '../../../shared/schema';

// Using string as userId for simplicity in this demo
const DEFAULT_USER_ID = "guest-user";

// Define the shape of a cart item
interface CartItem {
  id: number;
  userId: string;
  productId: number;
  quantity: number;
  size?: string;
  color?: string;
  product: Product;
}

// Define the shape of the cart context
interface CartContextType {
  cartItems: CartItem[];
  isLoading: boolean;
  addToCart: (productId: number, quantity: number, size?: string, color?: string) => Promise<void>;
  updateCartItem: (itemId: number, quantity: number) => void;
  removeCartItem: (itemId: number) => void;
  clearCart: () => Promise<void>;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const userId = DEFAULT_USER_ID;

  // Fetch cart items
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['/api/cart', userId],
    queryFn: async () => {
      const response = await fetch(`/api/cart/${userId}`, {
        credentials: 'include',
      });
      if (!response.ok) return [];
      return await response.json();
    },
  });

  const cartItems = data as CartItem[] || [];

  // Add item to cart
  const addToCart = async (productId: number, quantity: number, size?: string, color?: string) => {
    try {
      await apiRequest('POST', '/api/cart', {
        userId,
        productId,
        quantity,
        size,
        color
      });
      
      queryClient.invalidateQueries({ queryKey: ['/api/cart', userId] });
    } catch (error) {
      console.error('Failed to add item to cart', error);
      throw error;
    }
  };

  // Update cart item quantity
  const updateCartItem = (itemId: number, quantity: number) => {
    const updatedItems = cartItems.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    );
    
    // Optimistically update the cache
    queryClient.setQueryData(['/api/cart', userId], updatedItems);
  };

  // Remove item from cart
  const removeCartItem = (itemId: number) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    
    // Optimistically update the cache
    queryClient.setQueryData(['/api/cart', userId], updatedItems);
  };

  // Clear cart
  const clearCart = async () => {
    try {
      await apiRequest('DELETE', `/api/cart/clear/${userId}`);
      queryClient.setQueryData(['/api/cart', userId], []);
    } catch (error) {
      console.error('Failed to clear cart', error);
      throw error;
    }
  };

  const value = {
    cartItems,
    isLoading,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
