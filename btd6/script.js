document.title = "BTD 7";
let canvas = document.getElementById("gameBoard");
let ctx = canvas.getContext('2d');
let w = canvas.width;
let h = canvas.height;
let frames = 0;
let bloonTypes = [{
    type: "red",
    hp: 1,
    radius: 15,
    speed: 0.75,
    children: 1,
    RBE: 1,
    cumulativeHp: 1
}, {
    type: "blue",
    hp: 1,
    radius: 15,
    speed: 0.9,
    children: 1,
    RBE: 2,
    cumulativeHp: 2
}, {
    type: "cyan",
    hp: 1,
    radius: 15,
    speed: 1.2,
    children: 1,
    RBE: 3,
    cumulativeHp: 3
}, {
    type: "green",
    hp: 1,
    radius: 15,
    speed: 1.5,
    children: 1,
    RBE: 4,
    cumulativeHp: 4
}, {
    type: "lime",
    hp: 1,
    radius: 15,
    speed: 1.8,
    children: 1,
    RBE: 5,
    cumulativeHp: 5
}, {
    type: "yellow",
    hp: 1,
    radius: 15,
    speed: 2,
    children: 1,
    RBE: 6,
    cumulativeHp: 6
}, {
    type: "orange",
    hp: 1,
    radius: 15,
    speed: 2.3,
    children: 1,
    RBE: 7,
    cumulativeHp: 7
},{
    type: "pink",
    hp: 1,
    radius: 15,
    speed: 3,
    children: 1,
    RBE: 8,
    cumulativeHp: 8
},{
    type: "purple",
    hp: 1,
    radius: 15,
    speed: 3.5,
    children: 2,
    RBE: 17,
    cumulativeHp: 17
},{
    type: "brown",
    hp: 40,
    radius: 20,
    speed: 1,
    children: 5,
    RBE: 85,
    cumulativeHp: 86
},{
    type: "black",
    hp: 300,
    radius: 30,
    speed: 0.6,
    children: 5,
    RBE: 1000,
    cumulativeHp: 431
},{
    type: "magenta",
    hp: 1000,
    radius: 45,
    speed: 0.5,
    children: 3,
    RBE: 40000,
    cumulativeHp: 2293
},{
    type: "turquoise",
    hp: 3000,
    radius: 60,
    speed: 0.4,
    children: 3,
    RBE: 160000,
    cumulativeHp: 9879
},{
    type: "white",
    hp: 10000,
    radius: 75,
    speed: 0.35,
    children: 3,
    RBE: 800000,
    cumulativeHp: 39637
}];

function isBloonMOABClass(type){
    return(type == "black" || type == "magenta" || type == "turquoise" || type == "white");
}


let towerStats = [{
    "dartMonkey": {
        upgradePaths: 3,
        upgradesPerPath: 4,
        upgradeBoxWidth: 120,
        basePrice: 215,
        //coordonates of the towerStats[0]["dartMonkey"].upgradeButtons from the upgrade menu (dim = towerStats[0]["dartMonkey"].upgradePaths)
        upgradeButtons: [
            {x: 1*w/4 - 120, y: h - 75, w: 2 * 120, h: 70},
            {x: 2*w/4- 120, y: h - 75, w: 2 * 120, h: 70},
            {x: 3*w/4- 120, y: h - 75, w: 2 * 120, h: 70},
        ],
        //dims = towerStats[0]["dartMonkey"].upgradePaths * towerStats[0]["dartMonkey"].upgradesPerPath
        upgradeCosts: [[400, 1200, 10000, 70000, "-"], [300, 700, 4000, 50000, "-"], [650, 5000, 25000, 200000, "-"]],
        upgradeNames: [
            ["Faster Firing", "Even Faster Firing", "Machine Gun", "LightSpeed Madness", "Max Tier"],
            ["Powerful Darts", "Razor-sharp Darts", "Pierce Master", "Pierce God", "Max Tier"],
            ["Damaging Darts", "Bloon Popper", "Bloon Disolver", "The Doom of Bloons", "Max Tier"]
        ],
        upgradeStats: [
            [2, 4, 8, 20, 50],
            [2, 5, 10, 30, 1000000],
            [1, 3, 8, 25, 150]
        ],
        sprite: document.getElementById("dartMonkeySprite")
    },
    "tackShooter": {
        upgradePaths: 4,
        upgradesPerPath: 4,
        upgradeBoxWidth: 110,
        basePrice: 350,
        //coordonates of the towerStats[0]["tackShooter"].upgradeButtons from the upgrade menu (dim = towerStats[0]["tackShooter"].upgradePaths)
        upgradeButtons: [
            {x: 1*w/8 - 110, y: h - 75, w: 2 * 110, h: 70},
            {x: 3*w/8- 110, y: h - 75, w: 2 * 110, h: 70},
            {x: 5*w/8- 110, y: h - 75, w: 2 * 110, h: 70},
            {x: 7*w/8- 110, y: h - 75, w: 2 * 110, h: 70},
        ],
        //dims = towerStats[0]["tackShooter"].upgradePaths * towerStats[0]["tackShooter"].upgradesPerPath
        upgradeCosts: [[400, 1200, 10000, 70000, "-"], [300, 700, 4000, 50000, "-"], 
            [650, 5000, 25000, 200000, "-"], [1000, 5000, 25000, 200000, "-"]],
        upgradeNames: [
            ["Faster Firing", "Even Faster Firing", "Tack Sprayer", "Tack Zone", "Max Tier"],
            ["Powerful Darts", "Razor-sharp Darts", "Pierce Master", "Pierce God", "Max Tier"],
            ["Damaging Tacks", "Bloon Popper", "Bloon Disolver", "The Doom of Bloons", "Max Tier"],
            ["12 Tacks", "16 Tacks", "32 Tacks", "64 Tacks", "Max Tier"]
        ],
        upgradeStats: [
            [2, 4, 8, 20, 40],
            [2, 5, 10, 30, 1000000],
            [1, 2, 5, 15, 80],
            [8, 12, 16, 32, 64]
        ],
        sprite: document.getElementById("tackShooterSprite")
    },
    "farm": {
        upgradePaths: 1,
        upgradesPerPath: 4,
        upgradeBoxWidth: 150,
        basePrice: 1000,
        upgradeButtons: [
            {x: 2*w/4 - 150, y: h - 75, w: 2 * 150, h: 70}
        ],
        upgradeCosts: [[2000, 8000, 50000, 175000, "-"]],
        upgradeNames: [
            ["Faster Production", "Even Faster Production", "BananaBoost", "BananaMania", "Max Tier"]
        ],
        upgradeStats: [90, 300, 1200, 7000, 30000],
        sprite: document.getElementById("farmSprite")
    },
    "glueMonkey": {
        upgradePaths: 1,
        upgradesPerPath: 4,
        upgradeBoxWidth: 150,
        basePrice: 300,
        upgradeButtons: [
            {x: 2*w/4 - 150, y: h - 75, w: 2 * 150, h: 70}
        ],
        upgradeCosts: [[1000, 3000, 10000, 100000, "-"]],
        upgradeNames: [
            ["D", "A", "V", "I", "D"]
        ],
        upgradeStats: [0.8, 0.7, 0.5, 0.35, 0.1],
        sprite: document.getElementById("glueMonkeySprite")
    }
}];

const coinsPerRoundEnd = 250;

const sellPriceRatio = 0.9;
const startingCash = 1250; // 650

//const brownsPerBlackBloon = 5;
const bloonChildrenMaxPositionShift = 8;

const freeplayWaveTimer = 10000;
const minimumIntervalBetweenBloons = 50; /////////////////////////////////////////////////////////

const bloonHpRampingLevel = 0.0453812739;

//every monkey is given a unique id
let monkeyIdCounter = 0;

let mouse = {x: 0, y: 0};

setInterval(() => {console.log(frames); frames = 0;}, 1000);

let numberOfRounds = 50;
let rounds = new Array(numberOfRounds);


const RBEPerRound = 0.1;//0.1
let lastRoundRBE = 2000.746823;//2000.746823
//set start round
let round = 0;
let numberOfPresetRounds = 50;
let coins = startingCash + 500000000 * round;/* + 10179263612978;*/


//is the upgrade UI open? If yes, what is the id + 1?
let towerIdUpgradePanel = null;
let towerTypeUpgradePanel = null;
let isTowerUpgradePanelOpened = false;

//every bloon is given an id
let bloonIDIndex = 0;

