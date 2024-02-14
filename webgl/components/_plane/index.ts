import { component } from 'bidello'
import gsap from 'gsap'
import { InstancedBufferAttribute, Mesh, PlaneGeometry, Scene, Vector2 } from 'three'
import { Pane } from 'tweakpane'

import Material from '../../mat/_plane'

export default class Plane extends component() {
  scene: Scene
  sizes: Sizes
  debug: Pane
  count: number
  assets: { [key: string]: any }
  params!: {
    progress: number
  }

  geometry!: PlaneGeometry
  material!: Material
  mesh!: Mesh

  constructor({ scene, sizes }: { scene: Scene; sizes: Sizes }) {
    super()

    this.scene = scene
    this.sizes = sizes

    this.assets = window.assets

    this.debug = new Pane()

    this.count = 10

    this.createMesh()
  }

  /**
   * Settings.
   */
  settings() {
    this.params = {
      progress: 0
    }

    const pane = new Pane()

    pane.addBinding(this.params, 'progress', { min: 0, max: 1, step: 0.01 })
  }

  createMesh() {
    this.geometry = new PlaneGeometry(1, 1, 50, 50)

    this.material = new Material({
      u_texture: this.assets['texture_1'],
      u_resolution: new Vector2(this.sizes.width, this.sizes.height),
      u_planeSize: new Vector2(4, 3),
      u_imageSize: new Vector2(this.assets['texture_1'].width, this.assets['texture_1'].height)
    })

    this.mesh = new Mesh(this.geometry, this.material)

    this.mesh.position.set(0, 0, 0)
    this.mesh.scale.set(5, 5, 1)

    this.scene.add(this.mesh)

    this.setAttributes()
  }

  setAttributes() {
    const attributes: {
      [key: string]: {
        name: string
        data: InstancedBufferAttribute
      }
    } = calcAttributes(this.count)
    for (const key in attributes) {
      const { name, data } = attributes[key]
      this.geometry.setAttribute(name, data)
    }
  }

  /**
   * Animations.
   */
  toTranslate(x: number) {
    gsap.to(this.mesh.position, {
      x,
      duration: 1,
      ease: 'expo.out'
    })
  }

  show() {
    this.scene.add(this.mesh)
  }

  hide() {
    this.scene.remove(this.mesh)
  }

  /**
   * Events.
   */
  onMousemove({ mouse }: { mouse: MouseEvent }) {}

  /**
   * Resize.
   */
  onResize({ vp }: { vp: Sizes }) {}

  /**
   * Loop.
   */
  onUpdate({ time, scroll, velo }: { time: number; scroll: Scroll; velo: number }) {
    // this.mesh.rotation.x = time * 0.05;
    this.material.time = time
  }
}

function calcAttributes(num: number) {
  const a_rot = new Float32Array(num * 1)
  const a_pos = new Float32Array(num * 3)

  for (let i = 0; i < num; i++) {
    a_rot[i] = Math.random() * Math.PI * 2
    a_pos[i * 3 + 0] = (Math.random() - 0.5) * 2
    a_pos[i * 3 + 1] = (Math.random() - 0.5) * 2
    a_pos[i * 3 + 2] = (Math.random() - 0.5) * 2
  }

  return {
    a_rotation: {
      name: 'a_rotation',
      data: new InstancedBufferAttribute(a_rot, 1)
    },
    a_position: {
      name: 'a_position',
      data: new InstancedBufferAttribute(a_pos, 3)
    }
  }
}
