import updateCartCount from './updateCartCount.js'

function initCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || []
  updateCartCount(cart.length)
}

export default initCartCount
