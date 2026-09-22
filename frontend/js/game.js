// ============================================================
// PIXEL RUSH
// Retro 2D Platformer - Version 1
// ============================================================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;


// ============================================================
// GAME SETTINGS
// ============================================================

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

let gameRunning = false;
let gameOver = false;
let levelComplete = false;

let score = 0;
let coinsCollected = 0;
let health = 3;
let currentLevel = 1;


// ============================================================
// KEYBOARD
// ============================================================

const keys = {};

window.addEventListener("keydown", (event) => {

    keys[event.code] = true;

    if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"]
            .includes(event.code)
    ) {
        event.preventDefault();
    }
});

window.addEventListener("keyup", (event) => {
    keys[event.code] = false;
});


// ============================================================
// PLAYER
// ============================================================

const player = {

    x: 80,
    y: 450,

    width: 34,
    height: 44,

    velocityX: 0,
    velocityY: 0,

    speed: 5,
    jumpPower: 13,

    gravity: 0.6,

    grounded: false,

    facing: 1,

    invincible: false,

    invincibleTimer: 0
};


// ============================================================
// WORLD
// ============================================================

let platforms = [];
let coins = [];
let enemies = [];

let exitDoor = {};


// ============================================================
// LEVEL DATA
// ============================================================

const levels = {

    1: {

        platforms: [

            { x: 0, y: 580, width: 1200, height: 70 },

            { x: 120, y: 480, width: 180, height: 25 },

            { x: 370, y: 420, width: 180, height: 25 },

            { x: 620, y: 350, width: 180, height: 25 },

            { x: 870, y: 450, width: 170, height: 25 },

            { x: 1050, y: 300, width: 120, height: 25 }

        ],

        coins: [

            { x: 180, y: 440 },

            { x: 250, y: 440 },

            { x: 430, y: 380 },

            { x: 500, y: 380 },

            { x: 680, y: 310 },

            { x: 750, y: 310 },

            { x: 930, y: 410 },

            { x: 1100, y: 260 }

        ],

        enemies: [

            {
                x: 350,
                y: 535,
                width: 35,
                height: 45,
                speed: 1.5,
                direction: 1
            },

            {
                x: 720,
                y: 305,
                width: 35,
                height: 45,
                speed: 1.2,
                direction: -1
            }

        ],

        exit: {
            x: 1100,
            y: 245,
            width: 45,
            height: 55
        }

    },


    2: {

        platforms: [

            { x: 0, y: 580, width: 1200, height: 70 },

            { x: 80, y: 490, width: 150, height: 25 },

            { x: 290, y: 400, width: 150, height: 25 },

            { x: 500, y: 490, width: 140, height: 25 },

            { x: 690, y: 380, width: 150, height: 25 },

            { x: 900, y: 470, width: 130, height: 25 },

            { x: 1060, y: 330, width: 120, height: 25 },

            { x: 520, y: 250, width: 130, height: 25 }

        ],

        coins: [

            { x: 130, y: 450 },

            { x: 190, y: 450 },

            { x: 330, y: 360 },

            { x: 400, y: 360 },

            { x: 550, y: 450 },

            { x: 730, y: 340 },

            { x: 790, y: 340 },

            { x: 940, y: 430 },

            { x: 1100, y: 290 },

            { x: 570, y: 210 }

        ],

        enemies: [

            {
                x: 300,
                y: 355,
                width: 35,
                height: 45,
                speed: 1.5,
                direction: 1
            },

            {
                x: 690,
                y: 335,
                width: 35,
                height: 45,
                speed: 1.8,
                direction: 1
            },

            {
                x: 900,
                y: 425,
                width: 35,
                height: 45,
                speed: 1.4,
                direction: -1
            }

        ],

        exit: {
            x: 1090,
            y: 275,
            width: 45,
            height: 55
        }

    }

};


// ============================================================
// LOAD LEVEL
// ============================================================

function loadLevel(levelNumber) {

    const level = levels[levelNumber];

    if (!level) {

        showGameComplete();

        return;
    }

    platforms = level.platforms.map(platform => ({
        ...platform
    }));

    coins = level.coins.map(coin => ({
        ...coin,
        collected: false,
        radius: 10
    }));

    enemies = level.enemies.map(enemy => ({
        ...enemy
    }));

    exitDoor = {
        ...level.exit
    };


    player.x = 60;
    player.y = 450;

    player.velocityX = 0;
    player.velocityY = 0;

    levelComplete = false;

    updateUI();
}


// ============================================================
// COLLISION
// ============================================================

function checkCollision(a, b) {

    return (

        a.x < b.x + b.width &&

        a.x + a.width > b.x &&

        a.y < b.y + b.height &&

        a.y + a.height > b.y

    );
}


