import gsap from 'gsap'

function hoverStoreProducts() {
  function queryDomElements() {
    return {
      products: document.querySelectorAll('.product-card'),
      imageWrappers: document.querySelectorAll('.product-img-wrapper'),
    }
  }
  const domElements = queryDomElements()

  // event listeners
  domElements.imageWrappers.forEach((p) => {
    const img = p.firstElementChild

    gsap.set(img, { transformOrigin: 'center center' })

    p.addEventListener('mouseenter', () => {
      gsap.to(img, {
        scale: 2,
        duration: 0.6,
      })
    })
    p.addEventListener('mouseleave', () => {
      gsap.to(img, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
      })
    })
    p.addEventListener('mousemove', (e) => {
      const rect = p.getBoundingClientRect()

      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Map to range -1..1 from the center
      const mappedX = (e.clientX - centerX) / (rect.width / 2)
      const mappedY = (e.clientY - centerY) / (rect.height / 2)

      gsap.to(img, {
        x: -60 * mappedX,
        y: -60 * mappedY,
        duration: 0.2,
        ease: 'power2.out',
      })
    })
  })
}

export default hoverStoreProducts
