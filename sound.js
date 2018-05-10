let notes2 = {"C3": 130.81, "D3": 146.83, "E3": 164.81, "F3": 174.61, "G3": 196.00, "A4": 220.00, "B4": 246.94, "C4": 261.63, "D4": 293.66, "E4": 329.63, "F4": 349.23, "G4": 392.00, "A5": 440.00, "B5": 493.88, "C5": 523.25}

let notes = [130.813, 138.591, 146.832, 155.563, 164.814,
174.614, 184.997, 195.998, 207.652, 220,
233.082, 246.942, 261.626, 277.183, 293.665,
311.127, 329.628, 349.228, 369.994, 391.995,
415.305, 440, 466.164, 493.883, 523.251,
554.365, 587.33, 622.254, 659.255, 698.456,
739.989, 783.991, 830.609, 880, 932.328, 987.767]

let majorScaleC3 = [130.81, 146.83, 164.81, 174.61, 196,
220, 246.94, 261.63, 293.66, 329.63,
349.23, 392, 440, 493.88, 523.25,
587.33, 659.25, 698.46, 783.99, 880, 987.77]


class Sound{
  constructor(env, wave, delay){
    this.env = env
    this.wave = wave
    this.delay = delay
  }
}

var attackTime = 0
var decayTime = 1;
var susPercent = 0.2;
var releaseTime = 1.5;

var attackLevel = 1;
var releaseLevel = 0;


//  Takes in note(frequency) and oscillator wave type, returns a sound object
// Reverb: reverbTime in seconds, decayRate 0-100 (%)
function createSound(note, waveType){
  let env = new p5.Env()
  env.setADSR(attackTime, decayTime, susPercent, releaseTime)
  env.setRange(attackLevel, releaseLevel)

  let wave = new p5.Oscillator()
  wave.setType(waveType)
  wave.start()
  wave.freq(note)
  wave.amp(env)

  let sound = new Sound(env, wave)
  return sound
}


// let defaultFrequency = 400
// let testSound = createSound(defaultFrequency, 'triangle')
//
// let soundButton = document.getElementById('sound')
// soundButton.addEventListener('click', function(){
//   // debugger
//   testSound.env.play()
//
// })
