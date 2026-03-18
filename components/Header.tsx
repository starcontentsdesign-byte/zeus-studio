'use client';

type HeaderProps = {
  onMenuClick: () => void;
  opaque?: boolean;
};

export default function Header({ onMenuClick, opaque = false }: HeaderProps) {
  return (
    <header className="zeus-header">
      <div className="zeus-header-logo">
        <a
          href="#home"
          aria-label="ZEUS home"
          onClick={(event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          ZEUS
        </a>
      </div>

      <button
        type="button"
        onClick={onMenuClick}
        className={`zeus-menu-trigger${opaque ? ' opaque' : ''}`}
        aria-label="Open menu"
      >
        <span className="zeus-menu-text">MENU</span>
        <span className="zeus-menu-icon" />
      </button>
    </header>
  );
}
