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

interface ContextMenuOptions {
  selector: string;
  items: ContextMenuItem[];
  appendTo?: string | HTMLElement;
  trigger?: string;
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
}

interface ContextMenuItem {
}

export interface JQuery {
  contextMenu(operation: string | ContextMenuOptions, options?: ContextMenuOptions): any;
}