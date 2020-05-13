import * as $ from 'jquery'

export class Globals {
  static IsAuthentificated = false

  static getCookie(name: string) {
    let c = document.cookie
    const matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
  }

  static ValidateElements(el: HTMLElement): boolean {
    const inputs = $<HTMLInputElement>('#' + el.id + ' input')
    for (let i = 0; i <= inputs.length - 1; i++) {
      if (!inputs[i].reportValidity()) return false
    }
    return true
  }

  static ResponseErrorText(response: JQueryXHR): string {
    return `Ошибка: Статус - ${response.status} ${response.responseText}`
  }
}
