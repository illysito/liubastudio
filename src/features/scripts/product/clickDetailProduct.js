import gsap from 'gsap'
import SplitType from 'split-type'

import addToCart from '../cart/addToCart'

// HANDLE HOVER & CLICK OF DETAIL BUTTONS (Add to cart & Checkout)

function clickDeatilProduct(product) {
  function queryDomElements() {
    return {
      buttons: document.querySelectorAll('.add-button-detail'),
      // slidingModal: document.querySelector('.sliding__modal'),
    }
  }
  const domElements = queryDomElements()

  const isTouchDevice = () =>
    'ontouchstart' in window || navigator.maxTouchPoints > 0

  function hoverIn(b, splitText, splitHiddenText) {
    gsap.to(b, {
      scale: 0.98,
      backgroundColor: '#3e50d6',
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

  function hoverOut(b, splitText, splitHiddenText) {
    gsap.to(b, {
      scale: 1,
      backgroundColor: '#3e50d600',
      duration: 0.4,
      ease: 'power2.out',
    })
    gsap.to(splitText.chars, {
      color: '#3e50d6',
      yPercent: 0,
      stagger: 0.02,
      ease: 'power2.out',
    })
    gsap.to(splitHiddenText.chars, {
      color: '#3e50d6',
      yPercent: 0,
      stagger: 0.02,
      ease: 'power2.out',
    })
  }

  function clickAnimation(b) {
    // gsap.to(domElements.slidingModal, {
    //   xPercent: -100,
    //   duration: 0.8,
    //   ease: 'power4.inOut',
    // })
    gsap.to(b, {
      scale: 0.95,
      duration: 0.1,
      onComplete: () => {
        gsap.to(b, {
          scale: 0.98,
          duration: 0.2,
        })
      },
    })
  }

  function tapAnimation(b) {
    const wrapper = b.firstElementChild
    const text = wrapper.firstElementChild

    gsap.to(text, {
      color: '#fff8ee',
      duration: 0.1,
    })
    gsap.to(b, {
      backgroundColor: '#3e50d6',
      scale: 0.92,
      duration: 0.1,
      onComplete: () => {
        gsap.to(b, {
          backgroundColor: '#fff8ee',
          scale: 1,
          duration: 0.2,
        })
        gsap.to(text, {
          color: '#3e50d6',
          duration: 0.1,
        })
      },
    })
  }

  // write a function to FETCH ID

  // event listeners
  domElements.buttons.forEach((b, index) => {
    if (b.classList.contains('out-of-stock')) return
    const wrapper = b.firstElementChild
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
      b.addEventListener('mouseover', () => {
        hoverIn(b, splitText, splitHiddenText)
      })
      b.addEventListener('mouseleave', () => {
        hoverOut(b, splitText, splitHiddenText)
      })
    }
    b.addEventListener('click', () => {
      if (isTouchDevice()) {
        tapAnimation(b)
      } else {
        clickAnimation(b)
      }
      index == 0 ? addToCart(product.id) : (window.location.href = `/checkout`)
    })
  })
}

export default clickDeatilProduct
