import { gsap } from 'gsap'
import SplitType from 'split-type'

function heroOpacity() {
  const heading = document.querySelector('.hero-h')
  // const sub_heading = document.querySelector('.hero-subh')

  const splitHeading = new SplitType(heading, { types: 'chars' })
  // const splitSubheading = new SplitType(sub_heading, { types: 'chars' })
  // console.log(splitHeading, splitSubheading)

  let mouseX = 1
  let mouseY = 1
  let h_op = 1
  // let subh_op = 1

  function updateHeading() {
    splitHeading.chars.forEach((char) => {
      // detect sensibility of character
      const rect = char.getBoundingClientRect()
      const centerX = (rect.left + rect.width / 2) / window.innerWidth
      const centerY = (rect.top + rect.height / 2) / window.innerHeight
      // console.log(char.textContent, centerX, centerY)
      // prettier-ignore
      const distance = Math.pow(Math.pow(Math.abs(centerX - mouseX), 2) + Math.pow(Math.abs(centerY - mouseY), 2), 1 / 8)
      h_op = gsap.utils.mapRange(0, 1, 0.5, 1, distance)
      console.log(h_op)
      gsap.to(char, {
        opacity: h_op,
        duration: 0.1,
        ease: 'linear',
      })
    })
  }
  // function updateSubHeading() {
  //   splitSubheading.chars.forEach((char) => {
  //     // detect sensibility of character
  //     const rect = char.getBoundingClientRect()
  //     const centerX = (rect.left + rect.width / 2) / window.innerWidth
  //     const centerY = (rect.top + rect.height / 2) / window.innerHeight
  //     // console.log(char.textContent, centerX, centerY)
  //     // prettier-ignore
  //     const distance2 = Math.pow(Math.pow(Math.abs(centerX - mouseX), 2) + Math.pow(Math.abs(centerY - mouseY), 1 / 8))
  //     subh_op = gsap.utils.mapRange(0, 1, 0.1, 1, distance2)
  //     console.log(subh_op)
  //     gsap.to(char, {
  //       opacity: subh_op,
  //       duration: 0.1,
  //       ease: 'linear',
  //     })
  //   })
  // }

  window.addEventListener('mousemove', (event) => {
    // Both mouse coordinates and character coordinates are NORMALIZED
    // prettier-ignore
    mouseX = gsap.utils.mapRange(0, window.innerWidth, 0, 1, event.clientX)
    // prettier-ignore
    mouseY = gsap.utils.mapRange(0, window.innerHeight, 0, 1, event.clientY)
    // RAF to run once each cycle instead of hundreds
    requestAnimationFrame(() => {
      updateHeading()
      // updateSubHeading()
    })
  })
}

export default heroOpacity
