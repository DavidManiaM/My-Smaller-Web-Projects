let canvas = document.querySelector("canvas");
let ctx = canvas.getContext('2d');
let w = canvas.width;
let h = canvas.height;
let theta = 3 * Math.PI / 8;
const lengthCoef = 80 / 100;
const zoomout = 8 / 10;
const minimumBranchLength = h / 170;
let maxLevel = 0;
const responsive = true;
let numberOfLeaves = 0;
let numberOfBranches = 1;

let branches = [];

class Point {
    x;
    y;
    length;
    constructor(x_, y_) {
        this.x = x_;
        this.y = y_;
    }
}

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}

class Branch {
    p1;
    p2;
    level;
    constructor(p1_, p2_) {
        this.p1 = p1_;
        this.p2 = p2_;
        this.length = Math.sqrt(Math.pow((this.p1.x - this.p2.x), 2) + Math.pow((this.p1.y - this.p2.y), 2));
    }

    draw() {
        function map(value, in_min, in_max, out_min, out_max) {
            return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
        }
        
        // Function to interpolate between two values
        function lerp(start, end, amt) {
            return (1 - amt) * start + amt * end;
        }
        
        ctx.beginPath();
        let l = this.length;
        let alpha = map(l, 0, maxLevel, 0.2, 1);
        
        let red = 0, green = 0, blue = 0;
        let normLevel = map(this.level, maxLevel / 5, maxLevel, 0, 1);
        
        if (normLevel <= 0.3) {
            // Transition from red to green
            red = lerp(255, 0, normLevel * 2);
            green = lerp(0, 255, normLevel * 2);
        } else {
            // Transition from green to blue
            green = lerp(255, 0, (normLevel - 0.3) * 2);
            blue = lerp(0, 255, (normLevel - 0.3) * 2);
        }
        
        //ctx.lineWidth = map(l, 0, maxLevel, 0.01, 0.25);
        ctx.lineWidth = 3 / (this.level + 1);
        ctx.strokeStyle = `rgba(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)}, ${1})`;
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.stroke();
        


        /*ctx.fillStyle = "black";
        ctx.fillRect(this.p1.x, this.p1.y, 1, 1);
        ctx.fillRect(this.p2.x, this.p2.y, 1, 1);*/
    }
}

function map(x, a, b, c, d) {
    return c + (x - a) * (d - c) / (b - a);
}

reset(theta, theta);

function reset(thL, thR) {
    thetaLeft = thL;
    thetaRight = thR;
    branches = [new Branch(new Point(w / 2, h), new Point(w / 2, zoomout * h))];
    //branches[0].level = 0;
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(0, 0);
    ctx.lineTo(w, h);
    ctx.stroke();
    ctx.closePath();

    createBranches(branches[0], Math.PI / 2, 0);
    console.log(`Branches: ${numberOfBranches}; Leaves: ${numberOfLeaves}`);
}

function createBranches(branch, angle, level) {
    let length = branch.length;
    branch.level = level;
    if (level <= maxLevel) {
        numberOfBranches += 2;
        branch.draw();
        let leftAngle = Math.PI / 2 + angle - thetaLeft;
        leftAngle = leftAngle % (Math.PI * 2);
        if (leftAngle < 0) {
            leftAngle += Math.PI * 2;
        }
        let cos = Math.cos(leftAngle);
        let sin = Math.sin(leftAngle);
        let leftBranch = new Branch(branch.p2,
            new Point(branch.p2.x + lengthCoef * length * cos, branch.p2.y - lengthCoef * length * sin));

        if (level + 1 <= maxLevel) {
            //branches.push(leftBranch);
            createBranches(leftBranch, leftAngle, level + 1);
        } else
            numberOfLeaves++;

        let rightAngle = angle + thetaRight - Math.PI / 2;
        rightAngle = rightAngle % (Math.PI * 2);
        if (rightAngle < 0) {
            rightAngle += Math.PI * 2;
        }
        cos = Math.cos(rightAngle);
        sin = Math.sin(rightAngle);
        let rightBranch = new Branch(branch.p2,
            new Point(branch.p2.x + lengthCoef * length * cos, branch.p2.y - lengthCoef * length * sin));
        if (level + 1 <= maxLevel) {
            //branches.push(rightBranch);
            createBranches(rightBranch, rightAngle, level + 1);
        } else
            numberOfLeaves++;
    }
}

if (responsive) {
    canvas.addEventListener("mousemove", (e) => {
        ctx.clearRect(0, 0, w, h);
        let x = map(e.offsetX, 0, w, -1, 3);
        let y = map(e.offsetY, 0, h, -1, 3);
        numberOfLeaves = 0;
        numberOfBranches = 1;
        reset(x, y);
    });
    canvas.addEventListener("mousedown", (e) => {
        if(e.button == 0){
            ctx.clearRect(0, 0, w, h);
            let x = map(e.offsetX, 0, w, -1, 3);
            let y = map(e.offsetY, 0, h, -1, 3);
            maxLevel++;
            numberOfLeaves = 0;
            numberOfBranches = 1;
            reset(x, y);
        }
    });
}