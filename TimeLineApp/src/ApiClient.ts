import { TLPeriod } from './TLPeriod';
import {stringUtils } from './stringutils'

export class ApiClient {
  private static instance: ApiClient;
  private constructor() {
    // do something construct...
  }
  public static getInstance() {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
      // ... any one time initialization goes here ...
    }
    return ApiClient.instance;
  }

  private HttpError(response: Response) {
    return 'Ошибка HTTP - ' + response.status
  }

  public async DoLogin(login: string, password: string): Promise<string> {
  if ((login || '').trim() !== '' && (password || '').trim() !== '') {
      const passwordMd5 = stringUtils.md5(password)
      const response = await fetch('api/register/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({Login: login, Password: passwordMd5})
      })
      if (response.ok) {
        return await response.text()
      } else {
        return this.HttpError(response)
      }
    } else {
      return 'Не введены логин или пароль.'
    }
  }

  public async SaveTL(model: TLPeriod): Promise<string> {
    const response = await fetch('api/storage/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ s1: model.Name, s2: JSON.stringify(model) })
    })
    if (response.ok) return '';
    else return 'Ошибка: ' + await response.text()
  }

  public async DoLogout(): Promise<boolean> {
    const response = await fetch('api/register/logout')
    return Boolean(await response.text())
  }

  public async GetUsersList(): Promise<string[]> {
    const response = await fetch('api/storage/list')
    if (response.ok) {
      return await response.json()
    } else {
      throw 'Статус - ' + response.status + ' ' + response.statusText;
    }
  }

  public async GetTL(value: string): Promise<TLPeriod | string> {
    const response = await fetch('api/storage/load', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ s1: value, s2: '' })
    })
    if (response.ok) {
      const tline = await response.json()
      const period = TLPeriod.CreateTLPeriod(tline)
      period.Parent = null
      return period
    } else {
      console.log(response.text())
      return 'Ошибка загрузки данных' 
    }
  }

  public async DoRegister(login: string, email: string, password1: string, password2: string): Promise<string> {
    if (password1 !== password2) {
      return 'Не совпадают пароли'
      }
      const passwordMd5 = stringUtils.md5(password1)
      console.log(password1)
      console.log(passwordMd5)
    const response = await fetch('api/register/reg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          Login: login,
          Email: email,
          Password1: passwordMd5,
          Password2: passwordMd5
        })
    })
    if (response.ok) {
      return ''
    } else {
      'Статус - ' + response.status + ' ' + response.statusText;
    }
  }
}