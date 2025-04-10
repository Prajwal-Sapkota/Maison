"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import { apiRequest } from '../lib/queryClient';
import { Product } from '../../../shared/schema';

// Using string as userId for simplicity in this demo
const DEFAULT_USER_ID = "guest-user";

// Define the shape of the wishlist context
interface WishlistContextType {
  wishlistItems: Product[];
  isLoading: boolean;
  isInWishlist: (productId: number) => boolean;
  addToWishlist: (productId: number) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>;
}

// Create the context
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// WishlistProvider component
interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const userId = DEFAULT_USER_ID;

  // Fetch wishlist items
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['/api/wishlist', userId],
    queryFn: async () => {
      const response = await fetch(`/api/wishlist/${userId}`, {
        credentials: 'include',
      });
      if (!response.ok) return [];
      return await response.json();
    },
  });

  const wishlistItems = data as Product[] || [];

  // Check if product is in wishlist
  const isInWishlist = (productId: number): boolean => {
    return wishlistItems.some(item => item.id === productId);
  };

  // Add product to wishlist
  const addToWishlist = async (productId: number) => {
    try {
      await apiRequest('POST', '/api/wishlist', {
        userId,
        productId
      });
      
      queryClient.invalidateQueries({ queryKey: ['/api/wishlist', userId] });
    } catch (error) {
      console.error('Failed to add to wishlist', error);
      throw error;
    }
  };

  // Remove product from wishlist
  const removeFromWishlist = async (productId: number) => {
    try {
      await apiRequest('DELETE', `/api/wishlist/${userId}/${productId}`);
      
      // Optimistically update UI
      const updatedItems = wishlistItems.filter(item => item.id !== productId);
      queryClient.setQueryData(['/api/wishlist', userId], updatedItems);
    } catch (error) {
      console.error('Failed to remove from wishlist', error);
      throw error;
    }
  };

  const value = {
    wishlistItems,
    isLoading,
    isInWishlist,
    addToWishlist,
    removeFromWishlist
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

// Custom hook to use wishlist context
export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
