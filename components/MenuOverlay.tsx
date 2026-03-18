'use client';

import { useEffect } from 'react';

type MenuOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
};

const menuItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'studio', label: 'Studio' },
];

export default function MenuOverlay({
  isOpen,
  onClose,
  onNavigate,
}: MenuOverlayProps) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className={`zeus-menu-backdrop${isOpen ? ' is-open' : ''}`} onClick={onClose}>
      <aside
        className={`zeus-menu-panel${isOpen ? ' is-open' : ''}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="zeus-menu-panel-inner">
          <div className="zeus-menu-head">
            <h2>ZEUS</h2>
            <button
              type="button"
              className="zeus-menu-close"
              onClick={onClose}
              aria-label="Close menu"
            >
              <span />
            </button>
          </div>

          <nav className="zeus-menu-nav">
            <ul className="zeus-menu-list">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="zeus-menu-link"
                    onClick={() => onNavigate(item.id)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
}
