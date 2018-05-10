var attackTime = 0
var decayTime = 0.4;
var susPercent = 0.5;
var releaseTime = 0.4;

var attackLevel = 1;
var releaseLevel = 0;

var env, wave;



env = new p5.Env();
// Set Envelope Settings
// env.setADSR(attackTime, decayTime, susPercent, releaseTime);
env.setADSR(attackTime, decayTime, susPercent, releaseTime);
env.setRange(attackLevel, releaseLevel);

let defaultFrequency = 100
wave = new p5.Oscillator()
wave.setType('sine')
wave.start()
wave.freq(defaultFrequency)
wave.amp(env)



function playEnv(){
  console.log(`env`, env)
  console.log(`wave`, wave)

  env.play()
}
//
// let soundButton = document.getElementById('sound')
// soundButton.addEventListener('click', playEnv)
//
//
//
//
// console.log('sound.js loaded')
// //
// //
// let env = new p5.Env()
// env.setADSR(attackTime, decayTime, susPercent, releaseTime)
// env.setRange(attackLevel, releaseLevel)
//
// let wave = new p5.Oscillator()
// wave.setType(waveType)
// wave.start()
// wave.freq(note)
// wave.amp(env)
