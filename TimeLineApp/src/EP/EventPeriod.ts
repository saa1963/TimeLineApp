import { EnumPeriod } from "../TLEvent";

export class Event {
  /** значение */
  ValueEvent: number
  /** тип */
  TypeEvent: EnumPeriod
  constructor(value: number, type: EnumPeriod) {
    this.ValueEvent = value
    this.TypeEvent = type
  }
}

export class Period {
  Begin: Event
  End: Event
  TypePeriod: EnumPeriod
}

