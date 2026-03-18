'use client';

export default function Footer() {
  return (
    <footer className="zeus-footer">
      <div className="zeus-footer-main">
        <div className="zeus-footer-row">
          <div className="zeus-footer-col zeus-footer-col--wide">
            <h4 className="zeus-footer-heading">LOCATION</h4>
            <p className="zeus-footer-text">
              서울 강서구 양천로 551-17 4층 4F, 551-17, Yangcheon-ro, Gangseo-gu,
              Seoul, Republic of Korea Contact Email: 07@zeus-studio.net
              Copyrights©ZEUS STUDIO All rights reserved
            </p>
          </div>

          <div className="zeus-footer-col zeus-footer-col--narrow">
            <h4 className="zeus-footer-heading">CONTACT</h4>
            <p className="zeus-footer-text">07@zeus-studio.net</p>
          </div>
        </div>
      </div>

      <div className="zeus-footer-bottom">
        <div className="zeus-footer-bottom-row">
          <div className="zeus-footer-copyright">
            <span>Copyrights©ZEUS STUDIO All rights reserved</span>
            <span>
              Design by <strong>ZEUS STUDIO</strong>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
