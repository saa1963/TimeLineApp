import * as $ from 'jquery'
import { Globals } from './Globals';
import { TLPeriod } from './TLPeriod';

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
      return await $.ajax(
        'api/storage/save', {
          type: 'POST',
          data: {
            s1: model.Name,
            s2: JSON.stringify(model)
          }
      })
  }

  public async DoLogout(): Promise<boolean> {
    return await $.ajax('api/register/logout')
  }

  public async GetUsersList(): Promise<string[]> {
    try {
      let data = await $.ajax('api/storage/list')
      return data
    } catch (err) {
      throw Globals.ResponseErrorText(err)
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