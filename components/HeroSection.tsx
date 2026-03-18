export function HeroSection() {
  return (
    <section id="home" className="zeus-home">
      <video className="zeus-home-video" autoPlay muted loop playsInline>
        <source src="/images/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="zeus-home-overlay" />

      <div className="zeus-home-table">
        <div className="zeus-home-tablecell">
          <div className="zeus-home-row">
            <div className="zeus-home-copy">
              <img
                src="/images/main_word.png"
                alt="ZEUS"
                className="zeus-main-word"
              />
              <p className="zeus-bead">
                서울 강서구 양천로 551-17 4층
                <br />
                4F, 551-17, Yangcheon-ro, Gangseo-gu, Seoul, Republic of Korea
                <br />
                Contact Email: 07@zeus-studio.net
                <br />
                Copyrights©ZEUS STUDIO All rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
