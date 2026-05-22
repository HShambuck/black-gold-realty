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
    <section className="relative py-28 lg:py-36 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={ctaSection.backgroundImage}
          alt="Luxury property background"
          fill
          className="object-cover"
          sizes="100vw"
          quality={80}
        />
        {/* Multi-layer overlay for luxury feel */}
        <div className="absolute inset-0 bg-obsidian-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950/95 via-obsidian-950/70 to-obsidian-950/40" />
      </div>

      {/* Gold corner accents */}
      <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-gold-500/30" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-gold-500/30" />

      <div className="relative z-10 container-luxury">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-gold-500" />
            <span className="font-sans text-gold-500 text-xs tracking-[0.4em] uppercase">
              {ctaSection.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-white font-semibold leading-tight mb-4"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
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
            className="h-px w-16 bg-gold-500/50 mb-6 origin-left"
          />

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-sans text-white/50 text-base md:text-lg leading-relaxed mb-10 max-w-lg"
          >
            {ctaSection.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <GoldButton
              href={ctaSection.cta.primary.href}
              size="xl"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {ctaSection.cta.primary.label}
            </GoldButton>
            <GoldButton
              onClick={openModal}
              variant="outline"
              size="xl"
            >
              {ctaSection.cta.secondary.label}
            </GoldButton>
          </motion.div>

          {/* WhatsApp link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex items-center gap-3"
          >
            <span className="font-sans text-white/30 text-sm">Or chat directly on</span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-400 hover:text-green-300 font-sans text-sm font-medium transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}