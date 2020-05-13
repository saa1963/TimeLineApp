import { SimpleEventDispatcher, ISimpleEvent } from "ste-simple-events";
import { MenuOptions } from "./MenuOptions";
import { ContextUtil } from "./ContextUtil";

export enum MenuItemType {
  default, divider
}

export class ContextMenu {
  private static count = 0
  private options: MenuOptions
  public menu: MenuItem[]
  private contextTarget: EventTarget = null
  static readonly DIVIDER: string = 'cm_divider'

  constructor(menu: MenuItem[], options?: MenuOptions) {
    ContextMenu.count++
    this.menu = menu
    if (options === undefined) this.options = new MenuOptions()
    else this.options = options
    window.addEventListener('resize', () => this.onresize())
    this.reload()
  }

  private e_Select = new SimpleEventDispatcher<string>();
  public get evSelect(): ISimpleEvent<string> {
    return this.e_Select.asEvent();
  }

  private onresize() {
    if (this.options.close_on_resize) {
      this.hide()
    }
  }

  public hide() {
    document.getElementById('cm_' + ContextMenu.count).classList.remove('display')
    window.removeEventListener('click', () => this.documentClick())
  }

  public setOptions(_options: MenuOptions) {
      this.options = _options
  }

  public reload() {
    if (document.getElementById('cm_' + ContextMenu.count) === null) {
      const cnt = document.createElement('div')
      cnt.className = 'cm_container'
      cnt.id = 'cm_' + ContextMenu.count

      document.body.appendChild(cnt)
    }

    const container = document.getElementById('cm_' + ContextMenu.count)
    container.innerHTML = ''

    container.appendChild(this.renderLevel(this.menu))
  }

  private renderLevel(level: MenuItem[]) {
    const ulOuter = document.createElement('ul')
    level.forEach((item) => {
      const li = document.createElement('li') as MyHTMLLIElement
      li.menu = this

      if (item.type === MenuItemType.default) {
        const iconSpan = document.createElement('span')
        iconSpan.className = 'cm_icon_span'

        if (item.icon !== '') {
          iconSpan.innerHTML = item.icon
        } else {
          iconSpan.innerHTML = this.options.default_icon
        }

        const textSpan = document.createElement('span')
        textSpan.className = 'cm_text'

        if (item.text !== '') {
          textSpan.innerHTML = item.text
        } else {
          textSpan.innerHTML = this.options.default_text
        }

        const subSpan = document.createElement('span')
        subSpan.className = 'cm_sub_span'

        if (item.sub !== null) {
          if (this.options.sub_icon !== null) {
            subSpan.innerHTML = this.options.sub_icon
          } else {
            subSpan.innerHTML = '&#155;'
          }
        }

        li.appendChild(iconSpan)
        li.appendChild(textSpan)
        li.appendChild(subSpan)

        if (!item.enabled) {
          li.setAttribute('disabled', '')
        } else {
          li.addEventListener('click', () => {
            this.e_Select.dispatch(item.id)
          })

          if (item.sub !== null) {
            li.appendChild(this.renderLevel(item.sub))

          }
        }
      } else {
        if (item.type === MenuItemType.divider) {
          li.className = 'cm_divider'
        }
      }

      ulOuter.appendChild(li)
    })

    return ulOuter
  }

  public display(e: MouseEvent, target?: EventTarget) {
    if (typeof target !== 'undefined') {
      this.contextTarget = target
    } else {
      this.contextTarget = e.target
    }

    const menu = document.getElementById('cm_' + ContextMenu.count)

    const clickCoords = { x: e.clientX, y: e.clientY }
    const clickCoordsX = clickCoords.x
    const clickCoordsY = clickCoords.y

    const menuWidth = menu.offsetWidth + 4
    const menuHeight = menu.offsetHeight + 4

    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    const mouseOffset = this.options.mouse_offset

    if ((windowWidth - clickCoordsX) < menuWidth) {
      menu.style.left = windowWidth - menuWidth + 'px'
    } else {
      menu.style.left = (clickCoordsX + mouseOffset) + 'px'
    }

    if ((windowHeight - clickCoordsY) < menuHeight) {
      menu.style.top = windowHeight - menuHeight + 'px'
    } else {
      menu.style.top = (clickCoordsY + mouseOffset) + 'px'
    }

    const sizes = ContextUtil.getSizes(menu)

    if ((windowWidth - clickCoordsX) < sizes.width) {
      menu.classList.add('cm_border_right')
    } else {
      menu.classList.remove('cm_border_right')
    }

    if ((windowHeight - clickCoordsY) < sizes.height) {
      menu.classList.add('cm_border_bottom')
    } else {
      menu.classList.remove('cm_border_bottom')
    }

    menu.classList.add('display')

    if (this.options.close_on_click) {
      window.addEventListener('click', () => { this.documentClick() })
    }

    e.preventDefault()
  }

  private documentClick() {
    this.hide()
  }
}

class MyHTMLLIElement extends HTMLLIElement {
  menu: ContextMenu
}

export class MenuItem {
  id: string = null
  text: string = null
  icon = ''
  enabled = true
  sub: MenuItem[] = null
  type: MenuItemType = MenuItemType.default
  public constructor(id: string, text?: string, icon?: string, enabled?: boolean, sub?: MenuItem[], type?: MenuItemType) {
    this.id = id
    this.text = text || null
    this.icon = icon || ''
    this.enabled = enabled || true
    this.sub = sub || null
    this.type = type || MenuItemType.default
  }
}

export class MenuItemDivider extends MenuItem {
  public constructor() {
    super(null, null, null, true, null, MenuItemType.divider)
  }
}

export class MenuItemSub extends MenuItem {
  public constructor(id: string, text: string, sub: MenuItem[]) {
    super(id, text, null, true, sub)
  }
}

