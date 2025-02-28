function audio() {
  const audio = document.getElementById('bg-audio')
  const button = document.querySelector('.sound-button')

  button.addEventListener('click', () => {
    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
    }
  })
}

export default audio
