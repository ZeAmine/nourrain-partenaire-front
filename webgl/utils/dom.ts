export function domSize(
  it: HTMLElement,
  {
    viewRatio: ratio,
    w: scw,
    h: sch,
    scrollx = 0,
    scrolly = 0
  }: {
    viewRatio: number
    w: number
    h: number
    scrollx?: number
    scrolly?: number
  }
) {
  const { x, y, width: w, height: h } = it.getBoundingClientRect()

  return {
    x: (-scw / 2 + x + w / 2) * ratio,
    y: (-sch / 2 + y + h / 2) * ratio,
    w: w * ratio,
    h: h * ratio
  }
}
