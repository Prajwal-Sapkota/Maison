import { useCart } from "../context/cart-context";
import { formatPrice } from "../utils/format-price";
import { apiRequest } from "../lib/queryClient";
import { queryClient } from "../lib/queryClient";
import { useState } from "react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cartItems, updateCartItem, removeCartItem } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.product.salePrice || item.product.price) * item.quantity;
  }, 0);

  const handleQuantityChange = async (id: number, quantity: number) => {
    if (quantity < 1) return;
    setIsLoading(true);
    
    try {
      await apiRequest('PATCH', `/api/cart/${id}`, { quantity });
      updateCartItem(id, quantity);
    } catch (error) {
      console.error('Failed to update quantity', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveItem = async (id: number) => {
    setIsLoading(true);
    
    try {
      await apiRequest('DELETE', `/api/cart/${id}`);
      removeCartItem(id);
    } catch (error) {
      console.error('Failed to remove item', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckout = () => {
    // In a real app, redirect to checkout page
    alert('Proceeding to checkout...');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-y-0 right-0 max-w-sm w-full z-50 theme-transition shadow-xl overflow-y-auto bg-background border-l border-border"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-medium">Your Cart</h2>
          <button onClick={onClose} className="p-1">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="py-12 text-center">
            <i className="ri-shopping-bag-line text-5xl opacity-20 mb-4"></i>
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-border">
                <img 
                  src={item.product.image} 
                  alt={item.product.name} 
                  className="w-20 h-24 object-cover object-center rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.product.name}</h3>
                  <p className="text-sm opacity-75 mt-1">
                    {item.size && `Size: ${item.size}`} 
                    {item.size && item.color && ' | '} 
                    {item.color && `Color: ${item.color}`}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center border rounded border-border">
                      <button 
                        className="px-2 py-1"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={isLoading}
                      >
                        -
                      </button>
                      <span className="px-2 py-1">{item.quantity}</span>
                      <button 
                        className="px-2 py-1"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        disabled={isLoading}
                      >
                        +
                      </button>
                    </div>
                    <span className="font-medium">
                      {formatPrice(item.product.salePrice || item.product.price)}
                    </span>
                  </div>
                </div>
                <button 
                  className="p-1"
                  onClick={() => handleRemoveItem(item.id)}
                  disabled={isLoading}
                >
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
            ))}
            
            <div className="mt-6 space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between text-lg font-medium pt-2 border-t border-border">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>
            
            <div className="mt-8">
              <button 
                className="w-full py-3 px-4 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/90 transition-colors duration-200"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                Checkout
              </button>
              <button 
                className="w-full py-3 px-4 mt-3 border rounded font-medium hover:bg-muted transition-colors duration-200 border-border"
                onClick={onClose}
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
