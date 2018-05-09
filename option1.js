
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


function setup(position) {
	let canvas = createCanvas(800, 400)
	canvas.parent('sketch-holder');

	current = createVector(0,0)
	previous = createVector(0,0)
	frameRate(60)


	console.log('setup loaded')


}


function draw() {
	background(250)

	// If it's time for a new point
	if(millis() > next && painting){

		// grab mouse position
		current.x = mouseX
		current.y = mouseY

		// add a particle with current position to current path
		// NOTE: CREATING A NEW PARTICLE
		paths[paths.length-1].add(current)
		// console.log(paths)

		// schedule next circle
		next = millis() + 80;

		previous.x = current.x
		previous.y = current.y
	}

	// Draw all paths
	for(let i = 0; i < paths.length; i++){
		// paths[i].update();
		paths[i].display();
	}


}






// NOTE: EXECUTE
let executeButton = document.getElementById('execute')
executeButton.addEventListener('click', execute)

// Particle explosion function
function execute(){
	console.log("clicked!")
	// debugger

	for(let i = 0; i < paths.length; i++){

		let removeInterval = setInterval(()=>{


				if(paths[i].particles.length > 0){

					// NOTE: Create a new sound object with the current particle's location as the frequency.
					// debugger
					if(paths[i].particles[0].isNote){
						let thisNote = yPositionToNote(paths[i].particles[0].position.y)
						console.log(`thisNote`, thisNote)

						let thisParticleSound = createSound(thisNote, 'square')

						thisParticleSound.env.play()


					}



					paths[i].particles.splice(0,1)



				}else{
					// wave.freq(defaultFrequency)
					window.clearInterval(removeInterval)
				}
		// NOTE: Particle Trigger Speed
		}, 200)
	}




}

// HELPER FUNCTION: CONVERT Y POSITION TO NOTE SCALE
function yPositionToNote(yPosition){
	return findClosestNote(majorScaleC3, 900 - (yPosition * 2))
}

// HELPER FUNCTION: FIND CLOSEST NOTE
function findClosestNote(notesArray, input){
	// debugger
	let closest = notesArray.reduce(function(prev, curr) {
	  return (Math.abs(curr - input) < Math.abs(prev - input) ? curr : prev);
	})

	return closest
}













//
//
// MOUSE EVENTS
//
//
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
	if(this.particles.length % 3 === 0){
		this.particles.push(new Particle(position, this.hue, true))
	}else{
		this.particles.push(new Particle(position, this.hue, false))
	}
	// debugger
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
		if(this.particles[i].isNote){
			this.particles[i].noteDisplay(this.particles[i+1]);

		}else{
			this.particles[i].display(this.particles[i+1]);

		}

	}
}




//
//
//
// PARTICLE OBJECT DEFINITION / METHODS
//
//
// Particles along the path

function Particle(position, hue, isNote){
	this.position = createVector(position.x, position.y)
	// true if it's a note particle
	this.isNote = isNote


}

Particle.prototype.display = function(other){
	stroke(100)
	fill(175, 175, 175)
	ellipse(this.position.x,this.position.y, 5, 5)

	if (other) {
		line(this.position.x, this.position.y, other.position.x, other.position.y);
	}

}

// Colored particles for Notes
Particle.prototype.noteDisplay = function(other){
	stroke(100)
	fill(255, 128, 128)
	ellipse(this.position.x,this.position.y, 8, 8)

	if (other) {
		line(this.position.x, this.position.y, other.position.x, other.position.y);
	}

}
