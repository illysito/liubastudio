import { $, $$ } from '../../utils/getElement.js'

// CALCULATE PRICES BASED ON ITEMS & SHIPPING

function calculatePrices(cart) {
  function queryDomElements() {
    return {
      displayedItemTitle: $('.modal-product-title'),
      displayedItemPrice: $('#modal-item-price'),
      displayedShippingPrice: $('#modal-shipping-price'),
      displayedTotalPrice: $('#modal-total-price'),
      checkboxes: $$('.shipping-checkbox'),
    }
  }
  const domElements = queryDomElements()

  let subtotalPrice = 0
  let shippingPrice = 0
  let totalPrice = 0
  let shippingPriceId = ''
  const shippingCategories = []
  const largeItemLocations = []

  cart.forEach((item) => {
    subtotalPrice += item.price
    const size = item.metadata.Shipping
    const location = item.metadata.Location

    shippingCategories.push(size)

    if (size === 'large') {
      largeItemLocations.push(location)
    }
  })

  function determineShippingPrice() {
    let price
    // TURN THEM INTO NUMBERS
    for (let i = 0; i < shippingCategories.length; i++) {
      if (shippingCategories[i] === 'large') {
        shippingCategories[i] = 2
      } else if (shippingCategories[i] === 'medium') {
        shippingCategories[i] = 1
      } else if (shippingCategories[i] === 'small') {
        shippingCategories[i] = 0
      } else {
        shippingCategories[i] = -1
      }
    }

    // EXTRACT THE BIGGEST
    let max = shippingCategories[0]
    for (let i = 1; i < shippingCategories.length; i++) {
      if (shippingCategories[i] > max) {
        max = shippingCategories[i]
      }
    }

    // DETERMINE SHIPPING PRICE
    if (max === 2) {
      price = 9000
    } else if (max === 1) {
      price = 3000
    } else if (max === 0) {
      price = 1500
    } else {
      price = 0
    }

    return price
  }

  // const shippingPriceId = localStorage.getItem('shipping-id')
  domElements.checkboxes.forEach((c) => {
    if (c.classList.contains('is--checked')) {
      shippingPriceId = c.id
    }
  })

  if (shippingPriceId === 'standard-shipping') {
    shippingPrice = determineShippingPrice()
  } else if (shippingPriceId === 'canarias-shipping') {
    if (largeItemLocations.length === 0) {
      shippingPrice = 0
    } else {
      shippingPrice = 0
      for (let i = 0; i < largeItemLocations.length; i++) {
        if (largeItemLocations[i] === 'prg') {
          shippingPrice = 9000
          break
        }
      }
    }
  } else if (shippingPriceId === 'prague-shipping') {
    if (largeItemLocations.length === 0) {
      shippingPrice = 0
    } else {
      shippingPrice = 0
      for (let i = 0; i < largeItemLocations.length; i++) {
        if (largeItemLocations[i] === 'lpa') {
          shippingPrice = 9000
          break
        }
      }
    }
  } else {
    shippingPrice = 0
  }

  // get total price
  function calculatePrice() {
    totalPrice = subtotalPrice + shippingPrice
    displayPrices()
  }

  // display prices
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
