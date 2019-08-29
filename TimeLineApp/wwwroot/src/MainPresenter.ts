import {TimeLinePresenter} from "./TimeLinePresenter"
import { TimeLineModel } from "./TimeLineModel";
import { EnumPeriod } from "./TLEvent";
import { MainView } from "./MainView";
import { MainModel } from "./MainModel";
import { ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events"
import { ApiClient } from "./ApiClient";
import { TlistView } from "./TlistView";
import { BoxView } from "./BoxView";
import { EditStringView } from "./EditStringView";

export class MainPresenter {
  private model: MainModel
  private view: MainView

  // ******************* Свойства *********************************

  // свойство Period
  private m_Period: EnumPeriod = EnumPeriod.day
  public get Period() {
    return this.m_Period
  }
  public set Period(value: EnumPeriod) {
    if (this.m_Period !== value) {
      this.m_Period = value
      this.view.ViewChangePeriod(value)
    }
  }
  // ! свойство Period

  // ****************** ! Свойства ********************************

  public OpenNewTLDialog() {
    let view = new EditStringView('')
    view.Show()
      .then(async (value) => {
        if (value) {
          //await new BoxView(value).Show()
          this.model.Add(TimeLineModel.CreateTimeLineModel())
        }
      })
  }

  public async OpenLoadTLDialog() {
    try {
      let value = await ApiClient.getInstance().GetUsersList()
      let view = new TlistView(value)
      view.ShowDialog()
        .then(async (value) => {
          await new BoxView(value.Name).Show()
        })
        .catch(() => { })
    } catch (err) {
      await new BoxView(err).Show()
    }
  }

  public async SaveCurrentTL() {

  }

  constructor(view: MainView, model: MainModel) {
    this.model = model
    this.view = view
    this.model.evAddTimeLine.subscribe((tl) => {

    })
  }
}