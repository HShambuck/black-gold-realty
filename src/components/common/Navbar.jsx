'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { useUI } from '@/context/UIContext';
import { siteContent } from '@/data/siteContent';
import GoldButton from './GoldButton';
import clsx from 'clsx';

const navLinks = [
  { label: 'Home',       href: '/'         },
  { label: 'Properties', href: '/listings' },
  { label: 'About',      href: '/about'    },
  { label: 'Contact',    href: '/contact'  },
];

export default function Navbar() {
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu, openModal } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Detect scroll for navbar background change
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [pathname]);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-obsidian-950/95 backdrop-blur-lg border-b border-gold-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        )}
      >
        {/* Top accent bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-60" />

        <div className="container-luxury">
          <div className="flex items-center justify-between h-20 lg:h-24">

            {/* LOGO */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              onClick={closeMobileMenu}
            >
              <div className="flex flex-col">
                <span
                  className="font-display text-gold-500 text-xl lg:text-2xl font-semibold tracking-wider leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Black Gold
                </span>
                <span
                  className="font-sans text-white/60 text-[0.6rem] tracking-[0.4em] uppercase"
                >
                  Realty Group
                </span>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'font-sans text-sm tracking-widest uppercase transition-colors duration-200 relative group',
                    isActive(link.href)
                      ? 'text-gold-500'
                      : 'text-white/70 hover:text-white'
                  )}
                >
                  {link.label}
                  {/* Animated underline */}
                  <span
                    className={clsx(
                      'absolute -bottom-1 left-0 h-px bg-gold-500 transition-all duration-300',
                      isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                    )}
                  />
                </Link>
              ))}
            </nav>

            {/* DESKTOP CTAs */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Phone quick link */}
              <a
                href={`tel:${siteContent.brand.phone}`}
                className="flex items-center gap-2 text-white/50 hover:text-gold-500 transition-colors duration-200 text-sm font-sans"
              >
                <Phone className="w-4 h-4" />
                <span className="tracking-wide">{siteContent.brand.phone}</span>
              </a>

              <div className="h-4 w-px bg-white/10" />

              <GoldButton
                onClick={() => openModal()}
                size="sm"
              >
                Book Consultation
              </GoldButton>
            </div>

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              className="lg:hidden flex items-center justify-center w-10 h-10 text-white/70 hover:text-gold-500 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-obsidian-950/98 backdrop-blur-xl flex flex-col"
          >
            {/* Gold top border */}
            <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

            {/* Spacer for header */}
            <div className="h-20" />

            <div className="flex-1 flex flex-col px-6 py-12">
              {/* Nav Links */}
              <nav className="flex flex-col gap-8 mb-12">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={clsx(
                        'font-display text-4xl font-medium tracking-wide transition-colors duration-200',
                        isActive(link.href) ? 'text-gold-500' : 'text-white/80 hover:text-gold-400'
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTAs */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-4 mt-auto"
              >
                <GoldButton onClick={() => { openModal(); closeMobileMenu(); }} size="lg" fullWidth>
                  Book a Consultation
                </GoldButton>
                <a
                  href={`tel:${siteContent.brand.phone}`}
                  className="flex items-center justify-center gap-2 text-white/50 hover:text-gold-500 transition-colors text-sm font-sans tracking-widest uppercase py-3"
                >
                  <Phone className="w-4 h-4" />
                  {siteContent.brand.phone}
                </a>
              </motion.div>
            </div>

            {/* Bottom brand name */}
            <div className="px-6 pb-8 text-white/10 text-xs font-sans tracking-widest uppercase text-center">
              © {new Date().getFullYear()} Black Gold Realty Group
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}