"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

document.title = "Drawing Game";
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;
var isClicking = false;
var lastx = -1,
    lasty = -1;

function min(x, y) {
    return x < y ? x : y;
}

function max(x, y) {
    return x > y ? x : y;
}

var Line =
    /*#__PURE__*/
    function () {
        function Line(x1_, y1_, x2_, y2_) {
            _classCallCheck(this, Line);

            this.x1 = x1_;
            this.y1 = y1_;
            this.x2 = x2_;
            this.y2 = y2_;
        }

        _createClass(Line, [{
            key: "draw",
            value: function draw() {
                ctx.beginPath();
                ctx.strokeStyle = "black";
                ctx.moveTo(this.x1, this.y1);
                ctx.lineTo(this.x2, this.y2);
                ctx.stroke();
                ctx.closePath();
            }
        }]);

        return Line;
    }();

var lines = [];
var clusters = Array.from({
    length: 1000
}, function () {
    return [];
});
var clusterIndex = 0;
canvas.addEventListener("mousedown", function (e) {
    isClicking = true;
    lastx = e.offsetX;
    lasty = e.offsetY; // Draw a single pixel point

    var point = new Line(lastx, lasty, lastx, lasty);
    lines.push(point);
    point.draw();
    clusters[clusterIndex].push(point);
});
canvas.addEventListener("mouseup", function (e) {
    isClicking = false;
    clusterIndex++;
});
canvas.addEventListener("mousemove", function (e) {
    if (isClicking) {
        var line = new Line(lastx, lasty, e.offsetX, e.offsetY);
        lines.push(line);
        line.draw();
        clusters[clusterIndex].push(line); // Update last coordinates after drawing the line

        lastx = e.offsetX;
        lasty = e.offsetY;
    }
});
window.addEventListener("keypress", function (e) {
    if (e.key === 'r') {
        reset();
        resetTimer = 0;
    }
});

function reset() {
    clusters.splice(clusterIndex - 1, 1);
    clusterIndex--;
    ctx.clearRect(0, 0, w, h);

    for (var i = 0; i < clusterIndex; i++) {
        for (var j = 0; j < clusters[i].length; j++) {
            if (clusters[i][j]) clusters[i][j].draw();
        }
    }
}

var resetTimer = 100;
setInterval(function () {
    resetTimer++;
}, 1);