import gsap from 'gsap'
import SplitType from 'split-type'

import { $ } from '../../utils/getElement'

function preloader() {
  const PRELOADER = $('.preloader')
  const TXT = $('.preloader-txt')

  let counter = 0
  const interval = setInterval(() => {
    counter += 2
    TXT.textContent = `${counter} %`
    if (counter == 100) {
      const SPLIT_TXT = new SplitType(TXT, {
        types: 'chars',
        tagName: 'span',
      })
      gsap.to(SPLIT_TXT.chars, {
        yPercent: -100,
        stagger: 0.08,
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.to(PRELOADER, {
            opacity: 0,
            zIndex: -100,
            duration: 1.2,
            ease: 'power2.inOut',
          })
        },
      })
      clearInterval(interval)
    }
  }, 40)
}

export default preloader
