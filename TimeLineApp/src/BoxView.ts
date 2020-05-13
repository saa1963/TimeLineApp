import * as $ from 'jquery'

export class BoxView {
  private btnBoxOk: HTMLButtonElement

  public constructor(text: string) {
    this.btnBoxOk = document.getElementById('btnBoxOk') as HTMLButtonElement
    $('#box_message').text(text)
  }

  public async Show(): Promise<void> {
    return new Promise<void>((resolve) => {
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
    this.btnBoxOk = document.getElementById('btnBoxOk') as HTMLButtonElement
    const boxMessage = document.getElementById('box_message') as HTMLDivElement
    boxMessage.removeChild(boxMessage.firstChild);
    boxMessage.append(text)
  }

  public async Show(): Promise<void> {
    return new Promise<void>((resolve) => {
      $('#tmBoxModal').modal()
      this.btnBoxOk.onclick = async () => {
        $('#tmBoxModal').modal('hide')
        resolve()
      }
    })
  }
}