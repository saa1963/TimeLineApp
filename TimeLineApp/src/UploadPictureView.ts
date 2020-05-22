import * as $ from 'jquery'

export class UploadPictureView {
  private btnUploadFile: HTMLButtonElement
  private btnCancelUploadFile: HTMLButtonElement
  private tbName: HTMLInputElement
  private tbModal: JQuery
  private value: ArrayBuffer

  public constructor() {
    this.btnUploadFile = document.getElementById('btnUploadFile') as HTMLButtonElement
    this.btnCancelUploadFile = document.getElementById('btnCancelUploadFile') as HTMLButtonElement
    this.tbName = document.getElementById('uploadfile_input') as HTMLInputElement
    this.tbModal = $('#tmUploadFile')
    this.tbName.onchange = (ev) => {
      const f = (ev.target as HTMLInputElement).files[0]
      const reader = new FileReader()
      reader.onload = () => {
        this.value = reader.result as ArrayBuffer
      }
      reader.readAsArrayBuffer(f);
    }
    this.tbName.setAttribute('accept', '.jpg, .jpeg')
  }

  public async ShowDialog(): Promise<ArrayBuffer> {
    return new Promise<ArrayBuffer>((resolve) => {
      this.tbModal.modal()
      this.btnUploadFile.onclick = async () => {
        if (this.value) {
          this.tbModal.modal('hide')
          try {
            resolve(this.value)
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