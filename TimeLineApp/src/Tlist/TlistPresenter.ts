import { TlistModel } from "./TlistModel";
import { ITlistView } from "../ITlistView";
import { Globals } from "../Globals";
import * as $ from 'jquery'
import { TLPeriod } from "../TLPeriod";

export class TlistPresenter {
  private model: TlistModel
  private view: ITlistView
  private m_Value: string

  constructor(view: ITlistView, model: TlistModel) {
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
    try {
      let tl = await $.ajax('api/storage/load',
        {
          data: {
            fname: this.m_Value
          }
        })
      let tline = JSON.parse(tl)
      //return TimeLineModel.CreateTimeLineModel(tl.Name, tline)
      let period = TLPeriod.CreateTLPeriod(tline)
      period.Parent = null
      return period
    } catch (err) {
      this.view.SetError(Globals.ResponseErrorText(err))
      return null
    }
  }
}