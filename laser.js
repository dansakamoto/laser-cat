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
    this.posX += s.laserSpeed;
    if(this.posX >= this.distance){
      this.dying = true;
      for(let m of mice){
        if(this.destY >= m.posY-m.h && this.destY <= m.posY){
          if(m.dir === 1 && this.destX >= m.posX && this.destX <= m.posX+m.w || m.dir === -1 && this.destX <= m.posX && this.destX >= m.posX-m.w){
            flames.push(new Flame(animation, this.destX,this.destY));
            m.die();
          }
        }
      }
    }
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
      if(this.posX < s.laserL){
        rect(0,-s.laserW/2,this.posX,s.laserW,s.laserW);
      } else {
        rect(this.posX-s.laserL,-s.laserW/2,s.laserL,s.laserW,s.laserW);
      }
    pop();
  }
  
}