import { EventEmitter } from 'events'
import gsap from 'gsap'
import { CubeTextureLoader, Texture, TextureLoader } from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import sources from '../_assets'

// import { usePreloaderStore } from "pinia";
// const { setLoadingStarted, setLoadingCompleted } = usePreloaderStore();

export default class Loader extends EventEmitter {
  element: Element | null
  elements: {
    numberWord: Element
    words: NodeListOf<Element>
  }

  sources: Source[]
  loaded: number
  loaders!: {
    gltfLoader: GLTFLoader
    textureLoader: TextureLoader
    fontLoader: FontLoader
    cubeTextureLoader: CubeTextureLoader
  }

  animateIn!: gsap.core.Timeline
  animateOut!: gsap.core.Timeline

  constructor() {
    super()

    this.element = document.querySelector('.preloader')
    this.elements = {
      numberWord: this.element?.querySelector('.number .word') as Element,
      words: this.element?.querySelectorAll('.word') as NodeListOf<Element>
    }

    this.loaded = 0
    this.sources = sources as Source[]

    window.assets = {}

    this.setLoaders()
    this.createLoader()
  }

  setLoaders() {
    this.loaders = {
      gltfLoader: new GLTFLoader(),
      textureLoader: new TextureLoader(),
      fontLoader: new FontLoader(),
      cubeTextureLoader: new CubeTextureLoader()
    }
  }

  createLoader() {
    this.animateIn = gsap.timeline({
      // delay: 0.5,
      onStart: () => {
        // setLoadingStarted();
      }
    })

    this.animateIn.from(
      this.elements.words,
      {
        y: '110%',
        duration: 1.2,
        ease: 'expo.out'
      },
      'start'
    )

    this.animateIn.call(() => {
      for (const [key, source] of Object.entries(this.sources)) {
        if (source.type === 'gltfModel') {
          this.loaders?.gltfLoader.load(source.path, (file: any) => {
            // Specify the type of 'file' parameter
            this.onAssetLoaded(source, file)
          })
        } else if (source.type === 'texture') {
          this.loaders?.textureLoader.load(source.path, (file: Texture) => {
            // Specify the type of 'file' parameter
            this.onAssetLoaded(source, file)
          })
        } else if (source.type === 'font') {
          this.loaders?.fontLoader.load(source.path, (file: any) => {
            // Specify the type of 'file' parameter
            this.onAssetLoaded(source, file)
          })
        }
      }
    })
  }

  onAssetLoaded(source: Source, file: any) {
    window.assets[source.name] = file
    window.assets[source.name].width = file.source.data.width
    window.assets[source.name].height = file.source.data.height

    this.loaded++

    const percent = this.loaded / this.sources.length
    this.elements.numberWord.innerHTML = `${Math.round(percent * 100)}`

    if (percent === 1) {
      this.onLoaded()
    }
  }

  onLoaded() {
    return new Promise<void>((resolve) => {
      this.emit('completed')
      resolve()

      this.animateOut = gsap.timeline({
        delay: 1,
        onComplete: () => {
          // setLoadingCompleted();
        }
      })

      this.animateOut.to(
        this.elements.words,
        {
          y: '-110%',
          duration: 1.2,
          ease: 'expo.inOut'
        },
        'start'
      )

      this.animateOut.to(this.element, {
        autoAlpha: 0,
        delay: 0.3,
        duration: 1
      })

      this.animateOut.call(() => {
        this.destroy()
      })
    })
  }

  destroy() {
    this.element?.parentNode?.removeChild(this.element)
  }
}
