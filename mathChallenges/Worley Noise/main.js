document.title = "Worley Noise";
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
let nr_of_points = 175;
let point_radius = 2;
let maximum_distance = -Infinity;
let brownian_motion_factor = 0.75;  // how much do the particles move by chance
let liquid_density = 0.8;           // slowing down the particles -> the closest to 1, the less dense
let point_max_vel = 5;
let click_force = 50;
let min_dist_between_points = 15;
let point_repel_force = 3;
let min_dist_between_points_and_walls = 15;
let wall_repel_force = 3;
let falloffExponent = 1;            // adjust for smoother interaction

class Point {
    x; y; r; x_vel = 0; y_vel = 0;
    constructor(x_, y_, r_, x_vel_, y_vel_) {
        this.x = x_;
        this.y = y_;
        this.r = r_;
        this.x_vel = x_vel_;
        this.y_vel = y_vel_;
    }

    move() {
        this.x_vel += (Math.random() - 0.5) * brownian_motion_factor;
        this.y_vel += (Math.random() - 0.5) * brownian_motion_factor;

        this.x_vel = Math.max(-point_max_vel, Math.min(point_max_vel, this.x_vel));
        this.y_vel = Math.max(-point_max_vel, Math.min(point_max_vel, this.y_vel));

        this.x += this.x_vel;
        this.y += this.y_vel;

        this.x = Math.max(1, Math.min(width - 1, this.x));
        this.y = Math.max(1, Math.min(height - 1, this.y));

        // applying repel force between points
        for (const p of points) {
            if (p !== this) {
                let distance = dist(this.x, this.y, p.x, p.y);
                if (distance < min_dist_between_points) {
                    let factor = point_repel_force / distance;
                    this.x_vel += factor * Math.sign(this.x - p.x);
                    this.y_vel += factor * Math.sign(this.y - p.y);
                }
            }
        }

        // applying wall repel force
        let walls = [
            {pos: 0, prop: 'x'},
            {pos: width, prop: 'x'},
            {pos: 0, prop: 'y'},
            {pos: height, prop: 'y'}
        ];
        for (const wall of walls) {
            let distance = Math.abs(this[wall.prop] - wall.pos);
            if (distance < min_dist_between_points_and_walls) {
                this[wall.prop + '_vel'] += (wall_repel_force / distance) * Math.sign(this[wall.prop] - wall.pos);
            }
        }

        this.x_vel *= liquid_density;
        this.y_vel *= liquid_density;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.ellipse(this.x, this.y, this.r, this.r, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}

let points = new Array(nr_of_points);
let distances = Array.from({ length: width }, () => new Array(height));

function initialize_points() {
    for (let i = 0; i < nr_of_points; i++) {
        let x_rand = Math.random() * (width - 2 * point_radius) + point_radius;
        let y_rand = Math.random() * (height - 2 * point_radius) + point_radius;
        points[i] = new Point(x_rand, y_rand, point_radius, 0, 0);
    }
}

function draw_points() {
    for (const p of points) {
        p.draw();
    }
}

function dist(x1, y1, x2, y2) {
    return Math.hypot(x1 - x2, y1 - y2);
}

function map(val, a, b, x, y) {
    return ((val - a) * (y - x)) / (b - a) + x;
}

// function calculate_distances() {
//     maximum_distance = -1;
//     for (let i = 0; i < width; i++) {
//         let colDistances = distances[i];
//         for (let j = 0; j < height; j++) {
//             let d_min = Infinity;
//             for (const p of points) {
//                 let d = dist(i, j, p.x, p.y);
//                 if (d < d_min) d_min = d;
//             }
//             colDistances[j] = d_min;
//             if (d_min > maximum_distance) maximum_distance = d_min;
//         }
//     }
// }

function calculate_distances() {
    maximum_distance = 0;

    // Precompute distances squared to avoid Math.sqrt
    for (let x = 0; x < width; x++) {
        let colDistances = distances[x];
        for (let y = 0; y < height; y++) {
            let d_min_sq = Infinity;
            for (const p of points) {
                let dx = x - p.x;
                let dy = y - p.y;
                let d_sq = dx * dx + dy * dy; // squared distance
                if (d_sq < d_min_sq) d_min_sq = d_sq;
            }
            colDistances[y] = Math.sqrt(d_min_sq); // sqrt only once --> WAY better performance wow
            if (colDistances[y] > maximum_distance) maximum_distance = colDistances[y];
        }
    }
}


function draw_noise() {
    let imageData = ctx.createImageData(width, height);
    let pixels = imageData.data;

    for (let x = 0; x < width; x++) {
        let colDistances = distances[x];
        for (let y = 0; y < height; y++) {
            let col = map(colDistances[y], 0, maximum_distance, 255, 0);
            let idx = 4 * (y * width + x);
            pixels[idx] = col;      // R
            pixels[idx + 1] = col;  // G
            pixels[idx + 2] = col;  // B
            pixels[idx + 3] = 255;  // A
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

function change_points() {
    for (const p of points) {
        p.move();
    }
}

initialize_points();
calculate_distances();

nextTick();
function nextTick() {
    // clear the canvas
    ctx.clearRect(0, 0, width, height);

    draw_noise();
    // draw_points();

    change_points();
    calculate_distances();
    requestAnimationFrame(nextTick);
}

canvas.addEventListener("mousedown", (event) => {
    let x = event.offsetX;
    let y = event.offsetY;
    for (const p of points) {
        let distance = dist(x, y, p.x, p.y);
        if (distance === 0) distance = 0.0001;

        p.x_vel -= (click_force / Math.pow(distance, falloffExponent)) * Math.sign((x - p.x));
        p.y_vel -= (click_force / Math.pow(distance, falloffExponent)) * Math.sign((y - p.y));
    }
});

console.log(`> nr_of_points = 100
The total number of points (or particles) on the canvas that generate the noise pattern.

> point_radius = 2
The visual radius of each point if drawn on the canvas.

> maximum_distance = -Infinity
Keeps track of the largest distance from any pixel to the nearest point; used for normalizing colors.

> brownian_motion_factor = 0.75
Controls the random movement of each point. Higher values make points move more unpredictably.

> liquid_density = 0.8
Simulates friction or viscosity. Values closer to 1 slow down point movement, making them “heavier” or more resistant to motion.

> point_max_vel = 5
Limits the maximum speed (velocity) a point can reach in any direction.

> click_force = 50
The strength of the force applied to points when the user clicks on the canvas.

> min_dist_between_points = 15
Minimum allowed distance between points before repelling forces push them apart.

> point_repel_force = 3
The strength of the repelling force between points when they get too close.

> min_dist_between_points_and_walls = 15
Minimum allowed distance between a point and the canvas edge before the wall repels it.

> wall_repel_force = 3
The strength of the repelling force applied to points near the canvas edges.

> falloffExponent = 1
Determines how the repelling force from clicks decreases with distance. Higher values make the force drop off faster, creating smoother interactions.`);
