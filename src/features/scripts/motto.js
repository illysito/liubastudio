import { gsap } from 'gsap'
import SplitType from 'split-type'

function motto() {
  const motto_line = document.querySelectorAll('.motto-h-line')
  // const motto_h = document.querySelector('.motto-h')
  const splitHeading = new SplitType(motto_line, { types: 'chars' })

  gsap.set(splitHeading.chars, {
    opacity: 0.05,
  })
  gsap.set(motto_line, {
    opacity: 0,
    yPercent: 100,
  })

  gsap.to(motto_line, {
    opacity: 1,
    yPercent: 0,
    duration: 1.4,
    scrollTrigger: {
      trigger: motto_line,
      start: 'top bottom',
      end: 'top 80%',
      scrub: true,
      markers: false,
    },
  })
  gsap.to(splitHeading.chars, {
    opacity: 1,
    duration: 0.5,
    scrollTrigger: {
      trigger: motto_line,
      start: 'top bottom',
      end: 'top 8%',
      scrub: 2,
      markers: false,
    },
    stagger: 0.5,
  })
}

export default motto
