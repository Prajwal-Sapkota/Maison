import { useState } from 'react';

interface ProductFilterProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  filters: {
    id: string;
    name: string;
  }[];
}

const ProductFilter: React.FC<ProductFilterProps> = ({ 
  activeFilter, 
  setActiveFilter,
  filters
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={`px-4 py-2 rounded font-medium text-sm transition-colors duration-200 ${
            activeFilter === filter.id
              ? 'bg-accent text-white'
              : 'bg-transparent hover:bg-muted'
          }`}
        >
          {filter.name}
        </button>
      ))}
    </div>
  );
};

export default ProductFilter;
