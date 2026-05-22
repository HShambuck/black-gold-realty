'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
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

// Navbar height as a shared constant so the mobile menu spacer always matches
const NAV_H = 'h-16 md:h-20 lg:h-24';
const NAV_H_SPACER = 'h-16 md:h-20 lg:h-24'; // identical — used inside mobile menu

export default function Navbar() {
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu, openModal } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { closeMobileMenu(); }, [pathname]);

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

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
        {/* Top gold accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-60" />

        <div className="container-luxury">
          <div className={clsx('flex items-center justify-between', NAV_H)}>

            {/* ── LOGO ──────────────────────────────────────── */}
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 group flex-shrink-0"
            >
              <div className="flex flex-col leading-none">
                <span className="font-display text-gold-500 text-lg md:text-xl lg:text-2xl font-semibold tracking-wider">
                  Black Gold
                </span>
                <span className="font-sans text-white/50 text-[0.52rem] md:text-[0.58rem] tracking-[0.38em] md:tracking-[0.42em] uppercase mt-0.5">
                  Realty Group
                </span>
              </div>
            </Link>

            {/* ── DESKTOP NAV (lg+) ─────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'relative font-sans text-[0.68rem] tracking-[0.16em] uppercase transition-colors duration-200 group pb-0.5 whitespace-nowrap',
                    isActive(link.href)
                      ? 'text-gold-500'
                      : 'text-white/60 hover:text-white'
                  )}
                >
                  {link.label}
                  <span
                    className={clsx(
                      'absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-300',
                      isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                    )}
                  />
                </Link>
              ))}
            </nav>

            {/* ── TABLET NAV (md only) ──────────────────────── */}
            {/* On tablets show a condensed nav without the phone number */}
            <nav className="hidden md:flex lg:hidden items-center gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'relative font-sans text-[0.65rem] tracking-[0.14em] uppercase transition-colors duration-200 group pb-0.5 whitespace-nowrap',
                    isActive(link.href)
                      ? 'text-gold-500'
                      : 'text-white/60 hover:text-white'
                  )}
                >
                  {link.label}
                  <span
                    className={clsx(
                      'absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-300',
                      isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                    )}
                  />
                </Link>
              ))}
            </nav>

            {/* ── DESKTOP CTAs (lg+) ────────────────────────── */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-shrink-0">
              <a
                href={`tel:${siteContent.brand.phone}`}
                className="flex items-center gap-1.5 text-white/40 hover:text-gold-500 transition-colors duration-200 text-xs font-sans tracking-wide cursor-pointer whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{siteContent.brand.phone}</span>
              </a>
              <div className="h-4 w-px bg-white/10" />
              <GoldButton onClick={openModal} size="sm">
                Book Consultation
              </GoldButton>
            </div>

            {/* ── TABLET CTA (md only) ──────────────────────── */}
            <div className="hidden md:flex lg:hidden items-center flex-shrink-0">
              <GoldButton onClick={openModal} size="sm">
                Book Consultation
              </GoldButton>
            </div>

            {/* ── MOBILE TOGGLE (below md) ──────────────────── */}
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              className="md:hidden flex items-center justify-center w-10 h-10 text-white/60 hover:text-gold-500 transition-colors cursor-pointer flex-shrink-0"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── MOBILE MENU (below md) ────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 bg-obsidian-950/98 backdrop-blur-xl flex flex-col md:hidden"
          >
            {/* Gold top accent */}
            <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

            {/* Spacer matches navbar height exactly */}
            <div className={NAV_H_SPACER} />

            <div className="flex-1 flex flex-col px-6 sm:px-10 py-10 overflow-y-auto">

              {/* Nav links */}
              <nav className="flex flex-col gap-6 sm:gap-8 mb-10">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.35 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={clsx(
                        'font-display text-3xl sm:text-4xl font-medium tracking-wide transition-colors duration-200 block',
                        isActive(link.href)
                          ? 'text-gold-500'
                          : 'text-white/80 hover:text-gold-400'
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.32, duration: 0.4 }}
                className="h-px bg-gradient-to-r from-gold-500/30 to-transparent mb-10 origin-left"
              />

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 }}
                className="flex flex-col gap-3 mt-auto"
              >
                <GoldButton
                  onClick={() => { openModal(); closeMobileMenu(); }}
                  size="lg"
                  fullWidth
                >
                  Book a Consultation
                </GoldButton>

                <a
                  href={`tel:${siteContent.brand.phone}`}
                  className="flex items-center justify-center gap-2 text-white/40 hover:text-gold-500 transition-colors text-[0.65rem] font-sans tracking-widest uppercase py-3 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {siteContent.brand.phone}
                </a>
              </motion.div>
            </div>

            {/* Bottom copyright */}
            <div className="px-6 pb-6 text-white/10 text-[0.58rem] font-sans tracking-widest uppercase text-center">
              © {new Date().getFullYear()} Black Gold Realty Group
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}