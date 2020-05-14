import { InterfaceTlistView } from "../ITlistView";
import * as $ from 'jquery'
import { TlistPresenter } from "./TlistPresenter";
import { TlistModel } from "./TlistModel";
import { Globals } from "../Globals";
import { TLPeriod } from "../TLPeriod";

export class TlistView implements InterfaceTlistView {
  private Presenter: TlistPresenter
  private tbList: HTMLSelectElement
  private btnOk: HTMLButtonElement
  private btnCancel: HTMLButtonElement
  private dlg: HTMLElement

  constructor(model: TlistModel) {
    this.tbList = document.getElementById('files_list') as HTMLSelectElement
    this.btnOk = document.getElementById('btnLoadTL') as HTMLButtonElement
    this.btnCancel = document.getElementById('btnCancelLoadTL') as HTMLButtonElement
    this.dlg = document.getElementById('tmLoadModal') as HTMLElement

    this.tbList.onchange = () => {
      this.Presenter.OnChangeValueInView()
    }
    
    this.Presenter = new TlistPresenter(this, model)

    const filesList = $('#files_list')
    filesList.find('option').remove()
    for (let i = 0; i < model.length; i++) {
      filesList.append($('<option></option>', { value: model[i], text: model[i] }))
    }
  }

  public async ShowDialog(): Promise<TLPeriod> {
    return new Promise<TLPeriod>((resolve, reject) => {
      $('#tmLoadModal').modal()
      this.ClearError()
      this.btnOk.onclick = async () => {
        if (!Globals.ValidateElements(this.dlg)) return
        const tlModel = await this.Presenter.DoSelect()
        if (tlModel) {
          $('#tmLoadModal').modal('hide')
          resolve(tlModel)
        }
      }
      this.btnCancel.onclick = async () => {
        $('#tmLoadModal').modal('hide')
        reject()
      }
    })
  }
  public GetSelectedValue(): string {
    return $('#files_list').children("option:selected").val() as string
  }
  public SetError(err: string): void {
    $('#load_error').text(err)
    $('#load_error').css('display', 'unset')
  }

  private ClearError(): void {
    $('#load_error').css('display', 'none')
  }
}