import * as $ from 'jquery'

export class BoxView {
  private btnBoxOk: HTMLButtonElement

  public constructor(text: string) {
    this.btnBoxOk = <HTMLButtonElement>document.getElementById('btnBoxOk')
    $('#box_message').text(text)
  }

  public async Show(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      $('#tmBoxModal').modal()
      this.btnBoxOk.onclick = async () => {
        $('#tmBoxModal').modal('hide')
        resolve()
      }
    })
  }
}

export class BoxViewHtml {
  private btnBoxOk: HTMLButtonElement

  public constructor(text: HTMLElement) {
    this.btnBoxOk = <HTMLButtonElement>document.getElementById('btnBoxOk')
    let box_message = <HTMLDivElement>document.getElementById('box_message')
    box_message.removeChild(box_message.firstChild);
    box_message.append(text)
  }

  public async Show(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      $('#tmBoxModal').modal()
      this.btnBoxOk.onclick = async () => {
        $('#tmBoxModal').modal('hide')
        resolve()
      }
    })
  }
}