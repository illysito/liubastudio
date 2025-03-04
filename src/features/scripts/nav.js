import gsap from 'gsap'

function nav() {
  const nav_link = document.querySelectorAll('.nav-link')
  const logo_link = document.querySelector('.logo-link')
  const menu_screen = document.querySelector('.menu__screen')
  const menu_header = document.querySelectorAll('.menu-h')
  const burger = document.querySelector('.burger-link')
  const back_wrapper = document.querySelector('.back-wrapper')

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

  // MENU SCREEN

  if (burger) {
    burger.addEventListener('click', () => {
      burger.style.pointerEvents = 'none'
      menu_screen.style.pointerEvents = 'none'
      gsap.to(menu_screen, {
        yPercent: 100,
        duration: 1.4,
        ease: 'power2.inOut',
      })
      gsap.to(menu_header, {
        yPercent: -100,
        duration: 1.6,
        ease: 'power1.inOut',
        stagger: 0.05,
        onComplete: () => {
          burger.style.pointerEvents = 'auto'
          menu_screen.style.pointerEvents = 'auto'
        },
      })
    })
    back_wrapper.addEventListener('click', () => {
      burger.style.pointerEvents = 'none'
      menu_screen.style.pointerEvents = 'none'
      gsap.to(menu_header, {
        yPercent: 100,
        duration: 1.2,
        ease: 'power1.inOut',
        onComplete: () => {
          burger.style.pointerEvents = 'auto'
          menu_screen.style.pointerEvents = 'auto'
        },
      })
      gsap.to(menu_screen, {
        yPercent: 0,
        duration: 1.4,
        ease: 'power2.inOut',
      })
    })
  }
}

export default nav
