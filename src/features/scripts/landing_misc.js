import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function landingMisc() {
  const title_headings = document.querySelectorAll('.title-heading')
  const title_lines = document.querySelectorAll('.title-line')
  const collection_titles = document.querySelectorAll('.collection-title-2')
  // const collection_imgs = document.querySelectorAll('.collection-img-2')
  const collection_canvas = document.querySelectorAll('.collection-canvas')
  // sections
  const collection_section = document.querySelector('.collection__section__2')
  const about_section = document.querySelector('.about__section')

  // heading and lines of separators
  title_headings.forEach((title) => {
    gsap.to(title, {
      opacity: 1,
      yPercent: -100,
      duration: 0.8,
      scrollTrigger: {
        trigger: title,
        start: 'top 90%',
        // end: 'top 80%',
        scrub: false,
        markers: false,
      },
      ease: 'power1.inOut',
    })
  })
  title_lines.forEach((line) => {
    gsap.to(line, {
      opacity: 1,
      duration: 1.6,
      scrollTrigger: {
        trigger: line,
        start: 'top 90%',
        // end: 'top 80%',
        scrub: false,
        markers: false,
      },
      ease: 'power1.inOut',
    })
  })

  // titles on collection cards (only not hidden, even indexes)
  collection_titles.forEach((title, index) => {
    if (index === 0 || index % 2 === 0) {
      gsap.to(title, {
        opacity: 1,
        yPercent: -100,
        duration: 0.8,
        scrollTrigger: {
          trigger: title,
          start: 'top 90%',
          // end: 'top 80%',
          scrub: false,
          markers: false,
        },
        ease: 'power1.inOut',
      })
    } else {
      gsap.to(title, {
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: title,
          start: 'top 90%',
          // end: 'top 80%',
          scrub: false,
          markers: false,
        },
        ease: 'power1.inOut',
      })
    }
  })

  // ------------- PARALLAX ------------ //
  // parallax on collection images
  gsap.to(collection_canvas, {
    y: -32,
    scrollTrigger: {
      trigger: collection_canvas,
      start: 'top bottom',
      end: 'top top',
      scrub: true,
      markers: false,
    },
  })

  // parallax on sections
  gsap.to(collection_section, {
    y: -28,
    scrollTrigger: {
      trigger: collection_section,
      start: 'top bottom',
      end: 'top top',
      scrub: true,
      markers: false,
    },
  })
  gsap.to(about_section, {
    y: -28,
    scrollTrigger: {
      trigger: about_section,
      start: 'top bottom',
      end: 'top top',
      scrub: true,
      markers: false,
    },
  })
}

export default landingMisc
