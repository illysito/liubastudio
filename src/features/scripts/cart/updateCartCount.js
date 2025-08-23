function updateCartCount(count) {
  const cartText = document.getElementById('cart-nav-link')
  const cartTextHidden = document.getElementById('cart-nav-link-hidden')

  cartText.textContent = `cart [${count}]`
  cartTextHidden.textContent = `cart [${count}]`
}

export default updateCartCount
