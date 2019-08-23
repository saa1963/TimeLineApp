import { ContextMenu, MenuItem, MenuItemSub, MenuItemDivider } from "./contextmenu";
import { EnumPeriod } from "./TLEvent";
import { SimpleEventDispatcher, ISimpleEvent } from "ste-simple-events";

export class MyContextMenu {
  public static Create(): ContextMenu {
    let menuitems: MenuItem[] = []
    let m = new Map<string, () => void>().set('click', () => MyContextMenu.e_Select.dispatch('new'))
    menuitems.push(new MenuItem('new', 'Новая', '<i class="far fa-file"></i>', m))
    m = new Map<string, () => void>().set('click', () => MyContextMenu.e_Select.dispatch('load'))
    menuitems.push(new MenuItem('load', 'Загрузить', '<i class="far fa-folder-open"></i>', m))
    m = new Map<string, () => void>().set('click', () => MyContextMenu.e_Select.dispatch('save'))
    menuitems.push(new MenuItem('save', 'Сохранить', '<i class="far fa-save"></i>', m, false))
    menuitems.push(new MenuItemDivider())
    let sub: MenuItem[] = []
    m = new Map<string, () => void>().set('click', () => MyContextMenu.e_Select.dispatch('switch_to_day'))
    sub.push(new MenuItem('switch_to_day', 'День', null, m))
    m = new Map<string, () => void>().set('click', () => MyContextMenu.e_Select.dispatch('switch_to_month'))
    sub.push(new MenuItem('switch_to_month', 'Месяц', null, m))
    m = new Map<string, () => void>().set('click', () => MyContextMenu.e_Select.dispatch('switch_to_year'))
    sub.push(new MenuItem('switch_to_year', 'Год', null, m))
    m = new Map<string, () => void>().set('click', () => MyContextMenu.e_Select.dispatch('switch_to_decade'))
    sub.push(new MenuItem('switch_to_decade', 'Десятилетие', null, m))
    m = new Map<string, () => void>().set('click', () => MyContextMenu.e_Select.dispatch('switch_to_century'))
    sub.push(new MenuItem('switch_to_century', 'Век', null, m))
    menuitems.push(new MenuItemSub('period', 'Периодичность', sub))
    return new ContextMenu(menuitems)
  }

  private static e_Select = new SimpleEventDispatcher<string>();
  public get evSelect(): ISimpleEvent<string> {
    return MyContextMenu.e_Select.asEvent();
  }
}