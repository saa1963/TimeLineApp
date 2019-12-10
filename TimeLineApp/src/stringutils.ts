export let stringUtils = (function () {
  return {
    pad: function (num, size) {
      var s = num + ''
      while (s.length < size) s = '0' + s
      return s
    },

    // http://www.broofa.com/Tools/Math.uuid.js
    uuid: function () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      }).toUpperCase();
    }
  }
})()
