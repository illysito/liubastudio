const frag_stripes = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_image1;
uniform sampler2D u_image2;
uniform sampler2D u_image3;
uniform sampler2D u_image4;

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

float timeLoop(float time, float duration) {
  return fract(time / duration);
}

void main()
{

  // UV
  vec2 uv = v_texcoord;

  // // RATIOS
  float image_ratio = 1920.0 / 1080.0;
  float canvas_ratio = u_resolution.x / u_resolution.y;

  vec2 coords = aspect(uv, image_ratio, canvas_ratio);

  // DISTORTION

  float dist = distance(vec2(0.5, 0.5), uv);
  vec2 distortion = vec2(
    0.2 * dist * sin(0.5 * u_time + dist),
    0.12 * dist * cos(u_time + uv.y)
  );

  // SELECTION

  vec4 img = texture2D(u_image1, coords + 0.15 * distortion);

  float index = floor(4.0 * fract(u_time));

  if(index == 0.0){
    img = texture2D(u_image1, coords + 0.15 * distortion);
  }else if(index == 1.0){
    img = texture2D(u_image2, coords + 0.15 * distortion);
  }else if(index == 2.0){
    img = texture2D(u_image3, coords + 0.15 * distortion);
  }else if(index == 3.0){
    img = texture2D(u_image4, coords + 0.15 * distortion);
  }else{
    img = texture2D(u_image1, coords + 0.15 * distortion);
  }
  
  // FLICKERING

  float opacity = 0.75;

  float timer = timeLoop(u_time, 6.0 + 0.5 * sin(0.5 * u_time));
  timer = smoothstep(0.3, 0.5, timer) - smoothstep(0.5, 0.7, timer);

  img.a *= opacity * timer;

  // OUTPUT

  gl_FragColor = img;

}
`
export default frag_stripes
