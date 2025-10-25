import React from 'react';
import { Gamepad2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur border-b border-white/10 bg-neutral-900/70">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white/10">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">2D Strategie · Hochkant</h1>
            <p className="text-xs text-neutral-400">Minimalistisches Canvas-Spiel mit Zügen</p>
          </div>
        </div>
        <a
          href="#game"
          className="px-4 py-2 rounded-md bg-white text-black text-sm font-medium hover:bg-neutral-200 transition"
        >
          Jetzt spielen
        </a>
      </div>
    </header>
  );
}
