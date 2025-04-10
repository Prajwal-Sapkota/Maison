import { useQuery } from '@tanstack/react-query';
import Link  from "next/link";
import { Category } from '../../../shared/schema';

const CategorySection = () => {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  if (isLoading) {
    return (
      <section className="py-20 theme-transition bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-serif text-3xl md:text-4xl font-medium mb-16">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative rounded-lg overflow-hidden group aspect-[3/4] bg-muted animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 theme-transition bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-serif text-3xl md:text-4xl font-medium mb-16">Shop by Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories?.map((category, index) => (
            <Link 
              key={category.id} 
              href={`/shop?category=${category.slug}`} 
              className="relative rounded-lg overflow-hidden group aspect-[3/4] fade-in"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <img 
                src={category.image ?? '/placeholder.jpg'} 
                alt={category.name} 
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-white font-serif text-2xl">{category.name}</h3>
                <p className="text-white text-sm mt-2 flex items-center">
                  <span className="border-b border-white pb-0.5 group-hover:border-accent group-hover:text-accent transition-colors duration-200 flex items-center">
                    Discover <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform duration-200"></i>
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
