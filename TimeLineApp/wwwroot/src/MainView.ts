import { MainPresenter } from "./MainPresenter";
import { ContextMenu, MenuItem, MenuItemType, MenuItemDivider, MenuItemSub } from "./contextmenu";
import { EnumPeriod } from "./TLEvent";
import { TimeLine } from "./timeline";

export class MainView {
  // private свойства
  private ctx: CanvasRenderingContext2D
  private menuCtx: ContextMenu

  //
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
    m = new Map<string, () => void>().set('click', this.SwitchPeriodToDay)
    //sub.push(new MenuItem('switch_to_day', 'День', '<i class="fas fa-angle-down"></i>', m))
    sub.push(this.PeriodDay = new MenuItem('switch_to_day', 'День', null, m))
    m = new Map<string, () => void>().set('click', this.SwitchPeriodToMonth)
    sub.push(this.PeriodMonth = new MenuItem('switch_to_month', 'Месяц', null, m))
    m = new Map<string, () => void>().set('click', this.SwitchPeriodToYear)
    sub.push(this.PeriodYear = new MenuItem('switch_to_year', 'Год', null, m))
    m = new Map<string, () => void>().set('click', this.SwitchPeriodToDecade)
    sub.push(this.PeriodDecade = new MenuItem('switch_to_decade', 'Десятилетие', null, m))
    m = new Map<string, () => void>().set('click', this.SwitchPeriodToCentury)
    sub.push(this.PeriodCentury = new MenuItem('switch_to_century', 'Век', null, m))
    menuitems.push(new MenuItemSub('Периодичность', sub))

    this.menuCtx = new ContextMenu(menuitems)
    this.Presenter = new MainPresenter()
    this.RefreshStateFromPresenter()
  }

  private RefreshStateFromPresenter() {
    this.RefreshPeriod()
  }

  private RefreshPeriod() {
    this.PeriodDay = null
    this.PeriodMonth = null
    this.PeriodYear = null
    this.PeriodDecade = null
    this.PeriodCentury = null
    switch (this.Presenter.Period === EnumPeriod.day) {

    }
  }

  public Draw() {
    throw new Error("Method not implemented.");
  }

  private SwitchPeriod(menuCtx: ContextMenu, day: EnumPeriod) {
    menuCtx.menu.find(el => el.id === 'period').sub.forEach((el, nd, arr) => {
      if (el.id === idPeriod) {
        el.icon = '<i class="fas fa-angle-down"></i>'
      } else {
        el.icon = ''
      }
    })
    PERIOD_TYPE = idPeriod
    drawAll()
    menuCtx.reload()
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

  private SwitchPeriodToDay() {

  }

  private SwitchPeriodToMonth() {
    this.menuCtx.menu.find(el => el.id === 'period').sub.forEach((el, nd, arr) => {
      if (el.id === 'switch_to_month') {
        el.icon = '<i class="fas fa-angle-down"></i>'
      } else {
        el.icon = ''
      }
    })
    PERIOD_TYPE = idPeriod
    drawAll()
    this.menuCtx.reload()
  }

  private SwitchPeriodToYear() {

  }

  private SwitchPeriodToDecade() {

  }

  private SwitchPeriodToCentury() {

  }
}