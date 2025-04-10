import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Product } from '@shared/schema';
import ProductGrid from './product-grid';
import ProductFilter from './product-filter';

const filterOptions = [
  { id: 'all', name: 'All' },
  { id: 'men', name: 'Men' },
  { id: 'women', name: 'Women' },
  { id: 'accessories', name: 'Accessories' }
];

const BestSellers = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/bestsellers'],
  });

  // Filter products based on selected category
  const filteredProducts = products?.filter(product => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'men' && product.categoryId === 1) return true;
    if (activeFilter === 'women' && product.categoryId === 2) return true;
    if (activeFilter === 'accessories' && product.categoryId === 3) return true;
    return false;
  });

  return (
    <section className="py-20 theme-transition bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-medium">Bestsellers</h2>
          
          <div className="mt-6 md:mt-0">
            <ProductFilter 
              activeFilter={activeFilter} 
              setActiveFilter={setActiveFilter}
              filters={filterOptions}
            />
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-muted animate-pulse aspect-[3/4] rounded-lg"></div>
            ))}
          </div>
        ) : (
          <ProductGrid 
            products={filteredProducts || []} 
            showRating={true}
            emptyMessage={`No products found in the ${activeFilter === 'all' ? 'bestsellers' : activeFilter} category`}
          />
        )}
      </div>
    </section>
  );
};

export default BestSellers;
