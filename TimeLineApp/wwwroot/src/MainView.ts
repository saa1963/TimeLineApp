import { MainPresenter } from "./MainPresenter";
import { ContextMenu, MenuItem, MenuItemType, MenuItemDivider, MenuItemSub } from "./contextmenu";
import { EnumPeriod } from "./TLEvent";
import { TimeLine } from "./timeline";
import { LogonHandlers } from "./LogonHandlers";
import { LoginView } from "./LoginView";
import { Globals } from "./Globals";
import { LoginModel } from "./LoginModel";

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
    menuitems.push(new MenuItemSub('period', 'Периодичность', sub))

    this.ChangeIconMenuPeriod(EnumPeriod.day)
    this.menuCtx = new ContextMenu(menuitems)

    this.Presenter = new MainPresenter(this)
    this.Presenter.evChangePeriod.subscribe((period) => {
      this.ChangeIconMenuPeriod(period)
    })
  }

  private ChangeIconMenuPeriod(period: EnumPeriod) {
    const fa_angle_down = '<i class="far fa-check-square"></i>'
    this.PeriodDay.icon = ''
    this.PeriodMonth.icon = ''
    this.PeriodYear.icon = ''
    this.PeriodDecade.icon = ''
    this.PeriodCentury.icon = ''
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
  }

  public OnContextMenu(e: MouseEvent) {
    this.menuCtx.reload()
    this.menuCtx.display(e)
  }

  OnLogin() {
    let loginModel = new LoginModel(Globals.getCookie('timelineuser') || '')
    let loginView = new LoginView(loginModel)
    if (loginView.ShowDialog()) {

    }
  }

  public handleEvent(event: Event) {
    if (event.type === 'contextmenu') {
      this.OnContextMenu(<MouseEvent>event)
      event.preventDefault()
    }
  }
}