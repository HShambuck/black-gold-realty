'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { siteContent } from '@/data/siteContent';
import GoldButton from '@/components/common/GoldButton';
import { useUI } from '@/context/UIContext';
import { getWhatsAppLink } from '@/lib/formatters';

const { ctaSection, brand } = siteContent;

export default function CTASection() {
  const { openModal } = useUI();

  const whatsappUrl = getWhatsAppLink(
    brand.whatsapp,
    "Hello! I'm interested in buying property with Black Gold Realty Group."
  );

  return (
    <section className="relative py-24 md:py-28 lg:py-36 overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={ctaSection.backgroundImage}
          alt="Luxury property background"
          fill
          className="object-cover"
          sizes="100vw"
          quality={80}
          priority={false}
        />
        <div className="absolute inset-0 bg-obsidian-950/82" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950/96 via-obsidian-950/70 to-obsidian-950/30" />
      </div>

      {/* Gold corner accents — hidden on very small screens */}
      <div className="hidden sm:block absolute top-0 left-0 w-16 md:w-24 h-16 md:h-24 border-t-2 border-l-2 border-gold-500/25 pointer-events-none" />
      <div className="hidden sm:block absolute bottom-0 right-0 w-16 md:w-24 h-16 md:h-24 border-b-2 border-r-2 border-gold-500/25 pointer-events-none" />

      <div className="relative z-10 container-luxury">
        <div className="max-w-xl lg:max-w-2xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-5 md:mb-6"
          >
            <div className="h-px w-8 bg-gold-500 flex-shrink-0" />
            <span className="font-sans text-gold-500 text-[0.65rem] tracking-[0.4em] uppercase">
              {ctaSection.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-white font-semibold leading-[1.05] mb-4 md:mb-5"
            style={{
              fontSize:   'clamp(2.2rem, 5vw, 4.5rem)',
              fontFamily: "'Cormorant Garamond', serif",
              whiteSpace: 'pre-line',
            }}
          >
            {ctaSection.headline}
          </motion.h2>

          {/* Gold line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-px w-16 mb-5 md:mb-6 origin-left"
            style={{ background: 'linear-gradient(90deg, #C9A84C, transparent)' }}
          />

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-sans text-white/48 text-sm md:text-base lg:text-lg leading-relaxed mb-8 md:mb-10 max-w-lg"
          >
            {ctaSection.subheadline}
          </motion.p>

          {/* CTAs — stack on mobile, row on sm+ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 md:mb-8"
          >
            <GoldButton
              href={ctaSection.cta.primary.href}
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              fullWidth
              className="sm:w-auto"
            >
              {ctaSection.cta.primary.label}
            </GoldButton>
            <GoldButton
              onClick={openModal}
              variant="outline"
              size="lg"
              fullWidth
              className="sm:w-auto"
            >
              {ctaSection.cta.secondary.label}
            </GoldButton>
          </motion.div>

          {/* WhatsApp link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex items-center gap-2.5"
          >
            <span className="font-sans text-white/25 text-xs md:text-sm">Or chat directly on</span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-green-400 hover:text-green-300 font-sans text-xs md:text-sm font-medium transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}