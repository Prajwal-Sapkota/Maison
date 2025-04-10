import { useState } from 'react';
import { useToast } from '../hooks/use-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for joining our newsletter."
      });
      setEmail('');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="py-24 theme-transition bg-secondary border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-accent dark:text-accent text-sm uppercase tracking-widest font-medium">Stay Connected</span>
          <h2 className="font-serif text-3xl md:text-4xl mt-3 font-medium">Join Our Community</h2>
          <div className="w-24 h-1 bg-accent mx-auto my-6"></div>
          <p className="mt-4 opacity-75">Subscribe to our newsletter for exclusive offers, new arrivals, and style inspiration delivered to your inbox.</p>
          <form className="mt-10 sm:flex max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="flex-1">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input 
                id="email-address" 
                name="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email" 
                required 
                className="w-full px-5 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-l-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent" 
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-0">
              <button 
                type="submit" 
                className="w-full px-5 py-4 font-medium text-white bg-accent dark:bg-accent rounded-r-md hover:bg-accent/90 dark:hover:bg-accent/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent sm:w-auto"
                disabled={isLoading}
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </form>
          <p className="mt-5 text-sm opacity-60">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
