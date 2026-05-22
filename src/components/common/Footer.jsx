'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FaInstagram, FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { siteContent } from '@/data/siteContent';
import { useUI } from '@/context/UIContext';
import GoldButton from './GoldButton';

const { footer, brand } = siteContent;

const socialIcons = {
  instagram: FaInstagram,
  facebook:  FaFacebook,
  linkedin:  FaLinkedin,
  youtube:   FaYoutube,
};

export default function Footer() {
  const { openModal } = useUI();

  return (
    <footer className="bg-obsidian-950 border-t border-gold-500/10">

      {/* ── TOP CTA STRIP ──────────────────────────────────── */}
      <div
        className="border-b border-gold-500/10 py-10 md:py-12"
        style={{ background: 'linear-gradient(to right, #111111, #0a0a0a, #111111)' }}
      >
        <div className="container-luxury">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex-1 min-w-0">
              <p
                className="font-display text-white text-2xl sm:text-3xl font-light italic leading-snug"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '0.01em' }}
              >
                Ready to find your dream property?
              </p>
              <p className="font-sans text-white/35 text-[0.65rem] tracking-widest uppercase mt-2">
                Let our luxury specialists guide your journey
              </p>
            </div>
            {/* Button never wraps or gets squished */}
            <div className="flex-shrink-0 w-full sm:w-auto">
              <GoldButton onClick={openModal} size="lg" fullWidth className="sm:w-auto">
                Book a Consultation
              </GoldButton>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN FOOTER ────────────────────────────────────── */}
      <div className="container-luxury py-12 md:py-16 lg:py-20">

        {/*
          Grid strategy:
          mobile  (< sm):  single column stack
          sm–md:           2 columns: brand spans full, then 3 cols split 2+1
          lg+:             4 equal columns
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">

          {/* ── Brand Column ─────── spans full width on sm ── */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <div className="mb-5">
              <p
                className="font-display text-gold-500 text-2xl font-semibold tracking-wider leading-none"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Black Gold
              </p>
              <p className="font-sans text-white/35 text-[0.56rem] tracking-[0.42em] uppercase mt-1">
                Realty Group
              </p>
            </div>

            <div
              className="h-px w-10 mb-5"
              style={{ background: 'linear-gradient(90deg, #C9A84C, transparent)' }}
            />

            <p className="font-sans text-white/35 text-sm leading-relaxed mb-6 max-w-xs">
              {footer.description}
            </p>

            {/* Social icons — 44px min touch target on mobile */}
            <div className="flex items-center gap-2 sm:gap-3">
              {Object.entries(brand.socialMedia).map(([key, href]) => {
                const Icon = socialIcons[key];
                if (!Icon) return null;
                return (
                  <motion.a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 sm:w-9 sm:h-9 rounded-full border border-gold-500/15 flex items-center justify-center text-white/30 hover:text-gold-500 hover:border-gold-500/50 transition-all duration-200 cursor-pointer"
                    aria-label={key}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* ── Quick Links ──────────────────────────────────── */}
          <div>
            <h4 className="font-sans text-[0.6rem] tracking-[0.35em] uppercase text-gold-500 mb-5 md:mb-6 font-medium">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-white/35 hover:text-gold-500 transition-colors duration-200 flex items-center gap-2.5 group py-0.5"
                  >
                    <span className="h-px w-3 bg-gold-500/25 group-hover:w-5 group-hover:bg-gold-500 transition-all duration-300 flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Property Types ───────────────────────────────── */}
          <div>
            <h4 className="font-sans text-[0.6rem] tracking-[0.35em] uppercase text-gold-500 mb-5 md:mb-6 font-medium">
              Our Properties
            </h4>
            <ul className="space-y-3">
              {footer.propertyTypes.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-white/35 hover:text-gold-500 transition-colors duration-200 flex items-center gap-2.5 group py-0.5"
                  >
                    <span className="h-px w-3 bg-gold-500/25 group-hover:w-5 group-hover:bg-gold-500 transition-all duration-300 flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ──────────────────────────────────────── */}
          <div>
            <h4 className="font-sans text-[0.6rem] tracking-[0.35em] uppercase text-gold-500 mb-5 md:mb-6 font-medium">
              Contact
            </h4>
            <ul className="space-y-3 md:space-y-4">
              <li>
                <a
                  href={`tel:${brand.phone}`}
                  className="flex items-start gap-3 text-white/35 hover:text-gold-500 transition-colors group cursor-pointer py-0.5"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold-500/50 group-hover:text-gold-500 transition-colors" />
                  <span className="font-sans text-sm">{brand.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${brand.email}`}
                  className="flex items-start gap-3 text-white/35 hover:text-gold-500 transition-colors group cursor-pointer py-0.5"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold-500/50 group-hover:text-gold-500 transition-colors" />
                  {/* Break long email on small screens */}
                  <span className="font-sans text-sm break-all">{brand.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/35 py-0.5">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold-500/50" />
                  <span className="font-sans text-sm leading-relaxed">{brand.address}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────── */}
        <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-white/5">
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
            <p className="font-sans text-white/20 text-[0.65rem] text-center sm:text-left leading-relaxed">
              {footer.copyright}
            </p>
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
              {footer.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-white/20 text-[0.65rem] hover:text-gold-500 transition-colors duration-200 whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}