import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/globals.css';
import './styles/responsive.css';

// Homepage sections
import Navbar         from './components/Navbar';
import Hero           from './components/Hero';
import Accreditation  from './components/Accreditation';
import Stats          from './components/Stats';
import About          from './components/About';
import Services       from './components/Services';
import BeforeAfter    from './components/BeforeAfter';
import Gallery        from './components/Gallery';
import QuoteCalculator from './components/QuoteCalculator';
import Process        from './components/Process';
import Reviews        from './components/Reviews';
import FAQ            from './components/FAQ';
import ServiceArea    from './components/ServiceArea';
import Blog           from './components/Blog';
import SocialSection  from './components/SocialSection';
import SocialSidebar  from './components/SocialSidebar';
import CtaBanner      from './components/CtaBanner';
import Contact        from './components/Contact';
import Footer         from './components/Footer';
import MobileCTA      from './components/MobileCTA';
import { useScrollToContact } from './hooks/useScrollToContact';

// Pages
import BlogList       from './pages/BlogList';
import BlogPost       from './pages/BlogPost';
import ServicePage    from './pages/ServicePage';
import LocationPage   from './pages/LocationPage';

function HomePage() {
  useScrollToContact();
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Accreditation />
        <Stats />
        <About />
        <Services />
        <BeforeAfter />
        <Gallery />
<QuoteCalculator />
        <Process />
        <Reviews />
        <FAQ />
        <ServiceArea />
        <Blog />
        <SocialSection />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
      <MobileCTA />
      <SocialSidebar />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                    element={<HomePage />} />
        <Route path="/blog"                element={<BlogList />} />
        <Route path="/blog/:slug"          element={<BlogPost />} />
        <Route path="/services/:id"        element={<ServicePage />} />
        <Route path="/locations/:location" element={<LocationPage />} />
      </Routes>
    </BrowserRouter>
  );
}
