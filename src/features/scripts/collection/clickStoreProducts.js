import gsap from 'gsap'
import SplitType from 'split-type'

import { $$ } from '../../utils/getElement.js'
import addToCart from '../cart/addToCart'

function clickStoreProducts() {
  function queryDomElements() {
    return {
      products: $$('.product-card'),
      buttons: $$('.add-button'),
    }
  }
  const domElements = queryDomElements()

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

  function click(b) {
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

  // event listeners
  domElements.products.forEach((p) => {
    const productId = p.dataset.product_ID

    const image = p.firstElementChild
    const button = p.lastElementChild
    image.addEventListener('click', () => {
      window.location.href = `/product?id=${productId}`
    })
    button.addEventListener('click', (e) => {
      const b = e.currentTarget
      click(b)
      addToCart(productId)
    })
  })

  domElements.buttons.forEach((b) => {
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

    b.addEventListener('mouseover', () => {
      hoverIn(b, splitText, splitHiddenText)
    })
    b.addEventListener('mouseleave', () => {
      hoverOut(b, splitText, splitHiddenText)
    })
  })
}

export default clickStoreProducts
