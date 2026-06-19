import './styles/globals.css';
import Navbar       from './components/Navbar';
import Hero         from './components/Hero';
import Stats        from './components/Stats';
import About        from './components/About';
import Services     from './components/Services';
import Gallery      from './components/Gallery';
import Process      from './components/Process';
import Testimonials from './components/Testimonials';
import CtaBanner    from './components/CtaBanner';
import Contact      from './components/Contact';
import Footer       from './components/Footer';
import ScrollTop    from './components/ScrollTop';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Gallery />
        <Process />
        <Testimonials />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
}
