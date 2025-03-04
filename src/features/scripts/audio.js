function audio() {
  const body = document.body

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

    if (audioAccepted === 'true') {
      // Play the appropriate audio for this page
      audio.play()
    }

    button.addEventListener('click', () => {
      if (audio.paused) {
        localStorage.setItem('audioAccepted', 'true')
        audio.play()
        console.log('button pressed')
      } else {
        localStorage.setItem('audioAccepted', 'false')
        audio.pause()
      }
    })
  }
}

export default audio
