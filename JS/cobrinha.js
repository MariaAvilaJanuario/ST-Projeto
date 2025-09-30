const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score-value');
const highScoreElement = document.getElementById('high-score-value');
const finalScoreElement = document.getElementById('final-score');
const gameOverScreen = document.getElementById('game-over');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const restartBtn = document.getElementById('restart-btn');
const upBtn = document.getElementById('up-btn');
const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');
const downBtn = document.getElementById('down-btn');

const gridSize = 20;
let snake = [];
let food = {};
let direction = 'right';
let nextDirection = 'right';
let gameInterval;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameRunning = false;
let gamePaused = false;

function init() {
    const size = Math.min(500, window.innerWidth - 40);
    canvas.width = size;
    canvas.height = size;
    
    highScoreElement.textContent = highScore;
    
    document.addEventListener('keydown', handleKeyPress);
    startBtn.addEventListener('click', startGame);
    pauseBtn.addEventListener('click', togglePause);
    restartBtn.addEventListener('click', startGame);
    
    upBtn.addEventListener('click', () => changeDirection('up'));
    leftBtn.addEventListener('click', () => changeDirection('left'));
    rightBtn.addEventListener('click', () => changeDirection('right'));
    downBtn.addEventListener('click', () => changeDirection('down'));
    
    drawInitialScreen();
}

function drawInitialScreen() {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#ffffffff';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Clique em Iniciar Jogo', canvas.width / 2, canvas.height / 2);
}

function startGame() {
    snake = [
        {x: 5, y: 10},
        {x: 4, y: 10},
        {x: 3, y: 10}
    ];
    direction = 'right';
    nextDirection = 'right';
    score = 0;
    scoreElement.textContent = score;
    gameRunning = true;
    gamePaused = false;
    gameOverScreen.style.display = 'none';
    pauseBtn.textContent = 'Pausar';
    
    generateFood();
    
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 150);
}

function gameLoop() {
    if (gamePaused) return;
    
    direction = nextDirection;
    
    moveSnake();
    
    if (checkCollision()) {
        gameOver();
        return;
    }
    
    if (snake[0].x === food.x && snake[0].y === food.y) {
        snake.push({...snake[snake.length - 1]});
        
        score += 10;
        scoreElement.textContent = score;
        
        generateFood();
    }
    
    drawGame();
}

function moveSnake() {
    const head = {...snake[0]};
    
    switch(direction) {
        case 'up':
            head.y -= 1;
            break;
        case 'down':
            head.y += 1;
            break;
        case 'left':
            head.x -= 1;
            break;
        case 'right':
            head.x += 1;
            break;
    }
    
    snake.unshift(head);
    snake.pop();
}

function checkCollision() {
    const head = snake[0];
    
    if (head.x < 0 || head.x >= canvas.width / gridSize || 
        head.y < 0 || head.y >= canvas.height / gridSize) {
        return true;
    }
    
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    
    return false;
}

function generateFood() {
    let newFood;
    let onSnake;
    
    do {
        onSnake = false;
        newFood = {
            x: Math.floor(Math.random() * (canvas.width / gridSize)),
            y: Math.floor(Math.random() * (canvas.height / gridSize))
        };
        
        for (let segment of snake) {
            if (segment.x === newFood.x && segment.y === newFood.y) {
                onSnake = true;
                break;
            }
        }
    } while (onSnake);
    
    food = newFood;
}

function drawGame() {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#ff0000ff';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    
    snake.forEach((segment, index) => {
        const colorValue = Math.max(50, 255 - (index * 10));
        ctx.fillStyle = `rgb(50, ${colorValue}, 50)`;
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        
        ctx.strokeStyle = '#000';
        ctx.strokeRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

function gameOver() {
    gameRunning = false;
    clearInterval(gameInterval);
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreElement.textContent = highScore;
    }
    
    finalScoreElement.textContent = score;
    gameOverScreen.style.display = 'flex';
}

function handleKeyPress(e) {
    if (!gameRunning) return;
    
    switch(e.key) {
        case 'ArrowUp':
            if (direction !== 'down') changeDirection('up');
            break;
        case 'ArrowDown':
            if (direction !== 'up') changeDirection('down');
            break;
        case 'ArrowLeft':
            if (direction !== 'right') changeDirection('left');
            break;
        case 'ArrowRight':
            if (direction !== 'left') changeDirection('right');
            break;
        case ' ':
            togglePause();
            break;
    }
}

function changeDirection(newDirection) {
    if (
        (newDirection === 'up' && direction !== 'down') ||
        (newDirection === 'down' && direction !== 'up') ||
        (newDirection === 'left' && direction !== 'right') ||
        (newDirection === 'right' && direction !== 'left')
    ) {
        nextDirection = newDirection;
    }
}

function togglePause() {
    if (!gameRunning) return;
    
    gamePaused = !gamePaused;
    pauseBtn.textContent = gamePaused ? 'Continuar' : 'Pausar';
}

window.addEventListener('load', init);
