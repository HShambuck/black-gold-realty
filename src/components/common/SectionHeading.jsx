'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

/**
 * SectionHeading — Reusable luxury section header.
 *
 * Props:
 *   badge           — small uppercase label above
 *   headline        — large display serif heading (supports \n line breaks)
 *   subheadline     — body paragraph below
 *   align           — 'left' | 'center' | 'right'
 *   theme           — 'dark' | 'light'
 *   headlineSize    — 'sm' | 'md' | 'lg' (default 'lg')
 *   className       — extra classes on wrapper
 *   headlineClassName — extra classes on h2
 */
export default function SectionHeading({
  badge,
  headline,
  subheadline,
  align            = 'center',
  theme            = 'dark',
  headlineSize     = 'lg',
  className,
  headlineClassName,
}) {
  const containerAlign = {
    left:   'items-start text-left',
    center: 'items-center text-center',
    right:  'items-end text-right',
  }[align] ?? 'items-center text-center';

  const dividerAlign = {
    left:   'mr-auto',
    center: 'mx-auto',
    right:  'ml-auto',
  }[align] ?? 'mx-auto';

  const headlineColor = theme === 'dark'  ? 'text-white'       : 'text-obsidian-950';
  const subColor      = theme === 'dark'  ? 'text-white/48'    : 'text-obsidian-700';
  const badgeColor    = theme === 'dark'  ? 'text-gold-500'    : 'text-gold-700';

  // Safe fluid font sizes — no custom Tailwind tokens needed
  const headlineFontSize = {
    sm: 'clamp(1.75rem, 3.5vw, 2.25rem)',
    md: 'clamp(2rem,   4.5vw, 3rem)',
    lg: 'clamp(2.25rem, 5.5vw, 3.75rem)',
  }[headlineSize] ?? 'clamp(2.25rem, 5.5vw, 3.75rem)';

  const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.14 } },
  };

  const itemVariants = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-70px' }}
      className={clsx('flex flex-col gap-3 md:gap-4', containerAlign, className)}
    >
      {/* Badge */}
      {badge && (
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <span className={clsx('font-sans text-[0.65rem] tracking-[0.35em] uppercase font-medium', badgeColor)}>
            {badge}
          </span>
          <span className="h-px w-8 bg-gold-500 opacity-50 flex-shrink-0" />
        </motion.div>
      )}

      {/* Headline */}
      {headline && (
        <motion.h2
          variants={itemVariants}
          className={clsx(
            'font-display font-semibold leading-tight',
            headlineColor,
            headlineClassName
          )}
          style={{
            fontSize:   headlineFontSize,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            whiteSpace: 'pre-line',
          }}
        >
          {headline}
        </motion.h2>
      )}

      {/* Gold divider */}
      <motion.div
        variants={itemVariants}
        className={clsx('h-px w-14', dividerAlign)}
        style={{ background: 'linear-gradient(90deg, #C9A84C, rgba(201,168,76,0.1))' }}
      />

      {/* Subheadline */}
      {subheadline && (
        <motion.p
          variants={itemVariants}
          className={clsx(
            'font-sans text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl',
            subColor,
            align === 'center' && 'mx-auto'
          )}
        >
          {subheadline}
        </motion.p>
      )}
    </motion.div>
  );
}