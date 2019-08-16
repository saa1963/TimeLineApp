import { ITlistView } from "./ITlistView";
import * as $ from 'jquery'
import { TlistPresenter } from "./TlistPresenter";
import { TlistModel } from "./TlistModel";
import { Globals } from "./Globals";

export class TlistView implements ITlistView {
  private Presenter: TlistPresenter
  private tbList: HTMLSelectElement
  private btnOk: HTMLButtonElement
  private btnCancel: HTMLButtonElement
  private dlg: HTMLElement

  constructor(model: TlistModel) {
    this.tbList = <HTMLSelectElement>document.getElementById('files_list')
    this.btnOk = <HTMLButtonElement>document.getElementById('btnLoadTL')
    this.btnCancel = <HTMLButtonElement>document.getElementById('btnCancelLoadTL')
    this.dlg = <HTMLElement>document.getElementById('tmLoadModal')

    this.tbList.onchange = () => {
      this.Presenter.OnChangeListInView()
    }
    this.btnOk.onclick = async () => {
      if (!Globals.ValidateElements(this.dlg)) return
      let success = await this.Presenter.DoLoad()
      if (success) {
        $('#tmLoadModal').modal('hide')
      }
    }
    this.btnCancel.onclick = () => {
      $('#tmLoadModal').modal('hide')
    }
    this.Presenter = new TlistPresenter(this, model)
  }

  ShowDialog(): void {
    throw new Error("Method not implemented.");
  }
  GetSelectedValue(): string {
    throw new Error("Method not implemented.");
  }
}