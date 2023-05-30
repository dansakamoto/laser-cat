/*
* Laser Cat
*
*/

// dimensions: 800x700

// image and sound vars

// empty mouse array
// empty laser array
// empty fire array


function setup() {
  createCanvas(800 , 700);
  
  // load bg and fg
  // load sounds
  
  // Instantiate cat obj
  // Instantiate mouse generator
  
}

function updateGame() {
  
  // update cat
  // update all lasers (+ cleanup)
  // update all mice (+ cleanup)
  // update all flames (+ cleanup)
  
}

function draw() {

  updateGame();
  
  // Draw bg
  // Draw cat
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

// MOUSE GENERATOR CLASS
  // var cooldown
  // var baseY
  // var rangeY
  // fn randGenerator
    // x, y, dir, distRatio

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