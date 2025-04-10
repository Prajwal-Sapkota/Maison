import { useEffect } from 'react';
import Link from "next/link";
import Newsletter from '../components/newsletter';

const About = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="theme-transition bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="About MAISON" 
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 text-white">
          <div className="max-w-xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">Our Story</h1>
            <p className="mt-6 text-lg md:text-xl text-gray-200">Discover the passion and craftsmanship behind MAISON and our commitment to timeless elegance.</p>
          </div>
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="uppercase tracking-wide text-accent font-medium">Our Mission</span>
              <h2 className="mt-2 font-serif text-3xl md:text-4xl font-medium leading-tight">Crafting Timeless Elegance for the Modern Individual</h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>Founded in 2018, MAISON was born from a passion for timeless design and sustainable fashion. We believe that clothing should be made to last, both in style and quality.</p>
                <p>Our mission is to create apparel that transcends trends, focusing instead on elegant designs that remain relevant season after season. By combining traditional craftsmanship with contemporary aesthetics, we offer pieces that feel both classic and current.</p>
                <p>At MAISON, we're committed to responsible practices at every stage of production. From sourcing premium, sustainable materials to ensuring ethical manufacturing conditions, we strive to make choices that respect both people and planet.</p>
              </div>
            </div>
            <div className="order-first lg:order-last">
              <img 
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Our mission" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="uppercase tracking-wide text-accent font-medium">Our Values</span>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl font-medium">What Drives Us</h2>
            <p className="mt-4 text-muted-foreground">Our core values guide every decision we make, from design to delivery.</p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-background rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-star-line text-2xl"></i>
              </div>
              <h3 className="text-xl font-medium mb-3">Quality</h3>
              <p className="text-muted-foreground">We never compromise on quality, selecting the finest materials and working with skilled artisans to create exceptional pieces.</p>
            </div>
            
            <div className="text-center p-6 bg-background rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-recycle-line text-2xl"></i>
              </div>
              <h3 className="text-xl font-medium mb-3">Sustainability</h3>
              <p className="text-muted-foreground">We're committed to reducing our environmental footprint through responsible sourcing, production methods, and waste reduction.</p>
            </div>
            
            <div className="text-center p-6 bg-background rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-heart-line text-2xl"></i>
              </div>
              <h3 className="text-xl font-medium mb-3">Integrity</h3>
              <p className="text-muted-foreground">We believe in transparency, fair practices, and building lasting relationships with our customers, suppliers, and team members.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="uppercase tracking-wide text-accent font-medium">Our Team</span>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl font-medium">The People Behind MAISON</h2>
            <p className="mt-4 text-muted-foreground">A diverse group of passionate individuals dedicated to bringing our vision to life.</p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden w-40 h-40 mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                  alt="Emily Chen, Founder & Creative Director" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium text-lg">Emily Chen</h3>
              <p className="text-accent">Founder & Creative Director</p>
              <div className="mt-3 flex justify-center space-x-3">
                <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  <i className="ri-linkedin-fill"></i>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  <i className="ri-instagram-line"></i>
                </Link>
              </div>
            </div>
            
            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden w-40 h-40 mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                  alt="Marcus Johnson, Design Director" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium text-lg">Marcus Johnson</h3>
              <p className="text-accent">Design Director</p>
              <div className="mt-3 flex justify-center space-x-3">
                <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  <i className="ri-linkedin-fill"></i>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  <i className="ri-instagram-line"></i>
                </Link>
              </div>
            </div>
            
            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden w-40 h-40 mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                  alt="Sophia Kim, Head of Production" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium text-lg">Sophia Kim</h3>
              <p className="text-accent">Head of Production</p>
              <div className="mt-3 flex justify-center space-x-3">
                <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  <i className="ri-linkedin-fill"></i>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  <i className="ri-instagram-line"></i>
                </Link>
              </div>
            </div>
            
            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden w-40 h-40 mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                  alt="David Rodriguez, Sustainability Director" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium text-lg">David Rodriguez</h3>
              <p className="text-accent">Sustainability Director</p>
              <div className="mt-3 flex justify-center space-x-3">
                <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  <i className="ri-linkedin-fill"></i>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  <i className="ri-instagram-line"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="uppercase tracking-wide text-accent font-medium">Testimonials</span>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl font-medium">What Our Customers Say</h2>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="flex text-accent mb-4">
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
              </div>
              <p className="italic">"The quality of MAISON's clothing is unmatched. I've had pieces for years that still look brand new, and the designs are timeless enough that they never go out of style."</p>
              <div className="mt-6 flex items-center">
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                    alt="Sarah T." 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Sarah T.</h4>
                  <p className="text-sm text-muted-foreground">Loyal Customer since 2019</p>
                </div>
              </div>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="flex text-accent mb-4">
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
              </div>
              <p className="italic">"I appreciate that MAISON is transparent about their manufacturing processes. Knowing that my clothes were made ethically makes me feel good about my purchase."</p>
              <div className="mt-6 flex items-center">
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                    alt="Michael R." 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Michael R.</h4>
                  <p className="text-sm text-muted-foreground">Loyal Customer since 2020</p>
                </div>
              </div>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="flex text-accent mb-4">
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
              </div>
              <p className="italic">"The attention to detail in every MAISON piece is remarkable. From the stitching to the buttons, everything is perfect. It's worth every penny for the quality you receive."</p>
              <div className="mt-6 flex items-center">
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src="https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                    alt="Elena M." 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Elena M.</h4>
                  <p className="text-sm text-muted-foreground">Loyal Customer since 2018</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12 flex items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif font-medium text-white">Experience MAISON Quality</h2>
                  <p className="mt-4 text-white/80">Discover our collections and experience the perfect blend of timeless elegance and contemporary style.</p>
                  <div className="mt-8">
                    <Link href="/shop" className="inline-block px-6 py-3 bg-white text-primary font-medium rounded hover:bg-gray-100 transition-colors duration-200">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
              <div className="relative h-64 lg:h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="MAISON collection" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Newsletter />
    </div>
  );
};

export default About;
