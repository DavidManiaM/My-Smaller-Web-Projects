const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const h = canvas.height;
const w = width - 300;
const unitSize = w / 8; //w / (number of tiles per row/column)
const tileW = w / unitSize; //14
const tileH = h / unitSize;
let tickSpeed = 300;

const types = ['o', 'i', 's', 'z', 'l', 'j', 't'];
const colors = ["yellow", "lightblue", "red", "green", "orange", "pink", "purple"]

let index = 0;
let holdSpace = false;

class Piece {
    constructor(x_, y_) {
        this.x = x_;
        this.y = y_;
    }

    draw() {
        ctx.fillRect(this.x * unitSize, this.y * unitSize, unitSize, unitSize);
    }
}

class Cluster {
    x;
    y;
    pieces = [];
    color;
    center = {
        x: 0,
        y: 0
    };
    type;
    constructor(x_, y_, type_, color_) { //o, i, s, z, l, j, t
        this.x = x_;
        this.y = y_;
        this.type = type_;
        if (this.type == 'o') {
            this.pieces.push(new Piece(this.x, this.y));
            this.pieces.push(new Piece(this.x + 1, this.y));
            this.pieces.push(new Piece(this.x, this.y + 1));
            this.pieces.push(new Piece(this.x + 1, this.y + 1));
        }
        if (this.type == 'i') {
            this.pieces.push(new Piece(this.x, this.y));
            this.pieces.push(new Piece(this.x, this.y - 1));
            this.pieces.push(new Piece(this.x, this.y - 2));
            this.pieces.push(new Piece(this.x, this.y - 3));
            this.center = {
                x: this.x,
                y: this.y - 2
            };
        }
        if (this.type == 's') {
            this.pieces.push(new Piece(this.x, this.y));
            this.pieces.push(new Piece(this.x - 1, this.y));
            this.pieces.push(new Piece(this.x, this.y - 1));
            this.pieces.push(new Piece(this.x + 1, this.y - 1));
            this.center = {
                x: this.x,
                y: this.y - 1
            };
        }
        if (this.type == 'z') {
            this.pieces.push(new Piece(this.x, this.y));
            this.pieces.push(new Piece(this.x + 1, this.y));
            this.pieces.push(new Piece(this.x, this.y - 1));
            this.pieces.push(new Piece(this.x - 1, this.y - 1));
            this.center = {
                x: this.x,
                y: this.y - 1
            };
        }
        /*
        x
        x
        x x
        */
        if (this.type == 'l') {
            this.pieces.push(new Piece(this.x, this.y));
            this.pieces.push(new Piece(this.x + 1, this.y));
            this.pieces.push(new Piece(this.x, this.y - 1));
            this.pieces.push(new Piece(this.x, this.y - 2));
            this.center = {
                x: this.x,
                y: this.y - 1
            };
        }
        if (this.type == 'j') {
            this.pieces.push(new Piece(this.x, this.y));
            this.pieces.push(new Piece(this.x - 1, this.y));
            this.pieces.push(new Piece(this.x, this.y - 1));
            this.pieces.push(new Piece(this.x, this.y - 2));
            this.center = {
                x: this.x,
                y: this.y
            };
        }
        if (this.type == 't') {
            this.pieces.push(new Piece(this.x, this.y));
            this.pieces.push(new Piece(this.x, this.y - 1));
            this.pieces.push(new Piece(this.x + 1, this.y - 1));
            this.pieces.push(new Piece(this.x - 1, this.y - 1));
            this.center = {
                x: this.x,
                y: this.y
            };
        }
        this.color = color_;
    }

