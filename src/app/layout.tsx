import { Toaster } from "./components/ui/toaster";
import { CartProvider } from "./context/cart-context";
import { WishlistProvider } from "./context/wishlist-context";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Providers } from "./providers"; // For React Query
import MainLayout from "./layouts/main-layout";
import "./globals.css"; 
export const metadata = {
  title: "MAISON | Premium Clothing",
  description: "Premium clothing and accessories for the modern lifestyle",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            <WishlistProvider>
              <CartProvider>
                <MainLayout>{children}</MainLayout>
                <Toaster />
              </CartProvider>
            </WishlistProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
