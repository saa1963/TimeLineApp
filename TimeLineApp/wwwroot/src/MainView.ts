import { MainPresenter } from "./MainPresenter";
import { ContextMenu, MenuItem, MenuItemType, MenuItemDivider, MenuItemSub } from "./contextmenu";
import { EnumPeriod } from "./TLEvent";
import { TimeLine } from "./timeline";
import { LiteEvent } from "./LightEvent";

export class MainView {
  // private свойства
  private ctx: CanvasRenderingContext2D
  private menuCtx: ContextMenu

  // пункты меню с периодами
  private PeriodDay: MenuItem
  private PeriodMonth: MenuItem
  private PeriodYear: MenuItem
  private PeriodDecade: MenuItem
  private PeriodCentury: MenuItem

  // pubic свойства
  public Presenter: MainPresenter;

  constructor() {
    let menuitems: MenuItem[] = []
    let m = new Map<string, () => void>().set('click', this.OpenNewTLDialog)
    menuitems.push(new MenuItem('new', 'Новая', '<i class="far fa-file"></i>', m))
    m = new Map<string, () => void>().set('click', this.OpenLoadTLDialog)
    menuitems.push(new MenuItem('load', 'Загрузить', '<i class="far fa-folder-open"></i>', m))
    m = new Map<string, () => void>().set('click', this.SaveCurrentTL)
    menuitems.push(new MenuItem('save', 'Сохранить', '<i class="far fa-save"></i>', m, false))
    menuitems.push(new MenuItemDivider())
    let sub: MenuItem[] = []
    m = new Map<string, () => void>().set('click', () => { this.Presenter.Period = EnumPeriod.day })
    sub.push(this.PeriodDay = new MenuItem('switch_to_day', 'День', null, m))
    m = new Map<string, () => void>().set('click', () => { this.Presenter.Period = EnumPeriod.month })
    sub.push(this.PeriodMonth = new MenuItem('switch_to_month', 'Месяц', null, m))
    m = new Map<string, () => void>().set('click', () => { this.Presenter.Period = EnumPeriod.year })
    sub.push(this.PeriodYear = new MenuItem('switch_to_year', 'Год', null, m))
    m = new Map<string, () => void>().set('click', () => { this.Presenter.Period = EnumPeriod.decade })
    sub.push(this.PeriodDecade = new MenuItem('switch_to_decade', 'Десятилетие', null, m))
    m = new Map<string, () => void>().set('click', () => { this.Presenter.Period = EnumPeriod.century })
    sub.push(this.PeriodCentury = new MenuItem('switch_to_century', 'Век', null, m))
    menuitems.push(new MenuItemSub('Периодичность', sub))
    this.menuCtx = new ContextMenu(menuitems)

    this.Presenter = new MainPresenter(this)
    this.Presenter.ChangePeriod.on(this.OnChangePeriod)

    this.OnChangePeriod(this.Presenter.Period)

    //let canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
    //ctx = canvas.getContext('2d')
  }

  // В презентере изменился Period
  private OnChangePeriod(period: EnumPeriod) {
    this.ChangeIconMenuPeriod(period)
    this.Draw()
  }

  private ChangeIconMenuPeriod(period: EnumPeriod) {
    const fa_angle_down = '<i class="fas fa-angle-down"></i>'
    this.PeriodDay = null
    this.PeriodMonth = null
    this.PeriodYear = null
    this.PeriodDecade = null
    this.PeriodCentury = null
    switch (period) {
      case EnumPeriod.day:
        this.PeriodDay.icon = fa_angle_down
        break;
      case EnumPeriod.month:
        this.PeriodMonth.icon = fa_angle_down
        break;
      case EnumPeriod.year:
        this.PeriodYear.icon = fa_angle_down
        break;
      case EnumPeriod.decade:
        this.PeriodDecade.icon = fa_angle_down
        break;
      case EnumPeriod.century:
        this.PeriodCentury.icon = fa_angle_down
        break;
    }
  }

  // отрисовка Линий Времени 
  public Draw() {
    throw new Error("Method not implemented.");
  }

  private OpenNewTLDialog() {
    $('#tmName').val('')
    $('#btnNewName').prop('disabled', true)
    $('#tmNameModal').modal()
  }

  private OpenLoadTLDialog() {
  TimeLine.getList()
    .then(value => {
      let files_list = $('#files_list')
      files_list.find('option').remove()
      for (let i = 0; i < value.length; i++) {
        files_list.append($('<option></option>', { value: value[i], text: value[i] }))
      }
      $('#tmLoadModal').modal()
    })
    .catch(responseText => {
      alert('Ошибка сервера.\n' + responseText)
    })
  }

  private SaveCurrentTL() {

  }

  public OnResizeWindow(width: number, height: number) {
    this.Draw()
    //canvas.style.top = HTOP + 'px'
    //canvas.width = window.innerWidth
    //canvas.height = window.innerHeight - HTOP
    //drawAll()
  }

  public OnContextMenu(e: MouseEvent) {
    this.menuCtx.reload()
    this.menuCtx.display(e)
  }
}