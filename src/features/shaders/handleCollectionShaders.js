import gsap from 'gsap'

// import collectionShaders from '../shaders/collectionShaders'

function handleCollectionShaders() {
  let mouseX = 0.5
  let mouseY = 0.5
  const mouseXRef = { current: mouseX }
  const mouseYRef = { current: mouseY }

  //prettier-ignore
  // const updateUniforms = collectionShaders(mouseXRef, mouseYRef)

  window.addEventListener('mousemove', (event) => {
    //prettier-ignore
    mouseXRef.current = gsap.utils.mapRange(0, window.innerWidth, 0.45, 0.65, event.clientX)
    //prettier-ignore
    mouseYRef.current = gsap.utils.mapRange(0, window.innerHeight, 0.45, 0.65, event.clientY)
    // console.log(mouseXRef.current, mouseYRef.current)
    // updateUniforms(mouseXRef, mouseYRef)
  })
}

export default handleCollectionShaders
