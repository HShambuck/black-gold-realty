'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { siteContent } from '@/data/siteContent';
import GoldButton from '@/components/common/GoldButton';
import { useUI } from '@/context/UIContext';

const { hero, ticker } = siteContent;

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.4 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function HeroSection() {
  const videoRef            = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted,   setMuted]   = useState(true);
  const [loaded,  setLoaded]  = useState(false);
  const [hasVideo, setHasVideo] = useState(true);
  const { openModal }         = useUI();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      setPlaying(false);
      setHasVideo(false);
    });
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) { video.pause(); setPlaying(false); }
    else         { video.play();  setPlaying(true);  }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !muted;
    setMuted(!muted);
  };

  const scrollDown = () => {
    document.getElementById('featured-listings')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Ticker height offset — keeps scroll indicator above ticker
  const TICKER_H = 'bottom-[3.5rem]';

  return (
    <section className="hero-video-container">

      {/* ── VIDEO BACKGROUND ── */}
      <video
        ref={videoRef}
        className="hero-video"
        src={hero.videoUrl}
        poster={hero.posterUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onCanPlay={() => setLoaded(true)}
        onError={() => setHasVideo(false)}
        aria-hidden="true"
      />

      {/* Poster fallback shown until video loads or if video fails */}
      {(!loaded || !hasVideo) && (
        <div
          className="hero-video"
          style={{
            backgroundImage:    `url(${hero.posterUrl})`,
            backgroundSize:     'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden="true"
        />
      )}

      {/* ── OVERLAYS ── */}
      <div className="hero-overlay" />
      <div className="hero-overlay-bottom" />
      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(10,10,10,0.55) 100%)',
        }}
      />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex-1 flex items-center">
          <div className="container-luxury w-full pt-24 md:pt-28 pb-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-3xl"
            >

              {/* Badge */}
              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-5 md:mb-6">
                <div className="h-px w-8 bg-gold-500 flex-shrink-0" />
                <span className="font-sans text-gold-500 text-[0.65rem] tracking-[0.4em] uppercase font-medium">
                  {hero.badge}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={itemVariants}
                className="font-display text-white font-semibold leading-[1.05] mb-5 md:mb-6"
                style={{
                  fontSize:   'clamp(2.8rem, 7vw, 6rem)',
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                {hero.headline.split('\n').map((line, i) => (
                  <span key={i} className="block">
                    {i === 1 ? (
                      <span className="text-gold-gradient">{line}</span>
                    ) : line}
                  </span>
                ))}
              </motion.h1>

              {/* Gold divider */}
              <motion.div
                variants={itemVariants}
                className="h-px w-20 mb-5 md:mb-6"
                style={{ background: 'linear-gradient(90deg, #C9A84C, transparent)' }}
              />

              {/* Subheadline */}
              <motion.p
                variants={itemVariants}
                className="font-sans text-white/55 text-sm md:text-base lg:text-lg leading-relaxed max-w-lg mb-8 md:mb-10"
              >
                {hero.subheadline}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 md:mb-14"
              >
                <GoldButton href={hero.cta.primary.href} size="lg">
                  {hero.cta.primary.label}
                </GoldButton>
                <GoldButton onClick={openModal} variant="outline" size="lg">
                  {hero.cta.secondary.label}
                </GoldButton>
              </motion.div>

              {/* Stats Row */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-8 gap-y-5"
              >
                {hero.stats.map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span
                      className="font-display text-gold-500 text-2xl md:text-3xl font-semibold leading-none mb-1"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {stat.value}
                    </span>
                    <span className="font-sans text-white/35 text-[0.6rem] tracking-widest uppercase">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── TICKER STRIP ── */}
        <div className="border-t border-gold-500/15 bg-obsidian-950/50 backdrop-blur-sm py-2.5">
          <div className="ticker-wrapper">
            <div className="animate-ticker inline-flex gap-10">
              {[...ticker, ...ticker].map((item, i) => (
                <span
                  key={i}
                  className="font-sans text-white/45 text-[0.7rem] tracking-wide whitespace-nowrap"
                >
                  {item}
                  <span className="mx-5 text-gold-500 text-[0.5rem]">◆</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── VIDEO CONTROLS — right side, above ticker ── */}
      {hasVideo && (
        <div className={`absolute ${TICKER_H} right-4 md:right-6 z-20 flex gap-2 translate-y-[-100%] mb-3`}>
          <button
            onClick={toggleMute}
            aria-label={muted ? 'Unmute video' : 'Mute video'}
            className="w-9 h-9 rounded-full border border-white/15 bg-obsidian-950/60 backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors cursor-pointer"
          >
            {muted
              ? <VolumeX className="w-3.5 h-3.5" />
              : <Volume2 className="w-3.5 h-3.5" />
            }
          </button>
          <button
            onClick={togglePlay}
            aria-label={playing ? 'Pause video' : 'Play video'}
            className="w-9 h-9 rounded-full border border-white/15 bg-obsidian-950/60 backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors cursor-pointer"
          >
            <AnimatePresence mode="wait">
              {playing
                ? <motion.span key="pause" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.12 }}>
                    <Pause className="w-3.5 h-3.5" />
                  </motion.span>
                : <motion.span key="play"  initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.12 }}>
                    <Play  className="w-3.5 h-3.5" />
                  </motion.span>
              }
            </AnimatePresence>
          </button>
        </div>
      )}

      {/* ── SCROLL INDICATOR — centered, above ticker ── */}
      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className={`absolute ${TICKER_H} left-1/2 -translate-x-1/2 -translate-y-full mb-3 z-20 flex flex-col items-center gap-1.5 text-white/25 hover:text-gold-500 transition-colors cursor-pointer`}
        aria-label="Scroll to listings"
      >
        <span className="font-sans text-[0.55rem] tracking-[0.35em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </section>
  );
}