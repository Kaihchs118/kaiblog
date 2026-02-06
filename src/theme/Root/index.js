import React, {useEffect, useRef, useState} from 'react';
import {useHistory, useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

function MobileActionBar() {
  const history = useHistory();
  const location = useLocation();
  const homeHref = useBaseUrl('/');
  const [hidden, setHidden] = useState(false);
  const [barOpen, setBarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);
  const autoCloseRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return () => {};

    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollYRef.current;

      if (Math.abs(delta) < 6) return;

      setHidden(true);
      setBarOpen(false);

      lastScrollYRef.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, {passive: true});

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return () => {};

    const navbar = document.querySelector('.navbar');
    if (!navbar) return () => {};

    const update = () => {
      setMenuOpen(navbar.classList.contains('navbar-sidebar--show'));
    };

    update();

    const observer = new MutationObserver(update);
    observer.observe(navbar, {attributes: true, attributeFilter: ['class']});

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setHidden(false);
    setBarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (autoCloseRef.current) {
      clearTimeout(autoCloseRef.current);
      autoCloseRef.current = null;
    }

    if (barOpen) {
      autoCloseRef.current = setTimeout(() => {
        setBarOpen(false);
      }, 3500);
    }

    return () => {
      if (autoCloseRef.current) {
        clearTimeout(autoCloseRef.current);
      }
    };
  }, [barOpen]);

  const goHome = () => {
    history.push(homeHref);
  };

  const goBack = () => {
    if (window.history.length > 1) {
      history.goBack();
      return;
    }
    history.push(homeHref);
  };

  const goTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const isHidden = hidden || menuOpen || !barOpen;

  return (
    <>
      <button
        type="button"
        className="mobile-action-bar__handle"
        onClick={() => {
          setHidden(false);
          setBarOpen(true);
        }}
        aria-label="開啟快捷選單"
      >
        <span className="mobile-action-bar__handle-text">開啟快捷選單</span>
        <span className="mobile-action-bar__handle-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 14l6-6 6 6" />
          </svg>
        </span>
      </button>

      <div className={`mobile-action-bar${isHidden ? ' is-hidden' : ''}`}>
      <button
        type="button"
        className="mobile-action-bar__btn"
        onClick={goBack}
        aria-label="返回上一頁"
      >
        <span className="mobile-action-bar__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </span>
        <span className="mobile-action-bar__label">返回</span>
      </button>

      <button
        type="button"
        className="mobile-action-bar__btn mobile-action-bar__btn--primary"
        onClick={goHome}
        aria-label="回首頁"
      >
        <span className="mobile-action-bar__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 11l9-8 9 8" />
            <path d="M5 10v10h14V10" />
          </svg>
        </span>
        <span className="mobile-action-bar__label">首頁</span>
      </button>

      <button
        type="button"
        className="mobile-action-bar__btn"
        onClick={goTop}
        aria-label="回到頂部"
      >
        <span className="mobile-action-bar__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V6" />
            <path d="M5 12l7-7 7 7" />
          </svg>
        </span>
        <span className="mobile-action-bar__label">頂部</span>
      </button>
      </div>
    </>
  );
}

export default function Root({children}) {
  return (
    <>
      {children}
      <MobileActionBar />
    </>
  );
}
