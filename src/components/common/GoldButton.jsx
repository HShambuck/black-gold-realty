'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import clsx from 'clsx';

/**
 * GoldButton — Primary CTA button for the luxury theme.
 * Supports: href (link) or onClick (button), variant, size.
 */
export default function GoldButton({
  children,
  href,
  onClick,
  variant = 'solid',   // 'solid' | 'outline' | 'ghost'
  size    = 'md',      // 'sm' | 'md' | 'lg' | 'xl'
  className,
  disabled = false,
  type = 'button',
  fullWidth = false,
  icon,                // optional Lucide icon component
  iconPosition = 'right',
  ...props
}) {
  const baseClasses = clsx(
    'inline-flex items-center justify-center gap-2',
    'font-sans font-medium tracking-widest uppercase',
    'transition-all duration-300 ease-luxury',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-950',
    'disabled:opacity-40 disabled:cursor-not-allowed',
    fullWidth && 'w-full',
    // Size variants
    {
      'text-xs px-4 py-2.5 rounded':      size === 'sm',
      'text-xs px-6 py-3.5 rounded-md':   size === 'md',
      'text-sm px-8 py-4 rounded-md':     size === 'lg',
      'text-sm px-10 py-5 rounded-lg':    size === 'xl',
    },
    // Style variants
    {
      // Solid — filled gold
      'bg-gold-gradient text-obsidian-950 shadow-gold hover:shadow-gold-md hover:scale-[1.02] active:scale-[0.98]':
        variant === 'solid',

      // Outline — gold border
      'border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-obsidian-950 hover:shadow-gold':
        variant === 'outline',

      // Ghost — minimal
      'text-gold-500 hover:text-gold-300 hover:bg-gold-500/10':
        variant === 'ghost',
    },
    className
  );

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </>
  );

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex"
      >
        <Link href={href} className={baseClasses} {...props}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      {...props}
    >
      {content}
    </motion.button>
  );
}