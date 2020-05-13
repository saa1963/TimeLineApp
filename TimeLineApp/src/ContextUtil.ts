export class ContextUtil {
  static getSizes(obj) {
    const lis = obj.getElementsByTagName('li');
    let widthDef = 0;
    let heightDef = 0;
    for (let i = 0; i < lis.length; i++) {
      const li = lis[i];
      if (li.offsetWidth > widthDef) {
        widthDef = li.offsetWidth;
      }
      if (li.offsetHeight > heightDef) {
        heightDef = li.offsetHeight;
      }
    }
    let width = widthDef;
    let height = heightDef;
    for (let i = 0; i < lis.length; i++) {
      const li = lis[i];
      const ul = li.getElementsByTagName('ul');
      if (typeof ul[0] !== 'undefined') {
        const ulSize = ContextUtil.getSizes(ul[0]);
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
