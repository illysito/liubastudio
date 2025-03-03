import gsap from 'gsap'

function mainCollection() {
  const cards = document.querySelectorAll('.collection-card')
  const ease = 'power1.out'

  function hoverIn(event) {
    const c = event.currentTarget
    const header_w = c.firstElementChild
    const header = header_w.firstElementChild
    const hidden_header = header.nextElementSibling
    gsap.to(c, {
      backgroundColor: '#3111d5',
      duration: 0.4,
      ease: ease,
    })
    gsap.to([header, hidden_header], {
      yPercent: -100,
      color: '#fffffe',
      duration: 0.6,
      ease: ease,
    })
  }

  function hoverOut(event) {
    const c = event.currentTarget
    const header_w = c.firstElementChild
    const header = header_w.firstElementChild
    const hidden_header = header.nextElementSibling
    gsap.to(c, {
      backgroundColor: '#fffffe',
      duration: 0.4,
      ease: ease,
    })
    gsap.to([header, hidden_header], {
      yPercent: 0,
      color: '#3111d5',
      duration: 0.6,
      ease: ease,
    })
  }

  cards.forEach((card) => {
    card.addEventListener('mouseover', hoverIn)
    card.addEventListener('mouseleave', hoverOut)
  })
}

export default mainCollection
