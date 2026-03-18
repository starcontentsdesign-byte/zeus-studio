'use client';

import { useEffect } from 'react';

type MenuOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  userEmail?: string | null;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogoutClick: () => void;
  onAdminPageClick: () => void;
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
  isAuthenticated,
  isAdmin,
  userEmail,
  onLoginClick,
  onSignupClick,
  onLogoutClick,
  onAdminPageClick,
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

          <div className="zeus-menu-auth">
            {isAuthenticated ? (
              <div className="zeus-menu-account">
                <p className="zeus-menu-account-label">SIGNED IN</p>
                <p className="zeus-menu-account-email">{userEmail || 'admin@zeus-studio.net'}</p>
                {isAdmin ? (
                  <span className="zeus-menu-account-badge">ADMIN</span>
                ) : (
                  <p className="zeus-menu-account-note">
                    관리자 계정으로 로그인하면 관리자페이지 메뉴가 열린다.
                  </p>
                )}
              </div>
            ) : (
              <p className="zeus-menu-account-note">
                메뉴에서 로그인하면 관리자 계정으로 관리자페이지를 열 수 있다.
              </p>
            )}

            <div className="zeus-menu-action-list">
              {!isAuthenticated ? (
                <>
                  <button
                    type="button"
                    className="zeus-menu-action"
                    onClick={onLoginClick}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    className="zeus-menu-action zeus-menu-action--ghost"
                    onClick={onSignupClick}
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  {isAdmin ? (
                    <button
                      type="button"
                      className="zeus-menu-action"
                      onClick={onAdminPageClick}
                    >
                      관리자페이지
                    </button>
                  ) : null}
                  <button
                    type="button"
                    className="zeus-menu-action zeus-menu-action--ghost"
                    onClick={onLogoutClick}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
