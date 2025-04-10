import  Link  from "next/link";

const BrandStory = () => {
  return (
    <section className="py-20 theme-transition bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="lg:order-2">
            <span className="uppercase tracking-wide text-accent font-medium">Our Story</span>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl font-medium leading-tight">Craftsmanship Meets Contemporary Design</h2>
            <p className="mt-6 opacity-75">Founded in 2018, MAISON was born from a passion for timeless design and sustainable fashion. We believe that clothing should be made to last, both in style and quality.</p>
            <p className="mt-4 opacity-75">Our team of designers and craftspeople work together to create pieces that balance classic elegance with modern sensibilities, using only the finest materials sourced from responsible suppliers around the world.</p>
            <div className="mt-8">
              <Link 
                href="/about" 
                className="inline-flex items-center px-5 py-2.5 rounded-md font-medium bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-200 shadow-sm"
              >
                Read Our Full Story <i className="ri-arrow-right-line ml-2"></i>
              </Link>
            </div>
          </div>
          <div className="lg:order-1 flex space-x-4">
            <div className="w-1/2 space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                alt="Brand story image 1" 
                className="w-full h-64 object-cover object-center rounded-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                alt="Brand story image 2" 
                className="w-full h-40 object-cover object-center rounded-lg"
              />
            </div>
            <div className="w-1/2 pt-8">
              <img 
                src="https://images.unsplash.com/photo-1618375531912-867984bdfd87?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                alt="Brand story image 3" 
                className="w-full h-80 object-cover object-center rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
