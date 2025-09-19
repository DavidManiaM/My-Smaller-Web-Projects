document.title = "Tower defence";
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const w = canvas.width;
const h = canvas.height;
let tickSpeed = 1;
let spawnSpeed = 600;
let shootSpeed = 300;
let health = 100;
let dmg = 30;
let projectileSpeed = 1;
let regenSpeed = 1000;
let money = 0;
let enemySpeed = 0.3;
let enemyHp = 10;
let diffIncreaseReward = 500;
let closestEnemyIndex;
let fps = 0;
const speedUpgrade = document.querySelector("#speedUpgrade");
const damageUpgrade = document.querySelector("#damageUpgrade");
const healthUpgrade = document.querySelector("#healthUpgrade");
const shootUpgrade = document.querySelector("#shootUpgrade");
const healthText = document.querySelector("#healthText");
const moneyText = document.querySelector("#moneyText");
const enemiesText = document.querySelector("#enemiesText");
const difficultyIncrease = document.querySelector("#difficultyIncrease");
const diffIncreaseRewardText = document.querySelector("#diffIncreaseRewardText");

const playerImg = document.querySelector("#playerImg");
const enemyImg1 = document.querySelector("#enemyImg1");
const enemyImg2 = document.querySelector("#enemyImg2");
const enemyImg3 = document.querySelector("#enemyImg3");
const enemyImg4 = document.querySelector("#enemyImg4");

class Tower{
    w = 50; h = 50;
    x = w/2 - this.w/2;
    y = h/2 - this.h/2;

    show = function(){
        ctx.drawImage(playerImg, this.x, this.y, this.w, this.h);
    }

    shoot = function(){
        let exists = false;
        for(let i = 0; i < enemies.length; i++){
            if(enemies[i].x >= 0 && enemies[i].x <= w && enemies[i].y >= 0 && enemies[i].y <= h){
                exists = true;
                break;
            }
        }
        if(exists){
            let minDist = 10000;
            for(let i = 0; i < enemies.length; i++){
                var dx = tower.x + tower.w/2 - (enemies[i].x + enemies[i].w/2);
                var dy = tower.y + tower.h/2 - (enemies[i].y + enemies[i].h/2);
                var distance = Math.sqrt(dx * dx + dy * dy);
                if(distance < minDist){
                    minDist = distance;
                    closestEnemyIndex = i;
                }
            }
            let p = new Projectile(closestEnemyIndex);
            projectiles.push(p);
        }
    }
}

class Enemy{
    w = 20; h = 20;
    x; y;
    hp = enemyHp;
    type;

    spawn = function(){
        this.x = Math.random()*(w+200)-100;
        this.y = Math.random()*(h+200)-100;
        while(this.x >= 0 && this.x <= w && this.y >= 0 && this.y <= h){
            this.x = Math.random()*(w+200)-100;
            this.y = Math.random()*(h+200)-100;
        }
        let rnd = Math.random();
        if(rnd <= 0.25) this.type = 1;
        else if(rnd <= 0.5) this.type = 2;
        else if(rnd <= 0.75) this.type = 3;
        else this.type = 4;
    }

    show = function(){
        if(this.type == 1) ctx.drawImage(enemyImg1, this.x, this.y, this.w, this.h);
        else if(this.type == 2) ctx.drawImage(enemyImg2, this.x, this.y, this.w, this.h);
        else if(this.type == 3)ctx.drawImage(enemyImg3, this.x, this.y, this.w, this.h);
        else if(this.type == 4)ctx.drawImage(enemyImg4, this.x, this.y, this.w, this.h);
    }

    delete = function(i){
        let e = enemies[i];
        for(let k = projectiles.length-1; k >= 0; k--){
            let t = projectiles[k];
            if(t.target == e)
                projectiles.splice(k, 1);
        }
        enemies.splice(i, 1);
    }
}

class Projectile{
    w = 7; h = 7;
    x = w/2 - this.w/2; y = h/2 - this.h/2;
    target;
    constructor(target_){
        this.target = enemies[target_];
    }

    move = function(){
        var dx = this.target.x + this.target.w/2 - (this.x + this.w/2);
        var dy = this.target.y + this.target.h/2 - (this.y + this.h/2);
        var distance = Math.sqrt(dx * dx + dy * dy);
        var angle = Math.atan2(dy, dx);
        var vx = Math.cos(angle) * projectileSpeed;
        var vy = Math.sin(angle) * projectileSpeed;
        this.x += vx * 2;
        this.y += vy * 2;
    }

