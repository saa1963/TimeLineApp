import { ContextMenu, MenuItem, MenuItemSub, MenuItemDivider } from "./contextmenu";
import { EnumPeriod } from "./TLEvent";
import { SimpleEventDispatcher, ISimpleEvent } from "ste-simple-events";

export class MyContextMenu {
  public static Create(): ContextMenu {
    let menuitems: MenuItem[] = []
    menuitems.push(new MenuItem('new', 'Новая', '<i class="far fa-file"></i>'))
    menuitems.push(new MenuItem('load', 'Загрузить', '<i class="far fa-folder-open"></i>'))
    menuitems.push(new MenuItem('save', 'Сохранить', '<i class="far fa-save"></i>', null, false))
    menuitems.push(new MenuItemDivider())
    let sub: MenuItem[] = []
    sub.push(MyContextMenu.PeriodDay = new MenuItem('switch_to_day', 'День', null))
    sub.push(MyContextMenu.PeriodMonth = new MenuItem('switch_to_month', 'Месяц', null))
    sub.push(MyContextMenu.PeriodYear = new MenuItem('switch_to_year', 'Год', null))
    sub.push(MyContextMenu.PeriodDecade = new MenuItem('switch_to_decade', 'Десятилетие', null))
    sub.push(MyContextMenu.PeriodCentury = new MenuItem('switch_to_century', 'Век', null))
    menuitems.push(new MenuItemSub('period', 'Периодичность', sub))
    return new ContextMenu(menuitems)
  }

  public static ChangeIconMenuPeriod(period: EnumPeriod) {
    const fa_angle_down = '<i class="far fa-check-square"></i>'
    MyContextMenu.PeriodDay.icon = ''
    MyContextMenu.PeriodMonth.icon = ''
    MyContextMenu.PeriodYear.icon = ''
    MyContextMenu.PeriodDecade.icon = ''
    MyContextMenu.PeriodCentury.icon = ''
    switch (period) {
      case EnumPeriod.day:
        MyContextMenu.PeriodDay.icon = fa_angle_down
        break;
      case EnumPeriod.month:
        MyContextMenu.PeriodMonth.icon = fa_angle_down
        break;
      case EnumPeriod.year:
        MyContextMenu.PeriodYear.icon = fa_angle_down
        break;
      case EnumPeriod.decade:
        MyContextMenu.PeriodDecade.icon = fa_angle_down
        break;
      case EnumPeriod.century:
        MyContextMenu.PeriodCentury.icon = fa_angle_down
        break;
    }
  }

  // пункты меню с периодами
  private static PeriodDay: MenuItem
  private static PeriodMonth: MenuItem
  private static PeriodYear: MenuItem
  private static PeriodDecade: MenuItem
  private static PeriodCentury: MenuItem
}