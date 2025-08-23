import gsap from 'gsap'
import SplitType from 'split-type'

import { $, $$ } from '../../utils/getElement.js'
import calculatePrices from './calculatePrices.js'

function handleCheckOutModal(cart) {
  function queryDomElements() {
    return {
      checkBoxes: $$('.shipping-checkbox'),
      form: $('.modal-form-container'),
      checkOutButton: $('.complete-checkout-button'),
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

  function handleCheckBox(currentCheckBox) {
    domElements.checkBoxes.forEach((checkbox) => {
      checkbox.classList.remove('is--checked')
    })
    currentCheckBox.classList.add('is--checked')
    localStorage.setItem('shipping-id', currentCheckBox.id)

    calculatePrices(cart)
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
      scale: 0.96,
      duration: 0.1,
      onComplete: () => {
        gsap.to(domElements.checkOutButton, {
          scale: 0.98,
          duration: 0.2,
        })
      },
    })
  }

  // init
  function init() {
    // displayText()
    calculatePrices(cart)
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
}

export default handleCheckOutModal
