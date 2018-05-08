// All of the paths
// Each path is a line formed between mouse press and mouse release
// Each path contains an array of particles
var paths = []
// Are we painting?
let painting = false
// How long until next cycle -> next = millis() + random(100) -> random of 100 milli seconds
let next = 0
// Current and previous mouse positions
let current
let previous


function setup() {
	createCanvas(720, 400)

	current = createVector(0,0)
	previous = createVector(0,0)
	frameRate(60)

}

function draw() {
	background(300)

	// If it's time for a new point
	if(millis() > next && painting){

		// grab mouse position
		current.x = mouseX
		current.y = mouseY

		// add a particle with current position to current path
		//   this.particles.push(new Particle(position, force, this.hue));
		paths[paths.length-1].add(current)
		console.log(paths)

		// schedule next circle
		next = millis() + 100;

		previous.x = current.x
		previous.y = current.y
	}

	// Draw all paths
	for(let i = 0; i < paths.length; i++){
		// paths[i].update();
		paths[i].display();
	}

	// console.log(`millis: `, millis())
	// console.log(`current X`, current.x)
	// console.log(`current Y`, current.y)

}



// start when mouse is pressed
function mousePressed(){
	next = 0
	painting = true
	previous.x = mouseX
	previous.y = mouseY
	// create a new Path object and add to array
	paths.push(new Path());

}

// stop when mouse is mouseReleased
function mouseReleased(){
	painting = false;
}

//
//
//
// PATH OBJECT DEFINITION / METHODS
//
//
// A Path is an array of particles
function Path(){
	this.particles = [];
	this.hue = random(100);
}

Path.prototype.add = function(position){
	// Add a new particle with a position and hue
	this.particles.push(new Particle(position, this.hue))
}

// Path.prototype.update = function(){
// 	// Update path
// 	for (let i = 0; i < this.particles.length; i++){
// 		this.particles[i].update();
// 	}
// }

Path.prototype.display = function(){
	// Display path
	for (let i = this.particles.length-1; i >= 0; i--){
		this.particles[i].display(this.particles[i+1]);
	}
}




//
//
//
// PARTICLE OBJECT DEFINITION / METHODS
//
//
// Particles along the path

function Particle(position, hue){
	this.position = createVector(position.x, position.y)

}

Particle.prototype.display = function(other){
	stroke(100)
	fill(100)
	ellipse(this.position.x,this.position.y, 8, 8)

	if (other) {
		line(this.position.x, this.position.y, other.position.x, other.position.y);
	}

}
