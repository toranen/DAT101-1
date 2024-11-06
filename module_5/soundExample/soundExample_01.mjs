"use strict";
import * as SND from "../../common/libs/sound.mjs";

let sound = null;
let delayEffect = null;

//inpDelayTime, inpFeedbackGain, inpWetGain, inpDryGain;
const inpDelayTime = document.getElementById("inpDelayTime");
inpDelayTime.addEventListener("input", (event) => {
  delayEffect.delayTime = parseFloat(inpDelayTime.value);
  delayEffect.regenerate();
});
const inpFeedbackGain = document.getElementById("inpFeedbackGain");
inpFeedbackGain.addEventListener("input", (event) => {
  delayEffect.feedback = parseFloat(inpFeedbackGain.value);
  delayEffect.regenerate();
});
const inpWetGain = document.getElementById("inpWetGain");
inpWetGain.addEventListener("input", (event) => {
  delayEffect.wet = parseFloat(inpWetGain.value);
  delayEffect.regenerate();
});

const inpDryGain = document.getElementById("inpDryGain");
inpDryGain.addEventListener("input", (event) => {
  delayEffect.dry = parseFloat(inpDryGain.value);
  delayEffect.regenerate();
});



const btnPlayStop = document.getElementById("btnPlayStop");
btnPlayStop.textContent = "Play";
btnPlayStop.addEventListener("mousedown", (event) => {
  if (!sound) {
    sound = SND.TAudioContext.createSound({
      type: SND.EWaveformType.Sine,
      noteName: SND.ENoteName.C,
      octave: SND.EOctave.Octave5,
    });
    SND.TAudioContext.addGain({
      sound: sound,
      gain: 1,
    });
    delayEffect = SND.TAudioContext.addDelay({
      sound: sound,
      delayTime: parseFloat(inpDelayTime.value),
      feedback: parseFloat(inpFeedbackGain.value),
      wet: parseFloat(inpWetGain.value),
      dry: parseFloat(inpDryGain.value),
    });
    inpDelayTime.value = delayEffect.delayTime;
    inpFeedbackGain.value = delayEffect.feedback;
    inpWetGain.value = delayEffect.wet;
    inpDryGain.value = delayEffect.dry;

  }
  startStop();
});

btnPlayStop.addEventListener("mouseup", (event) => {
  startStop();
});

function startStop() {
  if (btnPlayStop.textContent === "Play") {
    sound.start();
    btnPlayStop.textContent = "Stop";
  } else {
    sound.stop();
    btnPlayStop.textContent = "Play";
  }
}

document.body.appendChild(btnPlayStop);
