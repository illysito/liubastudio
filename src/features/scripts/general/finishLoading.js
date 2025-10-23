import gsap from 'gsap'

import { $ } from '../../utils/getElement.js'

function finishLoading() {
  let delay = 0
  if (document.body.classList.contains('body__collection')) {
    delay = 1.2
  }
  const loader = $('.loading__section')
  const loading_wrapper = $('.loading-wrapper')
  gsap.to(loading_wrapper, {
    delay: delay,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.inOut',
    onComplete: () => {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.2,
        zIndex: -10,
        ease: 'power2.inOut',
      })
    },
  })
}

export default finishLoading
