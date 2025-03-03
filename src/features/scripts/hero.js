import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function hero() {
  const canvas = document.querySelector('.liuba-canvas-wrapper')
  // const heading = document.querySelector('.hero-h')
  const ease = 'power2.out'
  gsap.to(canvas, {
    opacity: 1,
    scale: 1,
    duration: 3,
    ease: ease,
  })
  gsap.to(canvas, {
    y: 50,
    // scale: 0.8,
    scrollTrigger: {
      trigger: canvas,
      start: 'top 30%',
      end: 'bottom top',
      scrub: true,
      markers: false,
    },
  })
}

export default hero
