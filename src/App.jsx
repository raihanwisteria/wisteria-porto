import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, useTheme } from './hooks/useTheme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Works from './components/Works';
import Skills from './components/Skills';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import EasterEgg from './components/EasterEgg';
import BackgroundEffects from './components/ui/BackgroundEffects';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="relative min-h-screen pb-24 overflow-hidden selection:bg-accent-subtle">
          <BackgroundEffects />
          <Navbar />
          <main className="relative z-10 w-full">
            <Hero />
            <About />
            <Skills />
            <Works />
            <Contact />
          </main>
          <Footer />
          <EasterEgg />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
