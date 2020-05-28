import * as $ from 'jquery'

type ZIndexFunction = (x: JQuery, y?: ContextMenuOptions) => number
type PositionXY = number | 'maintain' | undefined

interface ContextMenuEvents {
  preShow?: (o: ContextMenuOptions) => boolean;
  show?: (o: ContextMenuOptions) => boolean;
  hide?: (o: ContextMenuOptions) => boolean;
  activated?: (o: ContextMenuOptions) => boolean;
}

interface ContextMenuAnimation {
  duration: number;
  show: 'fadeIn' | 'slideDown';
  hide: 'fadeOut' | 'slideUp';
}

interface OptionsItemBag {
  [index: string]: OptionsItem | string;
}

interface OptionsItem {
  name: string;
  isHtmlName?: boolean;
  callback?: (itemKey: string, opt?: ContextMenuOptions, rootMenu?: JQuery) => boolean;
}

interface ContextMenuOptions {
  selector: string;
  items: OptionsItemBag;
  appendTo?: string | HTMLElement;
  trigger?: 'right' | 'left' | 'hover';
  hideOnSecondTrigger?: boolean;
  selectableSubMenu?: boolean;
  reposition?: boolean;
  delay?: number;
  autoHide?: boolean;
  zIndex?: number | ZIndexFunction;
  className?: string;
  classNames?: object;
  animation?: ContextMenuAnimation;
  events?: ContextMenuEvents;
  position?: (menu: JQuery, x: PositionXY, y: PositionXY) => boolean;
  determinePosition?: (menu: JQuery) => void;
  callback?: (itemKey: string, opt: ContextMenuOptions) => boolean;
  build?: ($triggerElement: JQuery, e: MouseEvent) => ContextMenuOptions;
  itemClickEvent?: string;
}

interface ContextMenuItem {
  name: string;

}

export interface JQuery {
  contextMenu(operation: string | ContextMenuOptions, options?: ContextMenuOptions): any;
}