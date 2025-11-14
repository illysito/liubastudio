import { gsap } from 'gsap'
import SplitType from 'split-type'

function coursesInteraction() {
  // courses headers
  const course_headers_wrapper = document.querySelectorAll('.courses-h-wrapper')
  const course_headers = document.querySelectorAll('.courses-h')

  // courses titles
  const title_headings = document.querySelectorAll('.title-heading')
  const title_lines = document.querySelectorAll('.title-line')

  // course cards
  const course_card_headings = document.querySelectorAll('.course-card-heading')
  const course_card_subheadings = document.querySelectorAll(
    '.course-card-subheading'
  )
  const course_imgs = document.querySelectorAll('.course-img')
  const course_card_ps = document.querySelectorAll('.course-card-p')

  // button
  const button = document.querySelector('.courses-button')

  const isTouchDevice = () =>
    'ontouchstart' in window || navigator.maxTouchPoints > 0

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

  // course card reveal
  course_card_headings.forEach((h) => {
    gsap.to(h, {
      yPercent: -100,
      opacity: 1,
      duration: 0.8,
      scrollTrigger: {
        trigger: h,
        start: 'top 98%',
      },
    })
  })
  course_card_subheadings.forEach((h) => {
    gsap.to(h, {
      yPercent: -100,
      opacity: 1,
      duration: 0.8,
      scrollTrigger: {
        trigger: h,
        start: 'top 98%',
      },
    })
  })
  course_card_ps.forEach((p) => {
    gsap.to(p, {
      opacity: 1,
      duration: 0.6,
      scrollTrigger: {
        trigger: p,
        start: 'top 92%',
        // markers: true,
      },
    })
  })

  // reveal on courses headers
  gsap.to(course_headers, {
    opacity: 1,
    yPercent: -100,
    stagger: 0.05,
    duration: 1.2,
    scrollTrigger: {
      trigger: course_headers_wrapper,
      start: 'top 92%',
    },
  })

  // image hovers
  course_imgs.forEach((img) => {
    const wrapper = img.parentElement
    img.addEventListener('mouseover', () => {
      gsap.to(img, {
        scale: 1.05,
        duration: 0.6,
      })
      gsap.to(wrapper, {
        borderRadius: 8,
        duration: 0.4,
      })
    })
    img.addEventListener('mouseleave', () => {
      gsap.to(img, {
        scale: 1,
        duration: 0.6,
      })
      gsap.to(wrapper, {
        borderRadius: 0,
        duration: 0.4,
      })
    })
  })

  // button

  // hover buttons
  function hoverInButton(b, splitText, splitHiddenText) {
    gsap.to(b, {
      scale: 0.98,
      backgroundColor: '#0e0e0e',
      borderColor: '#0e0e0e',
      duration: 0.4,
      ease: 'power2.out',
    })
    gsap.to(splitText.chars, {
      color: '#fff8ee',
      yPercent: -100,
      stagger: 0.02,
      ease: 'power2.out',
    })
    gsap.to(splitHiddenText.chars, {
      color: '#fff8ee',
      yPercent: -100,
      stagger: 0.02,
      ease: 'power2.out',
    })
  }

  function hoverOutButton(b, splitText, splitHiddenText) {
    gsap.to(b, {
      scale: 1,
      backgroundColor: '#3e50d600',
      borderColor: '#0e0e0e',
      duration: 0.4,
      ease: 'power2.out',
    })
    gsap.to(splitText.chars, {
      color: '#0e0e0e',
      yPercent: 0,
      stagger: 0.02,
      ease: 'power2.out',
    })
    gsap.to(splitHiddenText.chars, {
      color: '#0e0e0e',
      yPercent: 0,
      stagger: 0.02,
      ease: 'power2.out',
    })
  }

  function clickAnimationButton(b) {
    gsap.to(b, {
      scale: 0.96,
      duration: 0.1,
      onComplete: () => {
        gsap.to(b, {
          scale: 0.98,
          duration: 0.2,
        })
      },
    })
  }

  function tapAnimationButton(b) {
    const wrapper = b.firstElementChild
    const text = wrapper.firstElementChild

    gsap.to(text, {
      color: '#fff8ee',
      duration: 0.1,
    })
    gsap.to(b, {
      backgroundColor: '#0e0e0e',
      borderColor: '#0e0e0e',
      scale: 0.92,
      duration: 0.1,
      onComplete: () => {
        gsap.to(b, {
          backgroundColor: '#fff8ee',
          scale: 1,
          duration: 0.2,
        })
        gsap.to(text, {
          color: '#0e0e0e',
          duration: 0.1,
        })
      },
    })
  }

  // event listeners
  const wrapper = button.firstElementChild
  const text = wrapper.firstElementChild
  const hiddenText = wrapper.lastElementChild

  const splitText = new SplitType(text, {
    types: 'chars',
    tagName: 'span',
  })
  const splitHiddenText = new SplitType(hiddenText, {
    types: 'chars',
    tagName: 'span',
  })

  if (!isTouchDevice()) {
    button.addEventListener('mouseover', () => {
      hoverInButton(button, splitText, splitHiddenText)
    })
    button.addEventListener('mouseleave', () => {
      hoverOutButton(button, splitText, splitHiddenText)
    })
    button.addEventListener('click', () => {
      clickAnimationButton(button)
    })
  } else {
    button.addEventListener('click', () => {
      tapAnimationButton(button)
    })
  }
}

export default coursesInteraction
