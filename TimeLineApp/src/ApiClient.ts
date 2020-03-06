﻿import { TLPeriod } from './TLPeriod';

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

  public async DoLogin(login: string, password: string): Promise<string> {
    if ((login || '').trim() !== '' && (password || '').trim() !== '') {
      const response = await fetch('api/register/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({Login: login, Password: password})
      })
      return await response.text()
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

  public async DoRegister(login: string, email: string, password1: string, password2: string): Promise<string> {
    if (password1 !== password2) {
      return 'Не совпадают пароли'
    }
    let err = await $.ajax(
      'api/register/reg', {
        type: 'POST',
        data: {
          Login: login,
          Email: email,
          Password1: password1,
          Password2: password2
        }
      })
    return err
  }
}