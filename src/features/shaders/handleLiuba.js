import gsap from 'gsap'

import liuba from '../shaders/liuba'

function handleLiuba() {
  let mouseX = 0.5
  let mouseY = 0.5
  const mouseXRef = { current: mouseX }
  const mouseYRef = { current: mouseY }
  const trigger = document.querySelector('.liuba-canvas')
  let isObserved = { current: false }
  let lastScrollY = window.scrollY

  //prettier-ignore
  const updateUniforms = liuba(mouseXRef, mouseYRef, isObserved)

  window.addEventListener('mousemove', (event) => {
    //prettier-ignore
    mouseXRef.current = gsap.utils.mapRange(0, window.innerWidth, 0.45, 0.65, event.clientX)
    //prettier-ignore
    mouseYRef.current = gsap.utils.mapRange(0, window.innerHeight, 0.45, 0.65, event.clientY)
    // console.log(mouseXRef.current, mouseYRef.current)
    updateUniforms(mouseXRef, mouseYRef)
  })

  // update isObserved on observation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!isObserved.current) {
            isObserved.current = 1.0
            // console.log('MAIN LIUBA - isObserved: ' + isObserved.current)
            updateUniforms(mouseXRef, mouseYRef, isObserved)
          }
        } else {
          if (window.scrollY < lastScrollY) {
            isObserved.current = 0.0
            // console.log('MAIN LIUBA - isObserved: ' + isObserved.current)
            updateUniforms(mouseXRef, mouseYRef, isObserved)
          } else {
            isObserved.current = 0.0
            // console.log('MAIN LIUBA - isObserved: ' + isObserved.current)
            updateUniforms(mouseXRef, mouseYRef, isObserved)
          }
        }
      })
    },
    { threshold: 0.0 }
  )

  observer.observe(trigger)

  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY
  })
}

export default handleLiuba
