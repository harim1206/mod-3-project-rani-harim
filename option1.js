
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
	scratch = loadSound('assets/dj-scratching.mp3')
	drum = loadSound('assets/drumloop2.mp3')
	drum10 = loadSound('assets/drumloop10.mp3')
	saxbb = loadSound('assets/saxophone/Bb.mp3')
	saxc = loadSound('assets/saxophone/C.mp3')
	saxeb = loadSound('assets/saxophone/Eb.mp3')
	saxf4 = loadSound('assets/saxophone/F4.mp3')
	saxg = loadSound('assets/saxophone/G.mp3')
	saxgb = loadSound('assets/saxophone/Gb.mp3')
	guitar2 = loadSound('assets/guitar/guitarloop2b.mp3')
	guitar3 = loadSound('assets/guitar/guitarloop3.mp3')
	guitar4 = loadSound('assets/guitar/guitarloop4.mp3')
	guitar6 = loadSound('assets/guitar/guitarloop6b.mp3')
	synth1 = loadSound('assets/synthsounds/Synth1.mp3')
	synth3 = loadSound('assets/synthsounds/Synth3.mp3')
	synth4 = loadSound('assets/synthsounds/Synth4.mp3')
	synth5 = loadSound('assets/synthsounds/Synth5.mp3')


  // windgong = loadSound('assets/saxophone/windgong.mp3')
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
		next = millis() + 150;
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
let saveButton = document.getElementById('save-button')
let showButton = document.getElementById('show-list-button')


