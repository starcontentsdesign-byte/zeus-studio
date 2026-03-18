'use client';

import { CONTACT_EMAIL } from '@/utils/branding';

export function HeroSection() {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <video
          src="/images/hero-bg.mp4"
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="relative flex h-full flex-col items-center justify-end px-4 pb-32 text-center">
        <div className="space-y-6">
          <h2 className="text-5xl tracking-[0.3em] sm:text-6xl lg:text-7xl">ZEUS</h2>

          <div className="space-y-1 text-xs tracking-[0.2em] text-white/90">
            <p>RECORDING STUDIO | LOCALIZATION</p>
            <p>SOUND PRODUCTION & MIXING / DUBBING</p>
          </div>

          <div className="space-y-1 pt-6 text-[10px] text-white/60">
            <p>서울 강남구 양재천로 551-17 4층</p>
            <p>4F, 551-17, Yangjaecheon-ro, Gangnam-gu, Seoul, Republic of Korea</p>
            <p>Contact Email: {CONTACT_EMAIL}</p>
            <p>Copyrights©ZEUS STUDIO All rights reserved</p>
          </div>
        </div>
      </div>
    </section>
  );
}
