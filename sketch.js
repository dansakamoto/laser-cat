const debugMode = false;
const s = {
  blasterVol: 0.1,
  meowVol: 0.5,
  laserSpeed: 40,
  laserW: 20,
  laserL: 100,
  minMeowDelay: 400,
  maxMeowDelay: 1300,
  exciteDist: 20,
  exciteDelay: 90,
  mouseMin: 10,
  mouseMax: 300,
  mouseSpeed: 5,
  flameSpeed: 1,
}; // settings

let bgImg,
  fgImg,
  catImg,
  mouseImg,
  fireSprite,
  cat,
  mouseGen,
  sfx,
  spritesheet,
  spritedata;
const mice = [],
  lasers = [],
  flames = [],
  animation = [];

function preload() {
  spritedata = loadJSON("flame.json");
  spritesheet = loadImage("fire.png");
  bgImg = loadImage("bg.png");
  fgImg = loadImage("fg.png");
  catImg = loadImage("cat.png");
  mouseImg = loadImage("mouse.png");
  sfx = {
    blaster: loadSound("mp3/blaster.mp3"),
    meow: loadSound("mp3/meow.mp3"),
    step: [
      loadSound("mp3/step1.mp3"),
      loadSound("mp3/step2.mp3"),
      loadSound("mp3/step3.mp3"),
      loadSound("mp3/step4.mp3"),
    ],
  };
}

function setup() {
  createCanvas(800, 700);

  sfx.blaster.setVolume(s.blasterVol);
  sfx.meow.setVolume(s.meowVol);

  let frames = spritedata.frames;
  for (let f of frames) {
    let pos = f.position;
    let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
    animation.push(img);
  }

  cat = new Cat();
  mouseGen = new MouseGenerator();
}

function updateGame() {
  cat.update();
  for (let i = 0; i < lasers.length; i++) {
    if (!lasers[i].update()) {
      lasers.splice(i, 1);
    }
  }
  mouseGen.update();

  for (let i = 0; i < mice.length; i++) {
    if (!mice[i].update()) {
      mice.splice(i, 1);
    }
  }

  for (let i = 0; i < flames.length; i++) {
    if (!flames[i].update()) {
      flames.splice(i, 1);
    }
  }
}

function draw() {
  updateGame();

  image(bgImg, 0, 0);

  cat.draw();

  image(fgImg, 0, 0);

  for (const mouse of mice) mouse.draw();

  for (let i = 0; i < lasers.length; i++) {
    lasers[i].draw();
  }

  // Draw fire
  for (let f of flames) {
    f.draw();
  }

  debugTools();
}

function touchStarted() {
  cat.fireLasers();
  return false;
}

function debugTools() {
  if (debugMode) {
    push();
    fill(200);
    strokeWeight(1);
    stroke(0);

    // CHECK EYE LOCATINOS
    ellipse(cat.eye.l.x, cat.eye.l.y, 20);
    ellipse(cat.eye.r.x, cat.eye.r.y, 20);

    // CHECK LASERS
    for (let i = 0; i < lasers.length; i++) {
      fill(255, 0, 0);
      ellipse(lasers[i].startX, lasers[i].startY, 20);
      fill(0, 255, 0);
      ellipse(lasers[i].destX, lasers[i].destY, 20);

      push();
      translate(lasers[i].startX, lasers[i].startY);
      rotate(lasers[i].angle);
      line(0, 0, lasers[i].distance, 0);
      pop();
    }

    pop();
  }
}
