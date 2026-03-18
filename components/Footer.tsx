import React from 'react';

export function Footer() {
  return (
    <footer className="relative bg-black py-16 px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-xs tracking-[0.3em] opacity-60 mb-6">LOCATION</h3>
            <div className="space-y-2 text-sm opacity-80">
              <p>서울 강남구 양재천로 551-17 4층, 551-17, Yangjaecheon-</p>
              <p>ro, Gangnam-gu, Seoul, Republic of Korea, Contact</p>
              <p>Email: 07@zeus-studio.net Copyrights©ZEUS</p>
              <p>STUDIO All rights reserved</p>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xs tracking-[0.3em] opacity-60 mb-6">CONTACT</h3>
            <div className="space-y-2 text-sm opacity-80">
              <p>07@zeus-studio.net</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-60">
          <p>Copyrights©ZEUS STUDIO All rights reserved</p>
          <p>Design by <span className="opacity-100">ZEUS STUDIO</span></p>
        </div>
      </div>
    </footer>
  );
}
