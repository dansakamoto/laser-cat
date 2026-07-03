class Flame {
  // FLAME CLASS
  // var x
  // var y
  // var disRatio
  // var animState
  // fn update (inc destruct)
  constructor(animation, x, y){
    this.x = x-96;
    this.y = y-96;
    this.animation = animation;
    this.frame = -1;
  }

  update(){
    this.frame++
    return this.frame < this.animation.length;
  }

  draw(){
    image(this.animation[this.frame],this.x,this.y);
  }
}