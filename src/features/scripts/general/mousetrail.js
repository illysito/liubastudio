import gsap from 'gsap'

import { $, $$ } from '../../utils/getElement.js'

function mousetrail() {
  function domElementsQuery() {
    return {
      canvas: $('.mouse__trail'),
      blocks: $$('.mousetrail-block'),
    }
  }

  function followMouse(e) {
    const x = e.clientX
    const y = e.pageY
    const rect = domElements.canvas.getBoundingClientRect()
    domElements.canvas.style.left = `${x - rect.width / 2}px`
    domElements.canvas.style.top = `${y - rect.height / 2}px`
  }

  function showBlock(block) {
    gsap.to(block, {
      x: 2 * (4 - 8 * Math.random()),
      y: 2 * (3 - 6 * Math.random()),
      opacity: 1,
      duration: 0.1,
      ease: 'none',
      onComplete: () => {
        hideBlockDelayed(block)
      },
    })
  }

  function hideBlock(block) {
    gsap.to(block, {
      opacity: 0,
      duration: 0.1,
      ease: 'none',
    })
  }

  function hideBlockDelayed(block) {
    gsap.to(block, {
      delay: 0.1,
      opacity: 0,
      duration: 0.1,
      ease: 'power1.inOut',
    })
  }

  function animateBlocks() {
    domElements.blocks.forEach((b) => {
      const r = Math.random()
      r > 0.5 ? showBlock(b) : hideBlock(b)
    })
  }

  function throttle(func, interval) {
    let isRunning = false
    return function (...args) {
      if (!isRunning) {
        isRunning = true
        func.apply(this, args)
        setTimeout(() => {
          isRunning = false
        }, interval)
      }
    }
  }

  const throttledAnimateBlocks = throttle(animateBlocks, 120)

  const domElements = domElementsQuery()

  window.addEventListener('mousemove', (e) => {
    followMouse(e)
    throttledAnimateBlocks()
  })
}

export default mousetrail
