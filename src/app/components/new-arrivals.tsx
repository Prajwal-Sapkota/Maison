import { useQuery } from '@tanstack/react-query';
import Link  from "next/link";
import { Product } from '../../../shared/schema';
import ProductGrid from './product-grid';

const NewArrivals = () => {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/new-arrivals'],
  });

  return (
    <section className="py-20 theme-transition bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-medium">New Arrivals</h2>
            <p className="mt-4 opacity-75 max-w-2xl">Our latest collection features premium materials, expert craftsmanship, and timeless designs for the modern wardrobe.</p>
          </div>
          <Link 
            href="/shop?filter=new-arrivals" 
            className="mt-6 md:mt-0 inline-flex items-center px-4 py-2 rounded-md font-medium bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-200 shadow-sm"
          >
            View all <i className="ri-arrow-right-line ml-2"></i>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-background animate-pulse aspect-[3/4] rounded-lg"></div>
            ))}
          </div>
        ) : (
          <ProductGrid products={products || []} />
        )}
      </div>
    </section>
  );
};

export default NewArrivals;
