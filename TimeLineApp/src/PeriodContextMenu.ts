import { ContextMenu, MenuItem, MenuItemDivider } from "./contextmenu";

export class PeriodContextMenu {
  public static Create(): ContextMenu {
    const menuitems: MenuItem[] = []
    menuitems.push(new MenuItem('edit', 'Изменить'))
    menuitems.push(new MenuItem('del', 'Удалить'))
    menuitems.push(new MenuItem('expand', 'Развернуть'))
    menuitems.push(new MenuItemDivider())
    return new ContextMenu(menuitems)
  }
}