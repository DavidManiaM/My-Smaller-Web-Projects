let canvas = document.querySelector("canvas");
let ctx = canvas.getContext('2d');
let w = canvas.width;
let h = canvas.height;
let framerate = 1000; //per second
framerate = 1000 / framerate;   
const radius = h / 2 - 50;
const centre = {
    x: w / 2,
    y: h / 2
};
const numberOfPoints = 500;
let step = 0;
const theta = 2 * Math.PI / numberOfPoints;
const factor = 2;

setInterval(() => {
    if (step < numberOfPoints)
        nextTick();
    step++;
}, framerate);

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

class Line{
    p1; p2;
    constructor(p1_, p2_){
        this.p1 = p1_;
        this.p2 = p2_;
    }

    draw(){
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.stroke();
        ctx.closePath();
    }
}

let points = [];
let lines = [];

for (let i = 0; i < numberOfPoints; i++) {
    let angle = theta * i;
    points.push(new Point(centre.x - radius * Math.cos(angle), centre.y - radius * Math.sin(angle), i));
}

function setup(){
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.ellipse(centre.x, centre.y, radius, radius, 0, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.ellipse(centre.x, centre.y, 5, 5, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();


    for (let i = 0; i < numberOfPoints; i++)
        points[i].draw();
}

function nextTick() {

    ctx.clearRect(0, 0, w, h);
    setup();

    lines.push(new Line(points[step], points[(factor * step) % numberOfPoints]));

    for (let i = 0; i < lines.length; i++)
        lines[i].draw();

}