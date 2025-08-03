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
    p.addEventListener('mouseenter', (e) => {
      const card = e.currentTarget
      const img = card.firstElementChild
      gsap.to(img, {
        scale: 2,
        duration: 0.4,
      })
    })
    p.addEventListener('mouseleave', (e) => {
      const card = e.currentTarget
      const img = card.firstElementChild
      gsap.to(img, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.4,
      })
    })
    p.addEventListener('mousemove', (e) => {
      const card = e.currentTarget
      const img = card.firstElementChild

      const rect = card.getBoundingClientRect()
      const imgLeft = rect.left
      const imgRight = rect.right
      const imgTop = rect.top
      const imgBottom = rect.bottom

      console.log(imgLeft, imgRight)
      const x = e.clientX
      const y = e.clientY
      console.log('x: ' + x)
      gsap.utils.mapRange(imgLeft, imgRight, -1, 1, x)
      gsap.utils.mapRange(imgTop, imgBottom, -1, 1, y)
      gsap.to(img, {
        x: -0.1 * x,
        y: -0.1 * y,
      })
    })
  })
}

export default hoverStoreProducts
