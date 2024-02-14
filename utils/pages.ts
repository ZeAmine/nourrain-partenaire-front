import { $root } from "@/composables/useRoot";

export default class {
  public props!: Path;

  constructor() {
    this.useProps();
  }

  private useProps(): void {
    this.props = {
      from: window.location.href.split("/").slice(3).join("/"),
      to: null,
    };

    console.log('Page props:', this.props);
  }

  async transitionOut(page: HTMLElement): Promise<void> {
    await Promise.allSettled([
      $root.dom?.transitionOut(page, this.props),
      $root.gl?.world.transitionOut(page, this.props),
    ]);
  }

  async transitionIn(page: HTMLElement): Promise<void> {
    await Promise.allSettled([
      $root.dom?.transitionIn(page, this.props),
      $root.gl?.world.transitionIn(page, this.props),
    ]);
  }
}