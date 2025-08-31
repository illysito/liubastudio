import gsap from 'gsap'
import SplitType from 'split-type'

function mainCollection() {
  const cards = document.querySelectorAll('.collection-card-2')
  const ease = 'power1.out'
  const staggerTime = 0.02

  function hoverIn(c, header, hidden_header, img) {
    gsap.to(c, {
      // backgroundColor: '#3111d5',
      duration: 0.4,
      ease: ease,
    })
    gsap.to(header.chars, {
      yPercent: -100,
      // color: '#fffffe',
      duration: 0.6,
      ease: ease,
      stagger: staggerTime,
    })
    gsap.to(hidden_header.chars, {
      yPercent: -100,
      // color: '#fffffe',
      duration: 0.6,
      ease: ease,
      stagger: staggerTime,
    })
    gsap.to(img, {
      scale: 1.15,
      duration: 0.6,
      ease: ease,
    })
  }

  function hoverOut(c, header, hidden_header, img) {
    gsap.to(c, {
      // backgroundColor: '#fffffe',
      duration: 0.4,
      ease: ease,
    })
    gsap.to(header.chars, {
      yPercent: 0,
      // color: '#3111d5',
      duration: 0.6,
      ease: ease,
      stagger: staggerTime,
    })
    gsap.to(hidden_header.chars, {
      yPercent: 0,
      // color: '#3111d5',
      duration: 0.6,
      ease: ease,
      stagger: staggerTime,
    })
    gsap.to(img, {
      scale: 1.1,
      duration: 0.6,
      ease: ease,
    })
  }

  cards.forEach((card, index) => {
    const header_w = card.firstElementChild
    const header = header_w.firstElementChild
    const hidden_header = header.nextElementSibling
    // entro en las imagenes
    const img_w = header_w.nextElementSibling
    const img = img_w.firstElementChild
    // split
    const splitHeader = new SplitType(header, {
      types: 'chars',
      tagName: 'span',
    })
    const splitHiddenHeader = new SplitType(hidden_header, {
      types: 'chars',
      tagName: 'span',
    })

    card.addEventListener('mouseover', () => {
      hoverIn(card, splitHeader, splitHiddenHeader, img)
    })
    card.addEventListener('mouseleave', () => {
      hoverOut(card, splitHeader, splitHiddenHeader, img)
    })
    card.addEventListener('click', () => {
      localStorage.setItem('initial-filter-type', header.textContent)
      localStorage.setItem('initial-filter-index', index + 1)
    })
  })
}

export default mainCollection
