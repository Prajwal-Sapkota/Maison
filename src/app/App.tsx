import Link from "next/link";
import { Toaster } from "./components/ui/toaster";
import Home from "./page";
import Shop from "./shop/page";
import ProductDetails from "./product/page";
import Wishlist from "./wishlist/page";
import About from "./about/page";
import { Contact } from "lucide-react";
import Login from "./login/page";
import Register from "./register/page";
import NotFound from "./not-found";
import MainLayout from "./layouts/main-layout";
import { CartProvider } from "./context/cart-context";
import { WishlistProvider } from "./context/wishlist-context";

function App() {
    return (
      <WishlistProvider>
        <CartProvider>
          <MainLayout>
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/product/slug">Product Details</Link>
            <Link href="/wishlist">Wishlist</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </MainLayout>
          <Toaster />
        </CartProvider>
      </WishlistProvider>
    );
  }
  
  export default App;