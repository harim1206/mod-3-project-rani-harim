

// All of the paths
// Each path is a line formed between mouse press and mouse release
// Each path contains an array of particles
var paths = []
// Are we painting?
let painting = false
// How long until next cycle -> next = millis() + random(100) -> random of 100 milli seconds
let next = 0
let counter = 0

// Current and previous mouse positions
let current
let previous

// exploding particles array
let explodingParticles = []
var r, g, b;


function preload() {
	song = loadSound('assets/disco1.mp3')
	tango = loadSound('assets/Tango.mp3')
	tech = loadSound('assets/tech1.mp3')
	carribean = loadSound('assets/carribean.mp3')
	chacha = loadSound('assets/chacha.mp3')

}


function setup(position, extra1) {
	let canvas = createCanvas(1000, 450)
	canvas.parent('sketch-holder');

	current = createVector(0,0)
	previous = createVector(0,0)
	frameRate(60)


	console.log('setup loaded')

	stroke(r, g, b);
	fill(r, g, b, 127);
	r = random(255);
	g = random(255);
	b = random(255);
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

		// schedule next circle
		next = millis() + 80;
		previous.x = current.x
		previous.y = current.y
	}

	// Draw all paths
	for(let i = 0; i < paths.length; i++){
		paths[i].update();
		paths[i].display();
	}

	explodingParticles.forEach(particle => {
		particle.show()
		particle.update()
		if(particle.a < 0){
			explodingParticles.splice(explodingParticles.indexOf(particle), 1)
		}
	})

}



let playButton = document.getElementById('play-button')
let newButton = document.getElementById('new-button')


// NOTE: EXECUTE
playButton.addEventListener('click', execute)
newButton.addEventListener('click',function(){
	window.location.reload();
})

// Particle explosion function
function execute(){
	for(let i = 0; i < paths.length; i++){

		let removeInterval = setInterval(()=>{
				if(paths[i].particles.length > 0){
					// NOTE: Create a new sound object with the current particle's location as the frequency.
					if(paths[i].particles[0].isNote){
						let thisNote = yPositionToNote(paths[i].particles[0].position.y)
						// console.log(`thisNote`, thisNote)
						let thisParticleSound = createSound(thisNote, 'sine')
						thisParticleSound.env.play()
					}

					// EXPLOSION EFFECT ON Particle
					explode(paths[i].particles[0].position.x, paths[i].particles[0].position.y)
					paths[i].particles.splice(0,1)

				}else{
					window.clearInterval(removeInterval)
				}
		// NOTE: Particle Trigger Speed
		}, 200)
	}
}
//

let externalsounds = document.getElementById("externalsounds")
externalsounds.addEventListener('click', newexecute)

function newexecute(){
	console.log("clicked!")

	console.log("3")

	// debugger

		for(let i = 0; i < paths.length; i++){
			let removeInterval = setInterval(()=>{
				 // console.log(explodingParticles)
					if(paths[i].particles.length > 0){
						discosound(counter)
						counter++
						if(counter === 3){
							counter = 0
						}

						explode(paths[i].particles[0].position.x, paths[i].particles[0].position.y)



					 paths[i].particles.splice(0,1)

				 }else{
					 // wave.freq(defaultFrequency)
					 window.clearInterval(removeInterval)
				 }
		 }, random(150, 500))
	}
}




function discosound(counter) {
		if (counter === 1) {
			carribean.play()
			console.log(1)
		}
		else if (counter === 2) {
			carribean.play()
			tango.play()
			console.log(2)
			chacha.play()

		} else  if (counter === 3) {
			carribean.play()
			song.play()
			console.log(3)

		} else {
			console.log("Here")
		}
}


// HELPER FUNCTION: CONVERT Y POSITION TO NOTE SCALE
function yPositionToNote(yPosition, extra1){
	return findClosestNote(majorScaleC3, 900 - (yPosition * 2))
}

// HELPER FUNCTION: FIND CLOSEST NOTE
function findClosestNote(notesArray, input){
	let closest = notesArray.reduce(function(prev, curr) {
	  return (Math.abs(curr - input) < Math.abs(prev - input) ? curr : prev);
	})

	return closest
}

// HELPER FUNCTION
function explode(x, y, extra1) {
	let numParticles = random(2, 10)
	for(let i = 0; i <= numParticles; i++){
		let explodingParticle = new ExplodingParticle(x, y)
		explodingParticles.push(explodingParticle)
	}
}





//
//
// MOUSE EVENTS
//
//
// start when mouse is pressed
function mousePressed(extra1){
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
	// this.hue = random(100);

	this.hue = random(r, g, b);
	r = random(255);
	g = random(255);
	b = random(255);

}

Path.prototype.add = function(position){
	// Add a new particle with a position and hue

	if(this.particles.length % 3 === 0){
		this.particles.push(new Particle(position, this.hue, true))
	}else{
		this.particles.push(new Particle(position, this.hue, false))
	}
	this.particles.push(new Particle(position, this.hue))
}

Path.prototype.update = function(){
// 	// Update path
// 	for (let i = 0; i < this.particles.length; i++){
// 		this.particles[i].update();
// 	}
}

Path.prototype.display = function(extra1){
	// Display path

	for (let i = this.particles.length-1; i >= 0; i--){
		if(this.particles[i].isNote){
			this.particles[i].noteDisplay(this.particles[i+1]);

		}else{
			this.particles[i].display(this.particles[i+1]);
		}
	}
}



// PARTICLE OBJECT DEFINITION / METHODS
// Particles along the path
function Particle(position, hue, isNote){
	this.position = createVector(position.x, position.y)
	// true if it's a note particle
	this.isNote = isNote
}

Particle.prototype.display = function(other){
	stroke(100)
	fill(175, 175, 175)
	ellipse(this.position.x,this.position.y, 2, 2)

	if (other) {
		line(this.position.x, this.position.y, other.position.x, other.position.y);
	}
}

// Colored particles for Notes
Particle.prototype.noteDisplay = function(other){
	// stroke(100)
	// fill(255, 128, 128)
	stroke(r, g, b);
	fill(r, g, b, 127);
	ellipse(this.position.x,this.position.y, 8, 8)

	// ellipse(this.position.x,this.position.y, 5, 5)

	if (other) {
		line(this.position.x, this.position.y, other.position.x, other.position.y);
	}

}

let show = document.getElementById("show")
show.addEventListener('click', myFunction)

function myFunction() {
    var x = document.getElementById("drawingcontainer");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}
