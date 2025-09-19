const canvas = document.getElementById('gameBoard');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

let maxIterations = 200;
const escapeRadius = 4;
const zoom = 0.7;

//update(-0.7, 0.27015);

function map(value, oldMin, oldMax, newMin, newMax) {
    // Calculate the ratio between old range and new range
    const oldRange = oldMax - oldMin;
    const newRange = newMax - newMin;
    const ratio = (value - oldMin) / oldRange;
  
    // Map the value to the new range
    const newValue = newMin + ratio * newRange;
    return newValue;
  }

function update(cx, cy) {
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let zx = ((x - width / 2) * 4 / width)*zoom;
            let zy = ((y - height / 2) * 4 / height)*zoom;
            let i = 0;

            while (zx * zx + zy * zy < escapeRadius * escapeRadius && i < maxIterations) {
                const temp = zx * zx - zy * zy + cx;
                zy = 2 * zx * zy + cy;
                zx = temp;
                i++;
            }

            const color = i === maxIterations ? 255 : i * 255 / maxIterations;

            ctx.fillStyle = `rgb(${255-color}, ${255-color}, ${255-color})`;
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

/*canvas.addEventListener("mousedown", (e) => {
    update(map(e.offsetX, 0, width, 0.24, 0.3), map(e.offsetY, 0, height, -0.37, 0.37));
});*/