//round info
{
rounds[0] = "0,red,10,200,";
rounds[1] = "0,red,20,175,";
rounds[2] = "0,red,10,175,;blue,5,250,";
rounds[3] = "1,red,15,150,;blue,10,200,";
rounds[4] = "0,red,20,125,;blue,15,200,";
rounds[5] = "1,red,55,200,;blue,30,250,";
rounds[6] = "0,red,20,75,;blue,10,100,";
rounds[7] = "0,blue,30,125,";
rounds[8] = "1,red,20,130,;cyan,5,200,";
rounds[9] = "1,blue,10,90,;cyan,10,150,";
rounds[10] = "1,red,20,75,;blue,10,100,;cyan,10,175,";
rounds[11] = "1,cyan,40,85,";
rounds[12] = "1,red,80,60,;blue,60,75,;cyan,50,95,";
rounds[13] = "0,cyan,20,125,;green,10,150,";
rounds[14] = "1,cyan,30,100,;green,20,110,";
rounds[15] = "1,red,100,25,;blue,50,30,;cyan,20,50,";
rounds[16] = "1,red,150,25,;blue,70,30,;cyan,40,50,";
rounds[17] = "1,red,200,25,;blue,100,30,;cyan,70,50,";
rounds[18] = "1,blue,100,50,;cyan,30,100,;green,30,150,";
rounds[19] = "0,green,60,60,";
rounds[20] = "1,green,60,75,;cyan,80,75,";
rounds[21] = "1,green,70,75,;cyan,70,70,;blue,100,65,;red,150,50,";
rounds[22] = "0,lime,15,125,";
rounds[23] = "1,lime,10,100,;cyan,70,70,";
rounds[24] = "1,lime,20,125,;green,50,65,;cyan,100,45,";
rounds[25] = "0,lime,30,100,";
rounds[26] = "1,lime,40,80,;green,50,30,;red,1,1,";
rounds[27] = "1,yellow,20,100,green,30,70,;blue,100,20,";
rounds[28] = "1,lime,200,35,;green,300,25,";
rounds[29] = "1,yellow,30,70,;cyan,100,50,";
rounds[30] = "1,yellow,30,70,;orange,20,150,";
rounds[31] = "1,cyan,100,50,;orange,100,80,";
rounds[32] = "1,red,30,70,;blue,20,175,;cyan,25,150,;green,20,125,;lime,50,100,;yellow,20,200,;orange,10,300,";
rounds[33] = "1,red,40,60,;blue,30,75,;cyan,45,90,;green,40,90,;lime,50,80,;yellow,60,75,;orange,30,80,";
rounds[34] = "1,orange,500,35,;yellow,600,30,";
rounds[35] = "0,pink,30,80,";
rounds[36] = "1,pink,40,100,;orange,50,90,;yellow,60,80,";
rounds[37] = "0,purple,10,150,";
rounds[38] = "0,purple,50,100,";
rounds[39] = "1,yellow,50,70,;orange,40,85,;purple,20,200,";
rounds[40] = "0,purple,100,80,";
rounds[41] = "1,brown,5,150,;lime,20,80,";
rounds[42] = "1,purple,20,100,;brown,20,150,";
rounds[43] = "0,brown,40,100,";
rounds[44] = "1,brown,10,80,;purple,30,70,";
rounds[45] = "1,orange,100,50,;brown,30,90,";
rounds[46] = "1,brown,50,125,;purple,25,250,;orange,100,80,";
rounds[47] = "1,brown,100,100,;purple,200,50,";
rounds[48] = "1,red,300,50,;blue,250,50,;cyan,200,55,;green,175,60,;lime,150,70,;yellow,200,75,;orange,175,80,;purple,75,80,;brown,125,80,";
rounds[49] = "0,black,1,1,";
}

class Bloon{
    x; y;
    type;
    radius;
    hp;
    speed = 1;
    distanceTravelled = 0;
    bloonID;
    glued = false;
    constructor(x_, y_, type_, hp_, speed_, radius_, bloonID_, distanceTravelled_){
        this.x = x_;
        this.y = y_;
        this.type = type_;
        this.hp = hp_;
        this.speed = speed_;
        this.radius = radius_;
        this.bloonID = bloonID_;
        this.distanceTravelled = distanceTravelled_;
    }

    //create map movement
    move(){
        if(this.distanceTravelled <= 600)
            this.x += this.speed;
        else if(this.distanceTravelled <= 770)
            this.y -= this.speed;
        else if(this.distanceTravelled <= 960)
            this.x -= this.speed;
        else if(this.distanceTravelled <= 1410)
            this.y += this.speed;
        else if(this.distanceTravelled <= 1590)
            this.x -= this.speed;
        else if(this.distanceTravelled <= 1750)
            this.y -= this.speed;
        else if(this.distanceTravelled <= 2270)
            this.x += this.speed;
        else if(this.distanceTravelled <= 2450)
            this.y -= this.speed;
        else if(this.distanceTravelled <= 2585)
            this.x += this.speed;
        else if(this.distanceTravelled <= 2865)
            this.y += this.speed;
        else if(this.distanceTravelled <= 3207)
            this.x -= this.speed;
        else 
            this.y += this.speed;

        this.distanceTravelled += this.speed;
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.type;
        ctx.strokeStyle = `rgba(0, 0, 0, 0.5)`;
        ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        if(isBloonMOABClass(this.type)){
            ctx.font = "25px Mv Boli";
            ctx.fillStyle = "white";
            if(this.type == "white")
                ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText(`${Math.ceil(this.hp)}`, this.x, this.y + this.radius/4);
        }
    }

    //also aplies the damage
    checkIfDead(){

        if(this.x >= 0){
            //look through all the projectiles
            for(let i = 0; i < projectiles.length; i++){
                let hasThisBloonBeenHit = false;

                for(let j = 0; j < projectiles[i].bloonIDHit.length; j++)
                    if(this.bloonID == projectiles[i].bloonIDHit[j]){
                        hasThisBloonBeenHit = true;
                    }

                let dx = this.x - projectiles[i].x;
                let dy = this.y - projectiles[i].y;
                let sRadius = this.radius + projectiles[i].radius;

                //if projectile hits bloon for the first time
                if(dx * dx + dy * dy < sRadius * sRadius && hasThisBloonBeenHit == false){
                    projectiles[i].bloonIDHit.push(this.bloonID);
                    
                    //finds the bloon info in the bloonTypes array using the bloon type
                    let bloonTypeIndex = null;
                    for(let j = 0; j < bloonTypes.length; j++){
                        if(this.type == bloonTypes[j].type){
                            bloonTypeIndex = j;
                            break;
                        }
                    }

                    //add pops to parent monkey
                    if(isBloonMOABClass(bloonTypes[bloonTypeIndex])){
                        if(projectiles[i].parentType == "dartMonkey"){
                            dartMonkeys[searchTowerBasedOnTowerTypeAndTowerId(dartMonkeys, projectiles[i].parentId)].pops +=
                                Math.min(this.hp, projectiles[i].damage);
                        }
                        else if(projectiles[i].parentType == "tackShooter"){
                            tackShooters[searchTowerBasedOnTowerTypeAndTowerId(tackShooters, projectiles[i].parentId)].pops +=
                                Math.min(this.hp, projectiles[i].damage);
                        }
                    }
                    else{
                        if(projectiles[i].parentType == "dartMonkey"){
                            dartMonkeys[searchTowerBasedOnTowerTypeAndTowerId(dartMonkeys, projectiles[i].parentId)].pops +=
                                Math.min(bloonTypes[bloonTypeIndex].cumulativeHp, projectiles[i].damage);
                        }
                        else if(projectiles[i].parentType == "tackShooter"){
                            tackShooters[searchTowerBasedOnTowerTypeAndTowerId(tackShooters, projectiles[i].parentId)].pops +=
                                Math.min(bloonTypes[bloonTypeIndex].cumulativeHp, projectiles[i].damage);
                        }
                        else if(projectiles[i].parentType == "glueMonkey"){
                            //glueMonkeys[searchTowerBasedOnTowerTypeAndTowerId(glueMonkeys, projectiles[i].parentId)].pops +=
                                //Math.min(bloonTypes[bloonTypeIndex].cumulativeHp, projectiles[i].damage);
                            this.speed *= projectiles[i].speedDebuff;
                            this.glued = true;
                            
                        }
                    }
                    
                    //damage bloon
                    this.hp -= projectiles[i].damage;

                    //if layer poped    
                    if(this.hp <= 0){
                        //we check if the whole bloon should be deleted. For example, if we deal 5 damage to a cyan bloon
                        let layersPoped;
                        if(isBloonMOABClass(bloonTypes[bloonTypeIndex].type))
                        {
                            layersPoped = 1;
                            //spawn children (if children == 1, only change the existing bloon's type/stats)
                            for(let j = 0; j < bloonTypes[bloonTypeIndex].children - 1; j++){
                                spawnBloon(bloonTypes[bloonTypeIndex - layersPoped].type,
                            this.x + Math.random() * bloonChildrenMaxPositionShift * 2 - bloonChildrenMaxPositionShift,
                            this.y + Math.random() * bloonChildrenMaxPositionShift * 2 - bloonChildrenMaxPositionShift,
                            bloonIDIndex, this.distanceTravelled);
                                    projectiles[i].bloonIDHit.push(bloonIDIndex);
                                    bloonIDIndex++;
                            }
                        }
                        else{
                            layersPoped = projectiles[i].damage;

                            //whole bloon should be deleted
                            if(bloonTypeIndex - layersPoped < 0){
                                projectiles[i].pierce--;
                                if(projectiles[i].pierce < 1){
                                    projectiles.splice(i, 1);
                                    i--;
                                }
                                coins++;
                                return true;
                            }
                            //spawn children (if children = 1, only change the existing bloon's type/stats)
                            for(let j = 0; j < bloonTypes[bloonTypeIndex].children - 1; j++){
                                spawnBloon(bloonTypes[bloonTypeIndex - layersPoped].type,
                            this.x + Math.random() * bloonChildrenMaxPositionShift * 2 - bloonChildrenMaxPositionShift,
                            this.y + Math.random() * bloonChildrenMaxPositionShift * 2 - bloonChildrenMaxPositionShift,
                            bloonIDIndex, this.distanceTravelled);
                                    projectiles[i].bloonIDHit.push(bloonIDIndex);
                                    bloonIDIndex++;
                            }
                        }

                        
                        this.type = bloonTypes[bloonTypeIndex - layersPoped].type;
                        this.hp = bloonTypes[bloonTypeIndex - layersPoped].hp;
                        this.radius = bloonTypes[bloonTypeIndex - layersPoped].radius;
                        this.speed = bloonTypes[bloonTypeIndex - layersPoped].speed;

                        //handle projectile pierce
                        projectiles[i].pierce--;
                        if(projectiles[i].pierce < 1){
                            projectiles.splice(i, 1);
                            i--;
                        }
                    }
                    else if(this.hp > 0){
                        projectiles[i].pierce--;
                        if(projectiles[i].pierce < 1){
                            projectiles.splice(i, 1);
                            i--;
                        }
                        return false;
                    }
                }
            }
        }
    }
}

