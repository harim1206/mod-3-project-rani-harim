function runOptionTwoJS(){
	// All of the paths
	// Each path is a line formed between mouse press and mouse release
	// Each path contains an array of particles
	var paths = []
	// Are we painting?
	let painting = false
	let explodingParticles = []

	// How long until next cycle -> next = millis() + random(100) -> random of 100 milli seconds
	let next = 0
	// Current and previous mouse positions
	let current
	let previous

	//colors
	var r, g, b;


	function setup(position) {
		let canvas = createCanvas(1500, 1000)
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
		background(300)

		// If it's time for a new point
		if(millis() > next && painting){

			// grab mouse position
			current.x = mouseX
			current.y = mouseY

			// add a particle with current position to current path
			// New particle's force is based on mouse movement
	    var force = p5.Vector.sub(current, previous);
	    force.mult(0.05);


			//   this.particles.push(new Particle(position, force, this.hue));
			paths[paths.length-1].add(current, force)
			// console.log(paths)

			// schedule next circle
			next = millis() + 100;

			previous.x = current.x
			previous.y = current.y
		}

		// Draw all paths
		for(let i = 0; i < paths.length; i++){
			paths[i].update();
			paths[i].display();
		}

		// console.log(`millis: `, millis())
		// console.log(`current X`, current.x)
		// console.log(`current Y`, current.y)



		explodingParticles.forEach(particle => {
			particle.show()
			particle.update()
			if(particle.a < 0){
				explodingParticles.splice(explodingParticles.indexOf(particle), 1)
			}
		})
	}







	let playButton = document.getElementById('play-button')
	playButton.addEventListener('click', execute2)
	console.log("Clicked")
	// Particle explosion function
	function execute2(){
		console.log("clicked!")
		// debugger

			for(let i = 0; i < paths.length; i++){
				let removeInterval = setInterval(()=>{
	         // console.log(explodingParticles)
						if(paths[i].particles.length > 0){



	///octave
						if (paths[i].particles[0].position.y < 330) {
							console.log("Here")
						if (paths[i].particles[0].position.x < 146) {
						  wave.freq(261.63)
						} else if (paths[i].particles[0].position.x > 146 && paths[i].particles[0].position.x < 293) {
						  wave.freq(293.66)
						} else if (paths[i].particles[0].position.x > 293 && paths[i].particles[0].position.x < 440) {
						  wave.freq(311.13)
						} else if (paths[i].particles[0].position.x > 440 && paths[i].particles[0].position.x < 586) {
						  wave.freq(329.63)
						} else if (paths[i].particles[0].position.x > 586 && paths[i].particles[0].position.x < 733) {
						  wave.freq(392.00)
						} else {
						  wave.freq(440)
						  }
						} else if (paths[i].particles[0].position.y < 660 && paths[i].particles[0].position.y >= 330) {
						  console.log(2)
						  if (paths[i].particles[0].position.x < 146) {
						    wave.freq(130.81)
						  } else if (paths[i].particles[0].position.x > 146 && paths[i].particles[0].position.x < 293) {
						    wave.freq(146.83)
						  } else if (paths[i].particles[0].position.x > 293 && paths[i].particles[0].position.x < 440) {
						    wave.freq(155.86)
						  } else if (paths[i].particles[0].position.x > 440 && paths[i].particles[0].position.x < 586) {
						    wave.freq(164.81)
						  } else if (paths[i].particles[0].position.x > 586 && paths[i].particles[0].position.x < 733) {
						    wave.freq(196.00)
						  } else {
						    wave.freq(220)
						    }
						} else {
						  console.log(3)
						    if (paths[i].particles[0].position.y > 660 ) {
						      wave.freq(523.25)
						    } else if (paths[i].particles[0].position.x > 146 && paths[i].particles[0].position.x < 293) {
						      wave.freq(587.33)
						    } else if (paths[i].particles[0].position.x > 293 && paths[i].particles[0].position.x < 440) {
						      wave.freq(622.25)
						    } else if (paths[i].particles[0].position.x > 440 && paths[i].particles[0].position.x < 586) {
						      wave.freq(659.25)
						    } else if (paths[i].particles[0].position.x > 586 && paths[i].particles[0].position.x < 733) {
						      wave.freq(783.99)
						    } else {
						      wave.freq(880)
						      }
						}

						// wave.freq(paths[i].particles[0].position.x)
						// wave.freq(paths[i].particles[0].position.x+100)
	          env.play()

						explode(paths[i].particles[0].position.x, paths[i].particles[0].position.y)



	 				 paths[i].particles.splice(0,1)

	 			 }else{
	 				 wave.freq(defaultFrequency)
	 				 window.clearInterval(removeInterval)
	 			 }
	 	 }, random(300,500))
	  }



	}


	explode = (x, y) => {
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
		this.hue = random(r. g, b);
	  r = random(255);
	  g = random(255);
	  b = random(255);

	}

	Path.prototype.add = function(position, force){
		// Add a new particle with a position and hue
		this.particles.push(new Particle(position, force, this.hue))
	}

	Path.prototype.update = function(){
		// Update path
		for (let i = 0; i < this.particles.length; i++){
			this.particles[i].update();
		}
	}

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

	function Particle(position, force, hue){
		this.position = createVector(position.x, position.y)
		this.velocity = createVector(force.x, force.y);
	  this.drag = 0.95;

	}

	Particle.prototype.update = function() {
	  // Move it
	  this.position.add(this.velocity);



	  // Slow it down
	  this.velocity.mult(this.drag);
	  // Fade it out
	  // this.lifespan--;
	}


	Particle.prototype.display = function(other){
		stroke(r, g, b);
		fill(r, g, b, 127);
		ellipse(this.position.x,this.position.y, 8, 8)

		if (other) {
			line(this.position.x, this.position.y, other.position.x, other.position.y);
		}

	}

}
