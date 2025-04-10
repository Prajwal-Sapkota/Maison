import { useEffect } from 'react';
import  Link  from "next/link";
import { useWishlist } from '../context/wishlist-context';
import { useCart } from '../context/cart-context';
import { useToast } from '../hooks/use-toast';
import { formatPrice } from '../utils/format-price';
import Newsletter from '../components/newsletter';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, isLoading } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleRemoveFromWishlist = async (productId: number) => {
    try {
      await removeFromWishlist(productId);
      toast({
        title: "Removed from wishlist",
        description: "The item has been removed from your wishlist."
      });
    } catch (error) {
      toast({
        title: "Action failed",
        description: "There was a problem removing this item from your wishlist.",
        variant: "destructive"
      });
    }
  };
  
  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart(productId, 1);
      toast({
        title: "Added to cart",
        description: "The item has been added to your cart."
      });
    } catch (error) {
      toast({
        title: "Failed to add to cart",
        description: "There was a problem adding this item to your cart.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="theme-transition bg-background">
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-center">My Wishlist</h1>
          <p className="mt-4 text-center text-muted-foreground max-w-xl mx-auto">
            Items you've saved for later. Add them to your cart when you're ready to make a purchase.
          </p>
          
          {isLoading ? (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-muted rounded-lg h-[400px]"></div>
              ))}
            </div>
          ) : wishlistItems.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlistItems.map((product) => (
                <div key={product.id} className="border border-border rounded-lg overflow-hidden bg-card">
                  <div className="relative">
                    <Link href={`/product/${product.slug}`}>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-[300px] object-cover object-center transition-transform duration-500 hover:scale-105"
                      />
                    </Link>
                    <button 
                      className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      aria-label="Remove from wishlist"
                    >
                      <i className="ri-close-line text-primary"></i>
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <Link href={`/product/${product.slug}`}>
                      <h2 className="font-medium text-lg hover:text-accent transition-colors duration-200">{product.name}</h2>
                    </Link>
                    
                    <div className="mt-2">
                      {product.salePrice ? (
                        <div className="flex items-center">
                          <span className="font-medium">{formatPrice(product.price)}</span>
                          <span className="ml-2 text-sm line-through text-muted-foreground">{formatPrice(product.salePrice)}</span>
                        </div>
                      ) : (
                        <span className="font-medium">{formatPrice(product.price)}</span>
                      )}
                    </div>
                    
                    <button 
                      className="mt-4 w-full py-2 px-4 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      <i className="ri-shopping-bag-line mr-2"></i>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-16 text-center py-12 border border-border rounded-lg">
              <i className="ri-heart-line text-6xl opacity-20 mb-4"></i>
              <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-8">Start adding items to your wishlist to save them for later.</p>
              <Link href="/shop" className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/90 transition-colors duration-200">
                Explore Products
              </Link>
            </div>
          )}
        </div>
      </section>
      
      <Newsletter />
    </div>
  );
};

export default Wishlist;
