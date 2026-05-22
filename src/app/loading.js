export default function Loading() {
  return (
    <div className="fixed inset-0 bg-obsidian-950 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6">
        {/* Animated logo mark */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-gold-500/20 animate-ping" />
          <div className="absolute inset-2 rounded-full border-2 border-gold-500/40 animate-pulse" />
          <div className="absolute inset-4 rounded-full bg-gold-500/20 flex items-center justify-center">
            <span className="text-gold-500 font-display text-lg font-semibold">B</span>
          </div>
        </div>
        {/* Brand name */}
        <div className="text-center">
          <p className="font-display text-gold-500 text-xl tracking-widest uppercase">
            Black Gold
          </p>
          <p className="font-sans text-white/30 text-xs tracking-[0.3em] uppercase mt-1">
            Realty Group
          </p>
        </div>
        {/* Loading bar */}
        <div className="w-32 h-px bg-white/10 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-transparent via-gold-500 to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
}