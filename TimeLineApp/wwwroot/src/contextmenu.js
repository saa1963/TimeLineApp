export class ContextMenu {
    constructor(menu, options) {
        this.contextTarget = null;
        let num = ContextMenu.count++;
        this.menu = menu;
        if (options == undefined)
            this.options = {};
        else
            this.options = options;
        window.addEventListener('resize', () => this.onresize());
        this.reload();
    }
    onresize() {
        if (ContextUtil.getProperty(this.options, 'close_on_resize', true)) {
            this.hide();
        }
    }
    hide() {
        document.getElementById('cm_' + ContextMenu.count).classList.remove('display');
        window.removeEventListener('click', () => this.documentClick());
    }
    setOptions(_options) {
        this.options = _options;
    }
    changeOption(option, value) {
        this.options[option] = value;
    }
    //getOptions() {
    //  return this.options
    //}
    reload() {
        if (document.getElementById('cm_' + ContextMenu.count) == null) {
            var cnt = document.createElement('div');
            cnt.className = 'cm_container';
            cnt.id = 'cm_' + ContextMenu.count;
            document.body.appendChild(cnt);
        }
        var container = document.getElementById('cm_' + ContextMenu.count);
        container.innerHTML = '';
        container.appendChild(this.renderLevel(this.menu));
    }
    renderLevel(level) {
        var ulOuter = document.createElement('ul');
        level.forEach((item) => {
            let li = document.createElement('li');
            li.menu = this;
            if (typeof item.type === 'undefined') {
                var iconSpan = document.createElement('span');
                iconSpan.className = 'cm_icon_span';
                if (ContextUtil.getProperty(item, 'icon', '') != '') {
                    iconSpan.innerHTML = ContextUtil.getProperty(item, 'icon', '');
                }
                else {
                    iconSpan.innerHTML = ContextUtil.getProperty(this.options, 'default_icon', '');
                }
                var textSpan = document.createElement('span');
                textSpan.className = 'cm_text';
                if (ContextUtil.getProperty(item, 'text', '') != '') {
                    textSpan.innerHTML = ContextUtil.getProperty(item, 'text', '');
                }
                else {
                    textSpan.innerHTML = ContextUtil.getProperty(this.options, 'default_text', 'item');
                }
                var subSpan = document.createElement('span');
                subSpan.className = 'cm_sub_span';
                if (typeof item.sub !== 'undefined') {
                    if (ContextUtil.getProperty(this.options, 'sub_icon', '') != '') {
                        subSpan.innerHTML = ContextUtil.getProperty(this.options, 'sub_icon', '');
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
                        li.appendChild(this.renderLevel(item.sub));
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
    }
    display(e, target) {
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
            window.addEventListener('click', () => { this.documentClick(); });
        }
        e.preventDefault();
    }
    documentClick() {
        this.hide();
    }
}
ContextMenu.count = 0;
ContextMenu.DIVIDER = 'cm_divider';
export class ContextUtil {
    static getProperty(options, opt, def) {
        if (typeof options[opt] !== 'undefined') {
            return options[opt];
        }
        else {
            return def;
        }
    }
    static getSizes(obj) {
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
        for (let i = 0; i < lis.length; i++) {
            let li = lis[i];
            var ul = li.getElementsByTagName('ul');
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
    }
}
class MyHTMLLIElement extends HTMLLIElement {
}
//# sourceMappingURL=contextmenu.js.map