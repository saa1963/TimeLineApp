export let stringUtils = (function () {
    return {
        pad: function (num, size) {
            var s = num + '';
            while (s.length < size)
                s = '0' + s;
            return s;
        },
        isValidUserName: function (s) {
            s = s.trim();
            if (s === '')
                return false;
            let a = s.match(/\w+/);
            if (a[0] !== s)
                return false;
            return true;
        }
    };
})();
