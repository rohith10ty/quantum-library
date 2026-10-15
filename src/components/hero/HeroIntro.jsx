import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { INTRO_BOOKS } from '../../data/libraryData';

gsap.registerPlugin(ScrollTrigger);

export const HeroIntro = () => {
  const introRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const introCards = introRef.current ? introRef.current.querySelectorAll('.card') : [];
      introCards.forEach((introCard) => {
        gsap.to(introCard, {
          ease: 'power1.in',
          startAt: {
            transformOrigin: '100% 50%',
            filter: 'brightness(75%)',
          },
          rotationX: () => -60,
          yPercent: () => gsap.utils.random(-100, 0),
          z: () => gsap.utils.random(-100, 0),
          filter: 'brightness(0%)',
          scrollTrigger: {
            trigger: introCard,
            start: 'clamp(top bottom)',
            end: 'clamp(bottom top)',
            scrub: 0.8,
          },
        });
      });
    }, introRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={introRef} id="home" className="intro pt-24 md:pt-28">
      {/* Large library & books themed headline */}
      <h2 className="intro__title">The Sanctuary of Knowledge</h2>
      <p className="intro__hint">Scroll to explore the university archives</p>

      {/* 3x3 Card Grid: Photo + Single Line Book Title Only */}
      <div className="intro__grid">
        {INTRO_BOOKS.map((book) => (
          <div key={book.id} className="card">
            <div
              className="card__img"
              style={{ backgroundImage: `url(${book.img})` }}
            />
            <div className="card__title" title={book.title}>
              {book.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
