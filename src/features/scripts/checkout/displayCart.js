function displayCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || []
  cart.forEach((item) => {
    console.log(item)
  })
  return cart
}

export default displayCart
