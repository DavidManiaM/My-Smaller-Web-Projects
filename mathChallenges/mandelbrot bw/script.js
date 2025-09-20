document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('gameBoard');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const xOffset = width / 5;
    const zoom = 0.6;

    const maxIterations = 100;
    const escapeRadius = 4;

    for (let x = -xOffset; x < width-xOffset; x++) {
        for (let y = 0; y < height; y++) {
            const cx = ((x - width / 2) * 4 / width) * zoom;
            const cy = ((y - height / 2) * 4 / height) * zoom;
            let zx = 0;
            let zy = 0;
            let i = 0;

            while (zx * zx + zy * zy < escapeRadius * escapeRadius && i < maxIterations) {
                const temp = zx * zx - zy * zy + cx;
                zy = 2 * zx * zy + cy;
                zx = temp;
                i++;
            }

            const color = i === maxIterations ? 0 : i * 255 / maxIterations;

            ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
            ctx.fillRect(x+xOffset, y, 1, 1);
        }
    }
});
