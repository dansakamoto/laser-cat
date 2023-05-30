/*
* Laser Cat
*
*/

// dimensions: 800x700
const debugMode = false;

// SETTINGS
let blasterVol = 0.1;
let laserSpeed = 40; // normally 40
let laserW = 20;
let laserL = 100;
let minMeowDelay = 300;
let maxMeowDelay = 600;
let exciteDist = 20;
let exciteDelay = 90;


// image and sound vars
let bgImg, fgImg, catImg, mouseImg, fireSprite
let cat, mouseGen;
const mice = [], lasers = [], flames = [];

let sfx;

function setup() {
  createCanvas(800 , 700);
  
  bgImg = loadImage('bg.png');
  fgImg = loadImage('fg.png');
  catImg = loadImage('cat.png');

  sfx = {
    blaster: loadSound('mp3/blaster.mp3'),
    meow: loadSound('mp3/meow.mp3'),
    step: [loadSound('mp3/step1.mp3'),loadSound('mp3/step2.mp3'),loadSound('mp3/step3.mp3'),loadSound('mp3/step4.mp3')]
  };
  
  sfx.blaster.setVolume(blasterVol);
  
  cat = new Cat();
  mouseGen = new MouseGenerator();
  
}

function updateGame() {
  
  cat.update();
  for(let i=0; i<lasers.length; i++){
    if(!lasers[i].update()){
      lasers.splice(i,1);
    }
  }
  // update all mice (+ cleanup)
  // update all flames (+ cleanup)
  
}

function draw() {

  updateGame();
  
  image(bgImg,0,0);
  
  cat.draw();
  
  image(fgImg,0,0);
  
  // Draw mice
  
  for(let i=0; i<lasers.length; i++){
    lasers[i].draw();
  }
  
  // Draw fire
  
  debugTools();
  
}

function mouseClicked(){
  cat.fireLasers();
}

class Cat {
  // total width = 600px
  // short segment = 175px
  // long segment = 425px
  constructor(){
    this.offset = 175;
    
    this.posX = width/2;
    this.posY = 0;
    this.dir = 0;
    this.mouseDist = 0;
    
    this.excitement = 0;
    // let walking ?
    // let stepState?

    this.meowCooldown = floor(random(maxMeowDelay-minMeowDelay) + minMeowDelay);
    this.eye = {
      l: {
        x: 0,
        y: 0
      },
      r: {
        x: 0,
        y: 0
      }
    };
    this.laserCooldown = 0;
    
    this.calculateMouse();
    this.calculateEyes();
  }
  
  update(){
    this.calculateMouse();
    this.calculateEyes();
    
    this.meowRandomly();
  }
  
  draw(){
    
    if(this.dir === 0){
      image(catImg,this.posX-this.offset,this.posY);
    } else {
      push();
      scale(-1, 1);
      image(catImg,-this.posX-this.offset,this.posY);
      pop();
    }

  }
  
  
  calculateEyes(){
    if(this.dir === 0){
      this.eye.l.x = this.posX-this.offset + 120;
      this.eye.l.y = this.posY + 185;
      
      this.eye.r.x = this.posX-this.offset + 243;
      this.eye.r.y = this.posY + 195;
      
    } else {
      this.eye.l.x = this.posX+this.offset - 120;
      this.eye.l.y = this.posY + 185;
      
      this.eye.r.x = this.posX+this.offset - 243;
      this.eye.r.y = this.posY + 195;
    }
  }
  
  calculateMouse(){
    if(mouseX < this.posX) this.dir = 0;
    else this.dir = 1;
    
    this.mouseDist = abs(mouseX - this.posX);
  }
  
  fireLasers(){
    // TBC - check for cooldown?
    
    // TBC laser sound
    sfx.blaster.play();
    
    lasers.push(new Laser(this.eye.l.x, this.eye.l.y, mouseX, mouseY));
    lasers.push(new Laser(this.eye.r.x, this.eye.r.y, mouseX, mouseY));
  }
  
  meowRandomly(){
    // TBC
  }

}

// MOUSE GENERATOR CLASS
  // var cooldown
  // var baseY
  // var rangeY
  // fn randGenerator
    // x, y, dir, distRatio
class MouseGenerator {
  // TBC
}

// MOUSE CLASS
  // var x
  // var y
  // var dir
  // var distRatio
  // fn die
  // fn update
  // fn draw

class Laser {
  constructor(startX, startY, destX, destY){
    this.startX = startX;
    this.startY = startY;
    this.destX = destX;
    this.destY = destY;
    
    this.posX = 0;
    
    this.dying = false;
    
    push();
    translate(this.startX, this.startY);
    this.angle = atan2(this.destY-this.startY, this.destX-this.startX);
    pop();
    
    //let vec1 = createVector(this.startX, this.startY);
    //let vec2 = createVector(this.destX, this.destY);
    //this.angle = vec1.angleBetween(vec2);
    
    
    
    this.distance = dist(this.startX, this.startY, this.destX, this.destY);
    
  }
  
  update(){
    if(this.dying) return false;
    this.posX += laserSpeed;
    if(this.posX > this.distance) this.dying = true;
    return true;
  }
  
  draw(){
    push();
      translate(this.startX, this.startY);
      rotate(this.angle);
      //line(0,0,this.distance,0);
      //ellipse(this.posX,0,20);
      fill(255,80,160);
      stroke(255);
      strokeWeight(3);
      if(this.posX < laserL){
        rect(0,-laserW/2,this.posX,laserW,laserW);
      } else {
        rect(this.posX-laserL,-laserW/2,laserL,laserW,laserW);
      }
    pop();
  }
  
}

// FLAME CLASS
  // var x
  // var y
  // var disRatio
  // var animState
  // fn update (inc destruct)

function debugTools(){
  if(debugMode){
    
    push();
    fill(200);
    strokeWeight(1);
    stroke(0);
    
    // CHECK EYE LOCATINOS
    ellipse(cat.eye.l.x, cat.eye.l.y, 20);
    ellipse(cat.eye.r.x, cat.eye.r.y, 20);
    
    // CHECK LASERS
    for(let i=0; i<lasers.length; i++){
      fill(255,0,0);
      ellipse(lasers[i].startX,lasers[i].startY, 20);
      fill(0,255,0);
      ellipse(lasers[i].destX,lasers[i].destY, 20);
      
      push();
        translate(lasers[i].startX, lasers[i].startY);
        rotate(lasers[i].angle);
        line(0,0,lasers[i].distance,0);
      pop();
      
    }
    
    pop();
    
  }
}
