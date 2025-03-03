import gsap from 'gsap'

function footer() {
  const footer = document.querySelector('.footer__section')
  const heading = document.querySelector('.footer-h')
  const footer_nav = document.querySelectorAll('.footer-nav')
  const footer_link = document.querySelectorAll('.footer-link')
  const made_by_link = document.querySelector('.made-by-link')
  const made_by = document.querySelector('.made-by')

  const ease = 'power1.out'

  gsap.to([heading, footer_nav, made_by], {
    yPercent: -100,
    duration: 1,
    scrollTrigger: {
      trigger: footer,
      start: 'top 88%',
      markers: false,
    },
  })

  function hoverIn(event) {
    const l = event.currentTarget
    const header = l.firstElementChild
    const hidden_header = header.nextElementSibling
    gsap.to([header, hidden_header], {
      opacity: 0.5,
      duration: 0.25,
      ease: ease,
    })
  }

  function hoverOut(event) {
    const l = event.currentTarget
    const header = l.firstElementChild
    const hidden_header = header.nextElementSibling
    gsap.to([header, hidden_header], {
      opacity: 1,
      duration: 0.25,
      ease: ease,
    })
  }

  footer_link.forEach((l) => {
    l.addEventListener('mouseover', hoverIn)
    l.addEventListener('mouseleave', hoverOut)
  })

  made_by_link.addEventListener('mouseover', () => {
    gsap.to(made_by_link, {
      opacity: 0.5,
      duration: 0.25,
      ease: ease,
    })
  })
  made_by_link.addEventListener('mouseleave', () => {
    gsap.to(made_by_link, {
      opacity: 1,
      duration: 0.25,
      ease: ease,
    })
  })
}

export default footer