class DartMonkey{
    type = "dartMonkey";
    x; y;
    id;
    basePrice = 215;
    totalPrice = this.basePrice;
    footprint = 30;
    attackRadius = 150;
    projectileSpeed = 18;
    projectileRadius = 10;
    projectileDamage = 1;
    projectilePierce = 2;
    attacksPerSecond = 2;
    projectileLifeSpan = 1e9;
    speedDebuff = 1; // does not slow down
    attackCooldown = 1000 / this.attacksPerSecond;
    attackTimer = this.attackCooldown;
    upgrades = [0, 0, 0];//dim = towerStats[0]["dartMonkey"].upgradePaths
    pops = 0;
    angle = Math.PI / 2;
    sprite = towerStats[0][this.type].sprite;
    constructor(x_, y_, id_){
        this.x = x_;
        this.y = y_;
        this.id = id_;
    }

    checkAttack(){
        //the index of the bloon that has travelled the furthest on the map of the ones in range
        let index = -1;
        let maxDist = -1;

        for(let i = 0; i < bloons.length; i++){
            let dx = this.x - bloons[i].x;
            let dy = this.y - bloons[i].y;

            let dist = Math.sqrt(dx*dx + dy*dy);

            //if bloon in range
            if(dist - bloons[i].radius < this.attackRadius && this.attackTimer <= 0){
                if(bloons[i].distanceTravelled > maxDist){
                    maxDist = bloons[i].distanceTravelled;
                    index = i;
                }
            }
        }
        //if we have bloons in range, attack
        if(bloons.length >= 1 && index != -1){
            let dx = this.x - bloons[index].x;
            let dy = this.y - bloons[index].y;
            
            //fire a projectile towards the bloon
            let redDx = Math.abs(dx), redDy = Math.abs(dy);
            let quad;
            if(dx < 0 && dy > 0)
                quad = 1;
            else if(dx > 0 && dy > 0)
                quad = 2;
            else if(dx > 0 && dy < 0)
                quad = 3;
            else if(dx < 0 && dy < 0)
                quad = 4;
            let reducedAngle = Math.atan(redDy/(-redDx));
            if(quad == 1)
                this.angle = reducedAngle;
            else if(quad == 2)
                this.angle = Math.PI - reducedAngle;
            else if(quad == 3)
                this.angle = Math.PI + reducedAngle;
            else if (quad == 4)
                this.angle = -reducedAngle;
            this.attack(dx, dy, this.projectileSpeed);
        }
    }

    attack(dx, dy, projectileSpeed){
        //calculate the x and y components of the movement/angle, then calculate the velocities;
        //for example, xComp = 2/5, yComp = 3/5 (they always add to 1)
        let xComp = Math.abs(dx) / (Math.abs(dx) + Math.abs(dy));
        let yComp = Math.abs(dy) / (Math.abs(dx) + Math.abs(dy));
        let xVel = projectileSpeed * xComp;
        let yVel = projectileSpeed * yComp;

        if(dx > 0)
            xVel = -Math.abs(xVel);
        if(dx < 0)
            xVel = Math.abs(xVel);
        if(dy > 0)
            yVel = -Math.abs(yVel);
        if(dy < 0)
            yVel = Math.abs(yVel);

        //create the projectile
        projectiles.push(
new Projectile(this.x, this.y, xVel, yVel, this.projectileDamage, this.projectileRadius, this.projectilePierce, this.id, this.type, this.projectileLifeSpan, this.speedDebuff));
        this.attackTimer = this.attackCooldown;
    }

