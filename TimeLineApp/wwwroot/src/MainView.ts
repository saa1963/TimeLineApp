import { MainPresenter } from "./MainPresenter";
import * as $ from 'jquery'
import { MainModel } from "./MainModel";

export class MainView {
  // private свойства
  private Presenter: MainPresenter;

  constructor(model: MainModel) {
    this.Presenter = new MainPresenter(this, model)

    document.getElementById('btnLogin').onclick = async () => {
      let login = await this.Presenter.OnLogin()
      if (login) {
        this.SetUserLabel(login)
      } else {
        this.ClearUserLabel()
      }
    }
    document.getElementById('btnReg').onclick = async () => {
      await this.Presenter.OnRegister()
    }
    document.getElementById('newTimeline').onclick = () => {
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
    $('#tls').empty()
  }

  private SetUserLabel(user: string): void {
    $('#lblUser').text(user)
    $('#lblUser').css('display', 'unset')
    $('#btnLogin').text('Выход')
  }

  private ClearUserLabel(): void {
    $('#lblUser').css('display', 'none')
    $('#btnLogin').text('Вход')
  }

  public DrawDates(dates: string[]) {
    $('#tls').append(`<table cellspacing="2"><tr class="date"></tr></table>`)
    for (let i = 0; i < dates.length; ++i) {
      $('.date').append(`<td class="date_cell" id="i${i}">${dates[i]}</td>`)
      $(`#i${i}`).on('click', (ev) => {
        this.Presenter.OnScale(i)
      })
    }
  }

  public DrawHeader(s: string) {
    $('table').append(`tr><td class="tl_head" colspan="${this.Presenter.MainLineCount}">${s}</td></tr>`)
  }
}