import { DoubleSide, ShaderMaterial, Texture, Vector2 } from 'three'

import fragment from './fragment.glsl'
import vertex from './vertex.glsl'

interface Uniforms {
  u_texture: Texture
  u_resolution: Vector2
  u_planeSize: Vector2
  u_imageSize: Vector2
}

export default class extends ShaderMaterial {
  uniforms: {
    u_time: { value: number }
    u_texture: { value: Texture }
    u_resolution: { value: Vector2 }
    u_planeSize: { value: Vector2 }
    u_imageSize: { value: Vector2 }
  }

  constructor(opt: Uniforms) {
    super({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      side: DoubleSide,
      depthWrite: false
    })

    this.uniforms = {
      u_time: { value: 0 },
      u_texture: { value: opt.u_texture },
      u_resolution: { value: opt.u_resolution },
      u_planeSize: { value: opt.u_planeSize },
      u_imageSize: { value: opt.u_imageSize }
    }
  }

  set time(value: number) {
    this.uniforms.u_time.value = value
  }
}
