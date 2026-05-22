import HeroSection       from '@/components/home/HeroSection';
import FeaturedListings  from '@/components/home/FeaturedListings';
import WhyChooseUs       from '@/components/home/WhyChooseUs';
import CTASection        from '@/components/home/CTASection';

export const metadata = {
  title:       'Ghana\'s Premier Luxury Real Estate Group',
  description: 'Black Gold Realty Group — exceptional properties across Accra. Luxury villas, penthouses, executive homes, and investment land.',
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedListings />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}