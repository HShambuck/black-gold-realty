'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProperties } from '@/data/properties';
import { siteContent } from '@/data/siteContent';
import PropertyCard    from '@/components/common/PropertyCard';
import SectionHeading  from '@/components/common/SectionHeading';
import GoldButton      from '@/components/common/GoldButton';

const { featuredSection } = siteContent;

export default function FeaturedListings() {
  const featured = getFeaturedProperties();

  return (
    <section
      id="featured-listings"
      className="py-20 md:py-24 lg:py-32 bg-obsidian-950"
    >
      <div className="container-luxury">

        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <SectionHeading
            badge={featuredSection.badge}
            headline={featuredSection.headline}
            subheadline={featuredSection.subheadline}
            align="center"
          />
        </div>

        {/* Property Grid
            mobile:  1 column (full width cards)
            sm:      2 columns
            xl:      3 columns
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 lg:gap-8 mb-12 lg:mb-14">
          {featured.map((property, i) => (
            <PropertyCard
              key={property.id}
              property={property}
              variant="featured"
              index={i}
            />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <GoldButton
            href={featuredSection.cta.href}
            size="lg"
            variant="outline"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {featuredSection.cta.label}
          </GoldButton>
        </motion.div>
      </div>
    </section>
  );
}