import Link  from "next/link";
import { useCart } from "../context/cart-context";
import { useWishlist } from "../context/wishlist-context";
import { useEffect, useState } from "react";

interface HeaderProps {
  openCart: () => void;
  openMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ openCart, openMobileMenu }) => {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  
  // Simple direct theme implementation
  const [isDark, setIsDark] = useState(true);
  
  useEffect(() => {
    // Check initial theme on load
    const root = document.documentElement;
    const initialIsDark = root.classList.contains('dark');
    setIsDark(initialIsDark);
  }, []);
  
  const toggleTheme = () => {
    const root = document.documentElement;
    const newIsDark = !isDark;
    
    // Update classes
    root.classList.remove(isDark ? 'dark' : 'light');
    root.classList.add(newIsDark ? 'dark' : 'light');
    
    // Save in localStorage
    localStorage.setItem('maison-theme', newIsDark ? 'dark' : 'light');
    
    // Update state
    setIsDark(newIsDark);
    console.log("Theme toggled to:", newIsDark ? 'dark' : 'light');
  };
  
  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;

  return (
    <header className="sticky top-0 z-50 theme-transition bg-background border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20 border-b border-border">
          {/* Mobile menu button */}
          <button 
            onClick={openMobileMenu} 
            className="inline-flex items-center justify-center p-2 rounded-md md:hidden focus:outline-none"
          >
            <i className="ri-menu-line text-xl"></i>
          </button>
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-serif font-bold text-2xl tracking-tight">MAISON</Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="font-display text-sm font-medium tracking-wide hover:text-accent transition-colors duration-200">HOME</Link>
            <Link href="/shop" className="font-display text-sm font-medium tracking-wide hover:text-accent transition-colors duration-200">SHOP</Link>
            <Link href="/shop" className="font-display text-sm font-medium tracking-wide hover:text-accent transition-colors duration-200">COLLECTIONS</Link>
            <Link href="/about" className="font-display text-sm font-medium tracking-wide hover:text-accent transition-colors duration-200">ABOUT</Link>
            <Link href="/contact" className="font-display text-sm font-medium tracking-wide hover:text-accent transition-colors duration-200">CONTACT</Link>
          </nav>
          
          {/* Right section */}
          <div className="flex items-center space-x-6">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full flex items-center justify-center focus:outline-none hover:bg-muted transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <i className="ri-sun-line text-xl" />
              ) : (
                <i className="ri-moon-line text-xl" />
              )}
            </button>
            
            {/* Search */}
            <button className="p-1 hover:bg-muted rounded-full focus:outline-none transition-colors duration-200">
              <i className="ri-search-line text-xl"></i>
            </button>
            
            {/* Account */}
            <Link href="/login" className="p-1 hover:bg-muted rounded-full hidden sm:block focus:outline-none transition-colors duration-200">
              <i className="ri-user-line text-xl"></i>
            </Link>
            
            {/* Wishlist */}
            <Link href="/wishlist" className="p-1 hover:bg-muted rounded-full hidden sm:block focus:outline-none transition-colors duration-200 relative">
              <i className="ri-heart-line text-xl"></i>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent flex items-center justify-center text-white text-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            {/* Cart */}
            <button 
              onClick={openCart} 
              className="p-1 hover:bg-muted rounded-full focus:outline-none transition-colors duration-200 relative"
            >
              <i className="ri-shopping-bag-line text-xl"></i>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent flex items-center justify-center text-white text-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
