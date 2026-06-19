import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollToContact() {
  const location = useLocation();
  useEffect(() => {
    if ((location.state as any)?.scrollTo) {
      const el = document.getElementById((location.state as any).scrollTo);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location.state]);
}
