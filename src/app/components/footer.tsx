import  Link  from "next/link";

const Footer = () => {
  return (
    <footer className="py-12 theme-transition bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <Link href="/" className="font-serif font-bold text-2xl tracking-tight">MAISON</Link>
            <p className="mt-4 opacity-75 max-w-xs">Premium clothing crafted with attention to detail and sustainable practices.</p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" className="hover:text-accent transition-colors duration-200">
                <i className="ri-instagram-line text-xl"></i>
              </Link>
              <Link href="#" className="hover:text-accent transition-colors duration-200">
                <i className="ri-facebook-line text-xl"></i>
              </Link>
              <Link href="#" className="hover:text-accent transition-colors duration-200">
                <i className="ri-pinterest-line text-xl"></i>
              </Link>
              <Link href="#" className="hover:text-accent transition-colors duration-200">
                <i className="ri-twitter-line text-xl"></i>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/shop" className="opacity-75 hover:opacity-100 hover:text-accent transition-colors duration-200">New Arrivals</Link></li>
              <li><Link href="/shop" className="opacity-75 hover:opacity-100 hover:text-accent transition-colors duration-200">Bestsellers</Link></li>
              <li><Link href="/shop" className="opacity-75 hover:opacity-100 hover:text-accent transition-colors duration-200">Women's Collection</Link></li>
              <li><Link href="/shop" className="opacity-75 hover:opacity-100 hover:text-accent transition-colors duration-200">Men's Collection</Link></li>
              <li><Link href="/shop" className="opacity-75 hover:opacity-100 hover:text-accent transition-colors duration-200">Accessories</Link></li>
              <li><Link href="/shop" className="opacity-75 hover:opacity-100 hover:text-accent transition-colors duration-200">Sale</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="opacity-75 hover:opacity-100 hover:text-accent transition-colors duration-200">Our Story</Link></li>
              <li><Link href="/about" className="opacity-75 hover:opacity-100 hover:text-accent transition-colors duration-200">Sustainability</Link></li>
              <li><Link href="/about" className="opacity-75 hover:opacity-100 hover:text-accent transition-colors duration-200">Careers</Link></li>
              <li><Link href="/about" className="opacity-75 hover:opacity-100 hover:text-accent transition-colors duration-200">Press</Link></li>
              <li><Link href="/about" className="opacity-75 hover:opacity-100 hover:text-accent transition-colors duration-200">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="opacity-75 hover:opacity-100 hover:text-accent transition-colors duration-200">Contact Us</Link></li>
              <li><Link href="/contact" className="opacity-75 hover:opacity-100 hover:text-accent transition-colors duration-200">FAQs</Link></li>
              <li><Link href="/contact" className="opacity-75 hover:opacity-100 hover:text-accent transition-colors duration-200">Shipping & Returns</Link></li>
              <li><Link href="/contact" className="opacity-75 hover:opacity-100 hover:text-accent transition-colors duration-200">Store Locator</Link></li>
              <li><Link href="/contact" className="opacity-75 hover:opacity-100 hover:text-accent transition-colors duration-200">Size Guide</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row md:items-center md:justify-between border-border">
          <p className="text-sm opacity-75">&copy; {new Date().getFullYear()} MAISON. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
            <Link href="/about" className="text-sm opacity-75 hover:opacity-100 transition-colors duration-200">Privacy Policy</Link>
            <Link href="/about" className="text-sm opacity-75 hover:opacity-100 transition-colors duration-200">Terms of Service</Link>
            <Link href="/about" className="text-sm opacity-75 hover:opacity-100 transition-colors duration-200">Cookies</Link>
            <Link href="/about" className="text-sm opacity-75 hover:opacity-100 transition-colors duration-200">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
