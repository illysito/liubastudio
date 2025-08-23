import gsap from 'gsap'

function loadingStore() {
  function queryDomElements() {
    return {
      frames: document.querySelectorAll('.is--stem'),
    }
  }
  const DOM = queryDomElements()

  const tl = gsap.timeline({
    repeat: -1,
    yoyo: true,
  })

  DOM.frames.forEach((frame) => {
    tl.to(frame, { opacity: 1, duration: 0.2, ease: 'none' }) // fade in
      .to(frame, { opacity: 0, duration: 0.2, ease: 'none' }, '>-0.3') // hold, then fade out
  })
}

export default loadingStore
