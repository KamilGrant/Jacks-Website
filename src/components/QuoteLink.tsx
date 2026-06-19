import { useNavigate, useLocation } from 'react-router-dom';
import type { CSSProperties, ReactNode } from 'react';

interface Props {
  style?: CSSProperties;
  children: ReactNode;
  className?: string;
}

export default function QuoteLink({ style, children, className }: Props) {
  const navigate  = useNavigate();
  const location  = useLocation();

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (!el) return;
    const offset = 72; // clear the fixed navbar
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      scrollToContact();
    } else {
      navigate('/', { state: { scrollTo: 'contact' } });
    }
  };

  return (
    <a href="#contact" style={style} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
