﻿import {TimeLinePresenter} from "./TimeLinePresenter"
import { TimeLineModel } from "./TimeLineModel";
import { EnumPeriod } from "./TLEvent";
import { MainView } from "./MainView";
import { MainModel } from "./MainModel";
import { ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events"
import { ApiClient } from "./ApiClient";
import { TlistView } from "./TlistView";
import { BoxView } from "./BoxView";
import { EditStringView } from "./EditStringView";
import { ContextMenu } from "./contextmenu";
import { MyContextMenu } from "./MyContextMenu";

export class MainPresenter {
  private model: MainModel
  private view: MainView
  private menuCtx: ContextMenu

  // ******************* Свойства *********************************

  // свойство Period
  private m_Period: EnumPeriod = EnumPeriod.day
  public get Period() {
    return this.m_Period
  }
  public set Period(value: EnumPeriod) {
    if (this.m_Period !== value) {
      this.m_Period = value
      this.ViewChangePeriod(value)
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

  public OnContextMenu(e: MouseEvent) {
    this.menuCtx.reload()
    this.menuCtx.display(e)
  }

  public get Count(): number {
    return this.model.Count
  }

  public Item(i: number): TimeLineModel {
    return this.model.Item(i)
  }

  constructor(view: MainView, model: MainModel) {
    this.model = model
    this.view = view
    this.menuCtx = MyContextMenu.Create()
    this.menuCtx.evSelect.subscribe((s) => {
      switch (s) {
        case 'new':
          this.OpenNewTLDialog()
          break;
        case 'load':
          this.OpenLoadTLDialog()
          break;
        case 'save':
          this.SaveCurrentTL()
          break;
        case 'switch_to_day':
          this.Period = EnumPeriod.day
          break;
        case 'switch_to_month':
          this.Period = EnumPeriod.month
          break;
        case 'switch_to_year':
          this.Period = EnumPeriod.year
          break;
        case 'switch_to_decade':
          this.Period = EnumPeriod.decade
          break;
        case 'switch_to_century':
          this.Period = EnumPeriod.century
          break;
      }
    })
    this.Period = EnumPeriod.day
    this.model.evAddTimeLine.subscribe((tl) => {

    })
  }

  private ViewChangePeriod(period: EnumPeriod) {
    MyContextMenu.ChangeIconMenuPeriod(period)
    this.view.Draw()
  }
}