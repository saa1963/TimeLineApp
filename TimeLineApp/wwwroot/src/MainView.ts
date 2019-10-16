import { MainPresenter } from "./MainPresenter";
import * as $ from 'jquery'
import { MainModel } from "./MainModel";

export class MainView {
  // private свойства
  private Presenter: MainPresenter;

  // элементы страницы
  private aLogin = <HTMLAnchorElement>document.getElementById('btnLogin')
  private aReg = <HTMLAnchorElement>document.getElementById('btnReg')
  private btnNewTL = <HTMLButtonElement>document.getElementById('newTimeline')
  private lblUser = <HTMLLabelElement>document.getElementById('lblUser')
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
    document.addEventListener('contextmenu', (ev) => {
      this.Presenter.OnContextMenu(ev)
    })
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

  public DrawHeader(s: string) {
    let table = document.getElementsByTagName('table')[0]
    let row = document.createElement('tr')
    let td = <HTMLTableDataCellElement>document.createElement('td')
    td.classList.add('tl_head')
    td.colSpan = this.Presenter.MainLineCount
    let txt = document.createTextNode(s)
    td.append(txt)
    row.append(td)
    table.append(row)
  }
}