import gsap from 'gsap'

function audio() {
  const body = document.body
  const soundOn = document.querySelector('.sound-on')
  const soundOff = document.querySelector('.sound-off')

  function isMobile() {
    return window.matchMedia('(max-width: 768px)').matches
  }

  console.log('Audio: is it mobile?: ' + isMobile())

  if (!isMobile()) {
    let audio
    if (body.classList.contains('body__home')) {
      audio = document.getElementById('bg-audio-home')
    } else if (body.classList.contains('body__collection')) {
      audio = document.getElementById('bg-audio-collection')
    } else if (body.classList.contains('body__courses')) {
      audio = document.getElementById('bg-audio-courses')
    } else if (body.classList.contains('body__spaces')) {
      audio = document.getElementById('bg-audio-spaces')
    } else if (body.classList.contains('body__contact')) {
      audio = document.getElementById('bg-audio-contact')
    } else if (body.classList.contains('body__misc')) {
      audio = document.getElementById('bg-audio-misc')
    } else {
      console.log('no audio found')
    }
    const button = document.querySelector('.sound-button')
    const audioAccepted = localStorage.getItem('audioAccepted')

    // fade in
    gsap.to(button, {
      opacity: 1,
      duration: 0.8,
      delay: 0.4,
    })

    // movement
    gsap.to(button, {
      rotation: 12,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'linear',
    })

    // initial state
    if (audioAccepted === 'true') {
      // Play the appropriate audio for this page
      audio.play()
      soundOn.style.opacity = 1
      soundOff.style.opacity = 0
    } else {
      soundOn.style.opacity = 0
      soundOff.style.opacity = 1
    }

    // event listeners
    button.addEventListener('click', () => {
      if (audio.paused) {
        localStorage.setItem('audioAccepted', 'true')
        audio.play()
        console.log('button pressed')
        gsap.to(soundOn, {
          opacity: 1,
          duration: 0.4,
          ease: 'power1.inOut',
        })
        gsap.to(soundOff, {
          opacity: 0,
          duration: 0.4,
          ease: 'power1.inOut',
        })
      } else {
        localStorage.setItem('audioAccepted', 'false')
        audio.pause()
        gsap.to(soundOn, {
          opacity: 0,
          duration: 0.4,
          ease: 'power1.inOut',
        })
        gsap.to(soundOff, {
          opacity: 1,
          duration: 0.4,
          ease: 'power1.inOut',
        })
      }
    })
    button.addEventListener('mouseover', () => {
      gsap.to(button, {
        scale: 0.9,
        duration: 0.4,
      })
    })
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.4,
      })
    })
  }
}

export default audio
