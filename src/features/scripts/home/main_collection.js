import gsap from 'gsap'
import SplitType from 'split-type'

import { $, $$ } from '../../utils/getElement'

// COLLECTION SECTION

function mainCollection() {
  const cards = $$('.collection-card-2')
  const button = $('.collection-button')
  const ease = 'power1.out'
  const staggerTime = 0.02

  const isTouchDevice = () =>
    'ontouchstart' in window || navigator.maxTouchPoints > 0

  function hoverIn(c, header, hidden_header, img) {
    const w = img.parentElement
    gsap.to(c, {
      // backgroundColor: '#3111d5',
      duration: 0.4,
      ease: ease,
    })
    gsap.to(header.chars, {
      yPercent: -100,
      // color: '#fffffe',
      duration: 0.6,
      ease: ease,
      stagger: staggerTime,
    })
    gsap.to(hidden_header.chars, {
      yPercent: -100,
      // color: '#fffffe',
      duration: 0.6,
      ease: ease,
      stagger: staggerTime,
    })
    gsap.to(img, {
      scale: 1.15,
      duration: 0.6,
      ease: ease,
    })
    gsap.to(w, {
      borderRadius: 8,
      duration: 0.2,
      ease: ease,
    })
  }

  function hoverOut(c, header, hidden_header, img) {
    const w = img.parentElement
    gsap.to(c, {
      // backgroundColor: '#fffffe',
      duration: 0.4,
      ease: ease,
    })
    gsap.to(header.chars, {
      yPercent: 0,
      // color: '#3111d5',
      duration: 0.6,
      ease: ease,
      stagger: staggerTime,
    })
    gsap.to(hidden_header.chars, {
      yPercent: 0,
      // color: '#3111d5',
      duration: 0.6,
      ease: ease,
      stagger: staggerTime,
    })
    gsap.to(img, {
      scale: 1.1,
      duration: 0.6,
      ease: ease,
    })
    gsap.to(w, {
      borderRadius: 4,
      duration: 0.2,
      ease: ease,
    })
  }

  cards.forEach((card, index) => {
    console.log(index)
    const header_w = card.firstElementChild
    const header = header_w.firstElementChild
    const hidden_header = header.nextElementSibling
    // entro en las imagenes
    const img_w = header_w.nextElementSibling
    const img = img_w.firstElementChild
    // split
    const splitHeader = new SplitType(header, {
      types: 'chars',
      tagName: 'span',
    })
    const splitHiddenHeader = new SplitType(hidden_header, {
      types: 'chars',
      tagName: 'span',
    })

    if (!isTouchDevice()) {
      card.addEventListener('mouseover', () => {
        hoverIn(card, splitHeader, splitHiddenHeader, img)
      })
      card.addEventListener('mouseleave', () => {
        hoverOut(card, splitHeader, splitHiddenHeader, img)
      })
    }
    // card.addEventListener('click', () => {
    //   localStorage.setItem('initial-filter-type', header.textContent)
    //   localStorage.setItem('initial-filter-index', index + 1)
    // })
  })

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
      // borderColor: '#3e50d6',
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

export default mainCollection
