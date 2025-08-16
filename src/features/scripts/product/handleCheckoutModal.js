import gsap from 'gsap'
import SplitType from 'split-type'

function handleCheckOutModal(product) {
  function queryDomElements() {
    return {
      checkBoxes: document.querySelectorAll('.shipping-checkbox'),
      displayedItemTitle: document.querySelector('.modal-product-title'),
      displayedItemPrice: document.getElementById('modal-item-price'),
      displayedShippingPrice: document.getElementById('modal-shipping-price'),
      displayedTotalPrice: document.getElementById('modal-total-price'),
      form: document.querySelector('.modal-form-container'),
      checkOutButton: document.querySelector('.complete-checkout-button'),
    }
  }
  const domElements = queryDomElements()

  const checkOutButtonWrapper = domElements.checkOutButton.firstElementChild
  const checkOutButtonText = checkOutButtonWrapper.firstElementChild
  const checkOutButtonHiddenText = checkOutButtonWrapper.lastElementChild
  const splitText = new SplitType(checkOutButtonText, {
    types: 'chars',
    tagName: 'span',
  })
  const splitHiddenText = new SplitType(checkOutButtonHiddenText, {
    types: 'chars',
    tagName: 'span',
  })

  let itemPrice = product.price
  // let itemPrice = (product.price / 100).toFixed(2)
  // price.textContent = `${itemPrice} €`
  console.log(itemPrice)
  let shippingPrice = {
    id: '',
    price: 0,
  }
  let totalPrice = itemPrice + shippingPrice.price

  function handleCheckBox(currentCheckBox) {
    domElements.checkBoxes.forEach((checkbox) => {
      checkbox.classList.remove('is--checked')
    })
    currentCheckBox.classList.add('is--checked')
    shippingPrice.id = currentCheckBox.id
    if (shippingPrice.id === 'standard-shipping') {
      shippingPrice.price = 3000
    } else {
      shippingPrice.price = 0
    }
    console.log(shippingPrice)
    calculatePrice()
  }

  function displayText() {
    domElements.displayedItemTitle.textContent = product.name
  }

  function calculatePrice() {
    totalPrice = itemPrice + shippingPrice.price
    displayPrices()
  }

  function displayPrices() {
    domElements.displayedItemPrice.textContent = `${(itemPrice / 100).toFixed(
      2
    )} €`
    domElements.displayedShippingPrice.textContent = `${(
      shippingPrice.price / 100
    ).toFixed(2)} €`
    domElements.displayedTotalPrice.textContent = `${(totalPrice / 100).toFixed(
      2
    )} €`
  }

  function handleForm() {
    console.log('m handling the form')
  }

  function hoverIn() {
    gsap.to(domElements.checkOutButton, {
      scale: 0.95,
      borderRadius: 32,
      // backgroundColor: '#3e50d6',
      duration: 0.4,
      ease: 'power2.out',
    })
    gsap.to(splitText.chars, {
      color: '#fff8ee',
      yPercent: -100,
      stagger: 0.01,
      ease: 'power2.out',
    })
    gsap.to(splitHiddenText.chars, {
      color: '#fff8ee',
      yPercent: -100,
      stagger: 0.01,
      ease: 'power2.out',
    })
  }

  function hoverOut() {
    gsap.to(domElements.checkOutButton, {
      scale: 1,
      borderRadius: 16,
      // backgroundColor: '#3e50d600',
      duration: 0.4,
      ease: 'power2.out',
    })
    gsap.to(splitText.chars, {
      color: '#fff8ee',
      yPercent: 0,
      stagger: 0.01,
      ease: 'power2.out',
    })
    gsap.to(splitHiddenText.chars, {
      color: '#fff8ee',
      yPercent: 0,
      stagger: 0.01,
      ease: 'power2.out',
    })
  }

  function click() {
    gsap.to(domElements.checkOutButton, {
      scale: 0.9,
      duration: 0.1,
      onComplete: () => {
        gsap.to(domElements.checkOutButton, {
          scale: 0.95,
          duration: 0.1,
        })
      },
    })
  }

  // init
  function init() {
    displayText()
    calculatePrice()
    displayPrices()
    handleForm()
  }
  init()

  // event listeners
  // checkbox
  domElements.checkBoxes.forEach((c) => {
    c.addEventListener('click', () => {
      handleCheckBox(c)
    })
  })

  // form prevent default
  domElements.form.addEventListener(
    'submit',
    (e) => {
      e.preventDefault() // stops page reload & Webflow handling
      e.stopImmediatePropagation() // stops Webflow listeners from firing
    },
    true
  ) // use capture phase to block Webflow's listener

  // checkOutButton
  domElements.checkOutButton.addEventListener('mouseover', hoverIn)
  domElements.checkOutButton.addEventListener('mouseleave', hoverOut)
  domElements.checkOutButton.addEventListener('click', () => {
    click()
  })
}

export default handleCheckOutModal
