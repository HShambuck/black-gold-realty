'use client';

import { motion } from 'framer-motion';
import {
  Shield, Globe, Award, Key, TrendingUp, Phone,
} from 'lucide-react';
import { siteContent } from '@/data/siteContent';
import SectionHeading from '@/components/common/SectionHeading';
import { testimonials } from '@/data/testimonials';
import Image from 'next/image';
import { Star } from 'lucide-react';

const { whyChooseUs } = siteContent;

const iconMap = { Shield, Globe, Award, Key, TrendingUp, Phone };

const cardVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function WhyChooseUs() {
  return (
    <section className="py-24 lg:py-32 bg-obsidian-900">
      <div className="container-luxury">
        {/* Header */}
        <div className="mb-14 lg:mb-20">
          <SectionHeading
            badge={whyChooseUs.badge}
            headline={whyChooseUs.headline}
            subheadline={whyChooseUs.subheadline}
            align="center"
          />
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {whyChooseUs.reasons.map((reason, i) => {
            const Icon = iconMap[reason.icon] || Shield;
            return (
              <motion.div
                key={reason.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="group glass-card rounded-xl2 p-7 hover:border-gold-500/25 transition-all duration-300 hover:shadow-gold"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-5 group-hover:bg-gold-500/20 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-gold-500" />
                </div>

                {/* Number */}
                <p className="font-display text-gold-500/30 text-5xl font-semibold mb-3 leading-none">
                  {String(i + 1).padStart(2, '0')}
                </p>

                <h3 className="font-sans text-white font-semibold text-lg mb-3 group-hover:text-gold-400 transition-colors duration-200">
                  {reason.title}
                </h3>

                <div className="h-px w-8 bg-gold-500/30 mb-4" />

                <p className="font-sans text-white/40 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div>
          <div className="text-center mb-10">
            <p className="font-sans text-gold-500 text-xs tracking-[0.35em] uppercase mb-2">
              Client Stories
            </p>
            <h3 className="font-display text-white text-display-sm font-semibold">
              What Our Clients Say
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.slice(0, 2).map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="glass-card rounded-xl2 p-7 hover:border-gold-500/20 transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-500 fill-gold-500" />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-sans text-white/60 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>
                  <div>
                    <p className="font-sans text-white font-semibold text-sm">{testimonial.name}</p>
                    <p className="font-sans text-gold-500/70 text-xs">{testimonial.location}</p>
                    <p className="font-sans text-white/30 text-xs mt-0.5">{testimonial.property}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}