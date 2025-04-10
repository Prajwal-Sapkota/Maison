import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter} from "next/router";
import Link from "next/link";
import { Product } from '../../../shared/schema';
import { useWishlist } from '../context/wishlist-context';
import { useCart } from '../context/cart-context';
import { useToast } from '../hooks/use-toast';
import { formatPrice } from '../utils/format-price';
import ProductGrid from '../components/product-grid';
import Newsletter from '../components/newsletter';

const ProductDetails = () => {
    const { query } = useRouter();
    const slug = query.slug;
  
  const { toast } = useToast();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  
  // Fetch product details
  const { data: product, isLoading: productLoading } = useQuery<Product>({
    queryKey: [`/api/products/${slug}`],
  });
  
  // Fetch similar products (products in the same category)
  const { data: similarProducts, isLoading: similarLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    enabled: !!product,
    select: (data) => 
      data
        .filter(p => p.categoryId === product?.categoryId && p.id !== product?.id)
        .slice(0, 4)
  });
  
  // Set initial color and size when product loads
  useEffect(() => {
    if (product) {
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
      
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
    }
  }, [product]);
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (productLoading) {
    return (
      <div className="py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded-md w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-muted rounded-md w-1/2 mx-auto"></div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="aspect-[3/4] bg-muted rounded-md"></div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded-md w-3/4"></div>
                <div className="h-6 bg-muted rounded-md w-1/4"></div>
                <div className="h-4 bg-muted rounded-md w-full"></div>
                <div className="h-4 bg-muted rounded-md w-full"></div>
                <div className="h-4 bg-muted rounded-md w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-serif font-medium">Product Not Found</h1>
          <p className="mt-4 text-muted-foreground">The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/shop" className="mt-8 inline-block px-6 py-3 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/90 transition-colors duration-200">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  const inWishlist = isInWishlist(product.id);
  
  const handleWishlistToggle = async () => {
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
    }
  };
  
  const handleAddToCart = async () => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      toast({
        title: "Please select a size",
        description: "Size selection is required before adding to cart.",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedColor && product.colors && product.colors.length > 0) {
      toast({
        title: "Please select a color",
        description: "Color selection is required before adding to cart.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await addToCart(
        product.id, 
        quantity, 
        selectedSize || undefined, 
        selectedColor || undefined
      );
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`
      });
    } catch (error) {
      toast({
        title: "Failed to add to cart",
        description: "There was a problem adding this item to your cart.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
  };
  
  // Images for the product gallery (in a real app, this would come from the API)
  const productImages = [
    product.image,
    // Additional images would come from the API in a real app
    "https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  ];

  return (
    <div className="theme-transition bg-background">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center text-sm">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <Link href="/shop" className="text-muted-foreground hover:text-foreground transition-colors">Shop</Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>
      
      {/* Product Details */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg">
                <img 
                  src={productImages[activeImage]} 
                  alt={product.name} 
                  className="w-full h-auto object-cover object-center rounded-lg"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {productImages.map((image, index) => (
                  <button 
                    key={index} 
                    className={`overflow-hidden rounded-lg border-2 transition-colors ${
                      activeImage === index ? 'border-accent' : 'border-transparent hover:border-muted-foreground'
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`} 
                      className="w-full h-auto object-cover object-center aspect-[3/4]"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-serif font-medium">{product.name}</h1>
              
              <div className="mt-4 flex items-center">
                <div className="flex">
                  <i className="ri-star-fill text-accent"></i>
                  <i className="ri-star-fill text-accent"></i>
                  <i className="ri-star-fill text-accent"></i>
                  <i className="ri-star-fill text-accent"></i>
                  <i className="ri-star-half-fill text-accent"></i>
                </div>
                <span className="ml-2 text-sm text-muted-foreground">42 reviews</span>
              </div>
              
              <div className="mt-4">
                {product.salePrice ? (
                  <div className="flex items-center">
                    <span className="text-2xl font-medium">{formatPrice(product.price)}</span>
                    <span className="ml-2 text-lg line-through text-muted-foreground">{formatPrice(product.salePrice)}</span>
                  </div>
                ) : (
                  <span className="text-2xl font-medium">{formatPrice(product.price)}</span>
                )}
              </div>
              
              <div className="mt-6 border-t border-border pt-6">
                <p className="text-muted-foreground">{product.description || "A premium quality item crafted with attention to detail and made from the finest materials."}</p>
              </div>
              
              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-3">Color</h3>
                  <div className="flex space-x-2">
                    {product.colors.map((color, index) => (
                      <button 
                        key={index} 
                        className={`h-8 w-8 rounded-full border-2 transition-all ${
                          selectedColor === color 
                            ? 'ring-2 ring-accent ring-offset-2 ring-offset-background' 
                            : 'border-muted'
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                        aria-label={`Select color ${color}`}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Size</h3>
                    <button className="text-sm text-accent hover:text-accent/80 transition-colors">Size Guide</button>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {product.sizes.map((size, index) => (
                      <button 
                        key={index} 
                        className={`py-2 border text-sm font-medium rounded transition-colors ${
                          selectedSize === size 
                            ? 'bg-primary text-primary-foreground border-primary' 
                            : 'bg-background text-foreground border-border hover:bg-muted'
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity Selection */}
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">Quantity</h3>
                <div className="flex items-center border rounded border-border max-w-[140px]">
                  <button 
                    className="px-3 py-2 text-lg"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <i className="ri-subtract-line"></i>
                  </button>
                  <span className="flex-1 text-center">{quantity}</span>
                  <button 
                    className="px-3 py-2 text-lg"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    <i className="ri-add-line"></i>
                  </button>
                </div>
              </div>
              
              {/* Actions */}
              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/90 transition-colors duration-200 flex-1 flex items-center justify-center"
                  onClick={handleAddToCart}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>Adding...</span>
                  ) : (
                    <>
                      <i className="ri-shopping-bag-line mr-2"></i>
                      Add to Cart
                    </>
                  )}
                </button>
                <button 
                  className="px-6 py-3 border border-border rounded font-medium hover:bg-muted transition-colors duration-200 flex items-center justify-center"
                  onClick={handleWishlistToggle}
                >
                  {inWishlist ? (
                    <>
                      <i className="ri-heart-fill text-destructive mr-2"></i>
                      Remove from Wishlist
                    </>
                  ) : (
                    <>
                      <i className="ri-heart-line mr-2"></i>
                      Add to Wishlist
                    </>
                  )}
                </button>
              </div>
              
              {/* Product Meta */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="space-y-3 text-sm">
                  <p className="flex items-center">
                    <span className="text-muted-foreground w-24">SKU:</span>
                    <span>MSN-{product.id.toString().padStart(4, '0')}</span>
                  </p>
                  <p className="flex items-center">
                    <span className="text-muted-foreground w-24">Category:</span>
                    <Link href={`/shop?category=${product.categoryId === 1 ? 'mens-collection' : product.categoryId === 2 ? 'womens-collection' : 'accessories'}`} className="text-accent hover:text-accent/80 transition-colors">
                      {product.categoryId === 1 ? "Men's Collection" : product.categoryId === 2 ? "Women's Collection" : "Accessories"}
                    </Link>
                  </p>
                  <p className="flex items-center">
                    <span className="text-muted-foreground w-24">Tags:</span>
                    <span>
                      {product.newArrival && <span className="inline-block mr-2">New Arrival</span>}
                      {product.bestSeller && <span className="inline-block mr-2">Bestseller</span>}
                      {product.featured && <span className="inline-block">Featured</span>}
                    </span>
                  </p>
                </div>
              </div>
              
              {/* Shipping Info */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center">
                  <i className="ri-truck-line text-xl mr-3"></i>
                  <div>
                    <p className="font-medium">Free Shipping</p>
                    <p className="text-sm text-muted-foreground">On orders over $100</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <i className="ri-refresh-line text-xl mr-3"></i>
                  <div>
                    <p className="font-medium">Free Returns</p>
                    <p className="text-sm text-muted-foreground">Within 30 days</p>
                  </div>
                </div>
              </div>
              
              {/* Social Sharing */}
              <div className="mt-8 flex items-center">
                <span className="text-sm mr-4">Share:</span>
                <div className="flex space-x-3">
                  <a href="#" className="hover:text-accent transition-colors">
                    <i className="ri-facebook-fill"></i>
                  </a>
                  <a href="#" className="hover:text-accent transition-colors">
                    <i className="ri-twitter-fill"></i>
                  </a>
                  <a href="#" className="hover:text-accent transition-colors">
                    <i className="ri-pinterest-fill"></i>
                  </a>
                  <a href="#" className="hover:text-accent transition-colors">
                    <i className="ri-instagram-line"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Product Tabs */}
      <section className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex border-b border-border">
            <button className="text-lg font-medium py-4 px-6 border-b-2 border-accent relative -bottom-px">Description</button>
            <button className="text-lg text-muted-foreground py-4 px-6 hover:text-foreground transition-colors">Additional Information</button>
            <button className="text-lg text-muted-foreground py-4 px-6 hover:text-foreground transition-colors">Reviews (42)</button>
          </div>
          
          <div className="py-8">
            <div className="prose max-w-none dark:prose-invert">
              <p>{product.description || "A premium quality item crafted with attention to detail and made from the finest materials."}</p>
              <p>Our commitment to quality is evident in every stitch. We source only the finest materials from trusted suppliers, ensuring that each garment meets our exacting standards of excellence. Designed with both style and comfort in mind, this piece is versatile enough for various occasions while maintaining its sophisticated appeal.</p>
              <p>Features:</p>
              <ul>
                <li>Premium quality materials</li>
                <li>Expert craftsmanship</li>
                <li>Timeless design</li>
                <li>Comfortable fit</li>
                <li>Easy care instructions</li>
              </ul>
              <p>Care instructions: Please refer to the attached care label for detailed washing and maintenance guidelines to preserve the quality and appearance of your garment.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Similar Products */}
      {!similarLoading && similarProducts && similarProducts.length > 0 && (
        <section className="py-12 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-serif font-medium mb-8">You may also like</h2>
            <ProductGrid products={similarProducts} />
          </div>
        </section>
      )}
      
      <Newsletter />
    </div>
  );
};

export default ProductDetails;
