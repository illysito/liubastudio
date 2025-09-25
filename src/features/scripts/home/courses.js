// MANAGING COURSES INTERACTIONS

import { gsap } from 'gsap'

import { $$ } from '../../utils/getElement'

// ALL KIND OF ANIMATIONS DURING THE HOME EXPERIENCE

function courses() {
  const courseBlocks = $$('.course-block')
  const coursesFixedImages = $$('.courses-fixed-img')

  const isTouchDevice = () =>
    'ontouchstart' in window || navigator.maxTouchPoints > 0

  function hoverInBlock(b, text, arrow) {
    gsap.to(b, {
      backgroundColor: '#f5ecdf',
      duration: 0.4,
      ease: 'power2.out',
    })
    gsap.to([text, arrow], {
      x: 16,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  function hoverOutBlock(b, text, arrow) {
    gsap.to(b, {
      backgroundColor: '#fff8ee',
      duration: 0.4,
      ease: 'power2.out',
    })
    gsap.to([text, arrow], {
      x: 0,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  function showImage(i) {
    coursesFixedImages.forEach((img, index) => {
      if (i !== index) {
        gsap.to(img, {
          opacity: 0,
          duration: 0.1,
        })
      } else {
        gsap.to(img, {
          opacity: 1,
          duration: 0.1,
        })
      }
    })
  }

  function hideImages() {
    coursesFixedImages.forEach((img) => {
      gsap.to(img, {
        opacity: 0,
        duration: 0.1,
      })
    })
  }

  courseBlocks.forEach((b, index) => {
    const text = b.firstElementChild
    const arrow = text.nextElementSibling
    if (!isTouchDevice()) {
      b.addEventListener('mouseover', () => {
        hoverInBlock(b, text, arrow)
        showImage(index)
      })
      b.addEventListener('mouseleave', () => {
        hoverOutBlock(b, text, arrow)
        hideImages()
      })
    }
  })
}

export default courses
