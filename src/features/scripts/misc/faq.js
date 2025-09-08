import gsap from 'gsap'

import { $, $$ } from '../../utils/getElement.js'

function faq() {
  function queryDomElements() {
    return {
      heading_wrappers: $$('.faq-heading-wrapper'),
      button: $('.afterpayment-button'),
    }
  }
  const DOM = queryDomElements()
  let isActive = false

  if (!DOM.heading_wrappers) {
    return
  }

  function handleAccordion(w) {
    const arrow = w.lastElementChild
    const text = w.nextElementSibling

    if (isActive) {
      gsap.to(arrow, {
        rotation: 45,
        y: -4,
        duration: 0.6,
      })
      text.style.display = 'none'
      isActive = false
    } else {
      DOM.heading_wrappers.forEach((w) => {
        const text = w.nextElementSibling
        text.style.display = 'none'
      })

      gsap.to(arrow, {
        rotation: 225,
        y: 4,
        duration: 0.6,
      })
      text.style.display = 'block'

      isActive = true
    }
  }

  DOM.heading_wrappers.forEach((w) => {
    const heading = w.firstElementChild
    const arrow = w.lastElementChild
    w.addEventListener('mouseover', () => {
      gsap.to(heading, {
        x: 8,
        duration: 0.6,
      })
      gsap.to(arrow, {
        scale: 0.92,
        duration: 0.6,
      })
    })
    w.addEventListener('mouseleave', () => {
      gsap.to(heading, {
        x: 0,
        duration: 0.6,
      })
      gsap.to(arrow, {
        scale: 1,
        duration: 0.6,
      })
    })
    w.addEventListener('click', () => {
      handleAccordion(w)
    })
  })
}

export default faq
