const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const SIZE = 20;
const W = 600;
const H = 600;

let snake = [{x: 300, y: 300}];
let direction = "RIGHT";
let food = randomFood();
let score = 0;

let gameRunning = false;
let gameOver = false;

// 🍎 food
function randomFood() {
    return {
        x: Math.floor(Math.random() * (W / SIZE)) * SIZE,
        y: Math.floor(Math.random() * (H / SIZE)) * SIZE
    };
}

// 🟢 start
function startGame() {
    snake = [{x: 300, y: 300}];
    direction = "RIGHT";
    food = randomFood();
    score = 0;

    gameRunning = true;
    gameOver = false;
}

// ⌨ controls
document.addEventListener("keydown", (e) => {
    if (!gameRunning) {
        if (e.code === "Space") startGame();
        return;
    }

    if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// 🧱 border
function drawBorder() {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 8;
    ctx.strokeRect(0, 0, W, H);
}

// 🧮 SCORE (FIXED VISIBILITY)
function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "22px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Score: " + score, 15, 30);
}

// 🐍 REALISTIC SNAKE HEAD (EYES + MOUTH)
function drawSnake() {

    for (let i = 0; i < snake.length; i++) {

        let part = snake[i];

        if (i === 0) {
            // 🐍 HEAD
            ctx.fillStyle = "#00ff99";
            ctx.beginPath();
            ctx.roundRect(part.x, part.y, SIZE, SIZE, 8);
            ctx.fill();

            // 👀 EYES
            ctx.fillStyle = "white";

            ctx.beginPath();
            ctx.arc(part.x + 6, part.y + 6, 2.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(part.x + 14, part.y + 6, 2.5, 0, Math.PI * 2);
            ctx.fill();

            // 👁 pupils
            ctx.fillStyle = "black";

            ctx.beginPath();
            ctx.arc(part.x + 6, part.y + 6, 1.2, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(part.x + 14, part.y + 6, 1.2, 0, Math.PI * 2);
            ctx.fill();

            // 👄 mouth
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(part.x + 7, part.y + 14);
            ctx.lineTo(part.x + 13, part.y + 14);
            ctx.stroke();

        } else {
            // BODY
            ctx.fillStyle = "lime";
            ctx.beginPath();
            ctx.roundRect(part.x, part.y, SIZE, SIZE, 6);
            ctx.fill();
        }
    }
}

// 🍎 food
function drawFood() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.roundRect(food.x + 4, food.y + 4, SIZE - 8, SIZE - 8, 6);
    ctx.fill();
}

// 🎮 update
function update() {

    if (!gameRunning) return;

    let head = { ...snake[0] };

    if (direction === "UP") head.y -= SIZE;
    if (direction === "DOWN") head.y += SIZE;
    if (direction === "LEFT") head.x -= SIZE;
    if (direction === "RIGHT") head.x += SIZE;

    // 🍎 eat
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = randomFood();
    } else {
        snake.pop();
    }

    snake.unshift(head);

    // 💀 collision
    if (
        head.x < 0 ||
        head.x >= W ||
        head.y < 0 ||
        head.y >= H
    ) {
        gameRunning = false;
        gameOver = true;
    }
}

// 🎨 draw
function draw() {

    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, W, H);

    drawBorder();
    drawScore();
    drawSnake();
    drawFood();

    if (!gameRunning && !gameOver) {
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.font = "22px Arial";
        ctx.fillText("SPACE bosing", W/2, H/2);
    }

    if (gameOver) {
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(0,0,W,H);

        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.font = "28px Arial";
        ctx.fillText("Afsuski yutqazdingiz", W/2, H/2 - 20);

        ctx.font = "18px Arial";
        ctx.fillText("Score: " + score, W/2, H/2 + 20);
    }
}

// 🔁 loop
function loop() {
    draw();
    update();
    setTimeout(loop, 160);
}

loop();