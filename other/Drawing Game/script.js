document.title = "Paint";
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let w = canvas.width;
let h = canvas.height;
let isClicking = false;
let lastx = -1, lasty = -1;

let colors = ["black", "red", "green", "blue", "yellow", "blueviolet"];
let colorPickers = document.querySelectorAll(".colorPicker");
let colorExample = document.querySelector("#colorExample");;
let fontColor = "black";


let lineWidth = 2;
window.addEventListener("wheel", (e) => {
    lineWidth += 0.25 * (e.deltaY < 0 ? 1 : -1);
    lineWidth = Math.max(lineWidth, 1);
    lineWidth = Math.min(lineWidth, 7);
});


for(let i = 0; i < colorPickers.length; i++){
    colorPickers[i].addEventListener("click", () => {
        fontColor = colors[i];
        colorExample.style.backgroundColor = fontColor = colors[i];
    });
}

class Line{
    x1; y1; x2; y2; color; width;
    constructor(x1_, y1_, x2_, y2_, color_, width_){
        this.x1 = x1_; this.y1 = y1_; this.x2 = x2_; this.y2 = y2_; this.color = color_; this.width = width_;
    }

    draw(){
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
        ctx.closePath();
    }
}

let lines = [];
let clusters = Array.from({ length: 1000 }, () => []);
let clusterIndex = 0;

function addNewLine(x1, y1, x2, y2){
    lines.push(new Line(x1, y1, x2, y2, fontColor, lineWidth));
    lines[lines.length - 1].draw();
    clusters[clusterIndex].push(lines[lines.length - 1]);
}

canvas.addEventListener("mousedown", (e) => {
    isClicking = true;
    lastx = e.offsetX;
    lasty = e.offsetY;

    let r = 0.3;//pentru puncte
    addNewLine(lastx-r, lasty-r, lastx+r, lasty+r);
    addNewLine(lastx+r, lasty-r, lastx-r, lasty+r);
});

canvas.addEventListener("mouseup", (e) => {
    isClicking = false;
    clusterIndex++;
});

canvas.addEventListener("mousemove", (e) => {
    if(isClicking)
        addNewLine(lastx, lasty, e.offsetX, e.offsetY);
    lastx = e.offsetX;
    lasty = e.offsetY;
});

window.addEventListener("keypress", (e) => {
    if(e.key == 'r')
        reset();
});
function reset(){
    clusters.splice(clusterIndex - 1, 1);
    clusterIndex--;
    clusterIndex = Math.max(clusterIndex, 0);
    ctx.clearRect(0, 0, w, h);
    for(let i = 0; i < clusterIndex; i++){
        for(let j = 0; j < clusters[i].length; j++){
            if(clusters[i][j])
                clusters[i][j].draw();
        }
    }
}