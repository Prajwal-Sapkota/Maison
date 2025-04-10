const instagramPosts = [
  { id: 1, imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: 2, imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: 3, imageUrl: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: 4, imageUrl: "https://images.unsplash.com/photo-1566206091558-7f218b696731?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: 5, imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: 6, imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" }
];

const InstagramFeed = () => {
  return (
    <section className="py-20 theme-transition bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-medium">Follow Our Style</h2>
          <p className="mt-4 opacity-75 max-w-2xl mx-auto">Join our community and share your MAISON style moments with us on Instagram.</p>
          <a href="#" className="mt-4 inline-flex items-center font-medium text-accent hover:text-accent/80 transition-colors duration-200">
            @maison_style <i className="ri-instagram-line ml-2"></i>
          </a>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <a 
              key={post.id} 
              href="#" 
              className="relative group overflow-hidden aspect-square rounded-lg"
            >
              <img 
                src={post.imageUrl} 
                alt="Instagram post" 
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <i className="ri-instagram-line text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
