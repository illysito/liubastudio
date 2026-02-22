import updateCartCount from './updateCartCount.js'

function initCartCount() {
  let cart

  try {
    cart = JSON.parse(localStorage.getItem('cart')) || []
  } catch (e) {
    cart = []
  }

  updateCartCount(cart.length)
}

export default initCartCount
