export let saaGraph = (function () {
    return {
        roundedRect: function (ctx, x, y, width, height, radius) {
            ctx.beginPath();
            ctx.moveTo(x, y + radius);
            ctx.lineTo(x, y + height);
            ctx.lineTo(x + width, y + height);
            ctx.lineTo(x + width, y + radius);
            ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
            ctx.lineTo(x + radius, y);
            ctx.quadraticCurveTo(x, y, x, y + radius);
            ctx.fill();
        }
    };
})();
