document.title = "Julia Set Generator";

console.log(`update(-0.16077, 1.0335, 70)
update(0.3654459215998651, 0.0956724146127701, 300)
update(-0.7, 0.27015, 400)
update(-0.9162525159001351, 0.31071977288722996, 70)
update(-0.5828025159001351, 0.6166880396127701, 80)
update(-0.7727593239661723, 0.18149115624147982, 100)
update(-0.03291718162255286, 0.6556153460532359, 300)
update(0.0035539099014281206, 0.6521337928780915, 250)
update(0.355, 0.355, 250)

update(0.355534, 0.337292, 1500)
update(-0.17880154771847812, 0.662554104742086, 300)

setSize(canvas, new_width, new_height)`)

const canvas = document.getElementById('gameBoard');
const ctx = canvas.getContext('2d');

let width = canvas.width;
let height = canvas.height;

const escapeRadius2 = 16; // 4^2

function setSize(canvas, x, y){
    [canvas.width, canvas.height] = [x, y];
    [width, height] = [x, y];
}

function update(cx, cy, maxIterations = -1) {

    if(maxIterations == -1) maxIterations = 400;

    let imageData = ctx.createImageData(width, height);
    let pixels = imageData.data;

    const scaleX = 4 / width;
    const scaleY = 4 / height;

    let idx = 0;
    for (let y = 0; y < height; y++) {
        let zy0 = (y - height / 2) * scaleY;
        for (let x = 0; x < width; x++) {
            let zx = (x - width / 2) * scaleX;
            let zy = zy0;
            let i = 0;

            while (zx * zx + zy * zy < escapeRadius2 && i < maxIterations) {
                const temp = zx * zx - zy * zy + cx;
                zy = 2 * zx * zy + cy;
                zx = temp;
                i++;
            }

            let color;
            if (i === maxIterations) {
                color = 0;
            } else {
                const t = i / maxIterations;
                color = 255 - Math.floor(Math.sqrt(t) * 255);
            }


            pixels[idx++] = color; // R
            pixels[idx++] = color; // G
            pixels[idx++] = color; // B
            pixels[idx++] = 255;   // A


        }
    }

    ctx.putImageData(imageData, 0, 0);
}
