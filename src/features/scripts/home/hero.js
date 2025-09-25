import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import { $, $$ } from '../../utils/getElement.js'

// ENTRY FADE IN ANIMATION FOR HERO

gsap.registerPlugin(ScrollTrigger)

function hero() {
  const canvas = $('.liuba-canvas-wrapper')
  const heading = $$('.hero-h')
  const subheading = $$('.hero-subh')
  // const heading = document.querySelector('.hero-h')
  const ease = 'power2.out'

  // fade in
  gsap.to(canvas, {
    opacity: 1,
    delay: 1,
    scale: 1,
    duration: 3,
    ease: ease,
  })

  // scroll trigger
  gsap.to(canvas, {
    yPercent: 8,
    // scale: 0.8,
    scrollTrigger: {
      trigger: canvas,
      start: 'top 25%',
      end: 'bottom top',
      scrub: true,
      markers: false,
    },
  })
  gsap.to(heading, {
    opacity: 0,
    scrollTrigger: {
      trigger: heading,
      start: 'top 30%',
      end: 'top top',
      scrub: true,
      markers: false,
    },
  })
  gsap.to(subheading, {
    scale: 0.99,
    opacity: 0,
    scrollTrigger: {
      trigger: heading,
      start: 'top 26%',
      end: 'top top',
      scrub: true,
      markers: false,
    },
  })
}

export default hero
