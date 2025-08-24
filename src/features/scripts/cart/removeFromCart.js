import gsap from 'gsap'

import calculatePrices from '../checkout/calculatePrices'
import removeCheckOutItem from '../checkout/removeCheckOutItem'
import initCartCount from './initCartCount'

async function removeFromCart(id) {
  // i fetch the cart array from local storage or start with an empty one and then push
  const EMPTY_CART_SECTION = document.querySelector('.empty-cart-section')
  const CHECKOUT_BUTTON = document.querySelector('.complete-checkout-button')
  let cart = JSON.parse(localStorage.getItem('cart')) || []

  // check if product is already in cart
  const isInCart = cart.some((item) => item.id === id)

  if (isInCart) {
    cart = cart.filter((item) => item.id !== id)

    if (cart.length == 0) {
      gsap.to(EMPTY_CART_SECTION, {
        opacity: 1,
        duration: 0.6,
      })
      CHECKOUT_BUTTON.style.pointerEvents = 'none'
      CHECKOUT_BUTTON.style.opacity = 0.5
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    initCartCount()
    calculatePrices(cart)
    removeCheckOutItem(id)
  } else {
    console.log('Item not in cart')
  }
}

export default removeFromCart
