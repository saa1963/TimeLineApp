import * as $ from 'jquery'
import { Globals } from './Globals';

export class EditStringView {
  public s: string = ''
  private btnNewName: HTMLButtonElement
  private btnCancelNewName: HTMLButtonElement
  private tbName: HTMLInputElement
  private tbModal: JQuery

  public constructor(s: string) {
    this.btnNewName = <HTMLButtonElement>document.getElementById('btnNewName')
    this.btnCancelNewName = <HTMLButtonElement>document.getElementById('btnCancelNewName')
    this.tbName = <HTMLInputElement>document.getElementById('tmName')
    this.tbModal = $('#tmNameModal')
    this.s = s
    this.tbName.value = s
    this.tbName.onchange = () => {
      this.s = this.tbName.value
    }
  }

  public async Show(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.tbModal.modal()
      this.btnNewName.onclick = async () => {
        if (Globals.ValidateElements(this.tbModal[0])) {
          this.tbModal.modal('hide')
          resolve(this.s)
        } else {
          return
        }
      }
      this.btnCancelNewName.onclick = async () => {
        this.tbModal.modal('hide')
        reject()
      }
    })
  }
}