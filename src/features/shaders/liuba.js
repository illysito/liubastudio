import GlslCanvas from 'glslCanvas'

import frag from './glsl/liubaFrag'

//prettier-ignore
function liuba(mouseXRef, mouseYRef) {
  const canvas = document.querySelector('#liuba-canvas')

  const gl = canvas.getContext('webgl')
  if (!gl) {
    console.error('WebGL not supported!')
  } else {
    console.log('WebGL is working!')
  }
  if (!canvas) {
    console.error('Canvas element not found!')
    return
  }

  const calcSize = function () {
    let w = canvas.parentNode.clientWidth
    let h = canvas.parentNode.clientHeight
    let dpi = window.devicePixelRatio

    canvas.width = w * dpi
    canvas.height = h * dpi
  }

  calcSize()

  const sandbox = new GlslCanvas(canvas)

  const fragment_shader = frag
  sandbox.load(fragment_shader)
  sandbox.setUniform('u_resolution', [canvas.width, canvas.height])
  sandbox.setUniform('u_mouseX', mouseXRef.current)
  sandbox.setUniform('u_mouseY', mouseYRef.current)
  //prettier-ignore
  const imageURL = 'https://raw.githubusercontent.com/illysito/liubastudio/6792d0ffff6aaf3218343e9457ad979b158433f8/liuba%20png.png'
  sandbox.setUniform('u_image', imageURL)

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

export default liuba
