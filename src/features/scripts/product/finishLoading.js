import gsap from 'gsap'

function finishLoading() {
  const loader = document.querySelector('.loading__section')
  const loading_wrapper = document.querySelector('.loading-wrapper')
  gsap.to(loading_wrapper, {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.inOut',
    onComplete: () => {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.2,
        zIndex: -10,
        ease: 'power2.inOut',
      })
    },
  })
}

export default finishLoading
