import { ReactNode } from 'react';
import ProductCard from './product-card';
import { Product } from '@shared/schema';

interface ProductGridProps {
  products: Product[];
  showRating?: boolean;
  children?: ReactNode;
  emptyMessage?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  showRating = false,
  children,
  emptyMessage = "No products found" 
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      {products.length > 0 ? (
        <>
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              showRating={showRating} 
            />
          ))}
          {children}
        </>
      ) : (
        <div className="col-span-4 py-12 text-center">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
