import * as $ from 'jquery'
import { Globals } from './Globals';

export class UploadFileView {
  private btnUploadFile: HTMLButtonElement
  private btnCancelUploadFile: HTMLButtonElement
  private tbName: HTMLInputElement
  private tbModal: JQuery

  public constructor() {
    this.btnUploadFile = <HTMLButtonElement>document.getElementById('btnUploadFile')
    this.btnCancelUploadFile = <HTMLButtonElement>document.getElementById('btnCancelUploadFile')
    this.tbName = <HTMLInputElement>document.getElementById('uploadfile_input')
    this.tbModal = $('#tmUploadFile')
    this.tbName.onselect = (ev) => {

    }
  }

  public async Show(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.tbModal.modal()
      this.btnUploadFile.onclick = async () => {
        if (this.tbName.value) {

          this.tbModal.modal('hide')
          resolve(true)
        } else {
          return
        }
      }
      this.btnCancelUploadFile.onclick = async () => {
        this.tbModal.modal('hide')
        resolve(false)
      }
    })
  }
}