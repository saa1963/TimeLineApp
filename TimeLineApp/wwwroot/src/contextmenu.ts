export enum MenuItemType {
  default, divider
}

export class ContextMenu {
  private static count: number = 0
  private options: MenuOptions
  public menu: MenuItem[]
  private contextTarget: EventTarget = null
  static readonly DIVIDER: string = 'cm_divider'

  constructor(menu: MenuItem[], options?: MenuOptions) {
    let num = ContextMenu.count++
    this.menu = menu
    if (options == undefined) this.options = new MenuOptions()
    else this.options = options
    window.addEventListener('resize', () => this.onresize())
    this.reload()
  }

  private onresize() {
    if (this.options.close_on_resize) {
      this.hide()
    }
  }

  hide() {
    document.getElementById('cm_' + ContextMenu.count).classList.remove('display')
    window.removeEventListener('click', () => this.documentClick())
  }

  setOptions(_options: MenuOptions) {
      this.options = _options
  }

  reload() {
    if (document.getElementById('cm_' + ContextMenu.count) == null) {
      var cnt = document.createElement('div')
      cnt.className = 'cm_container'
      cnt.id = 'cm_' + ContextMenu.count

      document.body.appendChild(cnt)
    }

    var container = document.getElementById('cm_' + ContextMenu.count)
    container.innerHTML = ''

    container.appendChild(this.renderLevel(this.menu))
  }

  private renderLevel(level: MenuItem[]) {
    var ulOuter = document.createElement('ul')
    level.forEach((item) => {
      let li = <MyHTMLLIElement>document.createElement('li')
      li.menu = this

      if (item.type === MenuItemType.default) {
        var iconSpan = document.createElement('span')
        iconSpan.className = 'cm_icon_span'

        if (item.icon != '') {
          iconSpan.innerHTML = item.icon
        } else {
          iconSpan.innerHTML = this.options.default_icon
        }

        var textSpan = document.createElement('span')
        textSpan.className = 'cm_text'

        if (item.text != '') {
          textSpan.innerHTML = item.text
        } else {
          textSpan.innerHTML = this.options.default_text
        }

        var subSpan = document.createElement('span')
        subSpan.className = 'cm_sub_span'

        if (item.sub != null) {
          if (this.options.sub_icon != '') {
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
          if (item.events !== null) {
            for (var [key, value] of item.events) {
              li.addEventListener(key, value)
            }
          }

          if (item.sub !== null) {
            li.appendChild(this.renderLevel(item.sub))
          }
        }
      } else {
        if (item.type == MenuItemType.divider) {
          li.className = 'cm_divider'
        }
      }

      ulOuter.appendChild(li)
    })

    return ulOuter
  }

  display(e: MouseEvent, target?: EventTarget) {
    if (typeof target !== 'undefined') {
      this.contextTarget = target
    } else {
      this.contextTarget = e.target
    }

    var menu = document.getElementById('cm_' + ContextMenu.count)

    var clickCoords = { x: e.clientX, y: e.clientY }
    var clickCoordsX = clickCoords.x
    var clickCoordsY = clickCoords.y

    var menuWidth = menu.offsetWidth + 4
    var menuHeight = menu.offsetHeight + 4

    var windowWidth = window.innerWidth
    var windowHeight = window.innerHeight

    var mouseOffset = this.options.mouse_offset

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

    var sizes = ContextUtil.getSizes(menu)

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

class ContextUtil {
  static getSizes(obj) {
    var lis = obj.getElementsByTagName('li')

    var widthDef = 0
    var heightDef = 0

    for (var i = 0; i < lis.length; i++) {
      var li = lis[i]

      if (li.offsetWidth > widthDef) {
        widthDef = li.offsetWidth
      }

      if (li.offsetHeight > heightDef) {
        heightDef = li.offsetHeight
      }
    }

    var width = widthDef
    var height = heightDef

    for (let i = 0; i < lis.length; i++) {
      let li = lis[i]

      var ul = li.getElementsByTagName('ul')
      if (typeof ul[0] !== 'undefined') {
        var ulSize = ContextUtil.getSizes(ul[0])

        if (widthDef + ulSize.width > width) {
          width = widthDef + ulSize.width
        }

        if (heightDef + ulSize.height > height) {
          height = heightDef + ulSize.height
        }
      }
    }

    return {
      'width': width,
      'height': height
    }
  }
}

class MyHTMLLIElement extends HTMLLIElement {
  menu: ContextMenu
}

export class MenuItem {
  id: string = null
  text: string = null
  icon: string = ''
  events: Map<string, () => void> = null
  enabled: Boolean = true
  sub: MenuItem[] = null
  type: MenuItemType = MenuItemType.default
  public constructor(id: string, text?: string, icon?: string, events?: Map<string, () => void>, enabled?: boolean, sub?: MenuItem[], type?: MenuItemType) {
    this.id = id
    this.text = text || null
    this.icon = icon || ''
    this.events = events || null
    this.enabled = enabled || true
    this.sub = sub || null
    this.type = type || MenuItemType.default
  }
}

export class MenuItemDivider extends MenuItem {
  public constructor() {
    super(null, null, null, null, true, null, MenuItemType.divider)
  }
}

export class MenuItemSub extends MenuItem {
  public constructor(id: string, sub: MenuItem[]) {
    super(id, null, null, null, true, sub)
  }
}

export class MenuOptions {
  default_icon: string = ''
  default_text: string = 'item'
  sub_icon: string = ''
  mouse_offset: number = 2
  close_on_click: boolean = true
  close_on_resize: boolean = true
}