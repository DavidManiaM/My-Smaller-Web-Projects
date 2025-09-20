const canvas = document.getElementById('gameBoard');
const ctx = canvas.getContext('2d');

function draw(_width, _height){
    const width = _width;
    const height = _height;

    canvas.width = _width;
    canvas.height = _height;

    const xOffset = width / 5;
    const zoom = 0.6;
    const maxIterations = 100;
    const escapeRadius2 = 16; // 4^2
    const imageData = ctx.createImageData(width, height);
    const pixels = imageData.data;

    for (let y = 0; y < height; y++) {
        const cy = ((y - height / 2) * 4 / height) * zoom;

        for (let x = 0; x < width; x++) {
            const cx = ((x - width / 2 - xOffset) * 4 / width) * zoom;
            let zx = 0, zy = 0;
            let i = 0;

            while (zx * zx + zy * zy < escapeRadius2 && i < maxIterations) {
                const tmp = zx * zx - zy * zy + cx;
                zy = 2 * zx * zy + cy;
                zx = tmp;
                i++;
            }

            const color = i === maxIterations ? 0 : Math.floor(i * 255 / maxIterations);
            const idx = 4 * (y * width + x);
            pixels[idx] = color;     // R
            pixels[idx + 1] = color; // G
            pixels[idx + 2] = color; // B
            pixels[idx + 3] = 255;   // A
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

draw(canvas.width, canvas.height);