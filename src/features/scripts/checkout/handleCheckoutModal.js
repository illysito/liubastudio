import gsap from 'gsap'
import SplitType from 'split-type'

function handleCheckOutModal(cart) {
  function queryDomElements() {
    return {
      slidingModal: document.querySelector('.sliding__modal'),
      checkBoxes: document.querySelectorAll('.shipping-checkbox'),
      displayedItemTitle: document.querySelector('.modal-product-title'),
      displayedItemPrice: document.getElementById('modal-item-price'),
      displayedShippingPrice: document.getElementById('modal-shipping-price'),
      displayedTotalPrice: document.getElementById('modal-total-price'),
      form: document.querySelector('.modal-form-container'),
      closeButton: document.querySelector('.close-button'),
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

  let subtotalPrice = 0
  cart.forEach((item) => {
    subtotalPrice += item.price
  })
  console.log(subtotalPrice)
  // let itemPrice = (product.price / 100).toFixed(2)
  // price.textContent = `${itemPrice} €`
  let shippingPrice = {
    id: '',
    price: 0,
  }
  let totalPrice = subtotalPrice + shippingPrice.price

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

  // function displayText() {
  //   // domElements.displayedItemTitle.textContent = product.name
  //   domElements.displayedItemTitle.textContent = 'Just testinf'
  // }

  function calculatePrice() {
    totalPrice = subtotalPrice + shippingPrice.price
    displayPrices()
  }

  function displayPrices() {
    domElements.displayedItemPrice.textContent = `${(
      subtotalPrice / 100
    ).toFixed(2)} €`
    domElements.displayedShippingPrice.textContent = `${(
      shippingPrice.price / 100
    ).toFixed(2)} €`
    domElements.displayedTotalPrice.textContent = `${(totalPrice / 100).toFixed(
      2
    )} €`
  }

  function handleForm() {
    console.log('Im handling the form')
  }

  function hoverIn() {
    gsap.to(domElements.checkOutButton, {
      scale: 0.98,
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
    // displayText()
    calculatePrice()
    displayPrices()
    handleForm()
  }
  init()

  // event listeners
  // checkbox
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

  // form prevent default
  if (domElements.form) {
    domElements.form.addEventListener(
      'submit',
      (e) => {
        e.preventDefault() // stops page reload & Webflow handling
        e.stopImmediatePropagation() // stops Webflow listeners from firing
      },
      true
    ) // use capture phase to block Webflow's listener
  }
  // checkOutButton
  domElements.checkOutButton.addEventListener('mouseover', hoverIn)
  domElements.checkOutButton.addEventListener('mouseleave', hoverOut)
  domElements.checkOutButton.addEventListener('click', () => {
    click()
  })
  // domElements.closeButton.addEventListener('click', () => {
  //   gsap.to(domElements.slidingModal, {
  //     xPercent: 0,
  //     duration: 0.8,
  //     ease: 'power4.inOut',
  //   })
  // })
}

export default handleCheckOutModal
