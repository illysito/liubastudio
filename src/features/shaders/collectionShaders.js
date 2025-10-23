import GlslCanvas from 'glslCanvas'
import gsap from 'gsap'

import collection_frag from './glsl/collectionFrag'
// import frag_mob from './glsl/liubaFrag_mob'
// Permalink from github to JSDelivr
function githubToJsDelivr(permalink) {
  return permalink
    .replace('github.com', 'cdn.jsdelivr.net/gh')
    .replace('/blob/', '@')
}

//prettier-ignore
function collectionShaders() {
  let mouseX = 0.5
  let mouseY = 0.5
  const mouseXRef = { current: mouseX }
  const mouseYRef = { current: mouseY }
  const trigger = document.querySelector('.collection-canvas')
  let isObserved = { current: true }
  let lastScrollY = window.scrollY

  function isMobile() {
    return window.matchMedia('(max-width: 768px)').matches
  }

  // console.log('Collection Shader: is it mobile?: ' + isMobile())

  const ceramicsCanvas = document.querySelector('#ceramics-canvas')
  const jewelryCanvas = document.querySelector('#jewelry-canvas')
  const engravingCanvas = document.querySelector('#engraving-canvas')
  const paintingCanvas = document.querySelector('#painting-canvas')
  const canvas = document.querySelectorAll('.collection-canvas')
  const canvasArray = [ceramicsCanvas, jewelryCanvas, engravingCanvas, paintingCanvas]

  // function checkCanvas(canvas) {
  //   const gl = canvas.getContext('webgl')
  //   if (!gl) {
  //     console.error('Collection Shader: WebGL not supported!')
  //   } else {
  //     console.log('Collection Shader: WebGL is working!')
  //   }
  //   if (!canvas) {
  //     console.error('Collection Shader: Canvas element not found!')
  //     return
  //   }
  // }
  // checkCanvas(ceramicsCanvas)
  // checkCanvas(jewelryCanvas)
  // checkCanvas(engravingCanvas)
  // checkCanvas(paintingCanvas)

  function calcSize(canvas) {
    let w = canvas.offsetWidth
    let h = canvas.offsetHeight
    let dpi = window.devicePixelRatio

    canvas.width = w * dpi
    canvas.height = h * dpi
  }
  calcSize(ceramicsCanvas)
  calcSize(jewelryCanvas)
  calcSize(engravingCanvas)
  calcSize(paintingCanvas)

  let fragment_shader
  if (isMobile()) {
    fragment_shader = collection_frag
  } else {
    fragment_shader = collection_frag
  }

  //prettier-ignore
  const imageURL_1 = githubToJsDelivr('https://github.com/illysito/liubastudioimages/blob/3dac002354a1020e2429ad06def465af60b65981/ceramics/36.webp')
  const imageURL_2 = githubToJsDelivr('https://github.com/illysito/liubastudioimages/blob/3dac002354a1020e2429ad06def465af60b65981/ceramics/Cropped%20Lion%20Vase_1.webp')
  const imageURL_3 = githubToJsDelivr('https://github.com/illysito/liubastudioimages/blob/3dac002354a1020e2429ad06def465af60b65981/ceramics/23.webp')
  const imageURL_4 = githubToJsDelivr('https://github.com/illysito/liubastudioimages/blob/3dac002354a1020e2429ad06def465af60b65981/ceramics/68.webp')
  const urls = [imageURL_1, imageURL_2, imageURL_3, imageURL_4]
  // console.log('Liuba About Shader: width: ' + canvas.width + ' height: ' + canvas.height)
  const ceramicsSandbox = new GlslCanvas(ceramicsCanvas)
  const jewelrySandbox = new GlslCanvas(jewelryCanvas)
  const engravingSandbox = new GlslCanvas(engravingCanvas)
  const paintingSandbox = new GlslCanvas(paintingCanvas)
  const sandboxArray = [ceramicsSandbox, jewelrySandbox, engravingSandbox, paintingSandbox]

  function loadSandbox(sandbox, canvas, index) {
    if (sandbox) {
      sandbox.load(fragment_shader)
      sandbox.setUniform('u_resolution', [canvas.width, canvas.height])
      sandbox.setUniform('u_mouseX', mouseXRef.current)
      sandbox.setUniform('u_mouseY', mouseYRef.current)
      sandbox.setUniform('u_image', urls[index])
      sandbox.setUniform('u_imageResolution', [854, 854])
      sandbox.setUniform('u_distortionFactor', 0.6)
      sandbox.setUniform('u_blueDistortionFactor', 0.2)
      sandbox.setUniform('u_naturalDistortionFactor', 0.0)
      sandbox.setUniform('u_isObserved', isObserved.current)
      sandbox.setUniform('u_grainFactor', 0.0)
    } else {
      console.log('sandbox not yet loaded')
    }
  }
  loadSandbox(ceramicsSandbox, ceramicsCanvas, 0)
  loadSandbox(jewelrySandbox, jewelryCanvas, 1)
  loadSandbox(engravingSandbox, engravingCanvas, 2)
  loadSandbox(paintingSandbox, paintingCanvas, 3)

  function updateUniforms(sandbox, canvas) {
    if (sandbox) {
      sandbox.setUniform('u_resolution', [canvas.width, canvas.height])
      sandbox.setUniform('u_mouseX', mouseXRef.current)
      sandbox.setUniform('u_mouseY', mouseYRef.current)
      sandbox.setUniform('u_isObserved', isObserved.current)
    } else {
      console.log('sandbox not yet loaded')
    }
    // console.log('u_mouse SET')
  }

  window.addEventListener('resize', () => {
    calcSize(ceramicsCanvas)
    calcSize(jewelryCanvas)
    calcSize(engravingCanvas)
    calcSize(paintingCanvas)
    updateUniforms(ceramicsSandbox, ceramicsCanvas)
    updateUniforms(jewelrySandbox, jewelryCanvas)
    updateUniforms(engravingSandbox, engravingCanvas)
    updateUniforms(paintingSandbox, paintingCanvas)
  })

  //prettier-ignore
  // const updateUniforms = collectionShaders(mouseXRef, mouseYRef)

  canvas.forEach((canva, index) => {
    canva.addEventListener('mousemove', (event) => {
      //prettier-ignore
      mouseXRef.current = gsap.utils.mapRange(0, canvasArray[index].offsetWidth, 0.45, 0.65, event.offsetX)
      //prettier-ignore
      mouseYRef.current = gsap.utils.mapRange(0, canvasArray[index].offsetHeight, 0.45, 0.65, event.offsetY)
      // console.log(mouseXRef.current, mouseYRef.current)
      updateUniforms(sandboxArray[index], canvasArray[index])
    })
  })

  // update isObserved on observation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!isObserved.current) {
            isObserved.current = 1.0
            // console.log('COLLECTION - isObserved: ' + isObserved.current)
            updateUniforms(sandboxArray[0], canvasArray[0], isObserved.current)
            updateUniforms(sandboxArray[1], canvasArray[1], isObserved.current)
            updateUniforms(sandboxArray[2], canvasArray[2], isObserved.current)
            updateUniforms(sandboxArray[3], canvasArray[3], isObserved.current)
          }
        } else {
          if (window.scrollY < lastScrollY) {
            isObserved.current = 0.0
            // console.log('COLLECTION - isObserved: ' + isObserved.current)
            updateUniforms(sandboxArray[0], canvasArray[0], isObserved.current)
            updateUniforms(sandboxArray[1], canvasArray[1], isObserved.current)
            updateUniforms(sandboxArray[2], canvasArray[2], isObserved.current)
            updateUniforms(sandboxArray[3], canvasArray[3], isObserved.current)
          } else {
            isObserved.current = 0.0
            // console.log('COLLECTION - isObserved: ' + isObserved.current)
            updateUniforms(sandboxArray[0], canvasArray[0], isObserved.current)
            updateUniforms(sandboxArray[1], canvasArray[1], isObserved.current)
            updateUniforms(sandboxArray[2], canvasArray[2], isObserved.current)
            updateUniforms(sandboxArray[3], canvasArray[3], isObserved.current)
          }
        }
      })
    },
    { threshold: 0.0 }
  )

  observer.observe(trigger)

  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY
  })

  return updateUniforms
}

export default collectionShaders
