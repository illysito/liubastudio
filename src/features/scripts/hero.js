import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function hero() {
  const canvas = document.querySelector('.liuba-canvas-wrapper')
  const heading = document.querySelectorAll('.hero-h')
  const subheading = document.querySelectorAll('.hero-subh')
  // const heading = document.querySelector('.hero-h')
  const ease = 'power2.out'

  // fade in
  gsap.to(canvas, {
    opacity: 1,
    scale: 1,
    duration: 3,
    ease: ease,
  })
  gsap.to([heading, subheading], {
    opacity: 1,
    yPercent: 100,
    duration: 2.4,
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
    y: 50,
    // scale: 0.8,
    scrollTrigger: {
      trigger: canvas,
      start: 'top 20%',
      end: 'bottom top',
      scrub: 2,
      markers: false,
    },
  })
  gsap.to(subheading, {
    scale: 0.85,
    y: 20,
    scrollTrigger: {
      trigger: canvas,
      start: 'top 25%',
      // end: 'top top',
      scrub: true,
      markers: false,
    },
  })
}

export default hero
