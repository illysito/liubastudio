import { gsap } from 'gsap'
import SplitType from 'split-type'

function motto() {
  const motto_line = document.querySelectorAll('.motto-h-line')
  const motto_line_2 = document.querySelectorAll('.motto-h-line-transp')
  // const motto_h = document.querySelector('.motto-h')
  const splitHeading = new SplitType(motto_line, { types: 'chars' })
  const splitHeading2 = new SplitType(motto_line_2, { types: 'chars' })
  console.log(splitHeading2)

  gsap.set(splitHeading.chars, {
    opacity: 0,
    xPercent: -120,
    scale: 0.9,
  })
  gsap.set([motto_line, motto_line_2], {
    opacity: 0.05,
    yPercent: 100,
  })

  gsap.to([motto_line, motto_line_2], {
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
    xPercent: 0,
    scale: 1,
    duration: 0.5,
    scrollTrigger: {
      trigger: motto_line,
      start: 'top bottom',
      end: 'top 16%',
      scrub: 2,
      markers: false,
    },
    stagger: 0.5,
  })
}

export default motto
