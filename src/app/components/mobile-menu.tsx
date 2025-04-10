'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div 
      className="md:hidden fixed inset-0 z-40 bg-background"
      onClick={onClose}
    >
      <div className="pt-2 pb-4 space-y-1 px-4 border-b border-border">
        <Link 
          href="/" 
          className={`block py-3 font-medium border-b border-border ${pathname === '/' ? 'text-accent' : ''}`}
          onClick={onClose}
        >
          HOME
        </Link>
        <Link 
          href="/shop" 
          className={`block py-3 font-medium border-b border-border ${pathname === '/shop' ? 'text-accent' : ''}`}
          onClick={onClose}
        >
          SHOP
        </Link>
        <Link 
          href="/collections" 
          className={`block py-3 font-medium border-b border-border ${pathname.includes('/collections') ? 'text-accent' : ''}`}
          onClick={onClose}
        >
          COLLECTIONS
        </Link>
        <Link 
          href="/about" 
          className={`block py-3 font-medium border-b border-border ${pathname === '/about' ? 'text-accent' : ''}`}
          onClick={onClose}
        >
          ABOUT
        </Link>
        <Link 
          href="/contact" 
          className={`block py-3 font-medium ${pathname === '/contact' ? 'text-accent' : ''}`}
          onClick={onClose}
        >
          CONTACT
        </Link>
        
        <div className="pt-3 space-y-2">
          <Link
            href="/login"
            className="flex items-center py-2 space-x-2"
            onClick={onClose}
          >
            <i className="ri-user-line text-xl"></i>
            <span>Account</span>
          </Link>
          <Link
            href="/wishlist"
            className="flex items-center py-2 space-x-2"
            onClick={onClose}
          >
            <i className="ri-heart-line text-xl"></i>
            <span>Wishlist</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