    draw(){
        /*ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.ellipse(this.x, this.y, this.footprint, this.footprint, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();*/

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle + Math.PI/2);
        ctx.drawImage(this.sprite, -this.footprint, -this.footprint, 2 * this.footprint, 2 * this.footprint);
        ctx.restore();
    }

    //only if selected
    drawRadius(){
        ctx.beginPath();
        ctx.fillStyle = `rgba(100, 100, 100, 0.3)`;
        ctx.ellipse(this.x, this.y, this.attackRadius, this.attackRadius, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    //path - [0, towerStats[0]["dartMonkey"].upgradePaths - 1 (= 2)]
    upgrade(path){
        /*let towerStats = [{
            "dartMonkey": {
                upgradePaths: 3,
                upgradesPerPath: 4,
                upgradeBoxWidth: 120,
                basePrice: 215,
                //coordonates of the towerStats[0]["dartMonkey"].upgradeButtons from the upgrade menu (dim = towerStats[0]["dartMonkey"].upgradePaths)
                upgradeButtons: [
                    {x: 1*w/4 - 120, y: h - 75, w: 2 * 120, h: 70},
                    {x: 2*w/4- 120, y: h - 75, w: 2 * 120, h: 70},
                    {x: 3*w/4- 120, y: h - 75, w: 2 * 120, h: 70},
                ],
                //dims = towerStats[0]["dartMonkey"].upgradePaths * towerStats[0]["dartMonkey"].upgradesPerPath
                upgradeCosts: [[400, 1200, 10000, 70000], [300, 700, 4000, 50000], [650, 5000, 25000, 200000]],
                upgradeNames: [
                    ["Faster Firing", "Even Faster Firing", "Machine Gun", "LightSpeed Madness"],
                    ["Powerful Darts", "Razor-sharp Darts", "Pierce Master", "Pierce God"],
                    ["Damaging Darts", "Bloon Popper", "Bloon Disolver", "The Doom of Bloons"]
                ],
                upgradeStats: [
                    [2, 4, 8, 20, 50],
                    [2, 5, 10, 30, 1000000],
                    [1, 3, 8, 25, 150]
                ],
                sprite: document.getElementById("dartMonkeySprite")
            },*/
        let upgradeCost = towerStats[0][this.type].upgradeCosts[path][this.upgrades[path]];
        if(this.upgrades[path] < towerStats[0][this.type].upgradesPerPath && coins >= upgradeCost){
            coins -= upgradeCost;
            this.totalPrice += upgradeCost;
            this.upgrades[path]++;//[1, 4, 3]


            //ajust the attack radius acording to the maximum tier
            let maxTier = -1;
            for(let i = 0; i < towerStats[0][this.type].upgradePaths; i++)
                if(this.upgrades[i] > maxTier)
                    maxTier = this.upgrades[i];
            if(maxTier == 0)
                this.attackRadius = 150;
            else if(maxTier == 1)
                this.attackRadius = 170;
            else if(maxTier == 2)
                this.attackRadius = 190;
            else if(maxTier == 3)
                this.attackRadius = 210;
            else if(maxTier == 4)
                this.attackRadius = 230;
            //...towerStats[0]["dartMonkey"].upgradesPerPath = 4


            if(path == 0){
                this.attacksPerSecond = towerStats[0][this.type].upgradeStats[path][this.upgrades[path]];
                this.attackCooldown = 1000 / this.attacksPerSecond;
                this.attackTimer = this.attackCooldown;
            }
            else if(path == 1){
                this.projectilePierce = towerStats[0][this.type].upgradeStats[path][this.upgrades[path]];
            }
            else if(path == 2){
                this.projectileDamage = towerStats[0][this.type].upgradeStats[path][this.upgrades[path]];
            }
        }
        else{
            console.log("upgrade unavailable");
        }
    }

    sell(index){
        for(let i = 0; i < projectiles.length; i++){
            if(projectiles[i].parentId == this.id){
                projectiles.splice(i, 1);
                i--;
            }
        }
    
        console.log(index);
        let sellPrice = this.totalPrice * sellPriceRatio;
        coins += sellPrice;
        dartMonkeys.splice(index, 1);
        towerIdUpgradePanel = 0;
    }
}

class Farm{
    x; y;
    id;
    type = "farm";
    footprint = 50;
    basePrice = 1000;
    totalPrice = this.basePrice;
    upgradeLevel = 0;
    coinsPerRound = 100;
    coinsGenerated = 0;
    attackRadius = 100;
    sprite = towerStats[0][this.type].sprite;
    constructor(x_, y_, id_){
        this.x = x_;
        this.y = y_;
        this.id = id_;
    }

    draw(){
        /*ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.ellipse(this.x, this.y, this.footprint, this.footprint, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();*/

        ctx.drawImage(this.sprite, this.x - this.footprint, this.y - this.footprint, 2 * this.footprint, 2 * this.footprint);
    }

    //only if selected
    drawRadius(){
        ctx.beginPath();
        ctx.fillStyle = `rgba(100, 100, 100, 0.3)`;
        ctx.ellipse(this.x, this.y, this.attackRadius, this.attackRadius, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    upgrade(path){
        //let towerStats[0]["farm"].upgradeCosts = [[1000, 4000, 10000, 50000]];
        let upgradeCost = towerStats[0][this.type].upgradeCosts[path][this.upgradeLevel];
        if(this.upgradeLevel < towerStats[0][this.type].upgradesPerPath && coins >= upgradeCost){
            coins -= upgradeCost;
            this.totalPrice += upgradeCost;
            this.upgradeLevel++;

            this.coinsPerRound = towerStats[0][this.type].upgradeStats[this.upgradeLevel];
        }
        else{
            console.log("upgrade unavailable");
        }
    }

    sell(index){
        console.log(index);
        let sellPrice = this.totalPrice * sellPriceRatio;
        coins += sellPrice;
        farms.splice(index, 1);
        towerIdUpgradePanel = 0;
    }
}

class TackShooter{
    type = "tackShooter";
    x; y;
    id;
    basePrice = 300;
    totalPrice = this.basePrice;
    footprint = 30;
    attackRadius = 100;
    projectileSpeed = 10;
    projectileRadius = 8;
    projectileDamage = 1;
    projectilePierce = 2;
    attacksPerSecond = 2;
    speedDebuff = 1; // does not slow down
    numberOfTacks = 8;
    projectileLifeSpan = this.attackRadius; //in pixels
    attackCooldown = 1000 / this.attacksPerSecond;
    attackTimer = this.attackCooldown;
    upgrades = [0, 0, 0, 0];//dim = towerStats[0]["dartMonkey"].upgradePaths
    pops = 0;
    sprite = towerStats[0][this.type].sprite;
    constructor(x_, y_, id_){
        this.x = x_;
        this.y = y_;
        this.id = id_;
    }

    checkAttack(){
        //the index of the bloon that has travelled the furthest on the map of the ones in range
        let index = -1;
        let maxDist = -1;

        for(let i = 0; i < bloons.length; i++){
            let dx = this.x - bloons[i].x;
            let dy = this.y - bloons[i].y;

            let dist = Math.sqrt(dx*dx + dy*dy);

            //if bloon in range
            if(dist - bloons[i].radius < this.attackRadius && this.attackTimer <= 0){
                if(bloons[i].distanceTravelled > maxDist){
                    maxDist = bloons[i].distanceTravelled;
                    index = i;
                }
            }
        }
        //if we have bloons in range, attack
        if(bloons.length >= 1 && index != -1){
            for(let i = 0; i < this.numberOfTacks; i++){
                let angle = i * 2 * Math.PI / this.numberOfTacks;

                let dx = Math.cos(angle);
                let dy = Math.sin(angle);

                this.attack(dx, dy);
            }
        }
    }

    attack(dx, dy){
        //calculate the x and y components of the movement/angle, then calculate the velocities;
        //for example, xComp = 2/5, yComp = 3/5 (they always add up to 1)
        let xComp = Math.abs(dx) / (Math.abs(dx) + Math.abs(dy));
        let yComp = Math.abs(dy) / (Math.abs(dx) + Math.abs(dy));
        let xVel = this.projectileSpeed * xComp;
        let yVel = this.projectileSpeed * yComp;
        if(dx > 0)
            xVel = -Math.abs(xVel);
        if(dx <= 0)
            xVel = Math.abs(xVel);
        if(dy > 0)
            yVel = -Math.abs(yVel);
        if(dy <= 0)
            yVel = Math.abs(yVel);

        //create the projectile
        projectiles.push(new Projectile(this.x, this.y, xVel, yVel, this.projectileDamage,
            this.projectileRadius, this.projectilePierce, this.id, this.type, this.projectileLifeSpan, this.speedDebuff));

        this.attackTimer = this.attackCooldown;
    }

    draw(){
        ctx.drawImage(this.sprite, this.x - this.footprint, this.y - this.footprint, 2 * this.footprint, 2 * this.footprint);
    }

    //only if selected
    drawRadius(){
        ctx.beginPath();
        ctx.fillStyle = `rgba(100, 100, 100, 0.3)`;
        ctx.ellipse(this.x, this.y, this.attackRadius, this.attackRadius, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    //path - [0, towerStats[0]["tackShooter"].upgradePaths - 1 (= 3)]
    upgrade(path){
        let upgradeCost = towerStats[0][this.type].upgradeCosts[path][this.upgrades[path]];
        if(this.upgrades[path] < towerStats[0][this.type].upgradesPerPath && coins >= upgradeCost){
            coins -= upgradeCost;
            this.totalPrice += upgradeCost;
            this.upgrades[path]++;//[1, 4, 3]
            let upgradePathString = "";
            for(let i = 0; i < towerStats[0][this.type].upgradePaths; i++)
                upgradePathString += this.upgrades[i];


            //ajust the attack radius acording to the maximum tier
            let maxTier = -1;
            for(let i = 0; i < towerStats[0][this.type].upgradePaths; i++)
                if(this.upgrades[i] > maxTier)
                    maxTier = this.upgrades[i];
            if(maxTier == 0){
                this.attackRadius = 120;
                this.projectileLifeSpan = 120;
            }
            else if(maxTier == 1){
                this.attackRadius = 130;
                this.projectileLifeSpan = 130;
            }
            else if(maxTier == 2){
                this.attackRadius = 140;
                this.projectileLifeSpan = 140;
            }
            else if(maxTier == 3){
                this.attackRadius = 150;
                this.projectileLifeSpan = 150;
            }
            else if(maxTier == 4){
                this.attackRadius = 160;
                this.projectileLifeSpan = 160;
            }
            //...towerStats[0]["dartMonkey"].upgradesPerPath = 4


            if(path == 0){
                this.attacksPerSecond = towerStats[0][this.type].upgradeStats[path][this.upgrades[path]];
                this.attackCooldown = 1000 / this.attacksPerSecond;
                this.attackTimer = this.attackCooldown;
            }
            else if(path == 1){
                this.projectilePierce = towerStats[0][this.type].upgradeStats[path][this.upgrades[path]];
            }
            else if(path == 2){
                this.projectileDamage = towerStats[0][this.type].upgradeStats[path][this.upgrades[path]];
            }
            else if(path == 3){
                this.numberOfTacks = towerStats[0][this.type].upgradeStats[path][this.upgrades[path]];
            }
        }
        else{
            console.log("upgrade unavailable");
        }
    }

    sell(index){
        for(let i = 0; i < projectiles.length; i++){
            if(projectiles[i].parentId == this.id){
                projectiles.splice(i, 1);
                i--;
            }
        }
    
        console.log(index);
        let sellPrice = this.totalPrice * sellPriceRatio;
        coins += sellPrice;
        tackShooters.splice(index, 1);
        towerIdUpgradePanel = 0;
    }
}

class GlueMonkey{
    type = "glueMonkey";
    x; y;
    id;
    basePrice = 215;
    totalPrice = this.basePrice;
    footprint = 30;
    attackRadius = 150;
    projectileSpeed = 18;
    projectileRadius = 10;
    projectileDamage = 0;
    projectilePierce = 100;
    attacksPerSecond = 2;
    speedDebuff = 0.9;
    projectileLifeSpan = 1e9;
    attackCooldown = 1000 / this.attacksPerSecond;
    attackTimer = this.attackCooldown;
    upgrades = [0];//dim = towerStats[0]["glueMonkey"].upgradePaths
    pops = 0;
    angle = Math.PI / 2;
    sprite = towerStats[0][this.type].sprite;
    constructor(x_, y_, id_){
        this.x = x_;
        this.y = y_;
        this.id = id_;
    }

    checkAttack(){
        //the index of the bloon that has travelled the furthest on the map of the ones in range
        let index = -1;
        let maxDist = -1;

        for(let i = 0; i < bloons.length; i++){
            let dx = this.x - bloons[i].x;
            let dy = this.y - bloons[i].y;

            let dist = Math.sqrt(dx*dx + dy*dy);

            //if bloon in range & not glued
            if(dist - bloons[i].radius < this.attackRadius && this.attackTimer <= 0 && bloons[i].glued == false){
                if(bloons[i].distanceTravelled > maxDist){
                    maxDist = bloons[i].distanceTravelled;
                    index = i;
                }
            }
        }
        //if we have bloons in range, attack
        if(bloons.length >= 1 && index != -1){
            console.log("glue attacking");
            let dx = this.x - bloons[index].x;
            let dy = this.y - bloons[index].y;
            
            //fire a projectile towards the bloon
            let redDx = Math.abs(dx), redDy = Math.abs(dy);
            let quad;
            if(dx < 0 && dy > 0)
                quad = 1;
            else if(dx > 0 && dy > 0)
                quad = 2;
            else if(dx > 0 && dy < 0)
                quad = 3;
            else if(dx < 0 && dy < 0)
                quad = 4;
            let reducedAngle = Math.atan(redDy/(-redDx));
            if(quad == 1)
                this.angle = reducedAngle;
            else if(quad == 2)
                this.angle = Math.PI - reducedAngle;
            else if(quad == 3)
                this.angle = Math.PI + reducedAngle;
            else if (quad == 4)
                this.angle = -reducedAngle;
            this.attack(dx, dy, this.projectileSpeed);
        }
    }

    attack(dx, dy, projectileSpeed){
        //calculate the x and y components of the movement/angle, then calculate the velocities;
        //for example, xComp = 2/5, yComp = 3/5 (they always add to 1)
        let xComp = Math.abs(dx) / (Math.abs(dx) + Math.abs(dy));
        let yComp = Math.abs(dy) / (Math.abs(dx) + Math.abs(dy));
        let xVel = projectileSpeed * xComp;
        let yVel = projectileSpeed * yComp;

        if(dx > 0)
            xVel = -Math.abs(xVel);
        if(dx < 0)
            xVel = Math.abs(xVel);
        if(dy > 0)
            yVel = -Math.abs(yVel);
        if(dy < 0)
            yVel = Math.abs(yVel);

        //create the projectile
        projectiles.push(
new Projectile(this.x, this.y, xVel, yVel, this.projectileDamage, this.projectileRadius, this.projectilePierce, this.id, this.type, this.projectileLifeSpan, this.speedDebuff));
        this.attackTimer = this.attackCooldown;
    }

    draw(){
        /*ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.ellipse(this.x, this.y, this.footprint, this.footprint, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();*/

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle + Math.PI/2);
        ctx.drawImage(this.sprite, -this.footprint, -this.footprint, 2 * this.footprint, 2 * this.footprint);
        ctx.restore();
    }

    //only if selected
    drawRadius(){
        ctx.beginPath();
        ctx.fillStyle = `rgba(100, 100, 100, 0.3)`;
        ctx.ellipse(this.x, this.y, this.attackRadius, this.attackRadius, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    //path - [0, towerStats[0]["dartMonkey"].upgradePaths - 1 (= 2)]
    upgrade(path){
        /*let towerStats = [{
            "dartMonkey": {
                upgradePaths: 3,
                upgradesPerPath: 4,
                upgradeBoxWidth: 120,
                basePrice: 215,
                //coordonates of the towerStats[0]["dartMonkey"].upgradeButtons from the upgrade menu (dim = towerStats[0]["dartMonkey"].upgradePaths)
                upgradeButtons: [
                    {x: 1*w/4 - 120, y: h - 75, w: 2 * 120, h: 70},
                    {x: 2*w/4- 120, y: h - 75, w: 2 * 120, h: 70},
                    {x: 3*w/4- 120, y: h - 75, w: 2 * 120, h: 70},
                ],
                //dims = towerStats[0]["dartMonkey"].upgradePaths * towerStats[0]["dartMonkey"].upgradesPerPath
                upgradeCosts: [[400, 1200, 10000, 70000], [300, 700, 4000, 50000], [650, 5000, 25000, 200000]],
                upgradeNames: [
                    ["Faster Firing", "Even Faster Firing", "Machine Gun", "LightSpeed Madness"],
                    ["Powerful Darts", "Razor-sharp Darts", "Pierce Master", "Pierce God"],
                    ["Damaging Darts", "Bloon Popper", "Bloon Disolver", "The Doom of Bloons"]
                ],
                upgradeStats: [
                    [2, 4, 8, 20, 50],
                    [2, 5, 10, 30, 1000000],
                    [1, 3, 8, 25, 150]
                ],
                sprite: document.getElementById("dartMonkeySprite")
            },*/
        let upgradeCost = towerStats[0][this.type].upgradeCosts[path][this.upgrades[path]];
        if(this.upgrades[path] < towerStats[0][this.type].upgradesPerPath && coins >= upgradeCost){
            coins -= upgradeCost;
            this.totalPrice += upgradeCost;
            this.upgrades[path]++;//[1, 4, 3]


            //ajust the attack radius acording to the maximum tier
            let maxTier = -1;
            for(let i = 0; i < towerStats[0][this.type].upgradePaths; i++)
                if(this.upgrades[i] > maxTier)
                    maxTier = this.upgrades[i];
            if(maxTier == 0)
                this.attackRadius = 150;
            else if(maxTier == 1)
                this.attackRadius = 170;
            else if(maxTier == 2)
                this.attackRadius = 190;
            else if(maxTier == 3)
                this.attackRadius = 210;
            else if(maxTier == 4)
                this.attackRadius = 230;
            //...towerStats[0]["glueMonkey"].upgradesPerPath = 4


            if(path == 0){
                this.attacksPerSecond = towerStats[0][this.type].upgradeStats[path][this.upgrades[path]];
                this.attackCooldown = 1000 / this.attacksPerSecond;
                this.attackTimer = this.attackCooldown;
                // this.speedDebuff = towerStats[0][this.type].upgradeStats[path][this.upgrades[path]];
            }
            else if(path == 1){
                this.projectilePierce = towerStats[0][this.type].upgradeStats[path][this.upgrades[path]];
            }
            else if(path == 2){
                this.projectileDamage = towerStats[0][this.type].upgradeStats[path][this.upgrades[path]];
            }
        }
        else{
            console.log("upgrade unavailable");
        }
    }

    sell(index){
        for(let i = 0; i < projectiles.length; i++){
            if(projectiles[i].parentId == this.id){
                projectiles.splice(i, 1);
                i--;
            }
        }
    
        console.log(index);
        let sellPrice = this.totalPrice * sellPriceRatio;
        coins += sellPrice;
        glueMonkeys.splice(index, 1);
        towerIdUpgradePanel = 0;
    }
}

class Projectile{
    x; y; xVel; yVel;
    damage;
    radius;
    pierce;
    bloonIDHit = [];
    parentId;
    parentType;
    lifeSpan;
    speedDebuff;
    constructor(x_, y_, xVel_, yVel_, damage_, radius_, pierce_, parentId_, parentType_, lifeSpan_, speedDebuff_){
        this.x = x_;
        this.y = y_;
        this.xVel = xVel_;
        this.yVel = yVel_;
        this.damage = damage_;
        this.radius = radius_;
        this.pierce = pierce_;
        this.parentId = parentId_;
        this.parentType = parentType_;
        this.lifeSpan = lifeSpan_;
        this.speedDebuff = speedDebuff_;
    }

    move(){
        this.x += this.xVel;
        this.y += this.yVel;
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    shouldProjectileBeDeleted(){
        if((this.x + this.radius < 0 || this.x - this.radius > w ||
            this.y + this.radius < 0 || this.y - this.radius > h))
            return true;
        
        if(this.parentType == "tackShooter"){
            let index = searchTowerBasedOnTowerTypeAndTowerId(tackShooters, this.parentId);
            let dx = Math.abs(this.x - tackShooters[index].x);
            let dy = Math.abs(this.y - tackShooters[index].y);
            let dist = Math.sqrt(dx*dx + dy*dy);
            if(dist >= tackShooters[index].projectileLifeSpan){
                return true;
            }
        }


        return false;
    }
}

let dartMonkeys = [];
let tackShooters = [];
let farms = [];
let glueMonkeys = [];
let bloons = [];
let projectiles = [];

start();
function start(){
    spawnRound(round);
}

function spawnRound(round){
    if(round <= numberOfPresetRounds - 1){
        let s = rounds[round];

        //check wheter the round has all the bloon sets spawn at once, or one after another
        let allBloonsFromStart = s[0];
        
        //skip after the first 0 or 1 and after the comma
        let index = 2;

        handleBloonSpawn();

        //grab the information of every set of bloons and spawn them
        //After that, recursively spawn the next sets
        function handleBloonSpawn(){
            let bloon = "";
            for(let i = index; s[i] != ',' && i <= s.length; i++){
                bloon += s[i];
                index++;
            }
            index++;
            let numberOfBloons = "";
            for(let i = index; s[i] != ',' && i <= s.length; i++){
                numberOfBloons += s[i];
                index++;
            }
            index++;
            let interval = "";
            for(let i = index; s[i] != ',' && i <= s.length; i++){
                interval += s[i];
                index++;
            }
            index += 2;

            //spawn the bloons from the set
            spawnBloons(bloon, numberOfBloons, interval);
            function spawnBloons(bloon, numberOfBloons, interval){
                if(numberOfBloons >= 1){
                    spawnBloon(bloon, -50, 7.1*h/17, bloonIDIndex++, 0);
                    //spawns the next bloon after the interval
                    setTimeout(() => {spawnBloons(bloon, numberOfBloons - 1, interval)}, interval);
                }
                else{
                    //use this if you want the next type of bloons to spawn after the existing one
                    if(allBloonsFromStart == false)
                        if(index < s.length)
                            handleBloonSpawn();
                }
            }
            //use this if you want all the types of bloons to spawn from the start
            if(allBloonsFromStart == true)
                if(index < s.length)
                    handleBloonSpawn();
        }
    }
    else{
        let roundRBE = lastRoundRBE + lastRoundRBE * RBEPerRound;
        lastRoundRBE = roundRBE;
        for(let i = bloonTypes.length - 1; i >= 0; i--){
            //calculate based on baseHP
            let nrOfBloons = Math.floor(roundRBE / bloonTypes[i].RBE);
            spawnBloons(bloonTypes[i].type, nrOfBloons, Math.max(freeplayWaveTimer / nrOfBloons, minimumIntervalBetweenBloons));
            roundRBE -= nrOfBloons * bloonTypes[i].RBE;
            function spawnBloons(bloon, numberOfBloons, interval){
                if(numberOfBloons >= 1){
                    spawnBloon(bloon, -50, 7.1*h/17, bloonIDIndex++, 0);
                    //spawns the next bloon after the interval
                    setTimeout(() => {spawnBloons(bloon, numberOfBloons - 1, interval)}, interval);
                }
            }
        }
    }

}

function spawnBloon(type, x, y, id, distanceTravelled){
    for(let i = 0; i < bloonTypes.length; i++)
        if(type == bloonTypes[i].type){
            if((isBloonMOABClass(bloonTypes[i].type) || bloonTypes[i].type == "brown") && round >= 50){
                bloons.push(new Bloon(x, y, bloonTypes[i].type, bloonTypes[i].hp + (round + 1 - numberOfPresetRounds) * bloonHpRampingLevel * bloonTypes[i].hp, bloonTypes[i].speed, bloonTypes[i].radius, id, distanceTravelled));
            }
            else{
                bloons.push(new Bloon(x, y, bloonTypes[i].type, bloonTypes[i].hp, bloonTypes[i].speed, bloonTypes[i].radius, id, distanceTravelled));
            }
            return;
        }
}





requestAnimationFrame(nextTick);
function nextTick(){
    ctx.clearRect(0, 0, w, h);

    if(isTowerUpgradePanelOpened){
        if(towerTypeUpgradePanel == "dartMonkey"){
            displayDartMonkeyUpgradePanel();
        }
        else if(towerTypeUpgradePanel == "farm"){
            displayFarmUpgradePanel();
        }
        else if(towerTypeUpgradePanel == "tackShooter"){
            displayTackShooterUpgradePanel();
        }
        else if(towerTypeUpgradePanel == "glueMonkey"){
            displayGlueMonkeyUpgradePanel();
        }
    }

    displayTrack();

    handleTowers();

    handleProjectiles();

    handleBloons();

    displayCoinsAndRound();

    checkRoundEnd();

    frames++;
    requestAnimationFrame(nextTick);
}

function displayCoinsAndRound(){
    ctx.font = "50px Mv Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "right";
    ctx.fillText(`Round ${round+1}`, w - 25, 50);
    let roundRBE = lastRoundRBE;
    ctx.fillText(`RBE: ${Math.floor(roundRBE)}`, w - 25, 100);

    ctx.font = "50px Mv Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.fillText(`$${Math.floor(coins)}`, 25, 50);
}

function displayDartMonkeyUpgradePanel(){
    for(let i = 0; i < towerStats[0]["dartMonkey"].upgradeButtons.length; i++){
        ctx.fillStyle = "grey";
        ctx.fillRect(towerStats[0]["dartMonkey"].upgradeButtons[i].x,
            towerStats[0]["dartMonkey"].upgradeButtons[i].y,
            towerStats[0]["dartMonkey"].upgradeButtons[i].w,
            towerStats[0]["dartMonkey"].upgradeButtons[i].h);
    }

    ctx.font = "25px Mv Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    for(let i = 0; i < dartMonkeys.length; i++){
        if(towerIdUpgradePanel - 1 == dartMonkeys[i].id){
            ctx.fillText(`Pops: ${Math.floor(dartMonkeys[i].pops)}`, 2*w/5, 50);
            ctx.fillText(`Sell for $${Math.floor(dartMonkeys[i].totalPrice * sellPriceRatio)}`, 3*w/5, 50);

            ctx.fillText(`${towerStats[0]["dartMonkey"].upgradeNames[0][dartMonkeys[i].upgrades[0]]}`, 1*w/4, h - 50);
            ctx.fillText(`$${towerStats[0]["dartMonkey"].upgradeCosts[0][dartMonkeys[i].upgrades[0]]}`, 1*w/4, h - 20);
            ctx.fillText(`${towerStats[0]["dartMonkey"].upgradeNames[1][dartMonkeys[i].upgrades[1]]}`, 2*w/4, h - 50);
            ctx.fillText(`$${towerStats[0]["dartMonkey"].upgradeCosts[1][dartMonkeys[i].upgrades[1]]}`, 2*w/4, h - 20);
            ctx.fillText(`${towerStats[0]["dartMonkey"].upgradeNames[2][dartMonkeys[i].upgrades[2]]}`, 3*w/4, h - 50);
            ctx.fillText(`$${towerStats[0]["dartMonkey"].upgradeCosts[2][dartMonkeys[i].upgrades[2]]}`, 3*w/4, h - 20);
        }
    }
}

function displayTackShooterUpgradePanel(){
    for(let i = 0; i < towerStats[0]["tackShooter"].upgradeButtons.length; i++){
        ctx.fillStyle = "grey";
        ctx.fillRect(towerStats[0]["tackShooter"].upgradeButtons[i].x,
            towerStats[0]["tackShooter"].upgradeButtons[i].y,
            towerStats[0]["tackShooter"].upgradeButtons[i].w,
            towerStats[0]["tackShooter"].upgradeButtons[i].h);
    }

    ctx.font = "25px Mv Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    for(let i = 0; i < tackShooters.length; i++){
        if(towerIdUpgradePanel - 1 == tackShooters[i].id){
            ctx.fillText(`Pops: ${Math.floor(tackShooters[i].pops)}`, 2*w/5, 50);
            ctx.fillText(`Sell for $${Math.floor(tackShooters[i].totalPrice * sellPriceRatio)}`, 3*w/5, 50);

            ctx.fillText(`${towerStats[0]["tackShooter"].upgradeNames[0][tackShooters[i].upgrades[0]]}`, 1*w/8, h - 50);
            ctx.fillText(`$${towerStats[0]["tackShooter"].upgradeCosts[0][tackShooters[i].upgrades[0]]}`, 1*w/8, h - 20);
            ctx.fillText(`${towerStats[0]["tackShooter"].upgradeNames[1][tackShooters[i].upgrades[1]]}`, 3*w/8, h - 50);
            ctx.fillText(`$${towerStats[0]["tackShooter"].upgradeCosts[1][tackShooters[i].upgrades[1]]}`, 3*w/8, h - 20);
            ctx.fillText(`${towerStats[0]["tackShooter"].upgradeNames[2][tackShooters[i].upgrades[2]]}`, 5*w/8, h - 50);
            ctx.fillText(`$${towerStats[0]["tackShooter"].upgradeCosts[2][tackShooters[i].upgrades[2]]}`, 5*w/8, h - 20);
            ctx.fillText(`${towerStats[0]["tackShooter"].upgradeNames[3][tackShooters[i].upgrades[3]]}`, 7*w/8, h - 50);
            ctx.fillText(`$${towerStats[0]["tackShooter"].upgradeCosts[3][tackShooters[i].upgrades[3]]}`, 7*w/8, h - 20);
        }
    }
}

function displayFarmUpgradePanel(){
    for(let i = 0; i < towerStats[0]["farm"].upgradeButtons.length; i++){
        ctx.fillStyle = "grey";
        ctx.fillRect(towerStats[0]["farm"].upgradeButtons[i].x, towerStats[0]["farm"].upgradeButtons[i].y, towerStats[0]["farm"].upgradeButtons[i].w, towerStats[0]["farm"].upgradeButtons[i].h);
    }

    ctx.font = "25px Mv Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    for(let i = 0; i < farms.length; i++){
        if(towerIdUpgradePanel - 1 == farms[i].id){
            ctx.fillText(`$Generated: ${Math.floor(farms[i].coinsGenerated)}`, 2*w/5, 50);
            ctx.fillText(`Sell for $${Math.floor(farms[i].totalPrice * sellPriceRatio)}`, 3*w/5, 50);
            ctx.fillText(`${towerStats[0]["farm"].upgradeNames[0][farms[i].upgradeLevel]}`, 2*w/4, h - 50);
            ctx.fillText(`$${towerStats[0]["farm"].upgradeCosts[0][farms[i].upgradeLevel]}`, 2*w/4, h - 20);
        }
    }
}

function displayGlueMonkeyUpgradePanel(){
    for(let i = 0; i < towerStats[0]["glueMonkey"].upgradeButtons.length; i++){
        ctx.fillStyle = "grey";
        ctx.fillRect(towerStats[0]["glueMonkey"].upgradeButtons[i].x, towerStats[0]["glueMonkey"].upgradeButtons[i].y, towerStats[0]["glueMonkey"].upgradeButtons[i].w, towerStats[0]["glueMonkey"].upgradeButtons[i].h);
    }

    ctx.font = "25px Mv Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    for(let i = 0; i < glueMonkeys.length; i++){
        if(towerIdUpgradePanel - 1 == glueMonkeys[i].id){
            ctx.fillText(`Pops: ${Math.floor(glueMonkeys[i].pops)}`, 2*w/5, 50);
            ctx.fillText(`Sell for $${Math.floor(glueMonkeys[i].totalPrice * sellPriceRatio)}`, 3*w/5, 50);
            ctx.fillText(`${towerStats[0]["glueMonkey"].upgradeNames[0][glueMonkeys[i].upgradeLevel]}`, 2*w/4, h - 50);
            ctx.fillText(`$${towerStats[0]["glueMonkey"].upgradeCosts[0][glueMonkeys[i].upgradeLevel]}`, 2*w/4, h - 20);
        }
    }
}

function displayTrack(){
    /*ctx.beginPath();
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 5;
    ctx.moveTo(0, h/2);
    ctx.lineTo(w, h/2);
    ctx.stroke();
    ctx.closePath();*/
}

function handleTowers(){
    for(let i = 0; i < dartMonkeys.length; i++){
        dartMonkeys[i].draw();

        dartMonkeys[i].checkAttack();
    }
    for(let i = 0; i < tackShooters.length; i++){
        tackShooters[i].draw();

        tackShooters[i].checkAttack();
    }
    for(let i = 0; i < farms.length; i++){
        farms[i].draw();
    }
    for(let i = 0; i < glueMonkeys.length; i++){
        glueMonkeys[i].draw();

        glueMonkeys[i].checkAttack();
    }

    for(let i = 0; i < dartMonkeys.length; i++){
        //if current tower is selected
        if(towerIdUpgradePanel - 1 == dartMonkeys[i].id){
            dartMonkeys[i].drawRadius();
            dartMonkeys[i].draw();
            break;
        }
    }

    for(let i = 0; i < tackShooters.length; i++){
        //if current tower is selected
        if(towerIdUpgradePanel - 1 == tackShooters[i].id){
            tackShooters[i].drawRadius();
            tackShooters[i].draw();
            break;
        }
    }

    for(let i = 0; i < farms.length; i++){
        //if current tower is selected
        if(towerIdUpgradePanel - 1 == farms[i].id){
            farms[i].drawRadius();
            farms[i].draw();
            break;
        }
    }

    for(let i = 0; i < glueMonkeys.length; i++){
        //if current tower is selected
        if(towerIdUpgradePanel - 1 == glueMonkeys[i].id){
            glueMonkeys[i].drawRadius();
            glueMonkeys[i].draw();
            break;
        }
    }
}

function handleBloons(){
    for(let i = 0; i < bloons.length; i++){
        bloons[i].move();
        //check if the bloon is dead (was red before and has been damaged)
        if(/*projectiles.length >= 1 && */bloons[i].checkIfDead() || bloons[i].distanceTravelled >= 3500){
            bloons.splice(i, 1);
            i--;
        }
        else{
            bloons[i].draw();
        }
    }
}

function handleProjectiles(){
    for(let i = 0; i < projectiles.length; i++){
        projectiles[i].lifeSpan--;
        if(projectiles[i].shouldProjectileBeDeleted()){
            projectiles.splice(i, 1);
            i--;
        }
        else{
            projectiles[i].move();
            projectiles[i].draw();
        }
    }
}

function checkRoundEnd(){
    //if no bloons are on the screen, end the round
    //this reveals problems when the bloons are poped to early and, for a brief moment, no bloons are on the screen
    if(bloons.length < 1){
        for(let i = 0; i < farms.length; i++){
            coins += farms[i].coinsPerRound;
            farms[i].coinsGenerated += farms[i].coinsPerRound;
        }
        round++;
        projectiles = [];
        coins += coinsPerRoundEnd;
        //bloonIDIndex = 0;
        spawnRound(round, 0);
    }
}

canvas.addEventListener("mousedown", (e) => {
    let x = e.offsetX;
    let y = e.offsetY;
    let min = 50;
    let towerIndex;

    let prevTowerIndex = towerIdUpgradePanel;
    //pick the tower closest to the cursor
    for(let i = 0; i < dartMonkeys.length; i++){
        let dx = dartMonkeys[i].x - x;
        let dy = dartMonkeys[i].y - y;
        let d = Math.sqrt(dx*dx + dy*dy);
        if(d < min){
            min = d;
            towerIndex = dartMonkeys[i].id;
            towerTypeUpgradePanel = "dartMonkey";
        }
    }
    for(let i = 0; i < tackShooters.length; i++){
        let dx = tackShooters[i].x - x;
        let dy = tackShooters[i].y - y;
        let d = Math.sqrt(dx*dx + dy*dy);
        if(d < min){
            min = d;
            towerIndex = tackShooters[i].id;
            towerTypeUpgradePanel = "tackShooter";
        }
    }
    for(let i = 0; i < farms.length; i++){
        let dx = farms[i].x - x;
        let dy = farms[i].y - y;
        let d = Math.sqrt(dx*dx + dy*dy);
        if(d < min){
            min = d;
            towerIndex = farms[i].id;
            towerTypeUpgradePanel = "farm";
        }
    }
    for(let i = 0; i < glueMonkeys.length; i++){
        let dx = glueMonkeys[i].x - x;
        let dy = glueMonkeys[i].y - y;
        let d = Math.sqrt(dx*dx + dy*dy);
        if(d < min){
            min = d;
            towerIndex = glueMonkeys[i].id;
            towerTypeUpgradePanel = "glueMonkey";
        }
    }
    
    //if the tower closest to the cursor is closer to it than 50 px and it's not already selected, then select tower
    if(towerIndex == prevTowerIndex - 1)
        closeTowerUpgradePanel();
    else if(min != 50){

        //if towerIdUpgradePanel already opened, then close it
        /*if(isTowerUpgradePanelOpened &&){
            closeTowerUpgradePanel();
        }
        else*/{
            isTowerUpgradePanelOpened = true;

            //the global id of the closest tower to the cursor
            towerIdUpgradePanel = towerIndex+1;
        }
    }
    else if(y < h - 76){//clicked outside of any tower (not in the towerIdUpgradePanel zone)
        closeTowerUpgradePanel();
    }

    //click on upgrades
    if(isTowerUpgradePanelOpened){
        if(towerTypeUpgradePanel == "dartMonkey"){
            let actual_id_in_tower_array = searchTowerBasedOnTowerTypeAndTowerId(dartMonkeys, towerIdUpgradePanel - 1);
            for(let i = 0; i < towerStats[0]["dartMonkey"].upgradeButtons.length; i++){
                if(x >= towerStats[0]["dartMonkey"].upgradeButtons[i].x && x <= towerStats[0]["dartMonkey"].upgradeButtons[i].x + towerStats[0]["dartMonkey"].upgradeButtons[i].w && 
                    y >= towerStats[0]["dartMonkey"].upgradeButtons[i].y && y <= towerStats[0]["dartMonkey"].upgradeButtons[i].y + towerStats[0]["dartMonkey"].upgradeButtons[i].h){
                        dartMonkeys[actual_id_in_tower_array].upgrade(i);
                    }
            }
        }
        else if(towerTypeUpgradePanel == "tackShooter"){
            let actual_id_in_tower_array = searchTowerBasedOnTowerTypeAndTowerId(tackShooters, towerIdUpgradePanel - 1);
            for(let i = 0; i < towerStats[0]["tackShooter"].upgradeButtons.length; i++){
                if(x >= towerStats[0]["tackShooter"].upgradeButtons[i].x && x <= towerStats[0]["tackShooter"].upgradeButtons[i].x + towerStats[0]["tackShooter"].upgradeButtons[i].w && 
                    y >= towerStats[0]["tackShooter"].upgradeButtons[i].y && y <= towerStats[0]["tackShooter"].upgradeButtons[i].y + towerStats[0]["tackShooter"].upgradeButtons[i].h){
                        tackShooters[actual_id_in_tower_array].upgrade(i);
                    }
            }
        }
        else if(towerTypeUpgradePanel == "farm"){
            console.log("farm upgrade clicked");
            let actual_id_in_tower_array = searchTowerBasedOnTowerTypeAndTowerId(farms, towerIdUpgradePanel - 1);
            for(let i = 0; i < towerStats[0]["farm"].upgradeButtons.length; i++){
                if(x >= towerStats[0]["farm"].upgradeButtons[i].x && x <= towerStats[0]["farm"].upgradeButtons[i].x + towerStats[0]["farm"].upgradeButtons[i].w && 
                    y >= towerStats[0]["farm"].upgradeButtons[i].y && y <= towerStats[0]["farm"].upgradeButtons[i].y + towerStats[0]["farm"].upgradeButtons[i].h){
                        farms[actual_id_in_tower_array].upgrade(i);
                    }
            }
        }
        else if(towerTypeUpgradePanel == "glueMonkey"){
            let actual_id_in_tower_array = searchTowerBasedOnTowerTypeAndTowerId(glueMonkeys, towerIdUpgradePanel - 1);
            for(let i = 0; i < towerStats[0]["glueMonkey"].upgradeButtons.length; i++){
                if(x >= towerStats[0]["glueMonkey"].upgradeButtons[i].x && x <= towerStats[0]["glueMonkey"].upgradeButtons[i].x + towerStats[0]["glueMonkey"].upgradeButtons[i].w && 
                    y >= towerStats[0]["glueMonkey"].upgradeButtons[i].y && y <= towerStats[0]["glueMonkey"].upgradeButtons[i].y + towerStats[0]["glueMonkey"].upgradeButtons[i].h){
                        glueMonkeys[actual_id_in_tower_array].upgrade(i);
                    }
            }
        }
    }

});

canvas.addEventListener("mousemove", (e) => {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
});


//place default monkey
window.addEventListener("keydown", (e) => {
    let k = e.key;
    console.log(k);
    if(k == 'q' && coins >= towerStats[0]["dartMonkey"].basePrice){
        dartMonkeys.push(new DartMonkey(mouse.x, mouse.y, monkeyIdCounter++));
        coins -= towerStats[0]["dartMonkey"].basePrice;
    }
    if(k == 'w' && coins >= towerStats[0]["tackShooter"].basePrice){
        tackShooters.push(new TackShooter(mouse.x, mouse.y, monkeyIdCounter++));
        coins -= towerStats[0]["tackShooter"].basePrice;
    }
    if(k == 'e' && coins >= towerStats[0]["farm"].basePrice){
        farms.push(new Farm(mouse.x, mouse.y, monkeyIdCounter++));
        coins -= towerStats[0]["farm"].basePrice;
    }
    if(k == 'y' && coins >= towerStats[0]["glueMonkey"].basePrice){
        glueMonkeys.push(new GlueMonkey(mouse.x, mouse.y, monkeyIdCounter++));
        coins -= towerStats[0]["glueMonkey"].basePrice;
    }

    if(k == "Backspace" && isTowerUpgradePanelOpened){
        if(towerTypeUpgradePanel == "dartMonkey"){
            let actual_id_in_tower_array = searchTowerBasedOnTowerTypeAndTowerId(dartMonkeys, towerIdUpgradePanel - 1);
            dartMonkeys[actual_id_in_tower_array].sell(actual_id_in_tower_array);
        }
        if(towerTypeUpgradePanel == "tackShooter"){
            let actual_id_in_tower_array = searchTowerBasedOnTowerTypeAndTowerId(tackShooters, towerIdUpgradePanel - 1);
            tackShooters[actual_id_in_tower_array].sell(actual_id_in_tower_array);
        }
        if(towerTypeUpgradePanel == "farm"){
            let actual_id_in_tower_array = searchTowerBasedOnTowerTypeAndTowerId(farms, towerIdUpgradePanel - 1);
            farms[actual_id_in_tower_array].sell(actual_id_in_tower_array);
        }
        if(towerTypeUpgradePanel == "glueMonkey"){
            let actual_id_in_tower_array = searchTowerBasedOnTowerTypeAndTowerId(glueMonkeys, towerIdUpgradePanel - 1);
            glueMonkeys[actual_id_in_tower_array].sell(actual_id_in_tower_array);
        }

        //close the upgrade panel
        closeTowerUpgradePanel();
    }
    if(k == 's'){
        coins += 198310230;
        for(let i = 0; i < dartMonkeys.length; i++){
            for(let j = 0; j < towerStats[0]["dartMonkey"].upgradePaths; j++){
                for(let k = 0; k < towerStats[0]["dartMonkey"].upgradesPerPath; k++){
                    dartMonkeys[i].upgrade(j);
                }
            }
        }
        for(let i = 0; i < tackShooters.length; i++){
            for(let j = 0; j < towerStats[0]["tackShooter"].upgradePaths; j++){
                for(let k = 0; k < towerStats[0]["tackShooter"].upgradesPerPath; k++){
                    tackShooters[i].upgrade(j);
                }
            }
        }

        for(let i = 0; i < glueMonkeys.length; i++){
            for(let j = 0; j < towerStats[0]["glueMonkey"].upgradePaths; j++){
                for(let k = 0; k < towerStats[0]["glueMonkey"].upgradesPerPath; k++){
                    glueMonkeys[i].upgrade(j);
                }
            }
        }
    }
});

//handle attack cooldowns
setInterval(() => {
    for(let i = 0; i < dartMonkeys.length; i++)
        dartMonkeys[i].attackTimer -= 10;
    for(let i = 0; i < tackShooters.length; i++)
        tackShooters[i].attackTimer -= 10;
    for(let i = 0; i < glueMonkeys.length; i++)
        glueMonkeys[i].attackTimer -= 10;
}, 10)

function searchTowerBasedOnTowerTypeAndTowerId(array, id){
    for(let i = 0; i < array.length; i++){
        if(id == array[i].id){
            return i;
        }
    }
}

function closeTowerUpgradePanel(){
    towerIdUpgradePanel = 0;
    isTowerUpgradePanelOpened = false;
    towerTypeUpgradePanel = null;
}