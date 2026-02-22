import updateCartCount from './updateCartCount.js'

function initCartCount() {
  let cart

  try {
    cart = localStorage.getItem('cart' || [])
  } catch (e) {
    cart = []
  }

  JSON.parse(localStorage.getItem('cart')) || []
  updateCartCount(cart.length)
}

export default initCartCount
