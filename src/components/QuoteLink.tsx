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
    const el = document.getElementById('contact-heading');
    if (!el) return;
    const navH = (document.querySelector('nav') as HTMLElement)?.offsetHeight ?? 72;
    const top = el.getBoundingClientRect().top + window.scrollY - navH - 12;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      scrollToContact();
    } else {
      navigate('/', { state: { scrollTo: 'contact-heading' } });
    }
  };

  return (
    <a href="#contact" style={style} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
