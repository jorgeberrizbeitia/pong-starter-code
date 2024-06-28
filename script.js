// *** Global Variables ***
const gameBoxNode = document.querySelector("#game-box");

const ballNode = document.createElement("div"); // se crea la pelotita
ballNode.id = "ball"; // se asigna un id a la pelotita (para CSS)
gameBoxNode.append(ballNode); // se añade la pelotita a la caja de juego

const paddleNode = document.createElement("div"); // se crea la paleta
paddleNode.id = "paddle"; // se asigna un id a la paleta (para CSS)
gameBoxNode.append(paddleNode); // se añade la pelotita a la caja de juego

let ballX = 30;
let ballY = 30;
let isBallMovingRight = true; // es true porque la pelota comienza a moverse a la derecha. Si es false, se mueve a la izquierda
let isBallMovingDown = true;
let ballSpeed = 4; // para modificar todas las velocidades de la bola
let wallRightSide = gameBoxNode.offsetWidth; // da el valor numerico del ancho del elemento
let wallBottomSide = gameBoxNode.offsetHeight; // da el valor numerico del alto del elemento
const ballWidth = ballNode.offsetWidth;
const ballHeight = ballNode.offsetHeight;

let paddelX = 200;
let paddelY = 550;
const paddleWidth = paddleNode.offsetWidth;

let isGameOver = false

// *** Game Functions ***

function ballMovement() {
  if (isBallMovingRight) {
    ballX += ballSpeed;
    ballNode.style.left = `${ballX}px`;
  } else {
    ballX -= ballSpeed;
    ballNode.style.left = `${ballX}px`;
  }
  if (isBallMovingDown) {
    ballY += ballSpeed;
    ballNode.style.top = `${ballY}px`;
  } else {
    ballY -= ballSpeed;
    ballNode.style.top = `${ballY}px`;
  }
}

function ballWallColission() {
  if (ballX > wallRightSide - ballWidth) {
    // colisión pared derecha
    isBallMovingRight = false;
  }

  if (ballY > wallBottomSide - ballHeight) {
    // colisión pared abajo
    // isBallMovingDown = false;
    isGameOver = true
  }

  if (ballX < 0) {
    isBallMovingRight = true; // colisión pared izquierda
  }

  if (ballY < 0) {
    // colisión pared arriba
    isBallMovingDown = true;
  }
}

function gameOverCheck (){
    if (isGameOver){
clearInterval(intervalId)
alert("Has perdido") //aparece un pop up
    }
}

function ballPadelColission() {

    if (ballX > paddelX && (ballX + ballWidth) < (paddelX + paddleWidth) && (ballY + ballHeight) > paddelY){
        isBallMovingDown = false
    }
}



function gameLoop() {
  // esto es lo que se ejecuta 60 veces por segundo

  // funciones de movimiento, colisiones o cualquier otro movimiento automatico deberia de estar aquí
  ballMovement();
  ballWallColission();
  ballPadelColission();
  gameOverCheck()
}

// *** Game Loop Interval ***
const intervalId = setInterval(() => {
  // console.log ("el juego está andando")
  gameLoop();
}, 1000 / 60); // 60 fps = frames per second, 60 frames por 1 segundo (NO DEBERIAMOS ESTAR MODIFICANDO ESTE VALOR)

// *** Event Listeners ***
// interacciones de usuarios
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    //movemos paleta a la derecha
    paddelX += 20;
    paddleNode.style.left = `${paddelX}px`;
  } else if (event.key === "ArrowLeft") {
    //movemos paleta a la izquierda
    paddelX -= 20;
    paddleNode.style.left = `${paddelX}px`;
  }
});
