import { TlistModel } from "./TlistModel";
import { InterfaceTlistView } from "../ITlistView";
import { TLPeriod } from "../TLPeriod";
import { ApiClient } from "../ApiClient";

export class TlistPresenter {
  private model: TlistModel
  private view: InterfaceTlistView
  private mValue: string

  constructor(view: InterfaceTlistView, model: TlistModel) {
    this.model = model
    this.view = view

    this.mValue = model[0]
    //this.view.SetValue(model[0])
  }

  public get Login(): string {
    return this.mValue
  }

  // обработчики вызовов из View
  public OnChangeValueInView() {
    this.mValue = this.view.GetSelectedValue()
  }

  public async DoSelect(): Promise<TLPeriod> {
    if ((this.mValue || '').trim() === '') {
      this.view.SetError('Не выбрано значение')
      return null
    }
    const tline = await ApiClient.getInstance().GetTL(this.mValue)
    if (typeof tline === 'string') {
      this.view.SetError(tline)
      return null
    } else {
      return tline
    }
  }
}