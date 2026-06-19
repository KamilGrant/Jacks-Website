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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // Already on homepage — just scroll
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to homepage and tell it to scroll to contact
      navigate('/', { state: { scrollTo: 'contact' } });
    }
  };

  return (
    <a href="#contact" style={style} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
