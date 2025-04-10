import Link  from "next/link";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden theme-transition">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Hero background"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 lg:py-48 text-white">
        <div className="max-w-lg fade-in">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">Elegance in Every Thread</h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200">Discover our new collection designed for the modern individual who appreciates timeless quality and contemporary style.</p>
          <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/shop" className="px-6 py-3 bg-white text-gray-900 font-medium rounded hover:bg-gray-100 transition-colors duration-200 text-center shadow-lg">
              Shop New Arrivals
            </Link>
            <Link href="/shop" className="px-6 py-3 border-2 border-white text-white font-medium rounded hover:bg-white hover:text-gray-900 transition-all duration-200 text-center">
              View Collections
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 swipe-indicator">
          <span className="text-sm">Scroll</span>
          <i className="ri-arrow-down-line"></i>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
