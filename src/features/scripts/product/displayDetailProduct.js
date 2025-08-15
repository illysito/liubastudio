import gsap from 'gsap'
import SplitType from 'split-type'

function displayDetailProduct(product) {
  function queryDomElements() {
    return {
      backButton: document.querySelector('.back-text-wrapper'),
    }
  }
  const domElements = queryDomElements()

  // Back to collection
  function backToCollection() {
    const ease = 'power1.out'
    const staggerTime = 0.02
    const header = domElements.backButton.firstElementChild
    const headerHidden = domElements.backButton.lastElementChild
    const splitHeader = new SplitType(header, {
      types: 'chars',
      tagName: 'span',
    })
    const splitHiddenHeader = new SplitType(headerHidden, {
      types: 'chars',
      tagName: 'span',
    })

    function backButtonHoverIn() {
      gsap.to(splitHeader.chars, {
        yPercent: -100,
        // color: '#fffffe',
        duration: 0.6,
        ease: ease,
        stagger: staggerTime,
      })
      gsap.to(splitHiddenHeader.chars, {
        yPercent: -100,
        // color: '#fffffe',
        duration: 0.6,
        ease: ease,
        stagger: staggerTime,
      })
    }
    function backButtonHoverOut() {
      gsap.to(splitHeader.chars, {
        yPercent: 0,
        // color: '#3111d5',
        duration: 0.6,
        ease: ease,
        stagger: staggerTime,
      })
      gsap.to(splitHiddenHeader.chars, {
        yPercent: 0,
        // color: '#3111d5',
        duration: 0.6,
        ease: ease,
        stagger: staggerTime,
      })
    }

    domElements.backButton.addEventListener('mouseover', backButtonHoverIn)
    domElements.backButton.addEventListener('mouseleave', backButtonHoverOut)
  }
  backToCollection()

  // Display detail product data
  console.log(product)
}

export default displayDetailProduct
