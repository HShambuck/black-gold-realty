'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
} from 'react-icons/fa';
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

      {/* TOP CTA STRIP */}
      <div className="bg-gradient-to-r from-obsidian-900 via-obsidian-950 to-obsidian-900 border-b border-gold-500/10 py-10">
        <div className="container-luxury flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display text-white text-2xl md:text-3xl font-semibold">
              Ready to find your dream property?
            </p>
            <p className="text-white/40 font-sans text-sm mt-1">
              Let our luxury specialists guide your journey.
            </p>
          </div>
          <GoldButton onClick={openModal} size="lg">
            Book a Consultation
          </GoldButton>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="container-luxury py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <p className="font-display text-gold-500 text-2xl font-semibold tracking-wider">
                Black Gold
              </p>
              <p className="font-sans text-white/40 text-xs tracking-[0.4em] uppercase">
                Realty Group
              </p>
            </div>
            <div className="h-px w-12 bg-gold-500/40 mb-5" />
            <p className="font-sans text-white/40 text-sm leading-relaxed mb-6">
              {footer.description}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
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
                    className="w-9 h-9 rounded-full border border-gold-500/20 flex items-center justify-center text-white/40 hover:text-gold-500 hover:border-gold-500/60 transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.3em] uppercase text-gold-500 mb-6 font-medium">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-white/40 hover:text-gold-500 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="h-px w-3 bg-gold-500/30 group-hover:w-5 group-hover:bg-gold-500 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.3em] uppercase text-gold-500 mb-6 font-medium">
              Our Properties
            </h4>
            <ul className="space-y-3">
              {footer.propertyTypes.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-white/40 hover:text-gold-500 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="h-px w-3 bg-gold-500/30 group-hover:w-5 group-hover:bg-gold-500 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.3em] uppercase text-gold-500 mb-6 font-medium">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${brand.phone}`}
                  className="flex items-start gap-3 text-white/40 hover:text-gold-500 transition-colors group"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold-500/60 group-hover:text-gold-500" />
                  <span className="font-sans text-sm">{brand.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${brand.email}`}
                  className="flex items-start gap-3 text-white/40 hover:text-gold-500 transition-colors group"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold-500/60 group-hover:text-gold-500" />
                  <span className="font-sans text-sm">{brand.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/40">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold-500/60" />
                  <span className="font-sans text-sm leading-relaxed">{brand.address}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-white/25 text-xs text-center md:text-left">
            {footer.copyright}
          </p>
          <div className="flex items-center gap-6">
            {footer.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-white/25 text-xs hover:text-gold-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}