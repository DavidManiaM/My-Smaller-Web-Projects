document.title = "Worley Noise";
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
let nr_of_points = 100;
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

class Point{
    x; y; r; x_vel = 0; y_vel = 0;
    constructor(x_, y_, r_, x_vel_, y_vel_){
        this.x = x_;
        this.y = y_;
        this.r = r_;
        this.x_vel = x_vel_;
        this.y_vel = y_vel_;
    }

    move(){
        this.x_vel += (Math.random() - 0.5) * brownian_motion_factor;
        this.y_vel += (Math.random() - 0.5) * brownian_motion_factor;

        if(this.x_vel > point_max_vel){
            this.x_vel = point_max_vel;
        }
        if(this.x_vel < -point_max_vel){
            this.x_vel = -point_max_vel;
        }

        if(this.y_vel > point_max_vel){
            this.y_vel = point_max_vel;
        }
        if(this.y_vel < -point_max_vel){
            this.y_vel = -point_max_vel;
        }

        this.x += this.x_vel;
        this.y += this.y_vel;

        if(this.x > width)
            this.x = width - 1;
        if(this.x < 0)
            this.x = 1;
        if(this.y > height)
            this.y = height - 1;
        if(this.y < 0)
            this.y = 1;


        // applying repel force between points
        for(let i = 0; i < points.length; i++){
            if(this != points[i]){
                let distance = dist(this.x, this.y, points[i].x, points[i].y);
                if(distance < min_dist_between_points){
                    this.x_vel += (point_repel_force / distance) * Math.sign((this.x - points[i].x));
                    this.y_vel += (point_repel_force / distance) * Math.sign((this.y - points[i].y));
                }
            }
        }

        // applying wall repel force
        let distance = Math.abs(this.x - 0);
        if(distance < min_dist_between_points_and_walls){
            this.x_vel += (wall_repel_force / distance) * Math.sign((this.x - 0));
        }
        distance = Math.abs(this.x - width);
        if(distance < min_dist_between_points_and_walls){
            this.x_vel += (wall_repel_force / distance) * Math.sign((this.x - width));
        }

        distance = Math.abs(this.y - 0);
        if(distance < min_dist_between_points_and_walls){
            this.y_vel += (wall_repel_force / distance) * Math.sign((this.y - 0));
        }
        distance = Math.abs(this.y - height);
        if(distance < min_dist_between_points_and_walls){
            this.y_vel += (wall_repel_force / distance) * Math.sign((this.y - height));
        }


        this.x_vel *= liquid_density;
        this.y_vel *= liquid_density;

    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.ellipse(this.x, this.y, this.r, this.r, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}

let points = new Array(nr_of_points);
let distances = new Array(width);
for(let i = 0; i < distances.length; i++){
    distances[i] = new Array(height);
}

function initialize_points(){
    for(let i = 0; i < nr_of_points; i++){
        let x_rand = Math.random() * (width - 2 * point_radius) + point_radius;
        let y_rand = Math.random() * (height - 2 * point_radius) + point_radius;
        points[i] = new Point(x_rand, y_rand, point_radius, 0, 0);
    }
}

function draw_points() {
    for(let i = 0; i < nr_of_points; i++){
        points[i].draw();
    }
}

function dist(x1, y1, x2, y2){
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function map(val, a, b, x, y) {
    return ((val - a) * (y - x)) / (b - a) + x;
  }
  

function calculate_distances() {
    maximum_distance = -1;
    for(let i = 0; i < width; i++){
        for(let j = 0; j < height; j++){
            let d_min = Infinity;
            for(let k = 0; k < nr_of_points; k++){
                let d = dist(i, j, points[k].x, points[k].y);
                if(d < d_min){
                    d_min = d;
                }
            }

            distances[i][j] = d_min;

            if(d_min > maximum_distance)
                maximum_distance = d_min;
        }
    }
}

function draw_noise(){
    for(let i = 0; i < width; i++){
        for(let j = 0; j < height; j++){
            let col = map(distances[i][j], 0, maximum_distance, 255, 0);
            ctx.fillStyle = `rgb(${col}, ${col}, ${col})`;
            ctx.fillRect(i, j, 1, 1);
        }
    }
}

function change_points(){
    for(let i = 0; i < points.length; i++){
        points[i].move();
    }
}

initialize_points();
calculate_distances();

nextTick();
function nextTick(){
    ctx.clearRect(0, 0, width, height);

    draw_noise();
    //draw_points();

    change_points();
    calculate_distances();
    requestAnimationFrame(nextTick);
}

canvas.addEventListener("mousedown", (event) => {
    let x = event.offsetX;
    let y = event.offsetY;
    for(let i = 0; i < points.length; i++){
        let distance = dist(x, y, points[i].x, points[i].y);
        if(distance == 0)
            distance = 0.0001;

        points[i].x_vel -= (click_force / Math.pow(distance, falloffExponent)) * Math.sign((x - points[i].x));
        points[i].y_vel -= (click_force / Math.pow(distance, falloffExponent)) * Math.sign((y - points[i].y));
    }
});