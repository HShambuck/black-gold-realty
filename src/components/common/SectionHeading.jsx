'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

/**
 * SectionHeading — Reusable luxury section header.
 * badge (small uppercase label above)
 * headline (large serif heading)
 * subheadline (paragraph)
 * align: 'left' | 'center' | 'right'
 */
export default function SectionHeading({
  badge,
  headline,
  subheadline,
  align     = 'center',
  className,
  theme     = 'dark',  // 'dark' | 'light'
  headlineClassName,
}) {
  const containerAlign = {
    left:   'items-start text-left',
    center: 'items-center text-center',
    right:  'items-end text-right',
  }[align];

  const dividerAlign = {
    left:   'mr-auto',
    center: 'mx-auto',
    right:  'ml-auto',
  }[align];

  const headlineColor = theme === 'dark' ? 'text-white'          : 'text-obsidian-950';
  const subColor      = theme === 'dark' ? 'text-white/50'       : 'text-obsidian-700';
  const badgeColor    = theme === 'dark' ? 'text-gold-500'       : 'text-gold-700';

  const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.15 } },
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
      viewport={{ once: true, margin: '-80px' }}
      className={clsx('flex flex-col gap-4', containerAlign, className)}
    >
      {/* Badge */}
      {badge && (
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <span
            className={clsx(
              'font-sans text-xs tracking-[0.35em] uppercase font-medium',
              badgeColor
            )}
          >
            {badge}
          </span>
          <span className="h-px w-10 bg-gold-500 opacity-60" />
        </motion.div>
      )}

      {/* Headline */}
      {headline && (
        <motion.h2
          variants={itemVariants}
          className={clsx(
            'font-display font-semibold leading-tight',
            'text-display-md md:text-display-lg lg:text-display-xl',
            headlineColor,
            headlineClassName
          )}
          style={{ whiteSpace: 'pre-line' }}
        >
          {headline}
        </motion.h2>
      )}

      {/* Gold divider */}
      <motion.div
        variants={itemVariants}
        className={clsx('h-px bg-gold-500/30 w-16', dividerAlign)}
        style={{
          background: 'linear-gradient(90deg, #C9A84C, rgba(201,168,76,0.1))',
        }}
      />

      {/* Subheadline */}
      {subheadline && (
        <motion.p
          variants={itemVariants}
          className={clsx(
            'font-sans text-base md:text-lg leading-relaxed max-w-2xl',
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