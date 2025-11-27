import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

import { $ } from '../../utils/getElement.js'

// ENTRY FADE IN ANIMATION FOR HERO

gsap.registerPlugin(ScrollTrigger)

function about() {
  // const video = $('.liuba-video')
  const button = $('.contact-button')

  const isTouchDevice = () =>
    'ontouchstart' in window || navigator.maxTouchPoints > 0

  // // scroll trigger
  // gsap.to(video, {
  //   yPercent: -16,
  //   // scale: 0.8,
  //   scrollTrigger: {
  //     trigger: video,
  //     start: 'top bottom',
  //     end: 'bottom top',
  //     scrub: true,
  //     markers: false,
  //   },
  // })
  // hover buttons
  function hoverInButton(b, splitText, splitHiddenText) {
    gsap.to(b, {
      scale: 0.98,
      backgroundColor: '#0e0e0e',
      borderColor: '#0e0e0e',
      duration: 0.4,
      ease: 'power2.out',
    })
    gsap.to(splitText.chars, {
      color: '#fff8ee',
      yPercent: -100,
      stagger: 0.02,
      ease: 'power2.out',
    })
    gsap.to(splitHiddenText.chars, {
      color: '#fff8ee',
      yPercent: -100,
      stagger: 0.02,
      ease: 'power2.out',
    })
  }

  function hoverOutButton(b, splitText, splitHiddenText) {
    gsap.to(b, {
      scale: 1,
      backgroundColor: '#3e50d600',
      borderColor: '#0e0e0e',
      duration: 0.4,
      ease: 'power2.out',
    })
    gsap.to(splitText.chars, {
      color: '#0e0e0e',
      yPercent: 0,
      stagger: 0.02,
      ease: 'power2.out',
    })
    gsap.to(splitHiddenText.chars, {
      color: '#0e0e0e',
      yPercent: 0,
      stagger: 0.02,
      ease: 'power2.out',
    })
  }

  function clickAnimationButton(b) {
    gsap.to(b, {
      scale: 0.96,
      duration: 0.1,
      onComplete: () => {
        gsap.to(b, {
          scale: 0.98,
          duration: 0.2,
        })
      },
    })
  }

  function tapAnimationButton(b) {
    const wrapper = b.firstElementChild
    const text = wrapper.firstElementChild

    gsap.to(text, {
      color: '#fff8ee',
      duration: 0.1,
    })
    gsap.to(b, {
      backgroundColor: '#0e0e0e',
      borderColor: '#0e0e0e',
      scale: 0.92,
      duration: 0.1,
      onComplete: () => {
        gsap.to(b, {
          backgroundColor: '#fff8ee',
          scale: 1,
          duration: 0.2,
        })
        gsap.to(text, {
          color: '#0e0e0e',
          duration: 0.1,
        })
      },
    })
  }
  // event listeners
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

  if (!isTouchDevice()) {
    button.addEventListener('mouseover', () => {
      hoverInButton(button, splitText, splitHiddenText)
    })
    button.addEventListener('mouseleave', () => {
      hoverOutButton(button, splitText, splitHiddenText)
    })
    button.addEventListener('click', () => {
      clickAnimationButton(button)
    })
  } else {
    button.addEventListener('click', () => {
      tapAnimationButton(button)
    })
  }
}

export default about