// ============================================================
// PLAYER MOVEMENT
// ============================================================

function updatePlayer() {

    if (!gameRunning || gameOver || levelComplete) {
        return;
    }


    // --------------------------------
    // Horizontal movement
    // --------------------------------

    player.velocityX = 0;


    if (
        keys["ArrowLeft"] ||
        keys["KeyA"]
    ) {

        player.velocityX = -player.speed;

        player.facing = -1;

    }


    if (
        keys["ArrowRight"] ||
        keys["KeyD"]
    ) {

        player.velocityX = player.speed;

        player.facing = 1;

    }


    player.x += player.velocityX;


    // --------------------------------
    // Keep player inside screen
    // --------------------------------

    if (player.x < 0) {

        player.x = 0;

    }

    if (player.x + player.width > GAME_WIDTH) {

        player.x = GAME_WIDTH - player.width;

    }


    // --------------------------------
    // Gravity
    // --------------------------------

    player.velocityY += player.gravity;

    player.y += player.velocityY;

    player.grounded = false;


    // --------------------------------
    // Platform collision
    // --------------------------------

    for (const platform of platforms) {

        const wasAbove =
            player.y + player.height - player.velocityY <= platform.y;

        const falling =
            player.velocityY >= 0;

        const horizontal =
            player.x + player.width > platform.x &&
            player.x < platform.x + platform.width;

        const vertical =
            player.y + player.height >= platform.y &&
            player.y + player.height <= platform.y + platform.height + 10;


        if (
            wasAbove &&
            falling &&
            horizontal &&
            vertical
        ) {

            player.y = platform.y - player.height;

            player.velocityY = 0;

            player.grounded = true;

        }

    }


    // --------------------------------
    // Jump
    // --------------------------------

    if (
        (
            keys["Space"] ||
            keys["ArrowUp"] ||
            keys["KeyW"]
        ) &&
        player.grounded
    ) {

        player.velocityY = -player.jumpPower;

        player.grounded = false;

    }


    // --------------------------------
    // Fall protection
    // --------------------------------

    if (player.y > GAME_HEIGHT + 100) {

        damagePlayer();

    }


    // --------------------------------
    // Invincibility timer
    // --------------------------------

    if (player.invincible) {

        player.invincibleTimer--;

        if (player.invincibleTimer <= 0) {

            player.invincible = false;

        }

    }

}


// ============================================================
// ENEMIES
// ============================================================

function updateEnemies() {

    if (!gameRunning || gameOver || levelComplete) {
        return;
    }


    for (const enemy of enemies) {

        enemy.x += enemy.speed * enemy.direction;


        // Reverse at screen edges

        if (
            enemy.x <= 0 ||
            enemy.x + enemy.width >= GAME_WIDTH
        ) {

            enemy.direction *= -1;

        }


        // Enemy collision

        if (
            checkCollision(player, enemy) &&
            !player.invincible
        ) {

            damagePlayer();

        }

    }

}


// ============================================================
// COINS
// ============================================================

function updateCoins() {

    for (const coin of coins) {

        if (coin.collected) {
            continue;
        }


        const coinBox = {

            x: coin.x - coin.radius,

            y: coin.y - coin.radius,

            width: coin.radius * 2,

            height: coin.radius * 2

        };


        if (checkCollision(player, coinBox)) {

            coin.collected = true;

            coinsCollected++;

            score += 100;

            updateUI();

        }

    }

}


// ============================================================
// EXIT
// ============================================================

function updateExit() {

    if (
        checkCollision(player, exitDoor)
    ) {

        levelComplete = true;

        score += 500;

        document.getElementById("levelScore").textContent =
            score;

        document
            .getElementById("levelCompleteScreen")
            .classList.remove("hidden");

    }

}


// ============================================================
// DAMAGE PLAYER
// ============================================================

function damagePlayer() {

    if (player.invincible) {
        return;
    }


    health--;

    updateUI();


    player.invincible = true;

    player.invincibleTimer = 120;


    player.velocityY = -8;


    if (health <= 0) {

        endGame();

        return;

    }


    player.x = 60;

    player.y = 400;

}


// ============================================================
// GAME OVER
// ============================================================

function endGame() {

    gameRunning = false;

    gameOver = true;


    document.getElementById("finalScore").textContent =
        score;

    document.getElementById("finalCoins").textContent =
        coinsCollected;


    document
        .getElementById("gameOverScreen")
        .classList.remove("hidden");

}


// ============================================================
// COMPLETE GAME
// ============================================================

