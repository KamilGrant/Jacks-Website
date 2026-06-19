import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollToContact() {
  const location = useLocation();
  useEffect(() => {
    if ((location.state as any)?.scrollTo) {
      const el = document.getElementById((location.state as any).scrollTo);
      if (el) {
        setTimeout(() => {
          const offset = 72;
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.state]);
}
