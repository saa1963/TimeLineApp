import { TimeLineModel } from "./TimeLineModel";
import { SimpleEventDispatcher, ISimpleEvent } from "ste-simple-events";
import { ContextMenu, MenuItem, MenuItemDivider, MenuItemSub } from "./contextmenu";

export class MainModel {
  private static instance: MainModel;
  private models: TimeLineModel[] = []
  private menu: ContextMenu

  // пункты меню с периодами
  private PeriodDay: MenuItem
  private PeriodMonth: MenuItem
  private PeriodYear: MenuItem
  private PeriodDecade: MenuItem
  private PeriodCentury: MenuItem

  private constructor() {
    let menuitems: MenuItem[] = []
    menuitems.push(new MenuItem('new', 'Новая', '<i class="far fa-file"></i>'))
    menuitems.push(new MenuItem('load', 'Загрузить', '<i class="far fa-folder-open"></i>'))
    menuitems.push(new MenuItem('save', 'Сохранить', '<i class="far fa-save"></i>', false))
    menuitems.push(new MenuItemDivider())
    let sub: MenuItem[] = []
    sub.push(this.PeriodDay = new MenuItem('switch_to_day', 'День', null))
    sub.push(this.PeriodMonth = new MenuItem('switch_to_month', 'Месяц', null))
    sub.push(this.PeriodYear = new MenuItem('switch_to_year', 'Год', null))
    sub.push(this.PeriodDecade = new MenuItem('switch_to_decade', 'Десятилетие', null))
    sub.push(this.PeriodCentury = new MenuItem('switch_to_century', 'Век', null))
    menuitems.push(new MenuItemSub('period', 'Периодичность', sub))
    this.menu = new ContextMenu(menuitems)
  }

  public static getInstance() {
    if (!MainModel.instance) {
      MainModel.instance = new MainModel();
      // ... any one time initialization goes here ...
    }
    return MainModel.instance;
  }

  public Add(model: TimeLineModel): number {
    let rt = this.models.push(model)
    this.e_AddTimeLine.dispatch(model)
    return rt
  }

  public Remove(i: number): boolean {
    if (!this.validIndex(i)) throw "Неверный индекс"
    this.models.splice(i, 1)
    this.e_RemoveTimeLine.dispatch(i)
    return true
  }

  public get Count(): number {
    return this.models.length
  }

  public Item(i: number): TimeLineModel {
    if (!this.validIndex(i)) throw "Неверный индекс"
    return this.models[i]
  }

  private e_AddTimeLine = new SimpleEventDispatcher<TimeLineModel>();
  public get evAddTimeLine(): ISimpleEvent<TimeLineModel> {
    return this.e_AddTimeLine.asEvent();
  }

  private e_RemoveTimeLine = new SimpleEventDispatcher<number>();
  public get evRemoveTimeLine(): ISimpleEvent<number> {
    return this.e_RemoveTimeLine.asEvent();
  }

  private validIndex(i: number): boolean {
    if (!this.models) return false
    if (this.models.length === 0) return false
    if (i < 0 || i >= this.models.length) return false
  }
}