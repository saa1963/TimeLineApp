import { MainPresenter, IExTLPeriod } from "./MainPresenter";
import { MainModel } from "./MainModel";

export class MainView {
  // private свойства
  private Presenter: MainPresenter;

  // элементы страницы
  private aLogin = <HTMLAnchorElement>document.getElementById('btnLogin')
  private aReg = <HTMLAnchorElement>document.getElementById('btnReg')
  private btnNewTL = <HTMLButtonElement>document.getElementById('newTimeline')
  private lblUser = <HTMLLabelElement>document.getElementById('lblUser')
  private btnUploadFile = <HTMLButtonElement>document.getElementById('load_file')
  private tls = document.getElementById('tls')
  private mainTable: HTMLTableElement

  constructor(model: MainModel) {
    this.Presenter = new MainPresenter(this, model)

    this.aLogin.onclick = async () => {
      let login = await this.Presenter.OnLogin()
      if (login) {
        this.SetUserLabel(login)
      } else {
        this.ClearUserLabel()
      }
    }
    this.aReg.onclick = async () => {
      await this.Presenter.OnRegister()
    }
    this.btnNewTL.onclick = () => {
      this.Presenter.OpenNewTLDialog()
    }
    document.getElementById('load').onclick = () => {
      this.Presenter.OpenLoadTLDialog()
    }
    this.btnUploadFile.onclick = () => {
      this.Presenter.UploadFile()
    }
    document.getElementById('prev_period').onclick = () => {
      this.Presenter.OnPrev_Period()
    }
    document.getElementById('next_period').onclick = () => {
      this.Presenter.OnNext_Period()
    }
    document.getElementById('prev_page').onclick = () => {
      this.Presenter.OnPrev_Page()
    }
    document.getElementById('next_page').onclick = () => {
      this.Presenter.OnNext_Page()
    }
    //document.addEventListener('contextmenu', (ev) => {
    //  this.Presenter.OnContextMenu(ev)
    //})
    window.onresize = () => {
      this.Presenter.Draw()
    }
  }

  public ClearContent() {
    if (this.mainTable) {
      this.tls.removeChild(this.mainTable)
    }
  }

  private SetUserLabel(user: string): void {
    this.lblUser.textContent = user
    this.lblUser.style.display = 'unset'
    this.aLogin.textContent = 'Выход'
  }

  private ClearUserLabel(): void {
    this.lblUser.style.display = 'none'
    this.aLogin.textContent = 'Вход'
  }

  public DrawDates(dates: string[]) {
    this.mainTable = <HTMLTableElement>document.createElement('table')
    this.mainTable.cellSpacing = '2'
    let row = document.createElement('tr')
    row.classList.add('date')
    for (let i = 0; i < dates.length; ++i) {
      let td = document.createElement('td')
      td.classList.add('date_cell')
      td.id = 'i' + i
      td.onclick = (ev) => {
        this.Presenter.OnScale(i)
      }
      let dt = document.createTextNode(dates[i])
      td.append(dt)
      row.append(td)
    }
    this.mainTable.append(row)
    this.tls.append(this.mainTable)
  }

  public async DrawHeader(idx: number, s: string) {
    let table = document.getElementsByTagName('table')[0]
    let row = document.createElement('tr')
    row.id = "row-header-" + idx
    let td = <HTMLTableDataCellElement>document.createElement('td')
    td.classList.add('tl_head')
    td.colSpan = this.Presenter.MainLineCount - 1
    let txt = document.createTextNode(s)
    td.append(txt)
    row.append(td)

    let btnMenu = <HTMLButtonElement>document.createElement('button')
    btnMenu.type = 'button'
    btnMenu.setAttribute('data-toggle', 'dropdown')
    btnMenu.classList.add('btn')
    btnMenu.classList.add('btn-secondary')
    btnMenu.classList.add('btn-block')
    btnMenu.classList.add('dropdown-toggle')
    btnMenu.textContent = '>>'
    
    let aPlus = <HTMLAnchorElement>document.createElement('a')
    aPlus.classList.add('dropdown-item')
    aPlus.textContent = "Добавить"
    aPlus.href = '#'
    aPlus.onclick = async (ev) => {
      await this.Presenter.OnAddPeriod(idx)
    }
    let aSave = <HTMLAnchorElement>document.createElement('a')
    aSave.classList.add('dropdown-item')
    aSave.textContent = "Сохранить"
    aSave.href = '#'
    aSave.onclick = async (ev) => {
      await this.Presenter.OnSave(idx)
    }
    let aSaveToFile = <HTMLAnchorElement>document.createElement('a')
    aSaveToFile.classList.add('dropdown-item')
    aSaveToFile.textContent = "Сохранить в файл"
    aSaveToFile.href = '#'
    aSaveToFile.onclick = async (ev) => {
      await this.Presenter.OnSaveToFile(idx)
    }
    let aCollapse = <HTMLAnchorElement>document.createElement('a')
    aCollapse.classList.add('dropdown-item')
    aCollapse.textContent = "Свернуть"
    aCollapse.href = '#'
    aCollapse.onclick = async (ev) => {
      await this.Presenter.OnCollapse(idx)
    }
    let divGroup = <HTMLDivElement>document.createElement('div')
    divGroup.classList.add('dropdown-menu')
    divGroup.append(aPlus)
    divGroup.append(aSave)
    divGroup.append(aSaveToFile)
    divGroup.append(aCollapse)

    let divDropDown = <HTMLDivElement>document.createElement('div')
    divDropDown.classList.add('dropdown')
    divDropDown.append(btnMenu)
    divDropDown.append(divGroup)

    td = <HTMLTableDataCellElement>document.createElement('td')
    td.append(divDropDown)
    row.append(td)
    table.append(row)
  }

  public DrawEventsRow(idx: number, items: IExTLPeriod[]) {
    let row = document.createElement('tr')
    row.classList.add('row-data-' + idx)
    let i = 0, last = -1
    while (i < items.length) {
      if (items[i].il - last != 1) {
        let td = <HTMLTableDataCellElement>document.createElement('td')
        td.classList.add('hidden_cell')
        td.colSpan = items[i].il - last - 1
        last = items[i].il - 1
        row.append(td)
      }
      let td = <HTMLTableDataCellElement>document.createElement('td')
      td.colSpan = items[i].ir - items[i].il + 1
      td.classList.add('period_cell')
      td.oncontextmenu = this.createcontextmenuhandler(idx, items[i].item.Id)
      last = items[i].ir
      let txt = document.createTextNode(items[i].item.Name)
      td.append(txt)
      row.append(td)
      i++
    }
    let header = document.getElementById('row-header-' + idx)
    header.after(row)
  }

  private createcontextmenuhandler(idx: number, i: number) {
    return (ev) => {
      ev.preventDefault()
      this.Presenter.OnPeriodContextMenu(ev, idx, i)
    }
  }

  /**
   * Удалить строки из TL с индексом idx
   * @param idx
   */
  public RemoveDataRows(idx: number) {
    let rows = this.mainTable.querySelectorAll('tr.row-data-' + idx)
    for (let el of rows) {
      this.mainTable.removeChild(el)
    }
  }
}