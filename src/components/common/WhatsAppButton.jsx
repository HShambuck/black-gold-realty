'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import { siteContent } from '@/data/siteContent';
import { getWhatsAppLink } from '@/lib/formatters';

export default function WhatsAppButton() {
  const [expanded, setExpanded] = useState(false);
  const { brand } = siteContent;

  const whatsappUrl = getWhatsAppLink(
    brand.whatsapp,
    `Hello, I'm interested in a property at ${brand.name}. Can you help me?`
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Expanded Chat Bubble */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="whatsapp-bubble"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="bg-obsidian-900 border border-gold-500/20 rounded-2xl p-4 shadow-card max-w-xs"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/5">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-sans text-white text-sm font-semibold">{brand.name}</p>
                <p className="font-sans text-green-400 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  Online — responds quickly
                </p>
              </div>
            </div>

            {/* Message bubble */}
            <div className="bg-obsidian-800 rounded-xl rounded-tl-none p-3 mb-4">
              <p className="font-sans text-white/80 text-sm leading-relaxed">
                👋 Hello! I&apos;m looking for a luxury property in Ghana. Can you help me?
              </p>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-sans text-sm font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              Start WhatsApp Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <div className="relative">
        {/* Pulse ring */}
        {!expanded && (
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
        )}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setExpanded((v) => !v)}
          aria-label="Open WhatsApp chat"
          className="relative w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-[0_4px_20px_rgba(34,197,94,0.4)] transition-colors duration-200"
        >
          {expanded ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-7 h-7 text-white" />
          )}
        </motion.button>
      </div>
    </div>
  );
}