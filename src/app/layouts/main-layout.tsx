"use client";
import React, { ReactNode, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import CartSidebar from "../components/cart-sidebar";
import MobileMenu from "../components/mobile-menu";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        openCart={toggleCart} 
        openMobileMenu={toggleMobileMenu} 
      />
      
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
      
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;
