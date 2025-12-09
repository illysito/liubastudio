import gsap from 'gsap'
import SplitType from 'split-type'

import { $, $$ } from '../../utils/getElement.js'

function nav() {
  const nav_section = $('.nav__section')
  const nav_link = $$('.nav-link')
  const logo_link = $('.logo-link')
  const menu_screen = $('.menu__screen')
  const menu_header = $$('.menu-h')
  const menu_link = $$('.menu-link')
  const burger = $('.burger-link')
  const back_wrapper = $('.back-wrapper')
  const menu_img = $('.menu-img')

  const ease = 'power2.out'

  function hoverIn(header, hidden_header) {
    // const l = event.currentTarget
    // const header = l.firstElementChild
    // const hidden_header = header.nextElementSibling
    gsap.to(header.chars, {
      yPercent: -100,
      duration: 0.4,
      ease: ease,
      stagger: 0.01,
    })
    gsap.to(hidden_header.chars, {
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
    gsap.to(hidden_header.chars, {
      yPercent: 0,
      duration: 0.4,
      ease: ease,
      stagger: 0.01,
    })
    gsap.to(header.chars, {
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
    const afterNav = nav_section.nextElementSibling
    // console.log(afterNav)

    burger.addEventListener('click', () => {
      document.body.style.overflow = 'hidden'
      burger.style.pointerEvents = 'none'
      menu_screen.style.pointerEvents = 'none'
      gsap.to(afterNav, {
        yPercent: 12,
        duration: 1.2,
        ease: 'power2.inOut',
      })
      gsap.to(menu_screen, {
        yPercent: 200,
        duration: 1.2,
        ease: 'power2.inOut',
      })
      gsap.to(menu_header, {
        yPercent: -200,
        duration: 1.4,
        ease: 'power1.inOut',
        stagger: 0.05,
        onComplete: () => {
          burger.style.pointerEvents = 'auto'
          menu_screen.style.pointerEvents = 'auto'
        },
      })
      gsap.to(menu_img, {
        opacity: 1,
        duration: 1.2,
        ease: 'power2.inOut',
      })
    })

    menu_link.forEach((link) => {
      link.addEventListener('click', () => {
        document.body.style.overflow = 'visible'
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
        gsap.to(menu_img, {
          opacity: 0,
          duration: 1.4,
          ease: 'power2.inOut',
        })
      })
    })

    back_wrapper.addEventListener('click', () => {
      document.body.style.overflow = 'visible'
      burger.style.pointerEvents = 'none'
      menu_screen.style.pointerEvents = 'none'
      gsap.to(afterNav, {
        yPercent: 0,
        duration: 1.2,
        ease: 'power2.inOut',
      })
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
      gsap.to(menu_img, {
        opacity: 0,
        duration: 1.4,
        ease: 'power2.inOut',
      })
    })
  }
}

export default nav
