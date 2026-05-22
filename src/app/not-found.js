import Link from 'next/link';
import GoldButton from '@/components/common/GoldButton';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-obsidian-950 flex items-center justify-center px-6">
      <div className="text-center max-w-lg mx-auto">
        {/* Gold accent */}
        <div className="w-20 h-px bg-gold-500 mx-auto mb-8" />

        <p className="font-display text-gold-500 text-8xl font-light mb-4 opacity-60">
          404
        </p>

        <h1 className="font-display text-white text-display-sm font-semibold mb-4">
          Property Not Found
        </h1>

        <p className="text-white/50 font-sans text-base leading-relaxed mb-10">
          The page or property you&apos;re looking for has moved, sold, or doesn&apos;t exist.
          Let us help you find something exceptional.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <GoldButton href="/listings" size="lg">
            View All Properties
          </GoldButton>
          <GoldButton href="/" variant="outline" size="lg">
            Back to Home
          </GoldButton>
        </div>

        <div className="w-20 h-px bg-gold-500 mx-auto mt-8" />
      </div>
    </div>
  );
}