/*
* Laser Cat
*
*/

// dimensions: 800x700

// image and sound vars
let bgImg, fgImg, catImg, mouseImg, fireSprite
let cat, mouseGen;
let mice = [], lasers = [], flames = [];

function setup() {
  createCanvas(800 , 700);
  
  bgImg = loadImage('bg.png');
  fgImg = loadImage('fg.png');
  catImg = loadImage('cat.png');
  
  // TBC load sounds
  
  cat = new Cat();
  mouseGen = new MouseGenerator();
  
}

function updateGame() {
  
  // update cat
  // update all lasers (+ cleanup)
  // update all mice (+ cleanup)
  // update all flames (+ cleanup)
  
}

function draw() {

  updateGame();
  
  image(bgImg,0,0);
  image(catImg,0,0);
  image(fgImg,0,0);
  
  // Draw mice
  // Draw fg
  // Draw lasers
  // Draw fire
  
  // debugTools();
  
}


// CAT CLASS
  // var posX
  // var posY
  // var eyeL pos
  // var eyeR pos
  // var laserCooldown
  // var dir
  // var mouseDist
  // var walking
  // var stepState
  // var footstep sounds []?
  // var meow sound
  // var meow cooldown

  // fn fireLasers
  // fn randMeow
  // fn update
  // fn draw

class Cat {
  // total width = 600px
  // short segment = 175px
  // long segment = 425px
  constructor(){
    let posX = 0;
    let posY = 0;
    let dir = 0;
    let mouseDist = 0;
    // let walking ?
    // let stepState?
    // const footstep sounds ?
    // const meow sound ?
    let meowCooldown = 0;
    let eye = {
      l: {
        x: 0,
        y: 0
      },
      r: {
        x: 0,
        y: 0
      }
    };
    let laserCooldown = 0;
    
    this.calculateMouse();
    this.calculateEyes();
  }
  
  calculateEyes(){
    // TBC - keep track of eye locations
  }
  
  calculateMouse(){
    // keep track of mouse distance and direction
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

// LASER CLASS
  // var x
  // var y
  // var len
  // var startX
  // var startY
  // var destX
  // var destY
  // var angle
  // fn update (inc destruct)
  // fn draw

// FLAME CLASS
  // var x
  // var y
  // var disRatio
  // var animState
  // fn update (inc destruct)

function debugTools(){
  // draw origin points on cat eyes
  // draw laser start + end points
}