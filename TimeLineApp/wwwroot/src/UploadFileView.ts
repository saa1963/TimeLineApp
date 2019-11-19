import * as $ from 'jquery'
import { TLPeriod } from './TLPeriod';

export class UploadFileView {
  private btnUploadFile: HTMLButtonElement
  private btnCancelUploadFile: HTMLButtonElement
  private tbName: HTMLInputElement
  private tbModal: JQuery
  private value: string

  public constructor() {
    this.btnUploadFile = <HTMLButtonElement>document.getElementById('btnUploadFile')
    this.btnCancelUploadFile = <HTMLButtonElement>document.getElementById('btnCancelUploadFile')
    this.tbName = <HTMLInputElement>document.getElementById('uploadfile_input')
    this.tbModal = $('#tmUploadFile')
    this.tbName.onchange = (ev) => {
      const f = (<HTMLInputElement>ev.target).files[0]
      const reader = new FileReader()
      reader.onload = (ev) => {
        this.value = reader.result as string
      }
      reader.readAsText(f);
    }
  }

  public async ShowDialog(): Promise<TLPeriod> {
    return new Promise<TLPeriod>((resolve, reject) => {
      this.tbModal.modal()
      this.btnUploadFile.onclick = async () => {
        if (this.value) {
          this.tbModal.modal('hide')
          try {
            const tl = TLPeriod.CreateTLPeriod(JSON.parse(this.value))
            tl.Parent = null
            resolve(tl)
          }
          catch (err) {
            alert('Неправильный формат файла')
            return
          }
        } else {
          return
        }
      }
      this.btnCancelUploadFile.onclick = async () => {
        this.tbModal.modal('hide')
        resolve(null)
      }
    })
  }
}