//import { EnumPeriod } from './timeline'
//export class ctxmenu {
//  private menuitems = [
//    {
//      id: 'new', text: 'Новая', icon: '<i class="far fa-file"></i>',
//      events: {
//        click: (e: MouseEvent) => { e.fromElement } }
//    },
//    {
//      id: 'load', text: 'Загрузить', icon: '<i class="far fa-folder-open"></i>',
//      events: { click: OpenLoadTLDialog }
//    },
//    {
//      id: 'save', text: 'Сохранить', icon: '<i class="far fa-save"></i>',
//      enabled: false,
//      events: { click: () => timeLines[indLine].save() }
//    },
//    { id: 'line', type: DIVIDER },
//    {
//      id: 'period', text: 'Периодичность',
//      sub: [
//        {
//          id: EnumPeriod.day, text: 'День', icon: '<i class="fas fa-angle-down"></i>',
//          events: { click: () => SwitchPeriod(menuCtx, EnumPeriod.day) }
//        },
//        {
//          id: EnumPeriod.month, text: 'Месяц',
//          events: { click: () => SwitchPeriod(menuCtx, EnumPeriod.month) }
//        },
//        {
//          id: EnumPeriod.year, text: 'Год',
//          events: { click: () => SwitchPeriod(menuCtx, EnumPeriod.year) }
//        },
//        {
//          id: EnumPeriod.decade, text: 'Десятилетие',
//          events: { click: () => SwitchPeriod(menuCtx, EnumPeriod.decade) }
//        },
//        {
//          id: EnumPeriod.century, text: 'Век',
//          events: { click: () => SwitchPeriod(menuCtx, EnumPeriod.century) }
//        }
//      ]
//    }
//  ]
//  new = new Event('new'})
//}
//# sourceMappingURL=ctxmenu.js.map