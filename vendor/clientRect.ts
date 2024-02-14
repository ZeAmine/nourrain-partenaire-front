export const clientRect = (element: HTMLElement) => {
  const bounds = element.getBoundingClientRect()

  let scroll = 0

  scroll = window.scrollY

  return {
    bottom: bounds.bottom + scroll,
    height: bounds.height,
    // left: bounds.left,
    // right: bounds.right,
    top: bounds.top + scroll,
    // width: bounds.width,
    wh: window.innerHeight,
    // ww: window.innerWidth,
    offset: bounds.top + scroll
  }
}
