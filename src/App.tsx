import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/globals.css';

// Homepage sections
import Navbar         from './components/Navbar';
import Hero           from './components/Hero';
import Accreditation  from './components/Accreditation';
import Stats          from './components/Stats';
import About          from './components/About';
import Services       from './components/Services';
import BeforeAfter    from './components/BeforeAfter';
import Gallery        from './components/Gallery';
import VideoSection   from './components/VideoSection';
import QuoteCalculator from './components/QuoteCalculator';
import Process        from './components/Process';
import Reviews        from './components/Reviews';
import FAQ            from './components/FAQ';
import ServiceArea    from './components/ServiceArea';
import Blog           from './components/Blog';
import CtaBanner      from './components/CtaBanner';
import Contact        from './components/Contact';
import Footer         from './components/Footer';
import ScrollTop      from './components/ScrollTop';
import MobileCTA      from './components/MobileCTA';

// Pages
import BlogList       from './pages/BlogList';
import BlogPost       from './pages/BlogPost';
import ServicePage    from './pages/ServicePage';
import LocationPage   from './pages/LocationPage';

function HomePage() {
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
        <VideoSection />
        <QuoteCalculator />
        <Process />
        <Reviews />
        <FAQ />
        <ServiceArea />
        <Blog />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
      <MobileCTA />
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
