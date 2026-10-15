import { useLayoutEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useLenis = (enabled = true) => {
  const lenisRef = useRef(null);

  useLayoutEffect(() => {
    if (!enabled) return;

    // Initialize Lenis smooth scroll with luxurious, steady damping
    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;
    if (typeof window !== 'undefined') {
      window.lenis = lenis;
    }

    // Sync ScrollTrigger updates on each Lenis scroll step
    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', onScroll);

    // Drive Lenis RAF inside GSAP ticker for 60/120Hz monitor synchronization
    const tickerFn = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.off('scroll', onScroll);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== 'undefined' && window.lenis === lenis) {
        window.lenis = null;
      }
    };
  }, [enabled]);

  return lenisRef;
};
