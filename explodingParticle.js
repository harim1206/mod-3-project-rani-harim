class ExplodingParticle {
  constructor(x, y){
    this.posX = x,
    this.posY = y,
    this.radius = random(5, 10)
    this.r = random(0, 255),
    this.g = random(0, 255),
    this.b = random(0, 255),
    this.a = random(100, 255),
    this.velocity = random(0.1, 0.5),
    this.acceleration = random(0.001, 0.005),
    this.xSpeed = random(-2, 2)
    this.ySpeed = random(-2, 2)
    this.direction = random(-2 * Math.PI, 2 * Math.PI)
  }

  show (){
    noStroke()
    fill(this.r, this.g, this.b, this.a)
    ellipse(this.posX, this.posY, this.radius)
  }

  update() {
    push()
    rotate(this.direction)
    this.posX += this.xSpeed
    this.posY += this.ySpeed
    pop()
    this.a -= 2
    this.radius -= 0.1
    this.velocity -= this.acceleration
  }

}
