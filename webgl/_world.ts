import bidello from '@/vendor/bidello';
import NormalizeWheel from 'normalize-wheel';
import Stats from 'stats.js';
import { Camera, Object3D, Raycaster, Scene, Vector2, WebGLRenderer } from 'three';

import Plane from './components/_plane';
import { lerp } from './utils/math';

interface Touch {
  start: number;
  distance: number;
  end: number;
}

export default class World {
  scene: Scene;
  sizes: Sizes;
  camera: Camera;
  renderer: WebGLRenderer;
  time: number;
  template!: string;
  mouse: Vector2;
  scroll: Scroll;
  x: Touch;
  y: Touch;
  isDown: boolean | null;
  stats: Stats;
  raycast!: Raycaster;
  object!: Object3D | null;
  plane!: Plane;

  constructor({
    scene,
    sizes,
    camera,
    renderer
  }: {
    scene: Scene;
    sizes: Sizes;
    camera: Camera;
    renderer: WebGLRenderer;
  }) {
    this.scene = scene;
    this.sizes = sizes;
    this.camera = camera;
    this.renderer = renderer;

    this.time = 0;
    this.template = window.location.pathname;
    this.isDown = null;

    this.x = {
      start: 0,
      distance: 0,
      end: 0
    };

    this.y = {
      start: 0,
      distance: 0,
      end: 0
    };

    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      velocity: 0,
      ease: 0.1
    };

    this.mouse = new Vector2();

    this.stats = new Stats();
    this.stats.showPanel(0);
    // document.body.appendChild(this.stats.dom).classList.add('stats');

    this.onPreloaded();
    this.bindEvents();
  }

  /**
   * Init.
   */
  private createRaycast(): void {
    this.raycast = new Raycaster();
  }

  private createPlane(): void {
    this.plane = new Plane({
      scene: this.scene,
      sizes: this.sizes
    });
  }

  /**
   * Animations.
   */
  public transitionIn(page: HTMLElement, { from, to }: Path): void {
    if (to === 'index') {
      this.plane.toTranslate(4);
    } else if (to === 'about') {
      this.plane.toTranslate(-4);
    }
  }

  public transitionOut(page: HTMLElement, { from, to }: Path): void {
    if (from === '') {
      this.plane.toTranslate(-4);
    } else if (from === 'about') {
      this.plane.toTranslate(4);
    }
  }

  /**
   * Events.
   */
  private onPreloaded(): void {
    this.createRaycast();
    this.createPlane();

    this.onChange(this.template);
  }

  private onChange(template: string): void {
    if (template === '/') {
      // this.plane.show();
    } else {
      // this.plane.hide();
    }

    if (template === '/about') {
      // this.about.show();
    } else {
      // this.about.hide();
    }

    this.template = template;
  }

  private onTouchDown(event: MouseEvent | TouchEvent): void {
    this.isDown = true;

    this.x.start = (event as TouchEvent).touches
      ? (event as TouchEvent).touches[0].clientX
      : (event as MouseEvent).clientX;
    this.y.start = (event as TouchEvent).touches
      ? (event as TouchEvent).touches[0].clientY
      : (event as MouseEvent).clientY;

    const values = {
      x: this.x,
      y: this.y
    };

    bidello.trigger({ name: 'touchdown' }, { values });
  }

  private onTouchMove(event: MouseEvent | TouchEvent): void {
    const x = (event as TouchEvent).touches ? (event as TouchEvent).touches[0].clientX : (event as MouseEvent).clientX;
    const y = (event as TouchEvent).touches ? (event as TouchEvent).touches[0].clientY : (event as MouseEvent).clientY;

    this.x.end = x;
    this.y.end = y;

    const values = {
      x: this.x,
      y: this.y
    };

    bidello.trigger({ name: 'touchmove' }, { values });

    if (!this.isDown) {
      return;
    }

    const distance = this.x.start - this.x.end;

    this.scroll.target = this.scroll.last - distance;
  }

  private onTouchUp(event: MouseEvent | TouchEvent): void {
    this.isDown = false;

    const x = (event as TouchEvent).changedTouches
      ? (event as TouchEvent).changedTouches[0].clientX
      : (event as MouseEvent).clientX;
    const y = (event as TouchEvent).changedTouches
      ? (event as TouchEvent).changedTouches[0].clientY
      : (event as MouseEvent).clientY;

    this.x.end = x;
    this.y.end = y;

    const values = {
      x: this.x,
      y: this.y
    };

    bidello.trigger({ name: 'touchup' }, { values });
  }

  private onMouseMove(event: MouseEvent): void {
    // [-1, 1]
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // [0, 1]
    // this.mouse.x = event.clientX / this.sizes.width;
    // this.mouse.y = 1 - event.clientY / this.sizes.height;

    // this.mouse.vX = this.mouse.x - this.mouse.prevX
    // this.mouse.vY = this.mouse.y - this.mouse.prevY
    // this.mouse.prevX = this.mouse.x
    // this.mouse.prevY = this.mouse.y

    this.raycast.setFromCamera(this.mouse, this.camera);

    const [hit] = this.raycast.intersectObjects(this.scene.children, true);

    this.object = hit ? hit.object : null;

    bidello.trigger({ name: 'mousemove' }, { mouse: this.mouse });
  }

  private onClick(): void {
    bidello.trigger({ name: 'click' }, { mouse: this.mouse });
  }

  private onWheel(event: WheelEvent): void {
    const { pixelY } = NormalizeWheel(event);

    this.scroll.target += pixelY / 2000;
  }

  /**
   * Listeners.
   */
  private bindEvents(): void {
    window.addEventListener('wheel', this.onWheel.bind(this));

    window.addEventListener('click', this.onClick.bind(this));

    window.addEventListener('mousedown', this.onTouchDown.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('mouseup', this.onTouchUp.bind(this));

    window.addEventListener('touchstart', this.onTouchDown.bind(this));
    window.addEventListener('touchmove', this.onTouchMove.bind(this));
    window.addEventListener('touchend', this.onTouchUp.bind(this));
  }

  /**
   * Resize.
   */
  public resize(vp: Sizes): void {
    bidello.trigger({ name: 'resize' }, { vp });
  }

  /**
   * Loop.
   */
  public update(): void {
    this.stats.begin();

    this.time += 0.5;

    // scroll.
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    this.scroll.velocity = this.scroll.current - this.scroll.last;
    this.scroll.last = this.scroll.current;

    // components.
    bidello.trigger({ name: 'update' }, { time: this.time, scroll: this.scroll, velo: this.scroll.velocity });

    this.stats.end();
  }
}