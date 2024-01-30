//Canvas for drawing
//How to used canvas - https://www.youtube.com/watch?v=XYgcNVwHUdg

//How to drawing thanks to canvas: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes

/*
//Квадрат 
function draw() {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");//Вказуємо що будемо малювати на полотні 2D

    ctx.fillRect(25, 25, 100, 100); //Малює прямокутник із заливкою.
    ctx.clearRect(45, 45, 60, 60); //Очищає вказану прямокутну область, роблячи її повністю прозорою.
    ctx.strokeRect(50, 50, 50, 50); //Малює прямокутний контур.
  }
}
draw();
*/

//Мя'ч
// function draw1() {
//   const canvas = document.querySelector("#canvas");

//   if (canvas.getContext) {
//     const ctx = canvas.getContext("2d");

//     ctx.arc(75, 75, 50, 0, Math.PI * 2, true);
//     ctx.stroke();
//   }
// }

// draw1();

//ctx.arc(). - Rysowanie koła
//ctx.beginPath(), ctx.moveTo(), ctx.lineTo() - Rysownie linii
//ctx.fill() - Wypełnianie kształtu
//ctx.stroke() - obrysowanie kształtu
//Czyszczenie canvas: ctx.clearRect() Sprawdzenie rozmiarów ekranu: obiekt window.screen

/* requestAnimationFrame(); - використовується в браузерах для планування анімацій та інших оновлень, які пов'язані з відображенням. Замість того, щоб використовувати традиційні методи, такі як setTimeout чи setInterval, requestAnimationFrame забезпечує більш ефективний спосіб оновлення анімацій і рендерингу віджетів на веб-сторінці.

Основна перевага requestAnimationFrame полягає в тому, що вона синхронізується з циклом оновлення відображення браузера. Вона викликається перед тим, як наступить новий кадр відображення, що дозволяє браузеру оптимізувати процеси та уникнути зайвих ресурсів.

Синтаксис функції виглядає так:
requestAnimationFrame(callback);


де callback - це функція, яку ви хочете викликати перед наступним кадром відображення.
*/
//Init
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

let ballsCountInput = document.querySelector("#numBalls");
let animationStarted = false;

function GetDist() {
  return Number(document.getElementById("dist").value);
}

let radiusInput = document.querySelector("#radius");

const ballsArr = [];

let startBtn = document.getElementById("startBtn");
let resetBtn = document.getElementById("resetBtn");

startBtn.addEventListener("click", startAnimation);
resetBtn.addEventListener("click", resetAnimation);

/******************************************************************************************************* */

//Class Particle - частинка
class Particle {
  constructor() {
    this.x = 660; //позиція X //this.x = Math.random() * canvas.width;
    this.y = 250; //позиція Y //this.y = Math.random() * canvas.height;
    this.radius = radiusInput.value;
    this.speedX = Math.random() * 5 - 2.5; //швиткість в напрямку Х //Random szybkosc od 0 d0 3  //Напрямок X був як і додаатній так і відемний
    this.speedY = Math.random() * 5 - 2.5;
    this.color = randomColor();
  }

  //Draw my balls
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  //Conditional chack Border and speed animation X & Y balls
  speed_and_checkBorder() {
    if (!(this.x + this.radius < canvas.width && this.x - this.radius > 0)) {
      this.speedX = -this.speedX;
    }
    if (!(this.y + this.radius < canvas.height && this.y - this.radius > 0)) {
      this.speedY = -this.speedY;
    }

    this.x = this.x + this.speedX; // //this.x += this.speedX
    this.y = this.y + this.speedY; //this.y += this.speedY;
    this.draw();
  }
}

//Initialization balls
function initializeBalls() {
  const ballsCount = ballsCountInput.value;

  for (let i = 0; i < ballsCount; i++) {
    //Ekzemplar Class'a
    const ball = new Particle();
    ballsArr.push(ball);
  }
}

//Animation and draw me line between 2 balls
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < ballsArr.length; i++) {
    for (let j = 0; j < ballsArr.length; j++) {
      if (
        distanceBetweenBalls(
          ballsArr[i].x,
          ballsArr[i].y,
          ballsArr[j].x,
          ballsArr[j].y
        ) < GetDist()
      ) {
        ctx.beginPath();
        ctx.moveTo(ballsArr[i].x, ballsArr[i].y);
        ctx.lineTo(ballsArr[j].x, ballsArr[j].y);
        ctx.strokeStyle = "white";
        ctx.stroke();
      }
    }
  }

  //do kazdej kulki dodaj predkosc
  ballsArr.forEach((ball) => {
    ball.speed_and_checkBorder();
  });
}

//Start of the game
function startAnimation() {
  if (!animationStarted) {
    initializeBalls();
    animate();
    animationStarted = true;
  }
}

//Stop of the game
function resetAnimation() {
  ballsArr.length = 0;
  animationStarted = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//Distance between 2 balls
function distanceBetweenBalls(x1, y1, x2, y2) {
  let distanceX = x2 - x1;
  let distanceY = y2 - y1;
  return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
}

//Create random colors for balls
function randomColor() {
  let h = Math.random() * 360;
  let s = 75; //Насиченний колір
  let l = 50; //
  let a = 1; //
  return `hsla(${h}, ${s}%, ${l}%, ${a})`;
}
