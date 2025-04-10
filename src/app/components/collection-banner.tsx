import Link  from "next/link";

const CollectionBanner = () => {
  return (
    <section className="py-20 theme-transition bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1550614000-4895a10e1bfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Summer collection" 
            className="w-full h-[400px] md:h-[500px] object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="ml-8 md:ml-16 max-w-md">
              <span className="text-white text-sm md:text-base tracking-wide uppercase">Summer Collection</span>
              <h2 className="mt-3 text-white font-serif text-3xl md:text-5xl font-medium leading-tight">Effortless Style for Warm Days</h2>
              <p className="mt-4 text-white text-sm md:text-base opacity-90">Discover our selection of lightweight fabrics and relaxed silhouettes perfect for summer.</p>
              <Link 
                href="/shop?collection=summer" 
                className="mt-6 inline-block px-6 py-3 bg-white text-gray-900 font-medium rounded hover:bg-gray-100 transition-colors duration-200 shadow-md"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionBanner;
