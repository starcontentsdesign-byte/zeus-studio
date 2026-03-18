import React from 'react';

export function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1646646864714-5d0ad3b793f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGJ1YmJsZXMlMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzAyNTg1NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-end pb-32 px-4">
        <div className="text-center space-y-6">
          <h2 className="text-5xl md:text-6xl lg:text-7xl tracking-[0.3em]">
            ZEUS
          </h2>
          
          <div className="space-y-1 text-xs tracking-[0.2em] opacity-90">
            <p>RECORDING STUDIO | LOCALIZATION</p>
            <p>SOUND PRODUCTION & MIXING / DUBBING</p>
          </div>

          <div className="pt-6 space-y-1 text-[10px] opacity-60">
            <p>서울 강남구 양재천로 551-17 4층</p>
            <p>4F, 551-17, Yangjaecheon-ro, Gangnam-gu, Seoul, Republic of Korea</p>
            <p>Contact Email: info@zeus-studio.net</p>
            <p>Copyrights©ZEUS STUDIO All rights reserved</p>
          </div>
        </div>
      </div>
    </section>
  );
}