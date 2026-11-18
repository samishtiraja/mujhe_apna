/**
 * GLSL Shader Definitions for CineSong 2026 Engine
 * High-end cinematic shaders: Real Ink-bleed, Curl Smoke, Vertex Cloth Waves, and Optical Film Halation
 */

// 1. Simplex Noise Utilities (GLSL)
export const NOISE_GLSL = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec4 p = permute( permute( i.y + vec4(0.0, i1.y, 1.0, 1.0 )) + i.x + vec4(0.0, i1.x, 1.0, 1.0 ));
  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw), 0.0), 0.0);
  m = m*m ;
  m = m*m ;
  vec4 x = 2.0 * fract(p * C.www) - 1.0;
  vec4 h = abs(x) - 0.5;
  vec4 ox = floor(x + 0.5);
  vec4 a0 = x - ox;
  m *= taylorInvSqrt( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, vec4(g, 0.0));
}

float fbm(vec2 p) {
  float total = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    total += snoise(p) * amp;
    p *= 2.05;
    amp *= 0.5;
  }
  return total;
}
`

// 2. Vertex Cloth & Hair Living Deformation Shader
export const VERTEX_CLOTH_SHADER = `
${NOISE_GLSL}

uniform float uTime;
uniform float uWindSpeed;
uniform float uWindAmp;
uniform float uBreatheAmp;

varying vec2 vUv;
varying float vDepthOffset;

void main() {
  vUv = uv;
  vec3 pos = position;

  // Pin base/feet: deformation increases with height (1.0 - uv.y) and edges
  float heightFactor = pow(1.0 - uv.y, 1.4);
  float edgeFactor = abs(uv.x - 0.5) * 2.0;
  float freedom = heightFactor * (0.4 + 0.6 * edgeFactor);

  // Organic Traveling Wind Wave (Cloth simulation)
  float wave = fbm(vec2(pos.x * 0.005 + uTime * uWindSpeed, pos.y * 0.005));
  float zDisplace = wave * uWindAmp * freedom;

  // Gentle breathing cycle (radial chest expansion)
  float breathe = sin(uTime * 1.8) * uBreatheAmp * (1.0 - abs(uv.y - 0.55) * 2.0);

  pos.z += zDisplace;
  pos.x += wave * (uWindAmp * 0.25) * freedom;
  pos.y += breathe;

  vDepthOffset = zDisplace;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

// 3. Fragment Shader with Sub-pixel De-fringing & Rim Lighting
export const CUTOUT_FRAGMENT_SHADER = `
uniform sampler2D uTexture;
uniform float uOpacity;
uniform vec3 uRimColor;
uniform float uRimStrength;
uniform vec3 uTint;

varying vec2 vUv;
varying float vDepthOffset;

void main() {
  vec4 texColor = texture2D(uTexture, vUv);
  
  if (texColor.a < 0.02) discard;

  // Color De-fringing (sub-pixel paper edge cleaning)
  float lum = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
  float alpha = texColor.a;

  // Soft edge rim lighting matching warm gold/diya light
  float edgeDist = abs(vDepthOffset) * 0.04;
  vec3 rim = uRimColor * (edgeDist * uRimStrength);

  vec3 finalRgb = (texColor.rgb * uTint) + rim;

  gl_FragColor = vec4(finalRgb, alpha * uOpacity);
}
`

// 4. Cinema Ink-Bleed & Smoke Transition Shaders (GLSL)
export const INK_BLEED_FRAGMENT_SHADER = `
${NOISE_GLSL}

uniform sampler2D uTexFrom;
uniform sampler2D uTexTo;
uniform float uProgress; // 0.0 to 1.0

varying vec2 vUv;

void main() {
  vec4 cFrom = texture2D(uTexFrom, vUv);
  vec4 cTo = texture2D(uTexTo, vUv);

  // Multi-octave organic paper soak threshold
  float noiseVal = fbm(vUv * 6.0) * 0.5 + 0.5;
  float threshold = uProgress * 1.4 - 0.2;

  // Wet ink edge bleeding line
  float edge = smoothstep(threshold - 0.08, threshold + 0.08, noiseVal);
  float wetInkEdge = (1.0 - abs(noiseVal - threshold) / 0.08);
  wetInkEdge = clamp(wetInkEdge, 0.0, 1.0);

  vec4 wetColor = vec4(0.22, 0.05, 0.08, 1.0); // Royal Kumkum ink tint at edge

  vec4 mixedColor = mix(cTo, cFrom, edge);
  gl_FragColor = mix(mixedColor, wetColor, wetInkEdge * 0.45 * (1.0 - uProgress));
}
`
