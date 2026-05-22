'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';
import { siteContent } from '@/data/siteContent';
import { getWhatsAppLink } from '@/lib/formatters';

// WhatsApp SVG icon — avoids react-icons dependency for this one component
function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const [expanded, setExpanded] = useState(false);
  const { brand } = siteContent;

  const whatsappUrl = getWhatsAppLink(
    brand.whatsapp,
    `Hello, I came across Black Gold Realty Group and I'd love to learn more about available properties. Can you assist me?`
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* ── Popup card ─────────────────────────────────── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="wa-popup"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-72 rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.6)] border border-gold-500/15"
            style={{ background: '#111111' }}
          >

            {/* Gold top accent */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-70" />

            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #C9A84C, #E8D48B)' }}
              >
                <WhatsAppIcon className="w-5 h-5 text-[#0a0a0a]" />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-white text-sm font-semibold truncate"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '0.01em' }}
                >
                  {brand.name}
                </p>
                <p className="text-green-400 text-xs flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                  Online · responds quickly
                </p>
              </div>
            </div>

            {/* Message bubble — brand speaks TO the visitor */}
            <div className="px-4 py-4">
              <div
                className="rounded-xl rounded-tl-none px-3.5 py-3 text-sm leading-relaxed"
                style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.12)' }}
              >
                <p
                  className="text-white/75"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem' }}
                >
                  Welcome to <span className="text-[#C9A84C] font-medium">Black Gold Realty Group</span>.
                </p>
                <p
                  className="text-white/60 mt-1"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem' }}
                >
                  Looking for a luxury property in Ghana? We&apos;d love to help you find the perfect match.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="px-4 pb-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-[#0a0a0a] text-xs font-semibold tracking-widest uppercase transition-all duration-200 hover:brightness-110"
                style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #E8D48B 50%, #C9A84C 100%)' }}
              >
                <WhatsAppIcon className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB button ─────────────────────────────────── */}
      <div className="relative">
        {/* Pulse ring — gold instead of green to stay on-brand */}
        {!expanded && (
          <span className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ background: '#C9A84C' }} />
        )}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setExpanded((v) => !v)}
          aria-label="Open WhatsApp chat"
          className="relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_24px_rgba(201,168,76,0.3)] transition-all duration-200 hover:shadow-[0_4px_32px_rgba(201,168,76,0.5)]"
          style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #E8D48B 50%, #C9A84C 100%)' }}
        >
          <AnimatePresence mode="wait">
            {expanded ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0,   opacity: 1 }}
                exit={{   rotate:  90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-5 h-5 text-[#0a0a0a]" />
              </motion.span>
            ) : (
              <motion.span
                key="icon"
                initial={{ rotate: 90,  opacity: 0 }}
                animate={{ rotate: 0,   opacity: 1 }}
                exit={{   rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <WhatsAppIcon className="w-6 h-6 text-[#0a0a0a]" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}