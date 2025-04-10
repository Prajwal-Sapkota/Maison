import { useState } from 'react';
import Link  from "next/link";
import { Product } from '../../../shared/schema';
import { useWishlist } from '../context/wishlist-context';
import { useCart } from '../context/cart-context';
import { formatPrice } from '../utils/format-price';
import { useToast } from '../hooks/use-toast';

interface ProductCardProps {
  product: Product;
  showRating?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showRating = false }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inWishlist = isInWishlist(product.id);
  
  const handleQuickView = () => {
    // In a real app, this would open a modal with product details
    window.location.href = `/product/${product.slug}`;
  };
  
  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    
    try {
      if (inWishlist) {
        await removeFromWishlist(product.id);
        toast({
          title: "Removed from wishlist",
          description: `${product.name} has been removed from your wishlist.`
        });
      } else {
        await addToWishlist(product.id);
        toast({
          title: "Added to wishlist",
          description: `${product.name} has been added to your wishlist.`
        });
      }
    } catch (error) {
      toast({
        title: "Action failed",
        description: "There was a problem with your request.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="product-card group theme-transition bg-background"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug}`}>
        <div className="relative overflow-hidden rounded-lg">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full aspect-[3/4] object-cover object-center transition-transform duration-500"
          />
          <div className={`product-quick-view absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 transform translate-y-4 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : ''}`}>
            <button 
              className="px-4 py-2 bg-white text-primary text-sm font-medium rounded hover:bg-gray-100 transition-colors duration-200"
              onClick={handleQuickView}
            >
              Quick View
            </button>
          </div>
          
          {product.newArrival && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-accent text-white text-xs font-medium rounded">
              New
            </div>
          )}
          
          {product.salePrice && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-destructive text-white text-xs font-medium rounded">
              Sale
            </div>
          )}
          
          {product.bestSeller && !product.newArrival && !product.salePrice && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-black text-white text-xs font-medium rounded">
              Bestseller
            </div>
          )}
          
          <button 
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors duration-200"
            onClick={handleWishlistToggle}
            disabled={isLoading}
          >
            <i className={`${inWishlist ? 'ri-heart-fill text-destructive' : 'ri-heart-line text-primary'}`}></i>
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-medium">{product.name}</h3>
          <div className="mt-1 flex justify-between items-center">
            <div>
              {product.salePrice ? (
                <>
                  <span className="font-medium">{formatPrice(product.price)}</span>
                  <span className="ml-2 text-sm line-through opacity-75">{formatPrice(product.salePrice)}</span>
                </>
              ) : (
                <span className="font-medium">{formatPrice(product.price)}</span>
              )}
            </div>
            <div className="flex space-x-1">
              {product.colors && product.colors.slice(0, 3).map((color, index) => (
                <span key={index} className="h-4 w-4 rounded-full border border-gray-300" style={{ backgroundColor: color }}></span>
              ))}
            </div>
          </div>
          
          {showRating && (
            <div className="mt-3">
              <div className="flex items-center">
                <div className="flex">
                  <i className="ri-star-fill text-accent"></i>
                  <i className="ri-star-fill text-accent"></i>
                  <i className="ri-star-fill text-accent"></i>
                  <i className="ri-star-fill text-accent"></i>
                  <i className="ri-star-half-fill text-accent"></i>
                </div>
                <span className="ml-2 text-sm opacity-75">42 reviews</span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
