#define PI 3.1415926538

uniform float u_time;

varying vec2 v_uv;

void main() {
    vec3 pos = position;
    vec4 modelPos = modelMatrix * vec4(pos, 1.0);
    
    gl_Position = projectionMatrix * viewMatrix * modelPos;

    v_uv = uv;
}