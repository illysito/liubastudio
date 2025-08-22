async function addToCart(id) {
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
    const alreadyInCart = cart.some((item) => item.id === product.id)

    if (!alreadyInCart) {
      cart.push(product)
      localStorage.setItem('cart', JSON.stringify(cart))
    } else {
      console.log('Already in cart!')
    }
  } catch (error) {
    console.error('Failed to load products:', error)
  }
}

export default addToCart
