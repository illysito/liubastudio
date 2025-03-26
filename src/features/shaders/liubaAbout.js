import GlslCanvas from 'glslCanvas'

import frag_large from './glsl/liubaFrag_large'
// import frag_mob from './glsl/liubaFrag_mob'

//prettier-ignore
function liubaAbout(mouseXRef, mouseYRef) {
  function isMobile() {
    return window.matchMedia('(max-width: 768px)').matches
  }

  console.log('Liuba Shader: is it mobile?: ' + isMobile())

  const canvas = document.querySelector('#about-canvas')

  const gl = canvas.getContext('webgl')
  if (!gl) {
    console.error('ABOUT - WebGL not supported!')
  } else {
    console.log('ABOUT - WebGL is working!')
  }
  if (!canvas) {
    console.error('Canvas element not found!')
    return
  }

  const calcSize = function () {
    let w = canvas.offsetWidth
    let h = canvas.offsetHeight
    let dpi = window.devicePixelRatio

    canvas.width = w * dpi
    canvas.height = h * dpi
  }

  calcSize()

  console.log('width: ' + canvas.width + ' height: ' + canvas.height)

  const sandbox = new GlslCanvas(canvas)

  let fragment_shader
  if (isMobile()) {
    fragment_shader = frag_large
  } else {
    fragment_shader = frag_large
  }

  sandbox.load(fragment_shader)
  sandbox.setUniform('u_resolution', [canvas.width, canvas.height])
  sandbox.setUniform('u_mouseX', mouseXRef.current)
  sandbox.setUniform('u_mouseY', mouseYRef.current)
  //prettier-ignore
  const url = 'https://raw.githubusercontent.com/illysito/liubastudio/75838adfa270e8cfcca5eba05f5bd8e49a1e6938/liuba_raw.png'
  sandbox.setUniform('u_image', url)
  sandbox.setUniform('u_imageResolution', [1200.0, 1200.0])
  sandbox.setUniform('u_distortionFactor', 0.85)
  sandbox.setUniform('u_blueDistortionFactor', 0.15)

  function updateUniforms() {
    sandbox.setUniform('u_resolution', [canvas.width, canvas.height])
    sandbox.setUniform('u_mouseX', mouseXRef.current)
    sandbox.setUniform('u_mouseY', mouseYRef.current)
  }

  window.addEventListener('resize', function () {
    calcSize()
    updateUniforms()
  })

  return updateUniforms
}

export default liubaAbout
