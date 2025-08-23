import gsap from 'gsap'

import { $ } from '../../utils/getElement.js'

function displayCheckoutItems() {
  let cart = JSON.parse(localStorage.getItem('cart')) || []

  const CART_SECTION = $('.cart-section')
  const EMPTY_CART_SECTION = $('.empty-cart-section')

  CART_SECTION.innerHTML = ''
  if (cart.length == 0) {
    gsap.to(EMPTY_CART_SECTION, {
      opacity: 1,
      duration: 0.6,
    })
  } else {
    gsap.to(EMPTY_CART_SECTION, {
      opacity: 0,
      duration: 0.6,
    })
    cart.forEach((p, index) => {
      // Create container
      const itemWrapper = document.createElement('div')
      itemWrapper.classList.add('cart-item-wrapper') // Styled in webflow
      itemWrapper.dataset.product_ID = p.id // ATTACH heavily ID to the container

      // Create image
      const img = document.createElement('img')
      img.classList.add('cart-item-img')
      img.src = p.image
      img.alt = p.name

      // FLEX
      const infoWrapper = document.createElement('div')
      infoWrapper.classList.add('cart-info-wrapper')
      const infoHeader = document.createElement('div')
      infoHeader.classList.add('cart-item-header')
      const infoSubHeader = document.createElement('div')
      infoSubHeader.classList.add('cart-item-subheader')

      // Create title
      const title = document.createElement('h1')
      title.classList.add('cart-item-name')
      title.textContent = p.name

      // Create price
      const price = document.createElement('h2')
      price.classList.add('cart-item-price')
      const euros = (p.price / 100).toFixed(2)
      price.textContent = `${euros} €`

      // Create button
      const removeButton = document.createElement('div')
      removeButton.classList.add('remove-item-button')
      const crossOne = document.createElement('div')
      crossOne.classList.add('cross-1')
      const crossTwo = document.createElement('div')
      crossTwo.classList.add('cross-2')
      removeButton.appendChild(crossOne)
      removeButton.appendChild(crossTwo)

      // Create description
      const description = document.createElement('p')
      description.classList.add('cart-item-description')
      description.textContent = p.description

      // Append all to item wrapper
      itemWrapper.appendChild(img)
      itemWrapper.appendChild(infoWrapper)

      infoWrapper.appendChild(infoHeader)
      infoWrapper.appendChild(description)

      infoHeader.appendChild(title)
      infoHeader.appendChild(infoSubHeader)

      infoSubHeader.appendChild(price)
      infoSubHeader.appendChild(removeButton)

      CART_SECTION.appendChild(itemWrapper)

      // create separator if it's NOT the las item
      const separatorWrapper = document.createElement('div')
      separatorWrapper.classList.add('cart-item-separator')
      if (index < cart.length - 1) {
        const separatorLine = document.createElement('div')
        separatorLine.classList.add('cart-item-line')
        separatorWrapper.appendChild(separatorLine)
      }

      CART_SECTION.appendChild(separatorWrapper)
    })
  }

  return cart
}

export default displayCheckoutItems
