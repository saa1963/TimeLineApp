export let stringUtils = (function () {
    return {
        pad: function (num, size) {
            var s = num + '';
            while (s.length < size)
                s = '0' + s;
            return s;
        }
    };
})();
//# sourceMappingURL=stringutils.js.map