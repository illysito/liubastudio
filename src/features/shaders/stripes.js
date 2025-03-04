import GlslCanvas from 'glslCanvas'

import stripesFrag from './glsl/stripesFrag'

//prettier-ignore
function stripes() {
  function isMobile() {
    return window.matchMedia("(max-width: 768px)").matches
  }

  console.log(isMobile())

  const canvas = document.querySelector('#stripe-canvas')

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
    fragment_shader = stripesFrag
  } else {
    fragment_shader = stripesFrag
  }

  sandbox.load(fragment_shader)
  sandbox.setUniform('u_resolution', [canvas.width, canvas.height])
  //prettier-ignore
  const stripe1 = 'https://raw.githubusercontent.com/illysito/liubastudio/a3c8a0a906b5eb794adcbce9ca78b27139a666ef/golden-stripe.png'
  const stripe2 = 'https://raw.githubusercontent.com/illysito/liubastudio/1709256f8b2cf5ad3f5c87cc2dc6116b777c5563/golden-stripe-2.png'
  const stripe3 = 'https://raw.githubusercontent.com/illysito/liubastudio/1709256f8b2cf5ad3f5c87cc2dc6116b777c5563/golden-stripe-3.png'
  const stripe4 = 'https://raw.githubusercontent.com/illysito/liubastudio/1709256f8b2cf5ad3f5c87cc2dc6116b777c5563/golden-stripe-4.png'
  sandbox.setUniform('u_image1', stripe1)
  sandbox.setUniform('u_image2', stripe2)
  sandbox.setUniform('u_image3', stripe3)
  sandbox.setUniform('u_image4', stripe4)

  window.addEventListener('resize', function () {
    calcSize()
  })
}

export default stripes
