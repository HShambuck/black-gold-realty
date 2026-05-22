'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bed, Bath, Maximize, MapPin, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/formatters';
import clsx from 'clsx';

// WhatsApp SVG — inline so no extra dependency
function WAIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

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
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={clsx(
        'property-card group relative overflow-hidden flex flex-col',
        'bg-obsidian-900 border border-white/5',
        'rounded-xl shadow-[0_4px_40px_rgba(0,0,0,0.4)]',
        'transition-all duration-500',
        'hover:border-gold-500/20 hover:-translate-y-1 hover:shadow-[0_12px_60px_rgba(0,0,0,0.6)]',
        variant === 'featured' && 'ring-1 ring-gold-500/10'
      )}
    >
      {/* ── IMAGE ── */}
      <Link href={`/listings/${slug}`} className="block relative overflow-hidden flex-shrink-0" style={{ aspectRatio: '4/3' }}>
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt || title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-obsidian-800 flex items-center justify-center">
            <span className="text-white/20 text-xs font-sans">No image available</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Status badge */}
        <div className="absolute top-3.5 left-3.5">
          <span
            className={clsx(
              'font-sans text-[0.6rem] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full',
              status === 'For Sale'
                ? 'text-obsidian-950'
                : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
            )}
            style={status === 'For Sale'
              ? { background: 'linear-gradient(135deg, #C9A84C, #E8D48B)' }
              : {}
            }
          >
            {status}
          </span>
        </div>

        {/* Tags — top right, max 2 */}
        {tags?.length > 0 && (
          <div className="absolute top-3.5 right-3.5 flex flex-col gap-1.5 items-end">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="font-sans text-[0.6rem] text-white/70 bg-obsidian-950/70 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10 whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price overlay — bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-6" style={{ paddingLeft: '0.875rem', paddingRight: '0.875rem' }}>
          <p
            className="font-display text-gold-500 text-xl md:text-2xl font-semibold leading-none"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {priceLabel}
          </p>
        </div>
      </Link>

      {/* ── CONTENT ── */}
      <div className="flex flex-col flex-1 py-5 md:py-6" style={{ paddingLeft: '0.875rem', paddingRight: '0.875rem' }}>
        {/* Location */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <MapPin className="w-3 h-3 text-gold-500/60 flex-shrink-0" />
          <p className="font-sans text-white/35 text-[0.7rem] tracking-wide truncate">{subtitle}</p>
        </div>

        {/* Title */}
        <Link href={`/listings/${slug}`} className="mb-4">
          <h3
            className="font-display text-white text-lg md:text-xl font-semibold group-hover:text-gold-400 transition-colors duration-200 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {title}
          </h3>
        </Link>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-4" />

        {/* Specs */}
        <div className="mb-5">
          {property.type !== 'land' ? (
            <div className="flex items-center gap-5 flex-wrap">
              {specs.bedrooms > 0 && (
                <div className="flex items-center gap-1.5">
                  <Bed className="w-3.5 h-3.5 text-gold-500/50 flex-shrink-0" />
                  <span className="font-sans text-white/40 text-xs">{specs.bedrooms} Beds</span>
                </div>
              )}
              {specs.bathrooms > 0 && (
                <div className="flex items-center gap-1.5">
                  <Bath className="w-3.5 h-3.5 text-gold-500/50 flex-shrink-0" />
                  <span className="font-sans text-white/40 text-xs">{specs.bathrooms} Baths</span>
                </div>
              )}
              {specs.size > 0 && (
                <div className="flex items-center gap-1.5">
                  <Maximize className="w-3.5 h-3.5 text-gold-500/50 flex-shrink-0" />
                  <span className="font-sans text-white/40 text-xs">
                    {specs.size.toLocaleString()} {specs.sizeUnit}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Maximize className="w-3.5 h-3.5 text-gold-500/50 flex-shrink-0" />
              <span className="font-sans text-white/40 text-xs">
                {specs.size.toLocaleString()} {specs.sizeUnit} · Land
              </span>
            </div>
          )}
        </div>

        {/* CTA row — pushed to bottom of card */}
        <div className="flex items-center gap-2.5 mt-auto">
          <Link
            href={`/listings/${slug}`}
            className="flex-1 text-center font-sans text-[0.65rem] tracking-widest uppercase text-obsidian-950 py-2.5 px-4 rounded-md font-semibold transition-all duration-200 hover:brightness-110 cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #E8D48B 50%, #C9A84C 100%)' }}
          >
            View Details
          </Link>
          {/* WhatsApp — 44px touch target */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enquire on WhatsApp"
            className="w-11 h-11 flex items-center justify-center rounded-md border border-green-500/20 bg-green-500/8 hover:bg-green-500 text-green-400 hover:text-white transition-all duration-200 flex-shrink-0 cursor-pointer"
          >
            <WAIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}