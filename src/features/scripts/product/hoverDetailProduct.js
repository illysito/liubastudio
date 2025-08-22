import gsap from 'gsap'

function hoverDetailProducts() {
  function queryDomElements() {
    return {
      imageWrapper: document.querySelector('.detail-img-wrapper'),
    }
  }
  const domElements = queryDomElements()

  // event listeners

  const img = domElements.imageWrapper.firstElementChild

  gsap.set(img, { transformOrigin: 'center center' })

  domElements.imageWrapper.addEventListener('mouseenter', () => {
    gsap.to(img, {
      scale: 1.4,
      duration: 0.3,
    })
  })
  domElements.imageWrapper.addEventListener('mouseleave', () => {
    gsap.to(img, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.3,
    })
  })
  domElements.imageWrapper.addEventListener('mousemove', (e) => {
    const rect = domElements.imageWrapper.getBoundingClientRect()

    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Map to range -1..1 from the center
    const mappedX = (e.clientX - centerX) / (rect.width / 2)
    const mappedY = (e.clientY - centerY) / (rect.height / 2)

    gsap.to(img, {
      x: -80 * mappedX,
      y: -80 * mappedY,
      duration: 0.2,
      ease: 'power2.out',
    })
  })
}

export default hoverDetailProducts
