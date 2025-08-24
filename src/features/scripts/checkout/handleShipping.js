import gsap from 'gsap'

import { $$ } from '../../utils/getElement.js'
import calculatePrices from './calculatePrices.js'

function handleShippingUI() {
  function queryDomElements() {
    return {
      checkBoxes: $$('.shipping-checkbox'),
    }
  }
  const domElements = queryDomElements()

  function handleCheckBox(currentCheckBox) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    domElements.checkBoxes.forEach((checkbox) => {
      checkbox.classList.remove('is--checked')
    })
    currentCheckBox.classList.add('is--checked')
    calculatePrices(cart)
  }

  // event listeners
  domElements.checkBoxes.forEach((c) => {
    const option = c.nextElementSibling
    c.addEventListener('click', () => {
      handleCheckBox(c)
    })
    c.addEventListener('mouseover', () => {
      gsap.to(option, {
        x: 4,
        duration: 0.2,
      })
    })
    c.addEventListener('mouseleave', () => {
      gsap.to(option, {
        x: 0,
        duration: 0.2,
      })
    })
  })
}

export default handleShippingUI
