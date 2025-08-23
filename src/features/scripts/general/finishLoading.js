import gsap from 'gsap'

import { $ } from '../../utils/getElement.js'

function finishLoading() {
  const loader = $('.loading__section')
  const loading_wrapper = $('.loading-wrapper')
  gsap.to(loading_wrapper, {
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
