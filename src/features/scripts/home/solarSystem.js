function solar() {
  const solarWrapper = document.querySelector('.contact__section')

  const stars = [...document.querySelectorAll('.star-img')]

  const radii = [
    100, 132, 158, 206, 222, 276, 148, 172, 240, 300, 260, 100, 132, 158, 206,
    222, 276, 148, 172, 240, 300, 260,
  ]
  const speeds = [
    8, 7.2, 6.6, 6, 5.4, 5.2, 4.8, 6.2, 4.5, 2, 6, 8, 7.2, 6.6, 6, 5.4, 5.2,
    4.8, 6.2, 4.5, 2, 6,
  ]
  const HC = Math.PI
  const phases = [
    1,
    2.4,
    4.4,
    3.2,
    0,
    0.8,
    3.1,
    5.8,
    2.8,
    2.6,
    6,
    1 + HC,
    2.4 + HC,
    4.4 + HC,
    3.2 + HC,
    0 + HC,
    0.8 + HC,
    3.1 + HC,
    5.8 + HC,
    2.8 + HC,
    2.6 + HC,
    6 + HC,
  ]

  const amp = 1.4
  const speedFactor = 0.3

  // orbits
  stars.forEach((star, index) => {
    if (index < stars.length / 2) {
      const radius = radii[index] * amp
      const orbit = document.createElement('div')
      orbit.style.borderRadius = '100%'
      orbit.style.border = '0.5px solid #20202020'
      orbit.style.position = 'absolute'
      orbit.style.width = `${radius * 2}px`
      orbit.style.height = `${radius * 2}px`
      orbit.style.pointerEvents = 'none'
      solarWrapper.appendChild(orbit)
    }
  })

  // animate
  let angle = 0
  function animate() {
    angle += 0.001
    stars.forEach((star, index) => {
      const radius = radii[index]
      const speed = speeds[index]
      const phase = phases[index]

      const x = amp * radius * Math.cos(angle * speed * speedFactor + phase)
      const y = amp * radius * Math.sin(angle * speed * speedFactor + phase)

      // const offsetLeft = star.getBoundingClientRect().left
      // const offsetTop = star.getBoundingClientRect().top

      // star.style.left = offsetLeft + left + 'px'
      // star.style.top = offsetTop + top + 'px'
      star.style.transform = `translate(${0 + x}px, ${0 + y}px) rotate(${
        (-angle * speed * 90) / Math.PI
      }deg)`
    })

    requestAnimationFrame(animate)
  }
  animate()
}

export default solar
