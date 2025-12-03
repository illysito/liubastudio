import gsap from 'gsap'

import { $ } from '../../utils/getElement.js'

function showCartFeedback(message) {
  // console.log(message)
  const modal = $('.feedback-modal')
  const text = $('.feedback-message')

  text.textContent = message
  gsap.to(modal, {
    xPercent: -200,
    duration: 0.4,
    ease: 'power2.inOut',
    onComplete: () => {
      gsap.to(modal, {
        xPercent: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        delay: 2,
      })
    },
  })
}

export default showCartFeedback
