import { ITlistView } from "./ITlistView";
import * as $ from 'jquery'
import { TlistPresenter } from "./TlistPresenter";
import { TlistModel } from "./TlistModel";
import { Globals } from "./Globals";
import { TimeLineModel } from "./TimeLineModel";

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
      this.Presenter.OnChangeValueInView()
    }
    
    this.Presenter = new TlistPresenter(this, model)

    let files_list = $('#files_list')
    files_list.find('option').remove()
    for (let i = 0; i < model.length; i++) {
      files_list.append($('<option></option>', { value: model[i], text: model[i] }))
    }
  }

  public async ShowDialog(): Promise<TimeLineModel> {
    return new Promise<TimeLineModel>((resolve, reject) => {
      $('#tmLoadModal').modal()
      this.ClearError()
      this.btnOk.onclick = async () => {
        if (!Globals.ValidateElements(this.dlg)) return
        let tlModel = await this.Presenter.DoSelect()
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
    return <string>$('#files_list').children("option:selected").val()
  }
  public SetError(err: string): void {
    $('#load_error').text(err)
    $('#load_error').css('display', 'unset')
  }

  private ClearError(): void {
    $('#load_error').css('display', 'none')
  }
}