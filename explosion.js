class Particle {

    constructor(x, y, r) {
        this.pos   = createVector(x, y);
        this.vel   = createVector(random(-5, 5), random(-5, 5)); /// direction of the explosion
        this.acc   = createVector(0, 0); /// direction of the explosion
        this.r     = r ? r : 48;
        this.halfr = r / 2;
    }

    // applyForce(force) {
    //     this.acc.add(force);
    // }

    update() {
        // this.vel.add(0);
        this.pos.add(this.vel); // velocity of all new particles is random
        // this.acc.set(0);
    }

    display() {
        noStroke();
        // fill(255);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }

    edges() {
        if(this.pos.y > (height - this.halfr)) {
            this.vel.y *= -1;
            this.pos.y = (height - this.halfr);
        }

        // if(this.pos.y < 0 + this.halfr) {
        //     this.vel.y *= -1;
        //     this.pos.y = 0 + this.halfr;
        // }

        // if(this.pos.x > (width - this.halfr)) {
        //     this.vel.x *= -1;
        //     this.pos.x = (width - this.halfr);
        // }

        // if(this.pos.x < this.halfr) {
        //     this.vel.x /= -1;
        //     this.pos.x = this.halfr;
        // }
    }

}


let particles = [];

let w = window.innerWidth,
    h = window.innerHeight,
    d = 50;

function setup() {
    createCanvas(w, h);
    //particles[0] = new Particle(0 , 0, d);
}

function draw() {
    background('#0000ff');

    // var gravity = createVector(0, 0.15);
    // var wind = createVector(0.09, 0);

    if(particles.length > 0) {
        for(var i = 0; i < particles.length; i++) {
              particles[i].update();
            particles[i].display();
        }
    }

}

  var i = 0;
  setInterval(function() {
      if(i <= 10) { ///number of particles
          particles[i] = new Particle(width / 2, height / 2, random(3, 35));
          i++;
      }
  }, 15);
