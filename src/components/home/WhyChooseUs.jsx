'use client';

import { motion } from 'framer-motion';
import { Shield, Globe, Award, Key, TrendingUp, Phone, Star } from 'lucide-react';
import Image from 'next/image';
import { siteContent } from '@/data/siteContent';
import { testimonials } from '@/data/testimonials';
import SectionHeading from '@/components/common/SectionHeading';

const { whyChooseUs } = siteContent;

const iconMap = { Shield, Globe, Award, Key, TrendingUp, Phone };

const cardVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.09, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-24 lg:py-32 bg-obsidian-900">
      <div className="container-luxury">

        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <SectionHeading
            badge={whyChooseUs.badge}
            headline={whyChooseUs.headline}
            subheadline={whyChooseUs.subheadline}
            align="center"
          />
        </div>

        {/* Reasons Grid
            mobile: 1 col
            sm:     2 col
            lg:     3 col
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-16 md:mb-20">
          {whyChooseUs.reasons.map((reason, i) => {
            const Icon = iconMap[reason.icon] || Shield;
            return (
              <motion.div
                key={reason.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="group glass-card rounded-xl p-7 md:p-8 hover:border-gold-500/25 transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.15)]"
              >
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/15 flex items-center justify-center mb-4 md:mb-5 group-hover:bg-gold-500/20 transition-colors duration-300 flex-shrink-0">
                  <Icon className="w-5 h-5 text-gold-500" />
                </div>

                {/* Number */}
                <p
                  className="text-gold-500/25 text-4xl md:text-5xl font-semibold mb-2 md:mb-3 leading-none"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {String(i + 1).padStart(2, '0')}
                </p>

                <h3 className="font-sans text-white font-semibold text-base md:text-lg mb-3 group-hover:text-gold-400 transition-colors duration-200">
                  {reason.title}
                </h3>

                <div className="h-px w-8 bg-gold-500/25 mb-4 md:mb-5" />

                <p className="font-sans text-white/60 text-sm leading-loose">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div>
          {/* Testimonials header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-10"
          >
            <p className="font-sans text-gold-500 text-[0.65rem] tracking-[0.35em] uppercase mb-3">
              Client Stories
            </p>
            <h3
              className="text-white font-semibold text-2xl md:text-3xl lg:text-4xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              What Our Clients Say
            </h3>
          </motion.div>

          {/* Testimonial cards — 1 col mobile, 2 col sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {testimonials.slice(0, 2).map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="glass-card rounded-xl p-7 md:p-8 hover:border-gold-500/20 transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-sans text-white/65 text-sm leading-loose mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  {/* Image with fallback initial */}
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-obsidian-800 border border-gold-500/15">
                    {testimonial.image ? (
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span
                          className="text-gold-500 text-sm font-semibold"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {testimonial.name?.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-sans text-white font-semibold text-sm truncate">{testimonial.name}</p>
                    <p className="font-sans text-gold-500/65 text-xs truncate">{testimonial.location}</p>
                    {testimonial.property && (
                      <p className="font-sans text-white/25 text-[0.65rem] mt-0.5 truncate">{testimonial.property}</p>
                    )}
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