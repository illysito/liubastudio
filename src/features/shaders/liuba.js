import GlslCanvas from 'glslCanvas'

import liuba_frag from './glsl/liubaFrag'
// import frag_mob from './glsl/liubaFrag_mob'

//prettier-ignore
function liuba(mouseXRef, mouseYRef, isObserved) {
  function isMobile() {
    return window.matchMedia('(max-width: 768px)').matches
  }

  console.log('Liuba Hero Shader: is it mobile?: ' + isMobile())

  const canvas = document.querySelector('#liuba-canvas')

  const gl = canvas.getContext('webgl')
  if (!gl) {
    console.error('Liuba Hero Shader: WebGL not supported!')
  } else {
    console.log('Liuba Hero Shader: WebGL is working!')
  }
  if (!canvas) {
    console.error('Liuba Hero Shader: Canvas element not found!')
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

  // console.log('Liuba About Shader: width: ' + canvas.width + ' height: ' + canvas.height)

  const sandbox = new GlslCanvas(canvas)

  let fragment_shader
  if (isMobile()) {
    fragment_shader = liuba_frag
  } else {
    fragment_shader = liuba_frag
  }

  sandbox.load(fragment_shader)
  sandbox.setUniform('u_resolution', [canvas.width, canvas.height])
  sandbox.setUniform('u_mouseX', mouseXRef.current)
  sandbox.setUniform('u_mouseY', mouseYRef.current)
  //prettier-ignore
  const imageURL_1 = 'https://raw.githubusercontent.com/illysito/liubastudio/727ab65723b9766528481251367d1e2e3f290f7a/mascara.png'
  const imageURL_2 = 'https://raw.githubusercontent.com/illysito/liubastudio/200245a591cc7bbed960e7b5839b2f1c7e6512aa/mascara_2.png'
  const imageURL_3 = 'https://raw.githubusercontent.com/illysito/liubastudio/200245a591cc7bbed960e7b5839b2f1c7e6512aa/mascara_3.png'
  const urls = [imageURL_1, imageURL_2, imageURL_3]
  const index = Math.floor(Math.random() * 3)
  sandbox.setUniform('u_image', urls[index])
  sandbox.setUniform('u_imageResolution', [1200.0, 1600.0])
  sandbox.setUniform('u_distortionFactor', 1.0)
  sandbox.setUniform('u_blueDistortionFactor', 1.0)
  sandbox.setUniform('u_naturalDistortionFactor', 1.0)
  sandbox.setUniform('u_isObserved', isObserved.current)

  function updateUniforms() {
    sandbox.setUniform('u_resolution', [canvas.width, canvas.height])
    sandbox.setUniform('u_mouseX', mouseXRef.current)
    sandbox.setUniform('u_mouseY', mouseYRef.current)
    sandbox.setUniform('u_isObserved', isObserved.current)
  }

  window.addEventListener('resize', function () {
    calcSize()
    updateUniforms()
  })

  return updateUniforms
}

export default liuba
