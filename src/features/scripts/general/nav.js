import gsap from 'gsap'
import SplitType from 'split-type'

function nav() {
  const nav_link = document.querySelectorAll('.nav-link')
  const logo_link = document.querySelector('.logo-link')
  const menu_screen = document.querySelector('.menu__screen')
  const menu_header = document.querySelectorAll('.menu-h')
  const menu_link = document.querySelectorAll('.menu-link')
  const burger = document.querySelector('.burger-link')
  const back_wrapper = document.querySelector('.back-wrapper')

  const ease = 'power2.out'

  function hoverIn(header, hidden_header) {
    // const l = event.currentTarget
    // const header = l.firstElementChild
    // const hidden_header = header.nextElementSibling
    gsap.to([header.chars, hidden_header.chars], {
      yPercent: -100,
      duration: 0.4,
      ease: ease,
      stagger: 0.01,
    })
  }

  function hoverOut(header, hidden_header) {
    // const l = event.currentTarget
    // const header = l.firstElementChild
    // const hidden_header = header.nextElementSibling
    gsap.to([header.chars, hidden_header.chars], {
      yPercent: 0,
      duration: 0.4,
      ease: ease,
      stagger: 0.01,
    })
  }

  nav_link.forEach((l) => {
    const header = l.firstElementChild
    const hidden_header = header.nextElementSibling
    const splitHeader = new SplitType(header, {
      types: 'chars',
      tagName: 'span',
    })
    const splitHiddenHeader = new SplitType(hidden_header, {
      types: 'chars',
      tagName: 'span',
    })
    l.addEventListener('mouseover', () => {
      hoverIn(splitHeader, splitHiddenHeader)
    })
    l.addEventListener('mouseleave', () => {
      hoverOut(splitHeader, splitHiddenHeader)
    })
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

    menu_link.forEach((link) => {
      link.addEventListener('click', () => {
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
