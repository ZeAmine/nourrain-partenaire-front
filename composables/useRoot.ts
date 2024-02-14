import Dom from '@/utils/dom'
import Pages from '@/utils/pages'
import Scroll from '@/utils/scroll'
import Webgl from '@/webgl'

interface IRoot {
  pages?: Pages
  scroll?: Scroll
  gl?: Webgl
  dom?: Dom
  path?: {
    from: string | null
    to: string | null
  }
}

export const $root: IRoot = {}

export const onMount = async () => {
  $root.pages = new Pages()
  $root.scroll = new Scroll()

  $root.dom = new Dom()

  $root.gl = new Webgl()
  $root.gl?.load()
}

export default function (): IRoot {
  return $root
}
