import gsap from 'gsap'

function hero() {
  const canvas = document.querySelector('.liuba-canvas-wrapper')
  // const ease = 'power1.out'
  gsap.to(canvas, {
    opacity: 1,
    scale: 1,
    duration: 3,
    ease: 'power2.out',
  })
}

export default hero
