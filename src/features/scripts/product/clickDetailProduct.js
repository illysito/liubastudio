import gsap from 'gsap'
import SplitType from 'split-type'

function clickDeatilProduct() {
  function queryDomElements() {
    return {
      buttons: document.querySelectorAll('.add-button-detail'),
    }
  }
  const domElements = queryDomElements()

  function hoverIn(b, splitText, splitHiddenText) {
    gsap.to(b, {
      backgroundColor: '#3e50d6',
      duration: 0.4,
      ease: 'power2.out',
    })
    gsap.to(splitText.chars, {
      color: '#fff8ee',
      yPercent: -100,
      stagger: 0.02,
      ease: 'power2.out',
    })
    gsap.to(splitHiddenText.chars, {
      color: '#fff8ee',
      yPercent: -100,
      stagger: 0.02,
      ease: 'power2.out',
    })
  }

  function hoverOut(b, splitText, splitHiddenText) {
    gsap.to(b, {
      backgroundColor: '#3e50d600',
      duration: 0.4,
      ease: 'power2.out',
    })
    gsap.to(splitText.chars, {
      color: '#3e50d6',
      yPercent: 0,
      stagger: 0.02,
      ease: 'power2.out',
    })
    gsap.to(splitHiddenText.chars, {
      color: '#3e50d6',
      yPercent: 0,
      stagger: 0.02,
      ease: 'power2.out',
    })
  }

  // write a function to FETCH ID

  // event listeners
  domElements.buttons.forEach((b) => {
    const wrapper = b.firstElementChild
    const text = wrapper.firstElementChild
    const hiddenText = wrapper.lastElementChild

    const splitText = new SplitType(text, {
      types: 'chars',
      tagName: 'span',
    })
    const splitHiddenText = new SplitType(hiddenText, {
      types: 'chars',
      tagName: 'span',
    })

    b.addEventListener('mouseover', () => {
      hoverIn(b, splitText, splitHiddenText)
    })
    b.addEventListener('mouseleave', () => {
      hoverOut(b, splitText, splitHiddenText)
    })
  })
}

export default clickDeatilProduct