// NOTE: BUTTONS
playButton.addEventListener('click', execute)
newButton.addEventListener('click',function(){
	window.location.reload();
})
saveButton.addEventListener('click',function(){
  let drawingTitle = document.getElementById('drawing-title')
  let drawingPersonName = document.getElementById('drawing-person-name')
  let pathsJSON = pathsToJSON(paths)

  // debugger

  let postData = {
    name: drawingPersonName.value,
    title: drawingTitle.value,
    data: pathsJSON[1]
  }

	console.log(`pathsJSON: ${pathsJSON}`)
  fetch('http://localhost:3000/api/v1/drawings', {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
})




// SHOW LIST BUTTON EVENT LISTENER
showButton.addEventListener('click',function(){

  let showWrapper = document.getElementById('saved-drawings-list-wrapper')

  // debugger
  let select = document.createElement('select')
  fetch('http://localhost:3000/api/v1/drawings')
    .then((res) => res.json())
    .then((json) => {
      // debugger
      json.forEach(function(drawingObj){

        let option = document.createElement('option')
        option.innerHTML = drawingObj.id + "-" + drawingObj.title + "-" + drawingObj.name
        option.setAttribute('value', drawingObj.id)
        select.appendChild(option)



      })

    })
  showWrapper.appendChild(select)

  showWrapper.addEventListener('change',function(e){
    console.log("HELLO")
    let drawingId = e.target.options[e.target.selectedIndex].value

    let fetchURL = 'http://localhost:3000/api/v1/drawings/' + drawingId

    // debugger

    fetch(fetchURL)
      .then((res) => res.json())
      .then((json) => {



        paths = JSONStringToPaths(json.data)
        debugger


      })






  })


//   <select>
//   <option value="volvo">Volvo</option>
//   <option value="saab">Saab</option>
//   <option value="mercedes">Mercedes</option>
//   <option value="audi">Audi</option>
// </select>


})

// Particle explosion function
function execute(){
	for(let i = 0; i < paths.length; i++){

		let removeInterval = setInterval(()=>{
				if(paths[i].particles.length > 0){
					// NOTE: Create a new sound object with the current particle's location as the frequency.
					if(paths[i].particles[0].isNote){
						let thisNote = yPositionToNote(paths[i].particles[0].position.y)
						console.log(`thisNote`, thisNote)
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
  }, 100)
	}
}
//

// let externalsounds = document.getElementById("externalsounds")
// externalsounds.addEventListener('click', newexecute)

function newexecute(){
	console.log("clicked!")
	drum10.stop()

	console.log("3")

	// debugger

		for(let i = 0; i < paths.length; i++){
			let removeInterval = setInterval(()=>{
				 // console.log(explodingParticles)
       if(paths[i].particles.length > 0){
				 if(paths[i].particles[0].isNote){
					 let thisNote = yPositionToNote(paths[i].particles[0].position.y)
					 // console.log(`thisNote`, thisNote)
					 let thisParticleSound = createSound(thisNote, 'saw-tooth')
					 thisParticleSound.env.play()
				 }


						// discosound(counter)
						// counter++
						// if(counter === 30){
						// 	counter = 0
						// }

						explode(paths[i].particles[0].position.x, paths[i].particles[0].position.y)



					 paths[i].particles.splice(0,1)


				 }else{
					 // wave.freq(defaultFrequency)
					 window.clearInterval(removeInterval)
				 }
		 }, random(900))
	}
}

let saxsounds = document.getElementById("saxsounds")
saxsounds.addEventListener('click', executesax)
var countero = 0

function executesax(){
	for(let i = 0; i < paths.length; i++){

		let removeInterval = setInterval(()=>{
				if(paths[i].particles.length > 0){


					countero++
						if(countero === 7) {
							console.log("Reached")
							countero = 0
						  saxc.stop()
							saxeb.stop()
							saxf4.stop()
							saxgb.stop()
							saxg.stop()
							saxbb.stop()
							saxc.stop()
					}

					// NOTE: Create a new sound object with the current particle's location as the frequency.
					if(paths[i].particles[0].position.y < 70) {
              saxc.play()
					} else if (paths[i].particles[0].position.y < 140 && paths[i].particles[0].position.y >= 70 ) {
             saxeb.play()
					} else if (paths[i].particles[0].position.y < 140 && paths[i].particles[0].position.y >= 70 ) {
             saxf4.play()
					}else if (paths[i].particles[0].position.y < 210 && paths[i].particles[0].position.y >= 140 ) {
             saxgb.play()
					}else if (paths[i].particles[0].position.y < 280 && paths[i].particles[0].position.y >= 210 ) {
            saxg.play()
					}else if (paths[i].particles[0].position.y < 350 && paths[i].particles[0].position.y >= 280 ) {
            saxbb.play()
					} else {
						saxc.play()
					}

					// EXPLOSION EFFECT ON Particle
					explode(paths[i].particles[0].position.x, paths[i].particles[0].position.y)
					paths[i].particles.splice(0,1)

				}else{
					window.clearInterval(removeInterval)
				}
		// NOTE: Particle Trigger Speed
  }, 300)
	}
}


let guitarsounds = document.getElementById("guitarsounds")
guitarsounds.addEventListener('click', executeguitar)
var counterp = 0

function executeguitar(){
	for(let i = 0; i < paths.length; i++){

		let removeInterval = setInterval(()=>{
				if(paths[i].particles.length > 0){


					counterp++
						if(counterp === 3) {
							counterp = 0
						  guitar2.stop()
							guitar3.stop()
							guitar4.stop()
							guitar6.stop()
					}

					// NOTE: Create a new sound object with the current particle's location as the frequency.
					if(paths[i].particles[0].position.y < 100) {
              guitar2.play()
					} else if (paths[i].particles[0].position.y < 200 && paths[i].particles[0].position.y >= 100 ) {
             guitar3.play()
					} else if (paths[i].particles[0].position.y < 300 && paths[i].particles[0].position.y >= 200 ) {
             guitar4.play()
					} else {
						guitar6.play()
					}

					// EXPLOSION EFFECT ON Particle
					explode(paths[i].particles[0].position.x, paths[i].particles[0].position.y)
					paths[i].particles.splice(0,1)

					if (paths[i].particles.length === 0) {
						guitar2.stop()
						guitar3.stop()
						guitar4.stop()
						guitar6.stop()
					}

				}else{
					window.clearInterval(removeInterval)
				}
		// NOTE: Particle Trigger Speed
  }, 500)
	}
}

let synthsounds = document.getElementById("synthsounds")
synthsounds.addEventListener('click', executesynth)
var counters = 0

function executesynth(){
	for(let i = 0; i < paths.length; i++){

		let removeInterval = setInterval(()=>{
				if(paths[i].particles.length > 0){


					counters++
						if(counters === 3) {
							counters = 0
						  // guitar2.stop()
							synth3.stop()
							synth4.stop()
							drum10.stop()
					}
					if(counters === 10) {
						guitar2.stop()
						drum10.stop()
						counters = 0
				}

					// NOTE: Create a new sound object with the current particle's location as the frequency.
					if(paths[i].particles[0].position.x < 200) {
						synth3.play()
					} else if (paths[i].particles[0].position.x < 500 && paths[i].particles[0].position.x >= 200 ) {
             drum10.play()
					} else if (paths[i].particles[0].position.x < 700 && paths[i].particles[0].position.x >= 500 ) {
						 synth4.play()
					} else {
						guitar2.play()
					}

					// EXPLOSION EFFECT ON Particle
					explode(paths[i].particles[0].position.x, paths[i].particles[0].position.y)
					paths[i].particles.splice(0,1)

					if (paths[i].particles.length === 0) {
						guitar2.stop()
						synth3.stop()
						synth4.stop()
						drum10.stop()
					}

				}else{
					window.clearInterval(removeInterval)
				}
		// NOTE: Particle Trigger Speed
  }, 500)
	}
}
// function discosound(counter) {
// 		if (counter === 1) {
// 			drum10.play()
//
//        drum10.stop()
// 			 guitar.stop()
// 			 drum.play()
// 		}  else if (counter === 13) {
// 			 drum.stop()
// 			 scratch.play()
// 		}	 else  if (counter === 17) {
// 		  guitar.play()
// 		}  else  if (counter === 22) {
// 			drum.play()
// 		} else  if (counter === 35) {
//     }  else  if (counter === 40) {
// 			 drum.stop()
// 			 drum10.play()
// 	   } else {
// 		}
// }


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

// HELPER FUNCTION: takes in a paths array, returns
// a json 'stringifiable' object

function pathsToJSON(paths){
  // paths: [P1,P2,P3,...]
  // Path1.particles: [p1,p2,p3,...]
  // p1.position: Vector(x,y)
  // p1.isNote: T/F

  // debugger

  let pathsArray = []
  let pathsArrayString = ""

  // Iterate through each path
  paths.forEach(function(path){
    let pathData = []
    let pathDataString = ""
    // Iterate through each particles array
    path.particles.forEach(function(particle){
      let particleData = []
      let particleDataString = ""

      particleData.push(
        particle.position.x,
        particle.position.y,
        particle.isNote
      )

      // particleDataString += '['
      particleDataString += `${particle.position.x.toString()},`
      particleDataString += `${particle.position.y.toString()},`
      particleDataString += `${particle.isNote}`
      particleDataString += '/'

      pathData.push(particleData)
      pathDataString += particleDataString

      // debugger

    })

    pathDataString+='**endPATH'


    pathsArray.push(pathData)
    pathsArrayString += pathDataString


    // debugger

  })


  // Return:
  // [P1,P2,P3]
  // P1: [[x1,y1,Note1],[x2,y2,Note2]]
  // debugger
  return [pathsArray, pathsArrayString]

}


// TAKES IN A STRING FROM JSON AND CONVERTS IT INTO PATH
function JSONStringToPaths(string){

  let splitByPath = string.split("**endPATH")
  let paths = []

  splitByPath.forEach(function(pathString){
    let pathStringArray = pathString.split("/")
    let path = new Path()

    pathStringArray.forEach(function(particleString){
      let particleStringArray = particleString.split(",")
      let x = parseFloat(particleStringArray[0])
      let y = parseFloat(particleStringArray[1])
      let isNote = particleStringArray[2]
      let vector = createVector(x,y)
      path.add(vector)
    })
    paths.push(path)
  })
  debugger
  return paths
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
	// this.particles.push(new Particle(position, this.hue))
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
	stroke(r, g, b);
	fill(r, g, b, 127);
	ellipse(this.position.x,this.position.y, 2, 2)

	if (other) {
		line(this.position.x, this.position.y, other.position.x, other.position.y);
	}
}

// Colored particles for Notes
Particle.prototype.noteDisplay = function(other){

	stroke(r, g, b);
	fill(r, g, b, 127);
	ellipse(this.position.x,this.position.y, 6, 6)
	if (other) {
		line(this.position.x, this.position.y, other.position.x, other.position.y);
	}

}

// let show = document.getElementById("show")
// show.addEventListener('click', myFunction)
//
// function myFunction() {
//     var x = document.getElementById("drawingcontainer");
//     if (x.style.display === "block") {
//         x.style.display = "none";
//     } else {
//         x.style.display = "block";
//     }
// }