    show = function(){
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

function collide(i){
    let p = projectiles[i];
    for(let j = enemies.length-1; j >= 0; j--){
        let e = enemies[j];
        if(rectCollision(p, e)){
            e.hp -= dmg;
            projectiles.splice(i, 1);
            money+=10;
            moneyText.textContent = money;
            if(e.hp <= 0){
                money += 100;
                moneyText.textContent = money;
                for(let k = projectiles.length-1; k >= 0; k--){
                    let t = projectiles[k];
                    if(t.target == e)
                        projectiles.splice(k, 1);
                }
                enemies.splice(j, 1);
            }
            return;
        }
    }
}

function rectCollision(rect1, rect2){
    if (rect1.x < rect2.x + rect2.w && rect1.x + rect1.w > rect2.x && rect1.y < rect2.y + rect2.h && rect1.y + rect1.h > rect2.y) {
        return true;
    } else {
        return false;
    }
}

function drawRect(rect) {
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
}

let enemies = [];
let projectiles = [];

let tower = new Tower;
healthText.textContent = health;

a = new Enemy;
enemies.push(a);
a.spawn();

let tick = setInterval(nextTick, tickSpeed);
let spawn = setInterval(() => {
    a = new Enemy;
    enemies.push(a);
    a.spawn();
}, spawnSpeed);
let increaseEnemySpeed = setInterval(() => {enemySpeed+=0.005; console.log(enemies.length);}, 1000);
let increaseSpawnSpeed = setInterval(() => {
    clearInterval(spawn);
    spawnSpeed /= 1.01;
    spawn = setInterval(() => {
        a = new Enemy;
        enemies.push(a);
        a.spawn();
    }, spawnSpeed);
}, 1000);
let f = setInterval(tower.shoot, shootSpeed);
let regen = setInterval(() => {
    health++;
    if(health > 100) health = 100;
    healthText.textContent = health;
}, regenSpeed);

speedUpgrade.addEventListener("click", () => {
    projectileSpeed += 0.2;
    money -= 250;
    moneyText.textContent = money;
});
damageUpgrade.addEventListener("click", () => {
    dmg += 40;
    money -= 500;
    moneyText.textContent = money;
});
shootUpgrade.addEventListener("click", () => {
    shootSpeed -= 4;
    clearInterval(f);
    f = setInterval(tower.shoot, shootSpeed);
    money -= 250;
    moneyText.textContent = money;
});
healthUpgrade.addEventListener("click", () => {
    regenSpeed /= 1.03;
    clearInterval(regen);
    regen = setInterval(() => {
        health += 2;
        if(health > 100) health = 100;
        healthText.textContent = health;
    }, regenSpeed);
    money -= 500;
    moneyText.textContent = money;
});
difficultyIncrease.addEventListener("click", () => {
    spawnSpeed /= 1.05;
    enemySpeed *= 1.005;
    enemyHp *= 1.1;
    money += diffIncreaseReward;
    moneyText.textContent = money;
    diffIncreaseReward += 500;
    diffIncreaseRewardText.textContent = diffIncreaseReward;
});

function nextTick(){
    ctx.clearRect(0, 0, w, h);
    ctx.globalAlpha = 1;
    tower.show();
    for(let i = enemies.length-1; i >= 0; i--){
        let el = enemies[i];
        moveEnemy(el);
        if(abs(el.x+el.w/2 - (tower.x+tower.w/2)) <= 5 && abs(el.y+el.h/2 - (tower.y+tower.h/2) <= 5)){
            el.delete(i);
            health--;
            if(health > 100) health = 100;
            healthText.textContent = health;
        }
        el.show();
    }
    
    for(let i = projectiles.length-1; i >= 0; i--){
        let el = projectiles[i];
        el.move();
        collide(i);
        el.show();
    }
    
    enemiesText.textContent = enemies.length;
    enemyHp+=0.005;
    //console.log(enemyHp);
    if(enemies.length >= 2){
        ctx.globalAlpha = 0.5;
        let el = enemies[closestEnemyIndex];
        if(el && el.x >= 0 && el.x <= w && el.y >= 0 && el.y <= h){
            ctx.strokeStyle = "#f73772";//#f73772
            ctx.beginPath();
            ctx.moveTo(el.x+el.w/2, el.y+el.h/2);
            ctx.lineTo(tower.x+tower.w/2, tower.y+tower.h/2);
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
    }
    fps++;
}
setInterval(() => {console.log(fps); fps = 0;}, 1000);

function abs(x){
    if(x < 0) x = -x;
    return x;
}

function moveEnemy(enemy){
    var dx = tower.x + tower.w/2 - (enemy.x + enemy.w/2);
    var dy = tower.y + tower.h/2 - (enemy.y + enemy.h/2);
    var angle = Math.atan2(dy, dx);
    var vx = Math.cos(angle) * enemySpeed;
    var vy = Math.sin(angle) * enemySpeed;
    enemy.x += vx;
    enemy.y += vy;
}