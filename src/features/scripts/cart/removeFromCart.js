import showCartFeedback from './cartFeedback'
import updateCartCount from './updateCartCount.js'

async function removeFromCart(id) {
  // fetch products
  try {
    const res = await fetch(
      `https://liuba-stripe-backend.vercel.app/api/products?id=${id}`
    )
    if (!res.ok) throw new Error('Network response was not ok')

    const product = await res.json()

    // i fetch the cart array from local storage or start with an empty one and then push
    let cart = JSON.parse(localStorage.getItem('cart')) || []

    // check if product is already in cart
    const isInCart = cart.some((item) => item.id === product.id)

    if (isInCart) {
      cart = cart.filter((item) => item.id !== product.id)
      showCartFeedback('Item removed from cart')
      localStorage.setItem('cart', JSON.stringify(cart))
      updateCartCount(cart.length)
    } else {
      showCartFeedback('Item not in cart')
    }
  } catch (error) {
    console.error('Failed to load products:', error)
  }
}

export default removeFromCart
