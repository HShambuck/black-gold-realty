'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { siteContent } from '@/data/siteContent';
import GoldButton from '@/components/common/GoldButton';
import { useUI } from '@/context/UIContext';

const { hero, ticker } = siteContent;

// Animation variants
const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.5 } },
};
const itemVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function HeroSection() {
  const videoRef = useRef(null);
  const [playing, setPlaying]  = useState(true);
  const [muted, setMuted]      = useState(true);
  const [loaded, setLoaded]    = useState(false);
  const { openModal }          = useUI();

  // Autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => setPlaying(false));
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
    const next = document.getElementById('featured-listings');
    next?.scrollIntoView({ behavior: 'smooth' });
  };

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
        aria-hidden="true"
      />

      {/* ── OVERLAYS ── */}
      <div className="hero-overlay" />
      <div className="hero-overlay-bottom" />

      {/* Subtle gold vignette at edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.5) 100%)',
        }}
      />

      {/* ── HERO CONTENT ── */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex-1 flex items-center">
          <div className="container-luxury w-full">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-3xl"
            >
              {/* Badge */}
              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-gold-500" />
                <span className="font-sans text-gold-500 text-xs tracking-[0.4em] uppercase font-medium">
                  {hero.badge}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={itemVariants}
                className="font-display text-white font-semibold leading-none mb-6"
                style={{
                  fontSize: 'clamp(3rem, 7vw, 6rem)',
                  fontFamily: "'Cormorant Garamond', serif",
                  whiteSpace: 'pre-line',
                }}
              >
                {hero.headline.split('\n').map((line, i) => (
                  <span key={i} className="block">
                    {i === 1 ? (
                      <span className="text-gold-gradient">{line}</span>
                    ) : (
                      line
                    )}
                  </span>
                ))}
              </motion.h1>

              {/* Gold line */}
              <motion.div
                variants={itemVariants}
                className="h-px w-20 mb-6"
                style={{ background: 'linear-gradient(90deg, #C9A84C, transparent)' }}
              />

              {/* Subheadline */}
              <motion.p
                variants={itemVariants}
                className="font-sans text-white/60 text-base md:text-lg leading-relaxed max-w-lg mb-10"
              >
                {hero.subheadline}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 mb-14"
              >
                <GoldButton href={hero.cta.primary.href} size="lg">
                  {hero.cta.primary.label}
                </GoldButton>
                <GoldButton
                  onClick={openModal}
                  variant="outline"
                  size="lg"
                >
                  {hero.cta.secondary.label}
                </GoldButton>
              </motion.div>

              {/* Stats Row */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-8"
              >
                {hero.stats.map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-display text-gold-500 text-3xl font-semibold">
                      {stat.value}
                    </span>
                    <span className="font-sans text-white/40 text-xs tracking-widest uppercase">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── TICKER STRIP ── */}
        <div className="border-t border-gold-500/20 bg-obsidian-950/40 backdrop-blur-sm py-3">
          <div className="ticker-wrapper">
            <div className="animate-ticker inline-flex gap-12">
              {/* Doubled for seamless loop */}
              {[...ticker, ...ticker].map((item, i) => (
                <span
                  key={i}
                  className="font-sans text-white/50 text-xs tracking-wide whitespace-nowrap"
                >
                  {item}
                  <span className="mx-6 text-gold-500">◆</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── VIDEO CONTROLS ── */}
      <div className="absolute bottom-20 right-6 z-20 flex gap-2">
        <button
          onClick={toggleMute}
          aria-label={muted ? 'Unmute' : 'Mute'}
          className="w-9 h-9 rounded-full border border-white/20 bg-obsidian-950/50 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        <button
          onClick={togglePlay}
          aria-label={playing ? 'Pause' : 'Play'}
          className="w-9 h-9 rounded-full border border-white/20 bg-obsidian-950/50 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
        >
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/30 hover:text-gold-500 transition-colors"
        aria-label="Scroll down"
      >
        <span className="font-sans text-xs tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}