majorScaleC3 = [130.81, 146.83, 164.81, 174.61, 196,
220, 246.94, 261.63, 293.66, 329.63,
349.23, 392, 440, 493.88, 523.25,
587.33, 659.25, 698.46, 783.99, 880, 987.77]

class Sound{
  constructor(env, wave, delay){
    this.env = env
    this.wave = wave
    this.delay = delay
  }

  setADSR(attack, decay, sustain, release){


    this.env.setADSR(attack, decay, sustain, release)
  }

}

var attackTime = 0
var decayTime = 1;
var susPercent = 0.2;
var releaseTime = 1.5;

var attackLevel = 1;
var releaseLevel = 0;


//  Takes in note(frequency) and oscillator wave type, returns a sound object

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
