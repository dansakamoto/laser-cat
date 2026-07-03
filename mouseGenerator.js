class MouseGenerator {
  constructor() {
    this.cooldown = floor(random(s.mouseMin, s.mouseMax));
    this.baseY = height;
    this.rangeY = 200;
  }
  
  update(){
    if(this.cooldown-- <= 0){
      this.cooldown = floor(random(s.mouseMin, s.mouseMax));
      let dir = random([-1,1]);
      mice.push(new Mouse( (dir === -1) ? width : 0, this.baseY, dir,1) );
    }
  }
}