import gsap from 'gsap'
import SplitType from 'split-type'

import { $ } from '../../utils/getElement.js'

function afterpaymentButton() {
  function queryDomElements() {
    return {
      button: $('.cancel-page-button'),
    }
  }
  const DOM = queryDomElements()

  const button = DOM.button
  const wrapper = button.firstElementChild
  const text = wrapper.firstElementChild
  const hiddenText = wrapper.lastElementChild

  const splitText = new SplitType(text, {
    types: 'chars',
    tagName: 'span',
  })
  const splitHiddenText = new SplitType(hiddenText, {
    types: 'chars',
    tagName: 'span',
  })

  function hoverIn() {
    gsap.to(button, {
      scale: 0.98,
      duration: 0.4,
      ease: 'power2.out',
    })
    gsap.to(splitText.chars, {
      yPercent: -100,
      stagger: 0.02,
      ease: 'power2.out',
    })
    gsap.to(splitHiddenText.chars, {
      yPercent: -100,
      stagger: 0.02,
      ease: 'power2.out',
    })
  }

  function hoverOut() {
    gsap.to(button, {
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
    })
    gsap.to(splitText.chars, {
      yPercent: 0,
      stagger: 0.02,
      ease: 'power2.out',
    })
    gsap.to(splitHiddenText.chars, {
      yPercent: 0,
      stagger: 0.02,
      ease: 'power2.out',
    })
  }

  function click() {
    gsap.to(button, {
      scale: 0.96,
      duration: 0.1,
      onComplete: () => {
        gsap.to(button, {
          scale: 0.98,
          duration: 0.2,
        })
      },
    })
  }

  button.addEventListener('mouseover', () => {
    hoverIn()
  })
  button.addEventListener('mouseleave', () => {
    hoverOut()
  })
  button.addEventListener('click', () => {
    click()
  })
}

export default afterpaymentButton
