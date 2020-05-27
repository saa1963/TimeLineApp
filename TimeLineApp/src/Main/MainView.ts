import { MainPresenter, InterfaceExTLPeriod } from "./MainPresenter";
import { MainModel } from "./MainModel";
import * as $ from 'jquery'

export class MainView {
  // private свойства
  private Presenter: MainPresenter;

  // элементы страницы
  private aLogin = document.getElementById('btnLogin') as HTMLAnchorElement
  private aReg = document.getElementById('btnReg') as HTMLAnchorElement
  private btnNewTL = document.getElementById('newTimeline') as HTMLButtonElement
  private lblUser = document.getElementById('lblUser') as HTMLLabelElement
  private btnUploadFile = document.getElementById('load_file') as HTMLButtonElement
  private tls = document.getElementById('tls')
  private mainTable: HTMLTableElement

  constructor(model: MainModel) {
    this.Presenter = new MainPresenter(this, model)

    this.aLogin.onclick = async () => {
      const login = await this.Presenter.OnLogin()
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
      this.Presenter.OnPrevPeriod()
    }
    document.getElementById('next_period').onclick = () => {
      this.Presenter.OnNextPeriod()
    }
    document.getElementById('prev_page').onclick = () => {
      this.Presenter.OnPrevPage()
    }
    document.getElementById('next_page').onclick = () => {
      this.Presenter.OnNextPage()
    }
    window.onresize = () => {
      this.Presenter.Draw()
    }
  }

