import gsap from 'gsap'

function contact() {
  const links = document.querySelectorAll('.footer-nav-contact')
  const button = document.querySelector('.form-button')

  links.forEach((l) => {
    l.addEventListener('mouseover', () => {
      gsap.to(l, {
        opacity: 0.8,
        x: 12,
        duration: 0.2,
        ease: 'power.inOut',
      })
    })
    l.addEventListener('mouseleave', () => {
      gsap.to(l, {
        opacity: 1,
        x: 0,
        duration: 0.2,
        ease: 'power.inOut',
      })
    })
  })

  const isTouchDevice = () =>
    'ontouchstart' in window || navigator.maxTouchPoints > 0

  function hoverIn() {
    gsap.to(button, {
      scale: 0.98,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  function hoverOut() {
    gsap.to(button, {
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  function clickAnimation() {
    gsap.to(button, {
      scale: 0.96,
      duration: 0.1,
      onComplete: () => {
        gsap.to(button, {
          scale: 0.98,
          duration: 0.2,
        })
      },
    })
  }

  function tapAnimation() {
    gsap.to(button, {
      scale: 0.92,
      duration: 0.4,
      onComplete: () => {
        gsap.to(button, {
          delay: 0.2,
          scale: 1,
          duration: 0.2,
        })
      },
    })
  }

  button.addEventListener('click', () => {
    if (isTouchDevice()) {
      tapAnimation()
    } else {
      clickAnimation()
    }
  })

  if (!isTouchDevice()) {
    button.addEventListener('mouseover', () => {
      hoverIn()
    })
    button.addEventListener('mouseleave', () => {
      hoverOut()
    })
  }
}

export default contact
