#define M_PI 3.14159265358

uniform float u_time;
uniform sampler2D u_texture;
uniform vec2 u_resolution;
uniform vec2 u_planeSize;
uniform vec2 u_imageSize;

varying vec2 v_uv;

// chunk.
#include ../_/imageuv.glsl

void main() {    
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 uv = v_uv;

    // cover.
    vec2 coverUv = imageUv(uv, u_imageSize, u_resolution, 1.0);

    // sampler2D.
    vec4 tex = texture2D(u_texture, coverUv);

    // gl_FragColor = vec4(uv, 1.0, 1.0);
    gl_FragColor.rgb = tex.rgb;    
    gl_FragColor.a = tex.a;
}
