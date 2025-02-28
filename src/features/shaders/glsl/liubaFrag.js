const frag = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_mouseX;
uniform float u_mouseY;
uniform sampler2D image;

varying vec2 v_texcoord;

float random(vec2 uv) {
  return fract(sin(dot(uv.xy,
      vec2(12.9898,78.233))) *
          43758.5453123);
}

vec2 aspect(vec2 uv, float image_ratio, float canvas_ratio){
  // if canvas is taller than image, stretch downwards
  // if canvas is landscape to the image, stretch across
  if(image_ratio >= canvas_ratio){
    float ratio = canvas_ratio / image_ratio;
    uv.x *= ratio;
    // uv.x += (1.0 - ratio) / 2.0; 
  } else {
    float ratio = image_ratio / canvas_ratio;
    uv.y *= ratio;
    // uv.y += (1.0 - ratio) / 2.0; 
  }
  return uv;
}

void main()
{

  // UV
  vec2 uv = v_texcoord;

  // // RATIOS
  float image_ratio = 1200.0 / 1600.0;
  float canvas_ratio = u_resolution.x / u_resolution.y;

  vec2 coords = aspect(uv, image_ratio, canvas_ratio);

  // // DISTANCE

  vec2 mouse = vec2(u_mouseX, u_mouseY);
  // mouse = smoothstep(0.0, 0.8, mouse);
  float dist = distance(mouse, coords);

  float radius = 16.0 * (0.15 * (0.1 * sin(0.3 * u_time) + 0.015 * abs(sin(0.2 * u_time))));
  // radius = 0.035;
  float strength = 0.0;
  strength = smoothstep(0.4, radius, dist);

  // // DISTORTION

  vec2 distortion = vec2(
    0.91 * dist,
    0.91 * dist
  );

  distortion *= strength;

  vec4 img = texture2D(image, coords + 0.1 * distortion);
  if(img.a == 0.0){
    img.r *= 0.2;
    img.b *= 0.2;
    img.g *= 0.2;
  }

  vec4 blueImg = texture2D(image, coords + 1.2 * distortion);
  blueImg.g = 0.0;
  blueImg.r = 0.0;

  vec4 color = img + blueImg;

  float noiseMixer = random(uv);
  noiseMixer = smoothstep(0.0, 0.8, noiseMixer);
  color += 0.25 * noiseMixer;

  gl_FragColor = color;
}
`
export default frag
