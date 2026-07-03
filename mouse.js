class Mouse {
  constructor(posX,posY,dir,distRatio){
    this.posX = posX;
    this.posY = posY;
    this.dir = dir;
    this.distRatio = distRatio;
    this.h = 100;
    this.w = 200;
    this.posX += (this.dir === 1) ? -1*this.w : this.w;
    this.dying = false;
  }
  
  die(){
    this.dying = true;
  }
  
  update(){
    if(this.dying){
      return false;
    }
    
    this.posX += this.dir * s.mouseSpeed;
    
    if(this.posX < -this.w || this.posX > width+this.w) return false;
    else return true;
  }
  
  draw(){
    if(this.dir === 1){
      image(mouseImg,this.posX,this.posY-this.h);
    } else {
      push();
      scale(-1, 1);
      image(mouseImg,-this.posX,this.posY-this.h);
      pop();
    }
  }

}