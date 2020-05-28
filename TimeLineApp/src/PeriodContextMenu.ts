import * as $ from 'jquery'
import { ContextMenu, MenuItem, MenuItemDivider } from "./contextmenu";
import { MenuOptions } from "./MenuOptions";

export class PeriodContextMenu {
  public static Create(): ContextMenu {
    const menuitems: MenuItem[] = []
    menuitems.push(new MenuItem('edit', 'Изменить'))
    menuitems.push(new MenuItem('del', 'Удалить'))
    menuitems.push(new MenuItem('expand', 'Развернуть'))
    menuitems.push(new MenuItem('showpictures', 'Показать изображения'))
    menuitems.push(new MenuItem('uploadpicture', 'Загрузить изображение'))
    menuitems.push(new MenuItemDivider())
    const menuOptions = new MenuOptions()
    return new ContextMenu(menuitems, menuOptions)
  }

  public static Create1(): void {
  }
}