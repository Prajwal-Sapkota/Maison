"use client";
import HeroSection from './components/hero-section';
import CategorySection from './components/category-section';
import NewArrivals from './components/new-arrivals';
import CollectionBanner from './components/collection-banner';
import BestSellers from './components/bestsellers';
import BrandStory from './components/brand-story';
import InstagramFeed from './components/instagram-feed';
import Newsletter from './components/newsletter';
import { useEffect } from 'react';

const Home = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <HeroSection />
      <CategorySection />
      <NewArrivals />
      <CollectionBanner />
      <BestSellers />
      <BrandStory />
      <InstagramFeed />
      <Newsletter />
    </div>
  );
};

export default Home;
