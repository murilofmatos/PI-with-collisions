let box1, box2;
let collisions = 0;
let pi = 0;
let ratio;
let digitsInput, digits, startButton;
let simulationStarted = false;
let steps;

function setup() {
  let canvas = createCanvas(800, 400);
  canvas.parent("canvas-container");
  startButton = document.getElementById("start-sim");
  digitsInput = document.getElementById("digits-input");
  if (isNaN(parseInt(digitsInput.value))) {
    digitsInput.value = 1;
  }
  digits = parseInt(digitsInput.value);
  ratio = pow(100, parseInt(digitsInput.value) - 1);
  box1 = new Box(100, 1, 0, 50, "#D82148", 0);
  let b2Size = digits <= 10 ? 100 : 200;
  box2 = new Box(300, ratio, 0, b2Size, "#355AD5", box1.size);
  digitsInput.value = 1;
}

function startSimulation() {
  if (isNaN(parseInt(digitsInput.value))) {
    digitsInput.value = 1;
  }
  digits = parseInt(digitsInput.value);
  steps = pow(10, constrain(digits, 1, 7));
  ratio = pow(100, digits - 1);
  box1 = new Box(100, 1, 0, 50, "#D82148", 0);
  let b2Size = digits <= 10 ? 100 : 200;
  box2 = new Box(300, ratio, -1 / steps, b2Size, "#355AD5", box1.size);
  box2.m = ratio;
  box2.y = height - box2.size;
  collisions = 0;
  simulationStarted = true;
  console.log(steps);
}

function draw() {
  background(20);
  for (let i = 0; i < steps; i++) {
    if (simulationStarted) {
      if (box1.x + box1.size >= box2.x) {
        let v1 = box1.vel;
        let v2 = box2.vel;
        box1.vel =
          ((box1.m - box2.m) / (box1.m + box2.m)) * v1 +
          ((2 * box2.m) / (box1.m + box2.m)) * v2;
        box2.vel =
          ((2 * box1.m) / (box1.m + box2.m)) * v1 +
          ((box2.m - box1.m) / (box1.m + box2.m)) * v2;
        collisions++;
      }

      if (box1.x <= 0) {
        box1.vel *= -1;
        collisions++;
      }

      box1.update();
      box2.update();
    }
  }

  box1.show();
  box2.show();

  pi = collisions / pow(10, digitsInput.value - 1);

  textSize(20);
  textAlign(LEFT);
  textFont("Verdana");
  fill(255);
  text("Collisions: " + collisions, 10, 30);
  text("Pi: " + pi, 10, 60);
}

class Box {
  constructor(x, m, vel, size, color, minX) {
    this.x = x;
    this.size = size;
    this.y = height - this.size;
    this.m = m;
    this.vel = vel;
    this.color = color;
    this.minX = minX;
  }

  update() {
    this.x += this.vel;
  }

  show() {
    textAlign(CENTER);
    fill(this.color);
    let x = constrain(this.x, this.minX, width + this.size);
    text(`${this.m}kg`, x + this.size / 2, this.y - 20);
    rect(x, this.y, this.size, this.size);
  }
}
