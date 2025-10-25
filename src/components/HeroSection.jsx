import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/UGnf9D1Hp3OG8vSG/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-neutral-900/30 via-neutral-900/40 to-neutral-900"></div>
      <div className="relative h-full container mx-auto px-4 flex flex-col items-start justify-end pb-10">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          Strategie trifft Ästhetik
        </h2>
        <p className="mt-3 max-w-2xl text-neutral-300">
          Bewege dich Zug für Zug, hinterlasse Spuren und erobere das gegnerische Tor. Ein kompaktes, rundenbasiertes
          2D-Spiel – optimiert für Hochformat.
        </p>
      </div>
    </section>
  );
}
