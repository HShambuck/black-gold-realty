'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bed, Bath, Maximize, MapPin, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/formatters';
import clsx from 'clsx';

/**
 * PropertyCard — Luxury property listing card.
 * Used in FeaturedListings and PropertyGrid.
 */
export default function PropertyCard({ property, variant = 'default', index = 0 }) {
  if (!property) return null;

  const primaryImage = property.images?.find((img) => img.isPrimary) || property.images?.[0];
  const { slug, title, subtitle, priceLabel, status, specs, location, tags, agent } = property;

  const whatsappUrl = agent
    ? getWhatsAppLink(
        agent.whatsapp,
        `Hello, I'm interested in ${title} (${location.area}, ${location.city}). Can you provide more details?`
      )
    : '#';

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={clsx(
        'property-card group relative overflow-hidden',
        'bg-obsidian-900 border border-white/5',
        'rounded-xl2 shadow-card hover:shadow-card-hover',
        'transition-all duration-500 ease-luxury',
        'hover:border-gold-500/20 hover:-translate-y-1',
        variant === 'featured' && 'ring-1 ring-gold-500/10'
      )}
    >
      {/* IMAGE SECTION */}
      <Link href={`/listings/${slug}`} className="block relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt || title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover property-card-image transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-obsidian-800 flex items-center justify-center">
            <span className="text-white/20 text-sm font-sans">No image</span>
          </div>
        )}

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300" />

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span
            className={clsx(
              'font-sans text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full',
              status === 'For Sale'
                ? 'bg-gold-500 text-obsidian-950'
                : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
            )}
          >
            {status}
          </span>
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="absolute top-4 right-4 flex flex-col gap-1.5 items-end">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="font-sans text-xs text-white/80 bg-obsidian-950/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="font-display text-gold-500 text-2xl font-semibold">
            {priceLabel}
          </p>
        </div>
      </Link>

      {/* CONTENT SECTION */}
      <div className="p-5">
        {/* Location */}
        <div className="flex items-center gap-1.5 mb-2">
          <MapPin className="w-3.5 h-3.5 text-gold-500/70 flex-shrink-0" />
          <p className="font-sans text-white/40 text-xs tracking-wide">{subtitle}</p>
        </div>

        {/* Title */}
        <Link href={`/listings/${slug}`}>
          <h3 className="font-display text-white text-xl font-semibold mb-4 group-hover:text-gold-400 transition-colors duration-200 leading-tight">
            {title}
          </h3>
        </Link>

        {/* Separator */}
        <div className="h-px bg-white/5 mb-4" />

        {/* Property Specs */}
        {property.type !== 'land' && (
          <div className="flex items-center gap-5 mb-5">
            {specs.bedrooms > 0 && (
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-gold-500/60" />
                <span className="font-sans text-white/50 text-xs">{specs.bedrooms} Beds</span>
              </div>
            )}
            {specs.bathrooms > 0 && (
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-gold-500/60" />
                <span className="font-sans text-white/50 text-xs">{specs.bathrooms} Baths</span>
              </div>
            )}
            {specs.size > 0 && (
              <div className="flex items-center gap-1.5">
                <Maximize className="w-4 h-4 text-gold-500/60" />
                <span className="font-sans text-white/50 text-xs">
                  {specs.size.toLocaleString()} {specs.sizeUnit}
                </span>
              </div>
            )}
          </div>
        )}
        {property.type === 'land' && (
          <div className="flex items-center gap-1.5 mb-5">
            <Maximize className="w-4 h-4 text-gold-500/60" />
            <span className="font-sans text-white/50 text-xs">
              {specs.size.toLocaleString()} {specs.sizeUnit} — Land
            </span>
          </div>
        )}

        {/* CTA Row */}
        <div className="flex items-center gap-3">
          <Link
            href={`/listings/${slug}`}
            className="flex-1 text-center font-sans text-xs tracking-widest uppercase text-obsidian-950 bg-gold-gradient py-2.5 px-4 rounded-md hover:shadow-gold-md transition-all duration-300 font-semibold"
          >
            View Details
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center bg-green-500/10 border border-green-500/20 rounded-md hover:bg-green-500 hover:border-green-500 text-green-400 hover:text-white transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}