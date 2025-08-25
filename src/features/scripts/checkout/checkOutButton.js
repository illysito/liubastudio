import gsap from 'gsap'
import SplitType from 'split-type'

import { $, $$ } from '../../utils/getElement.js'

function checkOutButton() {
  function queryDomElements() {
    return {
      checkOutButton: $('.complete-checkout-button'),
      checkBoxes: $$('.shipping-checkbox'),
      loadingCircle: $('.loading-circle'),
    }
  }
  const domElements = queryDomElements()

  // animate loading circle
  gsap.to(domElements.loadingCircle, {
    rotation: 360,
    repeat: -1,
    duration: 4,
  })

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
    function animate() {
      // gsap.to([checkOutButtonText, checkOutButtonHiddenText], {
      //   opacity: 0,
      //   duration: 0.2,
      // })
      gsap.to(domElements.loadingCircle, {
        opacity: 1,
        ease: 'none',
      })
      gsap.to(domElements.checkOutButton, {
        scale: 0.96,
        duration: 0.1,
        onComplete: () => {
          gsap.to(domElements.checkOutButton, {
            scale: 0.98,
            duration: 0,
            opacity: 0,
          })
        },
      })
      domElements.checkOutButton.style.pointerEvents = 'none'
      setTimeout(() => {
        gsap.to(domElements.checkOutButton, {
          opacity: 1,
        })
        domElements.checkOutButton.style.pointerEvents = 'auto'
      }, 5000)
    }
    function sendDataToServer() {
      let cart = []
      let storedCart = JSON.parse(localStorage.getItem('cart')) || []

      let shippingPriceId = ''

      for (let i = 0; i < storedCart.length; i++) {
        const item = { itemId: storedCart[i].id }
        cart.push(item)
      }

      domElements.checkBoxes.forEach((c) => {
        if (c.classList.contains('is--checked')) {
          shippingPriceId = c.id
        }
      })

      let finalData = {
        finalCart: cart,
        shippingId: shippingPriceId,
      }

      fetch('https://liuba-stripe-backend.vercel.app/api/checkout', {
        // your server endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData), // send your cart + shipping ID
      })
        .then((res) => res.json())
        .then((data) => {
          // Server returns something: maybe Stripe session ID
          console.log('Server response:', data)
          console.log(data.url)
          window.location.href = data.url
        })
        .catch((err) => console.error('Error sending cart:', err))
    }
    sendDataToServer()
    animate()
  }

  let storedCart = JSON.parse(localStorage.getItem('cart')) || []
  if (storedCart.length == 0) {
    domElements.checkOutButton.style.pointerEvents = 'none'
    domElements.checkOutButton.style.opacity = 0.5
  } else {
    domElements.checkOutButton.style.pointerEvents = 'auto'
    domElements.checkOutButton.style.opacity = 1
  }

  // checkOutButton
  domElements.checkOutButton.addEventListener('mouseover', hoverIn)
  domElements.checkOutButton.addEventListener('mouseleave', hoverOut)
  domElements.checkOutButton.addEventListener('click', () => {
    click()
  })
}

export default checkOutButton