    rotate() {
        for (let i = 0; i < this.pieces.length; i++) {
            let dx = this.center.x - this.pieces[i].x;
            let dy = this.center.y - this.pieces[i].y;

            this.pieces[i].x = this.center.x + dy;
            this.pieces[i].y = this.center.y - dx;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        for (let i = 0; i < this.pieces.length; i++)
            this.pieces[i].draw();
    }

    fall() {
        for (let i = 0; i < this.pieces.length; i++)
            this.pieces[i].y++;
        if (this.type != 'o')
            this.center.y++;
    }

    moveLeft() {
        for (let i = 0; i < this.pieces.length; i++)
            this.pieces[i].x--;
        if (this.type != 'o')
            this.center.x--;
    }

    moveRight() {
        for (let i = 0; i < this.pieces.length; i++)
            this.pieces[i].x++;
        if (this.type != 'o')
            this.center.x++;
    }
}

let clusters = [];
let rand = Math.floor(Math.random() * (types.length - 0.0001));
let pre;
spawn();

function spawn() {
    clusters.push(new Cluster(tileW / 2, -1, types[rand], colors[rand]));
    rand = Math.floor(Math.random() * (types.length - 0.0001));
}

requestAnimationFrame(drawTick);

function drawTick() {
    ctx.clearRect(0, 0, width, h);
    drawGrid();

    for (let i = 0; i < clusters.length; i++) {
        clusters[i].draw();
    }

    pre = new Cluster(tileW + 2, 5, types[rand], colors[rand]);
    pre.draw();

    requestAnimationFrame(drawTick);
}

function drawGrid() {
    ctx.strokeStyle = "lightgrey";
    for (let i = 0; i < tileW; i++) {
        ctx.beginPath();
        ctx.moveTo(unitSize * i, 0);
        ctx.lineTo(unitSize * i, h);
        ctx.stroke();
    }
    for (let j = 0; j < tileH; j++) {
        ctx.beginPath();
        ctx.moveTo(0, unitSize * j);
        ctx.lineTo(w, unitSize * j);
        ctx.stroke();
    }
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(unitSize * tileW, 0);
    ctx.lineTo(unitSize * tileH, h);
    ctx.stroke();
}


setInterval(nextTick, tickSpeed);

function nextTick() {
    if (underneath()) {
        index++;
        spawn();
    } else {
        clusters[clusters.length - 1].fall();
    }
}

function underneath() {
    for (let i = 0; i < 4; i++) { //every piece in last cluster
        if (clusters[clusters.length - 1].pieces[i].y == tileH - 1) {
            return true;
        }
        for (let j = clusters.length - 2; j >= 0; j--) { //every other cluster
            for (let k = 0; k < 4; k++) { //every piece in other clusters
                if ((clusters[j].pieces[k].y == clusters[clusters.length - 1].pieces[i].y + 1 ||
                        clusters[j].pieces[k].y == clusters[clusters.length - 1].pieces[i].y) &&
                    clusters[j].pieces[k].x == clusters[clusters.length - 1].pieces[i].x)
                    return true;
            }
        }
    }
    return false;
}

function left() {
    for (let i = 0; i < 4; i++) { //every piece in last cluster
        if (clusters[clusters.length - 1].pieces[i].x == 0)
            return true;
        for (let j = clusters.length - 2; j >= 0; j--) { //every cluster except the last one
            for (let k = 0; k < 4; k++) { //every piece of the previously selected cluster
                if (clusters[clusters.length - 1].pieces[i].y == clusters[j].pieces[k].y &&
                    (clusters[clusters.length - 1].pieces[i].x == clusters[j].pieces[k].x + 1 ||
                        clusters[clusters.length - 1].pieces[i].x == clusters[j].pieces[k].x))
                    return true;
            }
        }
    }
    return false;
}

function right() {
    for (let i = 0; i < 4; i++) { //every piece in last cluster
        if (clusters[clusters.length - 1].pieces[i].x == tileW - 1)
            return true;
        for (let j = clusters.length - 2; j >= 0; j--) { //every cluster except the last one
            for (let k = 0; k < 4; k++) { //every piece of the previously selected cluster
                if (clusters[clusters.length - 1].pieces[i].y == clusters[j].pieces[k].y &&
                    clusters[clusters.length - 1].pieces[i].x == clusters[j].pieces[k].x - 1)
                    return true;
            }
        }
    }
    return false;
}

window.addEventListener("keydown", (e) => {
    console.log(e);
    if (e.key == "ArrowLeft" && !left()) {
        clusters[clusters.length - 1].moveLeft();
    } else if (e.key == "ArrowRight" && !right()) {
        clusters[clusters.length - 1].moveRight();
    }
    if (e.key == "e" && clusters[clusters.length - 1].type != 'o') {
        clusters[clusters.length - 1].rotate();
    }
    if (e.key == "q" && clusters[clusters.length - 1].type != 'o') {
        for (let i = 0; i < 3; i++)
            clusters[clusters.length - 1].rotate();
    }
    if (e.key == " " && !underneath()) {
        holdSpace = true;
        return;
    }
    clusters[clusters.length - 1].draw();
});

window.addEventListener("keyup", (e) => {
    if (e.key == " ") {
        holdSpace = false;
    }
});

setInterval(() => {
    if (holdSpace && !underneath())
        clusters[clusters.length - 1].fall();
}, 100);