  public ShowPictures(pictures: ArrayBuffer[]) {
    const placeForInsert = document.getElementById('carousel-inner-id')
    while (placeForInsert.firstChild) {
      placeForInsert.removeChild(placeForInsert.firstChild)
    }
    for (const pict of pictures) {
      const blob = new Blob([pict], { type: 'image/jpeg' })
      const imageUrl = window.URL.createObjectURL(blob)
      const elem = document.createElement('image') as HTMLImageElement
      elem.src = imageUrl
      elem.className = 'd-block w-100'
      placeForInsert.appendChild(elem)
    }
    $('#tmShowPictures').modal()
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

  public DrawDates(dates: [string[], number[]]) {
    this.mainTable = document.createElement('table') as HTMLTableElement
    this.mainTable.cellSpacing = '2'
    const row = document.createElement('tr')
    row.classList.add('date')
    for (let i = 0; i < dates[0].length; ++i) {
      const td = document.createElement('td')
      td.classList.add('date_cell')
      td.id = 'i' + i

      const btnGroup = document.createElement('div') as HTMLDivElement
      btnGroup.classList.add('d-flex', 'justify-content-between')

      const btnZoomOut = document.createElement('button') as HTMLButtonElement
      btnZoomOut.classList.add('btn', 'border-0', 'm-0', 'p-0')
      btnZoomOut.onclick = () => {
        this.Presenter.OnScaleBack(i)
      }
      const imgZoomOut = document.createElement('img') as HTMLImageElement
      imgZoomOut.src = '../images/icons8-zoom-out-50.png'
      imgZoomOut.width = 20
      imgZoomOut.height = 20
      btnZoomOut.append(imgZoomOut)
      btnGroup.append(btnZoomOut)

      btnGroup.append(document.createTextNode(dates[0][i]))

      const btnZoomIn = document.createElement('button') as HTMLButtonElement
      btnZoomIn.classList.add('btn', 'border-0', 'm-0', 'p-0')
      btnZoomIn.onclick = () => {
        this.Presenter.OnScaleForward(i)
      }
      const imgZoomIn = document.createElement('img') as HTMLImageElement
      imgZoomIn.src = '../images/icons8-zoom-in-50.png'
      imgZoomIn.width = 20
      imgZoomIn.height = 20
      btnZoomIn.append(imgZoomIn)
      btnGroup.append(btnZoomIn)

      td.append(btnGroup)
      td.ondblclick = (ev) => {
        ev.preventDefault()
        this.Presenter.OnShowSlice(dates[1][i])
      }
      row.append(td)
    }
    this.mainTable.append(row)
    this.tls.append(this.mainTable)
  }

  public async DrawHeader(idx: number, s: string, isMain: boolean) {
    const table = document.getElementsByTagName('table')[0]
    const row = document.createElement('tr')
    row.id = "row-header-" + idx
    let td = document.createElement('td') as HTMLTableDataCellElement
    if (isMain) {
      td.classList.add('tl_head')
    } else {
      td.classList.add('tl_head_sub')
    }
    td.ondragenter = (ev) => {
      ev.preventDefault();
      (ev.target as HTMLTableCellElement).classList.add('period_cell_drop')
    }
    td.ondragleave = (ev) => {
      (ev.target as HTMLTableCellElement).classList.remove('period_cell_drop')
    }
    td.ondragover = (ev) => {
      ev.preventDefault();
    }
    td.ondrop = this.createDrophandler(idx, -1)
    td.colSpan = this.Presenter.MainLineCount - 1
    const txt = document.createTextNode(s)
    td.append(txt)
    row.append(td)

    td = document.createElement('td') as HTMLTableDataCellElement
    td.append(this.CreateTLDropDown(idx))
    row.append(td)
    table.append(row)
  }

  public SetPhotoLabel(idx: number, idx0: number) {
    const td = document.getElementById('cell-' + idx + '-' + idx0) as HTMLTableDataCellElement
    td.classList.add('photo')
  }

  private CreateDropDown(header: string, mas: { header: string; handler: (ev) => void }[]) {
    const btnMenu = document.createElement('button') as HTMLButtonElement
    btnMenu.type = 'button'
    btnMenu.setAttribute('data-toggle', 'dropdown')
    btnMenu.classList.add('btn')
    btnMenu.classList.add('btn-secondary')
    btnMenu.classList.add('btn-block')
    btnMenu.classList.add('dropdown-toggle')
    btnMenu.textContent = header
    const divGroup = document.createElement('div') as HTMLDivElement
    divGroup.classList.add('dropdown-menu')

    for (const item of mas) {
      const newMenuItem = document.createElement('a') as HTMLAnchorElement
      newMenuItem.classList.add('dropdown-item')
      newMenuItem.textContent = item.header
      newMenuItem.href = '#'
      newMenuItem.onclick = item.handler
      divGroup.append(newMenuItem)
    }

    const divDropDown = document.createElement('div') as HTMLDivElement
    divDropDown.classList.add('dropdown')
    divDropDown.append(btnMenu)
    divDropDown.append(divGroup)

    return divDropDown
  }

  private CreateTLDropDown(idx: number): HTMLDivElement {
    return this.CreateDropDown('>>', [
      {
        header: 'Добавить',
        handler: async () => {
          await this.Presenter.OnAddPeriod(idx)
        }
      },
      {
        header: 'Сохранить',
        handler: async () => {
          await this.Presenter.OnSave(idx)
        }
      },
      {
        header: 'В файл',
        handler: async () => {
          await this.Presenter.OnSaveToFile(idx)
        }
      },
      {
        header: 'Свернуть',
        handler: async () => {
          await this.Presenter.OnCollapse(idx)
        }
      },
      {
        header: 'Показать все',
        handler: async () => {
          await this.Presenter.OnShowAll(idx)
        }
      }
    ])
  }

  public DrawEventsRow(idx: number, items: InterfaceExTLPeriod[]) {
    let Id: number;
    const row = document.createElement('tr')
    row.classList.add('row-data-' + idx)
    let i = 0, last = -1
    while (i < items.length) {
      Id = items[i].item.Id
      if (items[i].il - last !== 1) {
        const td = document.createElement('td') as HTMLTableDataCellElement
        td.classList.add('hidden_cell')
        td.colSpan = items[i].il - last - 1
        last = items[i].il - 1
        row.append(td)
      }
      const td = document.createElement('td') as HTMLTableDataCellElement
      td.id = 'cell-' + idx + '-' + Id
      td.draggable = true
      td.colSpan = items[i].ir - items[i].il + 1
      td.classList.add('period_cell')
      if (items[i].item.Count > 0) {
        td.classList.add('note')
      }
      td.ondragstart = this.createDragstarthandler(idx, Id)
      td.ondragenter = (ev) => {
        ev.preventDefault();
        (ev.target as HTMLTableCellElement).classList.add('period_cell_drop')
      }
      td.ondragleave = (ev) => {
        (ev.target as HTMLTableCellElement).classList.remove('period_cell_drop')
      }
      td.ondragover = (ev) => {
        ev.preventDefault();
      }
      td.ondrop = this.createDrophandler(idx, Id)
      //td.oncontextmenu = this.createContextmenuhandler(idx, Id)
      last = items[i].ir
      const txt = document.createTextNode(items[i].item.Name)
      td.append(txt)
      row.append(td)
      i++
    }
    const header = document.getElementById('row-header-' + idx)
    header.after(row)
  }

  private createDrophandler(idx: number, id: number) {
    return (ev) => {
      this.Presenter.OnDrop(ev, idx, id)
    }
  }

  private createDragstarthandler(idx: number, id: number) {
    return (ev) => {
      this.Presenter.OnDragStart(ev, idx, id)
    }
  }

  private createContextmenuhandler(idx: number, id: number) {
    return (ev) => {
      ev.preventDefault()
      this.Presenter.OnPeriodContextMenu(ev, idx, id)
    }
  }

  /**
   * Удалить заголовок TL по индексу
   * @param idx
   */
  public RemoveHeader(idx: number) {
    const row = this.mainTable.querySelector('#row-header-' + idx)
    this.mainTable.removeChild(row)
  }

  /**
   * Удалить строки из TL с индексом idx
   * @param idx
   */
  public RemoveDataRows(idx: number) {
    const rows = this.mainTable.querySelectorAll('tr.row-data-' + idx)
    for (const el of rows) {
      this.mainTable.removeChild(el)
    }
  }
}