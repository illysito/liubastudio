import gsap from 'gsap'

function nav() {
  const nav_link = document.querySelectorAll('.nav-link')
  const logo_link = document.querySelector('.logo-link')

  const ease = 'power1.out'

  function hoverIn(event) {
    const l = event.currentTarget
    const header = l.firstElementChild
    const hidden_header = header.nextElementSibling
    gsap.to([header, hidden_header], {
      yPercent: -100,
      duration: 0.5,
      ease: ease,
    })
  }

  function hoverOut(event) {
    const l = event.currentTarget
    const header = l.firstElementChild
    const hidden_header = header.nextElementSibling
    gsap.to([header, hidden_header], {
      yPercent: 0,
      duration: 0.5,
      ease: ease,
    })
  }

  nav_link.forEach((l) => {
    l.addEventListener('mouseover', hoverIn)
    l.addEventListener('mouseleave', hoverOut)
  })

  logo_link.addEventListener('mouseover', () => {
    gsap.to(logo_link, {
      scale: 0.97,
      opacity: 0.8,
      duration: 0.5,
      ease: ease,
    })
  })
  logo_link.addEventListener('mouseleave', () => {
    gsap.to(logo_link, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: ease,
    })
  })
}

export default nav
