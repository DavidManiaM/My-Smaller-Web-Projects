document.title = "Cardioid generalization"
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext('2d');
let w = canvas.width;
let h = canvas.height;
let button = document.querySelector("#submitButton");
let pointsInput = document.querySelector("#NoPoints");
let dimensionsInput = document.querySelector("#NoDims");
let lineWidthInput = document.querySelector("#lineW");
let lineWidth = 0.25;
const radius = 4 * h / 9;
const centre = {
    x: w / 2,
    y: h / 2
};

class Point {
    index;
    x;
    y;
    constructor(x_, y_, index_) {
        this.x = x_;
        this.y = y_;
        this.index = index_;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.ellipse(this.x, this.y, 5, 5, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}

class Line {
    p1;
    p2;
    constructor(p1_, p2_) {
        this.p1 = p1_;
        this.p2 = p2_;
    }

    draw() {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = lineWidth;
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.stroke();
        ctx.closePath();
    }
}

function map(x, a, b, c, d) {
    return c + (x - a) * (d - c) / (b - a);
}

function reset(pts, dims, lw) {

    ctx.font = "25px Arial";
    ctx.fillStyle = "grey";
    ctx.textAlign = "center";
    ctx.fillText(`Points: ${pts}`, 110, 30);
    ctx.fillText(`Dimensions: ${parseFloat(dims.toFixed(2))}`, 110, 60);

    let numberOfPoints = pts;
    let theta = 2 * Math.PI / numberOfPoints;
    let factor = dims;
    lineWidth = lw;

    let points = [];
    let lines = [];

    for (let i = 0; i < numberOfPoints; i++) {
        let angle = theta * i;
        points.push(new Point(centre.x - radius * Math.cos(angle), centre.y - radius * Math.sin(angle), i));
    }
    //bro codeaza scheme cardioide multidimensionale

    for (let i = 0; i < numberOfPoints; i++) {
        lines.push(new Line(points[i], points[Math.round(factor * i) % numberOfPoints]));
    }


    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.ellipse(centre.x, centre.y, radius, radius, 0, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();

    /*ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.ellipse(centre.x, centre.y, 5, 5, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();*/


    for (let i = 0; i < numberOfPoints; i++)
        points[i].draw();

    for (let i = 0; i < lines.length; i++)
        lines[i].draw();

}

reset(300, 2);

canvas.addEventListener("mousemove", (e) => {
    let x = Math.round(map(e.offsetX, 0, w, 10, 5000));
    let y = (map(e.offsetY, 0, h, 2, 20));
    //y = Math.round(y);
    ctx.clearRect(0, 0, w, h);
    if(parseInt(pointsInput.value))
        x = parseInt(pointsInput.value);
    if(parseFloat(dimensionsInput.value))
        y = parseFloat(dimensionsInput.value);
    reset(x, y, (lineWidthInput.value ? lineWidthInput.value : 0.25) );
    //reset(200, y);
});

button.addEventListener("mousedown", () => {
    ctx.clearRect(0, 0, w, h);
    reset(parseInt(pointsInput.value), parseFloat(dimensionsInput.value), parseFloat(lineWidthInput.value));
});