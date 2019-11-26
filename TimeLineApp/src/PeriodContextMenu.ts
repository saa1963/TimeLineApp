import { ContextMenu, MenuItem, MenuItemSub, MenuItemDivider } from "./contextmenu";
import { EnumPeriod } from "./TLEvent";

export class PeriodContextMenu {
  public static Create(): ContextMenu {
    let menuitems: MenuItem[] = []
    menuitems.push(new MenuItem('edit', 'Изменить'))
    menuitems.push(new MenuItem('del', 'Удалить'))
    menuitems.push(new MenuItem('expand', 'Развернуть'))
    menuitems.push(new MenuItemDivider())
    return new ContextMenu(menuitems)
  }
}