import gsap from 'gsap'

import { $$ } from '../../utils/getElement.js'

// HANDLE FAQ ACCORDION

function faq() {
  function queryDomElements() {
    return {
      heading_wrappers: $$('.faq-heading-wrapper'),
    }
  }
  const DOM = queryDomElements()
  let states = DOM.heading_wrappers.map(() => false) //Array of states innitialized to FALSE for each header, always the TRUE length

  const isTouchDevice = () =>
    'ontouchstart' in window || navigator.maxTouchPoints > 0

  const isMobile = () => {
    window.innerWidth <= 568
  }

  let accMargin = 0
  if (isMobile()) {
    accMargin = 24
  } else {
    accMargin = 32
  }

  if (!DOM.heading_wrappers) {
    return
  }

  function handleAccordion(w, index) {
    const arrow = w.lastElementChild
    const text = w.nextElementSibling

    // If state is ACTIVE
    if (states[index]) {
      // reset arrow to point UPWARDS
      gsap.to(arrow, {
        rotation: 45,
        y: -4,
        duration: 0.6,
      })
      // hide text
      gsap.to(text, {
        height: 0,
        duration: 0.6,
        onComplete: () => {
          // text.style.display = 'none'
          gsap.to(text, {
            marginTop: 0,
          })
        },
      })
      // set state to INACTIVE
      states[index] = false
    } else {
      // If state is actually INACTIVE
      // DOM.heading_wrappers.forEach((w) => {
      //   const text = w.nextElementSibling
      //   text.style.display = 'none'
      // })
      // set arrow pointing down
      gsap.to(arrow, {
        rotation: 225,
        y: 4,
        duration: 0.6,
      })
      // display text
      // text.style.display = 'block'
      gsap.to(text, {
        height: 'auto',
        marginTop: accMargin,
        duration: 0.6,
      })

      states[index] = true
    }
  }

  DOM.heading_wrappers.forEach((w, index) => {
    const heading = w.firstElementChild
    const arrow = w.lastElementChild

    if (!isTouchDevice()) {
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
    }
    w.addEventListener('click', () => {
      handleAccordion(w, index)
    })
  })
}

export default faq
