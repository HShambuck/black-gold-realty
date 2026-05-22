'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import clsx from 'clsx';

/**
 * GoldButton — Primary CTA for Black Gold Realty Group.
 * Variants: 'solid' | 'outline' | 'ghost'
 * Sizes:    'sm' | 'md' | 'lg' | 'xl'
 */
export default function GoldButton({
  children,
  href,
  onClick,
  variant      = 'solid',
  size         = 'md',
  className,
  disabled     = false,
  type         = 'button',
  fullWidth    = false,
  icon,
  iconPosition = 'right',
  ...props
}) {
  const baseClasses = clsx(
    // Layout & base
    'inline-flex items-center justify-center gap-2',
    'cursor-pointer select-none',
    // Typography
    'font-sans font-medium tracking-widest uppercase',
    // Transitions
    'transition-all duration-300',
    // Focus ring
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-950',
    // Disabled
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
    fullWidth && 'w-full',

    // ── Size variants ──────────────────────────────
    size === 'sm' && 'text-[0.65rem] px-5 py-2.5 rounded',
    size === 'md' && 'text-[0.65rem] px-6 py-3.5 rounded-md',
    size === 'lg' && 'text-xs px-8 py-4 rounded-md',
    size === 'xl' && 'text-xs px-10 py-5 rounded-lg',

    // ── Style variants ─────────────────────────────
    // Solid — gold fill, dark text
    variant === 'solid' && [
      'text-obsidian-950',
      'shadow-[0_0_20px_rgba(201,168,76,0.2)]',
      'hover:shadow-[0_4px_30px_rgba(201,168,76,0.35)]',
      'hover:brightness-110',
      'active:scale-[0.98]',
    ],

    // Outline — gold border, no fill → fills on hover
    variant === 'outline' && [
      'border border-gold-500 text-gold-500',
      'hover:bg-gold-500 hover:text-obsidian-950',
      'hover:shadow-[0_0_20px_rgba(201,168,76,0.2)]',
    ],

    // Ghost — text only
    variant === 'ghost' && [
      'text-gold-500',
      'hover:text-gold-300 hover:bg-gold-500/10',
    ],

    className
  );

  // Solid variant background applied via inline style so the gradient
  // always works regardless of Tailwind v3/v4 config differences.
  const solidStyle = variant === 'solid'
    ? { background: 'linear-gradient(135deg, #C9A84C 0%, #E8D48B 50%, #C9A84C 100%)' }
    : {};

  const content = (
    <>
      {icon && iconPosition === 'left'  && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-flex">
        <Link href={href} className={baseClasses} style={solidStyle} {...props}>
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
      style={solidStyle}
      {...props}
    >
      {content}
    </motion.button>
  );
}