document.title = "Mandelbrot Set";
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let w = canvas.width;
let h = canvas.height;
let steps = 200;

/*w = 10; h = 10;*/

class Pixel {
    value = -1; a1 = 0; b1 = 0;
    constructor(x_, y_) {
        this.a = x_;
        this.b = y_;
    }

    calculate = function () {
        if (this.a * this.a + this.b * this.b <= 4) {
            let ra = 0, rb = 0, r;
            for (let k = 0; k < steps; k++) {
                let ra1 = ra * ra - rb * rb;
                let rb1 = 2 * ra * rb;
                ra = ra1;
                rb = rb1;
                ra += this.a;
                rb += this.b;
                r = ra * ra + rb * rb;
                if (r > 4) {
                    this.value = k;
                    break;
                }
            }
            if (r < 4)
                this.value = 0;
        }
    }

    pickColor = function(){
        if (this.a * this.a + this.b * this.b <= 4) {
            if (this.value == 0) {
                ctx.fillStyle = "black";
            }
            else if (this.value <= steps / 10) {
                ctx.fillStyle = "white";
            }
            else if (this.value <= 1.5 * steps / 10) {
                ctx.fillStyle = "red";
            }
            else if (this.value <= 2.1 * steps / 10) {
                ctx.fillStyle = "orange";
            }
            else if (this.value <= 3.4 * steps / 10) {
                ctx.fillStyle = "yellow";
            }
            else if (this.value <= 4 * steps / 10) {
                ctx.fillStyle = "green";
            }
            else if (this.value <= 4.6 * steps / 10) {
                ctx.fillStyle = "blue";
            }
            else if (this.value <= 5.2 * steps / 10) {
                ctx.fillStyle = "purple";
            }
            else if (this.value <= 6 * steps / 10) {
                ctx.fillStyle = "lavender";
            }
            else if (this.value <= 6.6 * steps / 10) {
                ctx.fillStyle = "brown";
            }
            else if (this.value > 0) {
                ctx.fillStyle = "cyan";
            }
        }
        else ctx.fillStyle = "white";
    }
}

let p = new Array(h);
for (let i = 0; i < h; i++) {
    p[i] = new Array(w);
}

for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
        let a = i - h / 2, b = j - w / 2;
        let a1 = (a + h / 2) / h * 4 - 2;
        let b1 = (b + w / 2) / w * 4 - 2;
        p[i][j] = new Pixel(a1, b1);
    }
}

window.onload = () => {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            p[i][j].calculate();
            p[i][j].pickColor();
            ctx.fillRect(i + 100, j, 1, 1);
        }
    }
    ctx.fillStyle = "red";
    ctx.fillRect(250 + 100, 250, 1, 1);
}