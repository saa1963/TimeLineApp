import { TlistModel } from "./TlistModel";
import { InterfaceTlistView } from "../ITlistView";
import { Globals } from "../Globals";
import * as $ from 'jquery'
import { TLPeriod } from "../TLPeriod";
import { ApiClient } from "../ApiClient";

export class TlistPresenter {
  private model: TlistModel
  private view: InterfaceTlistView
  private m_Value: string

  constructor(view: InterfaceTlistView, model: TlistModel) {
    this.model = model
    this.view = view

    this.m_Value = model[0]
    //this.view.SetValue(model[0])
  }

  public get Login(): string {
    return this.m_Value
  }

  // обработчики вызовов из View
  public OnChangeValueInView() {
    this.m_Value = this.view.GetSelectedValue()
  }

  public async DoSelect(): Promise<TLPeriod> {
    if ((this.m_Value || '').trim() === '') {
      this.view.SetError('Не выбрано значение')
      return null
    }
    let tline = await ApiClient.getInstance().GetTL(this.m_Value)
    if (!tline) {
      this.view.SetError('Ошибка загрузки')
    }
    return tline
  }
}