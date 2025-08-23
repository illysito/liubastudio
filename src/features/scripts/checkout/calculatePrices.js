import { $ } from '../../utils/getElement.js'

function calculatePrices(cart) {
  function queryDomElements() {
    return {
      displayedItemTitle: $('.modal-product-title'),
      displayedItemPrice: $('#modal-item-price'),
      displayedShippingPrice: $('#modal-shipping-price'),
      displayedTotalPrice: $('#modal-total-price'),
    }
  }
  const domElements = queryDomElements()

  let subtotalPrice = 0
  let shippingPrice = 0
  cart.forEach((item) => {
    subtotalPrice += item.price
  })

  const shippingPriceId = localStorage.getItem('shipping-id')
  if (shippingPriceId === 'standard-shipping') {
    shippingPrice = 3000
  } else {
    shippingPrice = 0
  }
  let totalPrice = subtotalPrice + shippingPrice

  function calculatePrice() {
    totalPrice = subtotalPrice + shippingPrice
    displayPrices()
  }

  function displayPrices() {
    domElements.displayedItemPrice.textContent = `${(
      subtotalPrice / 100
    ).toFixed(2)} €`
    domElements.displayedShippingPrice.textContent = `${(
      shippingPrice / 100
    ).toFixed(2)} €`
    domElements.displayedTotalPrice.textContent = `${(totalPrice / 100).toFixed(
      2
    )} €`
  }

  calculatePrice()
}

export default calculatePrices
