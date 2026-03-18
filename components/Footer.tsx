'use client';

import { CONTACT_EMAIL } from '@/utils/branding';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black px-8 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid gap-12 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="mb-6 text-xs tracking-[0.3em] text-white/60">LOCATION</h3>
            <div className="space-y-2 text-sm text-white/80">
              <p>서울 강남구 양재천로 551-17 4층, 551-17, Yangjaecheon-</p>
              <p>ro, Gangnam-gu, Seoul, Republic of Korea, Contact</p>
              <p>Email: {CONTACT_EMAIL} Copyrights©ZEUS</p>
              <p>STUDIO All rights reserved</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="mb-6 text-xs tracking-[0.3em] text-white/60">CONTACT</h3>
            <div className="space-y-2 text-sm text-white/80">
              <p>{CONTACT_EMAIL}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/60 md:flex-row">
          <p>Copyrights©ZEUS STUDIO All rights reserved</p>
          <p>
            Design by <span className="text-white">ZEUS STUDIO</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
