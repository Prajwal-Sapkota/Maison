import { useState, useEffect } from 'react';
import { useToast } from '../hooks/use-toast'; 
import Newsletter from '../components/newsletter';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "We've received your message and will get back to you soon."
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="theme-transition bg-background">
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-center">Contact Us</h1>
          <p className="mt-4 text-center text-muted-foreground max-w-xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
          </p>
          
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                    disabled={isSubmitting}
                  >
                    <option value="">Select a subject</option>
                    <option value="order">Order Inquiry</option>
                    <option value="product">Product Information</option>
                    <option value="returns">Returns & Exchanges</option>
                    <option value="feedback">General Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/90 transition-colors duration-200 w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 text-accent">
                      <i className="ri-map-pin-line text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-medium">Address</h4>
                      <p className="text-muted-foreground mt-1">
                        123 Fashion Avenue<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 text-accent">
                      <i className="ri-phone-line text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-muted-foreground mt-1">
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 text-accent">
                      <i className="ri-mail-line text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-muted-foreground mt-1">
                        info@maisonclothing.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 text-accent">
                      <i className="ri-time-line text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-medium">Business Hours</h4>
                      <p className="text-muted-foreground mt-1">
                        Monday - Friday: 9am - 6pm<br />
                        Saturday: 10am - 5pm<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors duration-200">
                    <i className="ri-instagram-line text-xl"></i>
                  </a>
                  <a href="#" className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors duration-200">
                    <i className="ri-facebook-line text-xl"></i>
                  </a>
                  <a href="#" className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors duration-200">
                    <i className="ri-twitter-line text-xl"></i>
                  </a>
                  <a href="#" className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors duration-200">
                    <i className="ri-pinterest-line text-xl"></i>
                  </a>
                </div>
              </div>
              
              <div className="pt-8 border-t border-border">
                <h3 className="text-xl font-medium mb-4">Store Location</h3>
                <div className="rounded-lg overflow-hidden h-64 bg-muted">
                  {/* This would be a Google Map in a real implementation */}
                  <div className="h-full w-full flex items-center justify-center">
                    <i className="ri-map-2-line text-4xl text-muted-foreground"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif font-medium text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">What are your shipping options?</h3>
              <p className="text-muted-foreground">We offer standard shipping (3-5 business days), express shipping (1-2 business days), and same-day delivery in select urban areas. Free shipping is available on orders over $100.</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">What is your return policy?</h3>
              <p className="text-muted-foreground">We accept returns within 30 days of purchase for a full refund or exchange. Items must be unworn, unwashed, and with the original tags attached.</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Do you offer international shipping?</h3>
              <p className="text-muted-foreground">Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location.</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">How can I track my order?</h3>
              <p className="text-muted-foreground">Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order through your account dashboard.</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Do you have physical stores?</h3>
              <p className="text-muted-foreground">Yes, we have flagship stores in New York, Los Angeles, and London. We also have pop-up shops in various locations throughout the year.</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">How can I care for my MAISON garments?</h3>
              <p className="text-muted-foreground">Each item comes with specific care instructions. Generally, we recommend gentle washing or dry cleaning, and hanging or folding items properly to maintain their shape and quality.</p>
            </div>
          </div>
        </div>
      </section>
      
      <Newsletter />
    </div>
  );
};

export default ContactPage;
