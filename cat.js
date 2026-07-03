class Cat {
  // total width = 600px
  // short segment = 175px
  // long segment = 425px
  constructor(){
    this.offset = 175;
    
    this.posX = width/2;
    this.posY = 22.5;
    this.dir = 0;
    this.mouseDist = 0;

    this.speed = 0;
    
    this.walking = false;
    this.walkFrame = 0;
    
    this.excitement = 0;
    // let walking ?
    // let stepState?

    this.meowCooldown = floor(random(s.maxMeowDelay-s.minMeowDelay) + s.minMeowDelay);
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

    if(mouseX < this.posX-150){
      this.speed = max(-1, this.speed-.005);
    } else if(mouseX > this.posX+150){
      this.speed = min(1, this.speed+.005);
    } else if(abs(this.speed) <= .02) {
      this.speed = 0;
    } else if(this.speed > 0) {
      this.speed -= .02;
    } else if(this.speed < 0) {
      this.speed += .02;
    }

    this.walk();
    
    this.posX += this.speed;
    
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

    sfx.blaster.play();
    
    lasers.push(new Laser(this.eye.l.x, this.eye.l.y, mouseX, mouseY));
    lasers.push(new Laser(this.eye.r.x, this.eye.r.y, mouseX, mouseY));
  }
  
  meowRandomly(){
    if(--this.meowCooldown <= 0){
      this.meowCooldown = floor(random(s.maxMeowDelay-s.minMeowDelay) + s.minMeowDelay);
      sfx.meow.play();
    }
  }

  walk(){

    if(abs(this.speed) > .1){
      this.walking = true;
    } else if(walkFrames[this.walkFrame] === 490) {
      this.walking = false;
      this.walkFrame = 0;
    }

    if(this.walking) {
      this.walkFrame = (this.walkFrame+1) % 240;
      
      if(this.walkFrame < walkFrames.length){
        this.posY = (walkFrames[this.walkFrame]/4)-100;
      } else {
        this.posY = (walkFrames[0]/4)-100;
      }
      
      if(this.walkFrame == 190){
        sfx.step[floor(random(0,3))].play();
      } 
    }
  }

}