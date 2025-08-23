import gsap from 'gsap'

function loadingProduct() {
  function queryDomElements() {
    return {
      img: document.querySelectorAll('.loading-icon'),
    }
  }
  const DOM = queryDomElements()

  gsap.to(DOM.img, {
    rotation: 12,
    duration: 2,
    repeat: -1,
    yoyo: true,
  })
}

export default loadingProduct
