'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export default function ImageGallery({ images = [], title = '' }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex]   = useState(0);

  if (!images || images.length === 0) return null;

  const openLightbox = (index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prev = () => setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Escape')     closeLightbox();
  };

  const primaryImage = images[0];
  const secondaryImages = images.slice(1, 5);

  return (
    <>
      {/* GALLERY GRID */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-xl overflow-hidden h-[480px] lg:h-[560px]">
        {/* Primary large image */}
        <div
          className="col-span-4 lg:col-span-2 row-span-2 relative cursor-pointer group overflow-hidden"
          onClick={() => openLightbox(0)}
        >
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt || title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-obsidian-950/0 group-hover:bg-obsidian-950/20 transition-colors duration-300 flex items-center justify-center">
            <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
          </div>
        </div>

        {/* Secondary images */}
        {secondaryImages.map((img, i) => (
          <div
            key={i}
            className="col-span-2 lg:col-span-1 relative cursor-pointer group overflow-hidden"
            onClick={() => openLightbox(i + 1)}
          >
            <Image
              src={img.url}
              alt={img.alt || `${title} — image ${i + 2}`}
              fill
              sizes="25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Last image overlay with count */}
            {i === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-obsidian-950/70 flex items-center justify-center">
                <span className="font-display text-white text-2xl font-semibold">
                  +{images.length - 5}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-obsidian-950/0 group-hover:bg-obsidian-950/20 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9998] bg-obsidian-950/98 flex items-center justify-center"
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 font-sans text-white/50 text-sm tracking-widest">
              {activeIndex + 1} / {images.length}
            </div>

            {/* Main image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="relative w-full max-w-5xl mx-4 aspect-video"
              >
                <Image
                  src={images[activeIndex].url}
                  alt={images[activeIndex].alt || title}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next */}
            <button
              onClick={prev}
              className="absolute left-4 md:left-8 w-11 h-11 rounded-full bg-white/10 hover:bg-gold-500 flex items-center justify-center text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 md:right-8 w-11 h-11 rounded-full bg-white/10 hover:bg-gold-500 flex items-center justify-center text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Thumbnail strip */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`relative w-14 h-10 flex-shrink-0 rounded overflow-hidden border-2 transition-all ${
                    i === activeIndex ? 'border-gold-500' : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}