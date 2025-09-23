import gsap from 'gsap'

import { $, $$ } from '../../utils/getElement.js'
import removeFromCart from '../cart/removeFromCart'

// ANIMATIONS & ACTIONS WHEN CLOSE BUTTONS (X) ARE CLICKED OR TAPPED

function closeButtons() {
  function queryDomElements() {
    return {
      itemWrappers: $$('.cart-item-wrapper'),
    }
  }
  const DOM = queryDomElements()

  DOM.itemWrappers.forEach((w) => {
    const productId = w.dataset.product_ID
    const BTN = $('.remove-item-button', w)
    const CROSS_1 = BTN.firstElementChild
    const CROSS_2 = BTN.lastElementChild
    BTN.addEventListener('mouseover', () => {
      gsap.to(CROSS_1, {
        rotation: 135,
        duration: 0.4,
      })
      gsap.to(CROSS_2, {
        rotation: -135,
        duration: 0.4,
      })
    })
    BTN.addEventListener('mouseleave', () => {
      gsap.to(CROSS_1, {
        rotation: -45,
        duration: 0.4,
      })
      gsap.to(CROSS_2, {
        rotation: 45,
        duration: 0.4,
      })
    })
    BTN.addEventListener('click', () => {
      gsap.to(BTN, {
        scale: 0.9,
        duration: 0.1,
        onComplete: () => {
          gsap.to(BTN, {
            scale: 1,
            duration: 0.2,
          })
        },
      })
      removeFromCart(productId)
    })
  })
}

export default closeButtons
