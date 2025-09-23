import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { $, $$ } from '../../utils/getElement.js'

gsap.registerPlugin(ScrollTrigger)

function footer() {
  const footer = $('.footer__section')
  const heading = $('.footer-h')
  const footer_nav = $$('.footer-nav')
  const footer_link = $$('.footer-link')
  const made_by_link = $('.made-by-link')
  const made_by = $('.made-by')

  const ease = 'power1.out'

  const isTouchDevice = () =>
    'ontouchstart' in window || navigator.maxTouchPoints > 0

  gsap.to([heading, footer_nav, made_by], {
    yPercent: -100,
    duration: 1,
    scrollTrigger: {
      trigger: footer,
      start: 'top 88%',
      markers: false,
    },
  })

  function hoverIn(event) {
    const l = event.currentTarget
    const header = l.firstElementChild
    const hidden_header = header.nextElementSibling
    gsap.to([header, hidden_header], {
      x: 4,
      opacity: 0.5,
      duration: 0.25,
      ease: ease,
    })
  }

  function hoverOut(event) {
    const l = event.currentTarget
    const header = l.firstElementChild
    const hidden_header = header.nextElementSibling
    gsap.to([header, hidden_header], {
      x: 0,
      opacity: 1,
      duration: 0.25,
      ease: ease,
    })
  }

  footer_link.forEach((l) => {
    if (isTouchDevice()) return
    l.addEventListener('mouseover', hoverIn)
    l.addEventListener('mouseleave', hoverOut)
  })

  if (!isTouchDevice()) {
    made_by_link.addEventListener('mouseover', () => {
      gsap.to(made_by_link, {
        opacity: 0.5,
        duration: 0.25,
        ease: ease,
      })
    })
    made_by_link.addEventListener('mouseleave', () => {
      gsap.to(made_by_link, {
        opacity: 1,
        duration: 0.25,
        ease: ease,
      })
    })
  }
}

export default footer
