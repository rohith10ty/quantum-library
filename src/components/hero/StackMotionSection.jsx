import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { generateStackBooks } from '../../data/libraryData';

gsap.registerPlugin(ScrollTrigger);

export const StackMotionSection = ({
  title,
  stackIndex,
  effectType,
}) => {
  const wrapRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const cards = generateStackBooks(`stack-${stackIndex}`);

  useLayoutEffect(() => {
    const wrapEl = wrapRef.current;
    const contentEl = contentRef.current;
    const titleEl = titleRef.current;
    if (!wrapEl || !contentEl || !titleEl) return;

    let winsize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    let timeline = null;

    const setupEffect = () => {
      const cardElements = Array.from(contentEl.querySelectorAll('.card'));
      const imagesTotal = cardElements.length;

      if (timeline) {
        timeline.kill();
      }

      // Initial 3D rotation orientations from original 3DStackMotion
      if (effectType === 'effect-1') {
        contentEl.style.transform =
          'rotate3d(1, 0, 0, -25deg) rotate3d(0, 1, 0, 50deg) rotate3d(0, 0, 1, 25deg)';
      } else if (effectType === 'effect-2') {
        contentEl.style.transform =
          'rotate3d(1, 0, 0, 55deg) rotate3d(0, 1, 0, 30deg)';
      } else if (effectType === 'effect-3') {
        contentEl.style.transform =
          'rotate3d(1, 0, 0, 25deg) rotate3d(0, 1, 0, -50deg) rotate3d(0, 0, 1, 25deg)';
      }

      contentEl.style.opacity = '1';

      const easeType = effectType === 'effect-2' ? 'sine.inOut' : 'power1.out';

      // Pin in center: locks screen so fast scrolling doesn't shoot it to top;
      // steady 250% scroll distance with smooth scrub matches scroll speed
      timeline = gsap.timeline({
        defaults: {
          ease: easeType,
        },
        scrollTrigger: {
          trigger: wrapEl,
          start: 'top top',
          end: '+=250%',
          pin: true,
          pinSpacing: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // =========================================================================
      // 1. TEXT ANIMATION: Enters from LEFT viewport -> CENTER (at 50%) -> Exits to RIGHT viewport (at 100%)
      // =========================================================================
      timeline
        .fromTo(
          titleEl,
          {
            x: -winsize.width * 1.15,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            ease: 'power1.out',
            duration: 0.5,
          },
          0
        )
        .to(
          titleEl,
          {
            x: winsize.width * 1.15,
            opacity: 0,
            ease: 'power1.in',
            duration: 0.5,
          },
          0.5
        );

      // =========================================================================
      // 2. 3D CARDS ANIMATION (Behind Text): In viewport depth at 0% -> In center at 50% -> Fly past at 100%
      // =========================================================================
      if (effectType === 'effect-1') {
        timeline
          .fromTo(
            cardElements,
            {
              z: (pos) => -2.65 * winsize.width - pos * 0.03 * winsize.width,
              rotationZ: -220,
            },
            {
              z: (pos) => 1.4 * winsize.width + (imagesTotal - pos - 1) * 0.03 * winsize.width,
              rotationY: -30,
              rotationZ: 120,
              stagger: 0.005,
              duration: 1,
            },
            0
          );
      } else if (effectType === 'effect-2') {
        timeline
          .fromTo(
            cardElements,
            {
              z: (pos) => -1.2 * winsize.height - pos * 0.08 * winsize.height,
              rotationZ: -130,
            },
            {
              z: (pos) => 3 * winsize.height + (imagesTotal - pos - 1) * 0.08 * winsize.height,
              rotationZ: 360,
              stagger: 0.006,
              duration: 1,
            },
            0
          );
      } else if (effectType === 'effect-3') {
        timeline
          .fromTo(
            cardElements,
            {
              z: (pos) => -2.5 * (winsize.width / 2) - pos * 0.07 * winsize.width,
              rotationZ: 10,
              yPercent: 0,
            },
            {
              z: (pos) => 2.5 * winsize.width + (imagesTotal - pos - 1) * 0.07 * winsize.width,
              rotationX: 20,
              rotationZ: 280,
              yPercent: -100,
              stagger: 0.005,
              duration: 1,
            },
            0
          );
      }
    };

    setupEffect();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        winsize = {
          width: window.innerWidth,
          height: window.innerHeight,
        };
        setupEffect();
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeline) timeline.kill();
    };
  }, [effectType, stackIndex]);

  return (
    <section
      ref={wrapRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden select-none"
    >
      {/* 3D Stack Motion Cards (Layer behind the text: z-10, shifted down to clear top navbar) */}
      <div className="wrap__inner absolute inset-0 z-10 w-full h-full flex items-center justify-center pointer-events-none translate-y-14 sm:translate-y-20 md:translate-y-24">
        <div ref={contentRef} className={`content content--${stackIndex}`}>
          {cards.map((card) => (
            <div key={card.id} className="card pointer-events-auto">
              <div
                className="card__img"
                style={{ backgroundImage: `url(${card.img})` }}
              />
              <div className="card__title" title={card.title}>
                {card.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Title: Layer in front (z-20), travels from LEFT viewport -> CENTER (with cards) -> RIGHT viewport */}
      <h2
        ref={titleRef}
        className="absolute z-20 flex items-center justify-center text-center font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-wider text-white pointer-events-none px-6 max-w-5xl leading-tight drop-shadow-[0_12px_45px_rgba(0,0,0,0.98)] will-change-transform whitespace-normal sm:whitespace-nowrap"
      >
        {title}
      </h2>
    </section>
  );
};
