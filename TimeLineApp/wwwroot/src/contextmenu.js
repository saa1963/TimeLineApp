"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ContextMenu = /** @class */ (function () {
    function ContextMenu(menu, options) {
        this.contextTarget = null;
        var this_object = this;
        var num = ContextMenu.count++;
        this.menu = menu;
        if (options == undefined)
            this.options = {};
        else
            this.options = options;
        window.addEventListener('resize', this_object.onresize);
        this.reload();
    }
    ContextMenu.prototype.onresize = function () {
        var this_object = this;
        if (ContextUtil.getProperty(this_object.options, 'close_on_resize', true)) {
            this.hide();
        }
    };
    ContextMenu.prototype.hide = function () {
        var this_object = this;
        document.getElementById('cm_' + ContextMenu.count).classList.remove('display');
        window.removeEventListener('click', this_object.documentClick);
    };
    ContextMenu.prototype.setOptions = function (_options) {
        this.options = _options;
    };
    ContextMenu.prototype.changeOption = function (option, value) {
        this.options[option] = value;
    };
    ContextMenu.prototype.getOptions = function () {
        return this.options;
    };
    ContextMenu.prototype.reload = function () {
        if (document.getElementById('cm_' + ContextMenu.count) == null) {
            var cnt = document.createElement('div');
            cnt.className = 'cm_container';
            cnt.id = 'cm_' + ContextMenu.count;
            document.body.appendChild(cnt);
        }
        var container = document.getElementById('cm_' + ContextMenu.count);
        container.innerHTML = '';
        container.appendChild(this.renderLevel(this.menu));
    };
    ContextMenu.prototype.renderLevel = function (level) {
        var ulOuter = document.createElement('ul');
        var this_object = this;
        level.forEach(function (item) {
            var li = document.createElement('li');
            li.menu = this_object;
            if (typeof item.type === 'undefined') {
                var iconSpan = document.createElement('span');
                iconSpan.className = 'cm_icon_span';
                if (ContextUtil.getProperty(item, 'icon', '') != '') {
                    iconSpan.innerHTML = ContextUtil.getProperty(item, 'icon', '');
                }
                else {
                    iconSpan.innerHTML = ContextUtil.getProperty(this_object.options, 'default_icon', '');
                }
                var textSpan = document.createElement('span');
                textSpan.className = 'cm_text';
                if (ContextUtil.getProperty(item, 'text', '') != '') {
                    textSpan.innerHTML = ContextUtil.getProperty(item, 'text', '');
                }
                else {
                    textSpan.innerHTML = ContextUtil.getProperty(this_object.options, 'default_text', 'item');
                }
                var subSpan = document.createElement('span');
                subSpan.className = 'cm_sub_span';
                if (typeof item.sub !== 'undefined') {
                    if (ContextUtil.getProperty(this_object.options, 'sub_icon', '') != '') {
                        subSpan.innerHTML = ContextUtil.getProperty(this_object.options, 'sub_icon', '');
                    }
                    else {
                        subSpan.innerHTML = '&#155;';
                    }
                }
                li.appendChild(iconSpan);
                li.appendChild(textSpan);
                li.appendChild(subSpan);
                if (!ContextUtil.getProperty(item, 'enabled', true)) {
                    li.setAttribute('disabled', '');
                }
                else {
                    if (typeof item.events === 'object') {
                        var keys = Object.keys(item.events);
                        for (var i = 0; i < keys.length; i++) {
                            li.addEventListener(keys[i], item.events[keys[i]]);
                        }
                    }
                    if (typeof item.sub !== 'undefined') {
                        li.appendChild(this_object.renderLevel(item.sub));
                    }
                }
            }
            else {
                if (item.type == ContextMenu.DIVIDER) {
                    li.className = 'cm_divider';
                }
            }
            ulOuter.appendChild(li);
        });
        return ulOuter;
    };
    ContextMenu.prototype.display = function (e, target) {
        if (typeof target !== 'undefined') {
            this.contextTarget = target;
        }
        else {
            this.contextTarget = e.target;
        }
        var menu = document.getElementById('cm_' + ContextMenu.count);
        var clickCoords = { x: e.clientX, y: e.clientY };
        var clickCoordsX = clickCoords.x;
        var clickCoordsY = clickCoords.y;
        var menuWidth = menu.offsetWidth + 4;
        var menuHeight = menu.offsetHeight + 4;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var mouseOffset = parseInt(ContextUtil.getProperty(this.options, 'mouse_offset', 2));
        if ((windowWidth - clickCoordsX) < menuWidth) {
            menu.style.left = windowWidth - menuWidth + 'px';
        }
        else {
            menu.style.left = (clickCoordsX + mouseOffset) + 'px';
        }
        if ((windowHeight - clickCoordsY) < menuHeight) {
            menu.style.top = windowHeight - menuHeight + 'px';
        }
        else {
            menu.style.top = (clickCoordsY + mouseOffset) + 'px';
        }
        var sizes = ContextUtil.getSizes(menu);
        if ((windowWidth - clickCoordsX) < sizes.width) {
            menu.classList.add('cm_border_right');
        }
        else {
            menu.classList.remove('cm_border_right');
        }
        if ((windowHeight - clickCoordsY) < sizes.height) {
            menu.classList.add('cm_border_bottom');
        }
        else {
            menu.classList.remove('cm_border_bottom');
        }
        menu.classList.add('display');
        if (ContextUtil.getProperty(this.options, 'close_on_click', true)) {
            window.addEventListener('click', this.documentClick);
        }
        e.preventDefault();
    };
    ContextMenu.prototype.documentClick = function () {
        this.hide();
    };
    ContextMenu.count = 0;
    ContextMenu.DIVIDER = 'cm_divider';
    return ContextMenu;
}());
exports.ContextMenu = ContextMenu;
var ContextUtil = /** @class */ (function () {
    function ContextUtil() {
    }
    ContextUtil.getProperty = function (options, opt, def) {
        if (typeof options[opt] !== 'undefined') {
            return options[opt];
        }
        else {
            return def;
        }
    };
    ContextUtil.getSizes = function (obj) {
        var lis = obj.getElementsByTagName('li');
        var widthDef = 0;
        var heightDef = 0;
        for (var i = 0; i < lis.length; i++) {
            var li = lis[i];
            if (li.offsetWidth > widthDef) {
                widthDef = li.offsetWidth;
            }
            if (li.offsetHeight > heightDef) {
                heightDef = li.offsetHeight;
            }
        }
        var width = widthDef;
        var height = heightDef;
        for (var i_1 = 0; i_1 < lis.length; i_1++) {
            var li_1 = lis[i_1];
            var ul = li_1.getElementsByTagName('ul');
            if (typeof ul[0] !== 'undefined') {
                var ulSize = ContextUtil.getSizes(ul[0]);
                if (widthDef + ulSize.width > width) {
                    width = widthDef + ulSize.width;
                }
                if (heightDef + ulSize.height > height) {
                    height = heightDef + ulSize.height;
                }
            }
        }
        return {
            'width': width,
            'height': height
        };
    };
    return ContextUtil;
}());
exports.ContextUtil = ContextUtil;
var MyHTMLLIElement = /** @class */ (function (_super) {
    __extends(MyHTMLLIElement, _super);
    function MyHTMLLIElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MyHTMLLIElement;
}(HTMLLIElement));
//# sourceMappingURL=contextmenu.js.map