function showGameComplete() {

    gameRunning = false;

    levelComplete = true;


    document.getElementById("levelScore").textContent =
        score;

    document.getElementById("levelCompleteScreen").querySelector("h1")
        .textContent = "YOU WIN!";

}


// ============================================================
// DRAW BACKGROUND
// ============================================================

function drawBackground() {

    // Sky

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            GAME_HEIGHT
        );

    gradient.addColorStop(
        0,
        "#101b3b"
    );

    gradient.addColorStop(
        1,
        "#263d63"
    );

    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        GAME_WIDTH,
        GAME_HEIGHT
    );


    // Moon

    ctx.fillStyle = "#f5f1c8";

    ctx.beginPath();

    ctx.arc(
        1050,
        100,
        45,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // Moon shadow

    ctx.fillStyle = "#101b3b";

    ctx.beginPath();

    ctx.arc(
        1070,
        85,
        42,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // Stars

    ctx.fillStyle = "#ffffff";

    const stars = [

        [100, 80],
        [180, 130],
        [280, 70],
        [400, 120],
        [520, 60],
        [640, 110],
        [760, 75],
        [900, 140],
        [980, 55],
        [1140, 150]

    ];


    for (const star of stars) {

        ctx.fillRect(
            star[0],
            star[1],
            3,
            3
        );

    }


    // Mountains

    ctx.fillStyle = "#111b2c";

    ctx.beginPath();

    ctx.moveTo(0, 450);

    ctx.lineTo(180, 280);

    ctx.lineTo(330, 450);

    ctx.lineTo(500, 250);

    ctx.lineTo(700, 450);

    ctx.lineTo(870, 300);

    ctx.lineTo(1050, 450);

    ctx.lineTo(1200, 260);

    ctx.lineTo(1200, 580);

    ctx.lineTo(0, 580);

    ctx.closePath();

    ctx.fill();


    // Ground background

    ctx.fillStyle = "#0a1020";

    ctx.fillRect(
        0,
        540,
        GAME_WIDTH,
        110
    );

}


// ============================================================
// DRAW PLATFORMS
// ============================================================

function drawPlatforms() {

    for (const platform of platforms) {

        // Main block

        ctx.fillStyle = "#34445f";

        ctx.fillRect(
            platform.x,
            platform.y,
            platform.width,
            platform.height
        );


        // Top grass

        ctx.fillStyle = "#00c98b";

        ctx.fillRect(
            platform.x,
            platform.y,
            platform.width,
            7
        );


        // Pixel details

        ctx.fillStyle = "#202b40";

        for (
            let x = platform.x + 10;
            x < platform.x + platform.width - 5;
            x += 25
        ) {

            ctx.fillRect(
                x,
                platform.y + 12,
                10,
                5
            );

        }

    }

}


// ============================================================
// DRAW PLAYER
// ============================================================

function drawPlayer() {

    if (
        player.invincible &&
        Math.floor(player.invincibleTimer / 8) % 2 === 0
    ) {

        return;

    }


    ctx.save();


    // Body

    ctx.fillStyle = "#00ffaa";

    ctx.fillRect(
        player.x + 6,
        player.y + 12,
        22,
        28
    );


    // Head

    ctx.fillStyle = "#ffd1a9";

    ctx.fillRect(
        player.x + 8,
        player.y,
        18,
        18
    );


    // Hair

    ctx.fillStyle = "#291b16";

    ctx.fillRect(
        player.x + 7,
        player.y,
        20,
        6
    );


    // Eye

    ctx.fillStyle = "#111111";

    if (player.facing === 1) {

        ctx.fillRect(
            player.x + 21,
            player.y + 8,
            3,
            3
        );

    } else {

        ctx.fillRect(
            player.x + 10,
            player.y + 8,
            3,
            3
        );

    }


    // Legs

    ctx.fillStyle = "#3566d6";

    ctx.fillRect(
        player.x + 7,
        player.y + 38,
        8,
        6
    );

    ctx.fillRect(
        player.x + 20,
        player.y + 38,
        8,
        6
    );


    // Shoes

    ctx.fillStyle = "#ffffff";

    ctx.fillRect(
        player.x + 4,
        player.y + 42,
        12,
        4
    );

    ctx.fillRect(
        player.x + 19,
        player.y + 42,
        12,
        4
    );


    ctx.restore();

}


// ============================================================
// DRAW COINS
// ============================================================

function drawCoins() {

    for (const coin of coins) {

        if (coin.collected) {
            continue;
        }


        ctx.fillStyle = "#ffd700";

        ctx.beginPath();

        ctx.arc(
            coin.x,
            coin.y,
            coin.radius,
            0,
            Math.PI * 2
        );

        ctx.fill();


        // Coin shine

        ctx.fillStyle = "#fff4a3";

        ctx.fillRect(
            coin.x - 3,
            coin.y - 5,
            3,
            6
        );


        // Coin border

        ctx.strokeStyle = "#a87800";

        ctx.lineWidth = 3;

        ctx.stroke();

    }

}


// ============================================================
// DRAW ENEMIES
// ============================================================

function drawEnemies() {

    for (const enemy of enemies) {

        // Body

        ctx.fillStyle = "#e63946";

        ctx.fillRect(
            enemy.x,
            enemy.y,
            enemy.width,
            enemy.height
        );


        // Eyes

        ctx.fillStyle = "#ffffff";

        ctx.fillRect(
            enemy.x + 7,
            enemy.y + 10,
            7,
            7
        );

        ctx.fillRect(
            enemy.x + 21,
            enemy.y + 10,
            7,
            7
        );


        // Pupils

        ctx.fillStyle = "#111111";

        ctx.fillRect(
            enemy.x + 9,
            enemy.y + 12,
            3,
            3
        );

        ctx.fillRect(
            enemy.x + 23,
            enemy.y + 12,
            3,
            3
        );


        // Teeth

        ctx.fillStyle = "#ffffff";

        ctx.fillRect(
            enemy.x + 8,
            enemy.y + 30,
            7,
            5
        );

        ctx.fillRect(
            enemy.x + 20,
            enemy.y + 30,
            7,
            5
        );

    }

}


// ============================================================
// DRAW EXIT
// ============================================================

function drawExit() {

    // Door

    ctx.fillStyle = "#8b5cf6";

    ctx.fillRect(
        exitDoor.x,
        exitDoor.y,
        exitDoor.width,
        exitDoor.height
    );


    // Door border

    ctx.strokeStyle = "#d8b4fe";

    ctx.lineWidth = 4;

    ctx.strokeRect(
        exitDoor.x,
        exitDoor.y,
        exitDoor.width,
        exitDoor.height
    );


    // Door center

    ctx.fillStyle = "#c4b5fd";

    ctx.fillRect(
        exitDoor.x + 10,
        exitDoor.y + 10,
        exitDoor.width - 20,
        exitDoor.height - 10
    );


    // Handle

    ctx.fillStyle = "#432874";

    ctx.fillRect(
        exitDoor.x + 30,
        exitDoor.y + 30,
        6,
        6
    );

}


// ============================================================
// DRAW
// ============================================================

function draw() {

    ctx.clearRect(
        0,
        0,
        GAME_WIDTH,
        GAME_HEIGHT
    );


    drawBackground();

    drawPlatforms();

    drawCoins();

    drawExit();

    drawEnemies();

    drawPlayer();

}


// ============================================================
// UI
// ============================================================

function updateUI() {

    document.getElementById("health").textContent =
        health;

    document.getElementById("coins").textContent =
        coinsCollected;

    document.getElementById("score").textContent =
        score;

    document.getElementById("level").textContent =
        currentLevel;

}


// ============================================================
// GAME LOOP
// ============================================================

function gameLoop() {

    updatePlayer();

    updateEnemies();

    updateCoins();

    updateExit();

    draw();


    requestAnimationFrame(gameLoop);

}


// ============================================================
// START GAME
// ============================================================

function startGame() {

    gameRunning = true;

    gameOver = false;

    levelComplete = false;

    score = 0;

    coinsCollected = 0;

    health = 3;

    currentLevel = 1;


    document
        .getElementById("startScreen")
        .classList.add("hidden");


    document
        .getElementById("gameOverScreen")
        .classList.add("hidden");


    document
        .getElementById("levelCompleteScreen")
        .classList.add("hidden");


    loadLevel(currentLevel);

    updateUI();

}


// ============================================================
// RESTART
// ============================================================

function restartGame() {

    startGame();

}


// ============================================================
// NEXT LEVEL
// ============================================================

function nextLevel() {

    currentLevel++;

    document
        .getElementById("levelCompleteScreen")
        .classList.add("hidden");


    if (currentLevel > Object.keys(levels).length) {

        showGameComplete();

        return;

    }


    loadLevel(currentLevel);

    gameRunning = true;

}


// ============================================================
// BUTTON EVENTS
// ============================================================

document
    .getElementById("startButton")
    .addEventListener(
        "click",
        startGame
    );


document
    .getElementById("restartButton")
    .addEventListener(
        "click",
        restartGame
    );


document
    .getElementById("nextLevelButton")
    .addEventListener(
        "click",
        nextLevel
    );


// ============================================================
// INITIALIZE
// ============================================================

loadLevel(1);

draw();

gameLoop();