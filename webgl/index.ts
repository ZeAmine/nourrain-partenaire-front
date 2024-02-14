import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'

import Viewport from './_viewport'
import World from './_world'
import Loader from './utils/loader'

let instance: any = null

export default class Webgl {
  private canvas!: HTMLCanvasElement
  private vp!: Viewport
  private sizes!: Sizes
  private renderer!: WebGLRenderer
  private camera!: PerspectiveCamera
  private controls!: OrbitControls
  private composer!: EffectComposer
  private loader!: Loader
  private scene!: Scene
  public world!: World

  constructor() {
    if (instance) {
      return instance
    }

    instance = this

    this.canvas = document?.querySelector('[data-gl="c"]') as HTMLCanvasElement

    this.vp = new Viewport()

    this.createRenderer()
    this.createCamera()
  }

  private createRenderer() {
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      depth: true,
      powerPreference: 'high-performance',
      premultipliedAlpha: false,
      stencil: false
    })
    this.renderer.setPixelRatio(this.vp.dpr)
    this.renderer.setSize(this.vp.width, this.vp.height)
  }

  private createCamera() {
    const perspective = 10
    const fov = 2 * Math.atan(window.innerHeight / 2 / perspective) * (180 / Math.PI)
    this.camera = new PerspectiveCamera(70, this.vp.aspect, 0.1, 1000)
    this.camera.position.set(0, 0, perspective)

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.enableDamping = true;
  }

  public load() {
    this.loader = new Loader()
    this.loader.on('completed', () => this.create())
  }

  private create() {
    this.createScene()
    // this.createPost()
    this.createWorld()

    this.resize()
    this.bindEvents()

    this.update()
  }

  private createScene() {
    this.scene = new Scene()
    this.scene.add(this.camera)
  }

  private createPost() {
    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new RenderPass(this.scene, this.camera))
  }

  private createWorld() {
    this.world = new World({
      scene: this.scene,
      sizes: this.vp,
      camera: this.camera,
      renderer: this.renderer
    })
  }

  private bindEvents() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  private resize() {
    this.vp.onResize()

    this.renderer.setSize(this.vp.width, this.vp.height)
    this.renderer.setPixelRatio(this.vp.dpr)

    this.camera.aspect = this.vp.aspect
    this.camera.updateProjectionMatrix()

    // this.composer.setSize(this.vp.width, this.vp.height)
    // this.composer.setPixelRatio(this.vp.dpr)

    this.world?.resize(this.vp)
  }

  private render() {
    this.renderer.render(this.scene, this.camera)
  }

  private update() {
    // this.controls?.update();
    this.world?.update()

    window.requestAnimationFrame(this.update.bind(this))

    this.render()
  }
}
