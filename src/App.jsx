import React from 'react';
import Header from './components/Header.jsx';
import HeroSection from './components/HeroSection.jsx';
import GameCanvas from './components/GameCanvas.jsx';
import ControlsPanel from './components/ControlsPanel.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      <Header />
      <main>
        <HeroSection />
        <section className="container mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <GameCanvas />
          </div>
          <div className="lg:col-span-1">
            <ControlsPanel />
          </div>
        </section>
      </main>
    </div>
  );
}
