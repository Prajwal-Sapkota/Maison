'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Product, Category } from '../../../shared/schema';
import ProductGrid from '../components/product-grid';
import ProductFilter from '../components/product-filter';
import Newsletter from '../components/newsletter';

const Shop = () => {
  const router = useRouter();
  const { query, pathname } = router;

  const categoryParam = typeof query.category === 'string' ? query.category : null;
  const filterParam = typeof query.filter === 'string' ? query.filter : 'all';

  const [activeFilter, setActiveFilter] = useState(filterParam);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);

  // Get all products
  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // Get all categories
  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const filterOptions = [
    { id: 'all', name: 'All Products' },
    { id: 'new-arrivals', name: 'New Arrivals' },
    { id: 'bestsellers', name: 'Bestsellers' },
    { id: 'sale', name: 'Sale' },
  ];

  const categoryOptions = categories?.map(category => ({
    id: category.slug,
    name: category.name
  })) || [];

  const filteredProducts = products?.filter(product => {
    if (selectedCategory) {
      const categoryObj = categories?.find(c => c.slug === selectedCategory);
      if (categoryObj && product.categoryId !== categoryObj.id) return false;
    }

    if (activeFilter === 'all') return true;
    if (activeFilter === 'new-arrivals' && product.newArrival) return true;
    if (activeFilter === 'bestsellers' && product.bestSeller) return true;
    if (activeFilter === 'sale' && product.salePrice) return true;

    return false;
  });

  // Update URL on filter change
  useEffect(() => {
    const query: any = {};
    if (selectedCategory) query.category = selectedCategory;
    if (activeFilter !== 'all') query.filter = activeFilter;

    router.replace({ pathname, query }, undefined, { shallow: true });
  }, [activeFilter, selectedCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isLoading = productsLoading || categoriesLoading;

  return (
    <div>
      {/* Shop Header */}
      <section className="py-12 md:py-16 theme-transition bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-center">Shop</h1>
          <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of premium clothing designed for the modern wardrobe.
          </p>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-12 theme-transition bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12">
            {/* Sidebar Filters */}
            <div className="w-full md:w-1/4">
              <div className="space-y-8">
                <div>
                  <h3 className="font-medium text-lg mb-4">Product Type</h3>
                  <div className="flex flex-col space-y-2">
                    {filterOptions.map(filter => (
                      <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`text-left px-2 py-1.5 rounded text-sm transition-colors duration-200 ${
                          activeFilter === filter.id
                            ? 'bg-accent text-white'
                            : 'hover:bg-muted'
                        }`}
                      >
                        {filter.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-lg mb-4">Categories</h3>
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`text-left px-2 py-1.5 rounded text-sm transition-colors duration-200 ${
                        selectedCategory === null
                          ? 'bg-accent text-white'
                          : 'hover:bg-muted'
                      }`}
                    >
                      All Categories
                    </button>
                    {categoryOptions.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`text-left px-2 py-1.5 rounded text-sm transition-colors duration-200 ${
                          selectedCategory === category.id
                            ? 'bg-accent text-white'
                            : 'hover:bg-muted'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-lg mb-4">Price Range</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="price-1" className="mr-2" />
                      <label htmlFor="price-1" className="text-sm">Under $50</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="price-2" className="mr-2" />
                      <label htmlFor="price-2" className="text-sm">$50 - $100</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="price-3" className="mr-2" />
                      <label htmlFor="price-3" className="text-sm">$100 - $150</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="price-4" className="mr-2" />
                      <label htmlFor="price-4" className="text-sm">$150+</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="w-full md:w-3/4">
              <div className="flex justify-between items-center mb-8">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredProducts?.length || 0} products
                </p>
                <div className="flex items-center">
                  <label htmlFor="sort" className="text-sm mr-2">Sort by:</label>
                  <select id="sort" className="text-sm border rounded p-1 bg-background">
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-muted animate-pulse aspect-[3/4] rounded-lg"></div>
                  ))}
                </div>
              ) : (
                <ProductGrid
                  products={filteredProducts || []}
                  emptyMessage="No products match your selected filters."
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
};

export default Shop;
