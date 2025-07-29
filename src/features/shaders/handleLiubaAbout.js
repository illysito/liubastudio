import gsap from 'gsap'

import liubaAbout from '../shaders/liubaAbout'

function handleLiubaAbout() {
  let mouseX = 0.5
  let mouseY = 0.5
  const mouseXRef = { current: mouseX }
  const mouseYRef = { current: mouseY }
  const trigger = document.querySelector('.about-canvas')
  let isObserved = { current: false }
  let lastScrollY = window.scrollY

  //prettier-ignore
  const updateUniforms = liubaAbout(mouseXRef, mouseYRef, isObserved)

  // update mouse on mousemove
  window.addEventListener('mousemove', (event) => {
    //prettier-ignore
    mouseXRef.current = gsap.utils.mapRange(0, window.innerWidth, 0.45, 0.65, event.clientX)
    //prettier-ignore
    mouseYRef.current = gsap.utils.mapRange(0, window.innerHeight, 0.45, 0.65, event.clientY)
    // console.log(mouseXRef.current, mouseYRef.current)
    updateUniforms(mouseXRef, mouseYRef, isObserved.current)
  })

  // update isObserved on observation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!isObserved.current) {
            isObserved.current = 1.0
            // console.log('ABOUT - isObserved: ' + isObserved.current)
            updateUniforms(mouseXRef, mouseYRef, isObserved)
          }
        } else {
          if (window.scrollY < lastScrollY) {
            isObserved.current = 0.0
            // console.log('ABOUT - isObserved: ' + isObserved.current)
            updateUniforms(mouseXRef, mouseYRef, isObserved)
          } else {
            isObserved.current = 0.0
            // console.log('ABOUT - isObserved: ' + isObserved.current)
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

export default handleLiubaAbout
