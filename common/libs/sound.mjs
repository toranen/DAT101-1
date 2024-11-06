/*
This file is a rapper for the Web Audio API. It is used to create and manage audio objects.
Created by Arne-Thomas Aas Søndeled, date: 2021-09-30
*/

// ----------------------------------- Private variables -----------------------------------

/**
 * Enum of octaves
 * @enum {number}
 */
// prettier-ignore
export const EOctave = {
    Octave1: 0, Octave2: 1, Octave3: 2, Octave4: 3, Octave5: 4, Octave6: 5, Octave7: 6, Octave8: 7, Octave9: 8
};

/**
 * Enum of note names
 */
// prettier-ignore
export const ENoteName = {
    C: "C", Db: "Db", D: "D", Eb: "Eb", E: "E", F: "F", Fb: "Fb", G: "G", Gb: "Gb", A: "A", Bb: "Bb", B: "B"
};

/**
 * Array for all basic notes
 * @type {Array}
 * @const
 * Use example: Notes.C[EOctave.Octave4]
 */
// prettier-ignore
const Notes = {
    //       0      1     2        3        4      5         6      7         8
       C: [16.35, 32.70,  65.41, 130.80, 261.60, 523.30, 1047.00, 2093.00, 4186.00],
      Db: [17.32, 34.65,  69.30, 138.60, 277.20, 554.40, 1109.00, 2217.00, 4435.00],
       D: [18.35, 36.71,  73.42, 146.80, 293.70, 587.30, 1175.00, 2349.00, 4699.00],
      Eb: [19.45, 38.89,  77.78, 155.60, 311.10, 622.30, 1245.00, 2489.00, 4978.00],
       E: [20.60, 41.20,  82.41, 164.80, 329.60, 659.30, 1319.00, 2637.00, 5274.00],
       F: [21.83, 43.65,  87.31, 174.60, 349.20, 698.50, 1397.00, 2794.00, 5588.00],
      Fb: [23.12, 46.25,  92.50, 185.00, 370.00, 740.00, 1480.00, 2960.00, 5920.00],
       G: [24.50, 49.00,  98.00, 196.00, 392.00, 784.00, 1568.00, 3136.00, 6272.00],
      Gb: [25.96, 51.91, 103.80, 207.70, 415.30, 830.60, 1661.00, 3322.00, 6645.00],
       A: [27.50, 55.00, 110.00, 220.00, 441.00, 880.00, 1760.00, 3520.00, 7040.00],
      Bb: [29.14, 58.27, 116.50, 233.10, 466.20, 932.30, 1865.00, 3729.00, 7459.00],
       B: [30.87, 61.74, 123.50, 246.90, 493.90, 987.80, 1976.00, 3951.00, 7902.00]
  };

/**
 * TEffect class
 * @class
 * @classdesc An abstract base class for all audio effects.
 * @constructor
 * @param {Object} aOptions - Options for the effect.
 */
class TEffect {
  constructor(aOptions) {
    if (new.target === TEffect) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
    this.context = aOptions.context;
    this.input = this.context.createGain(); // Create a gain node as the input
    this.output = this.context.createGain(); // Create a gain node as the output
  }

  /**
   * Connects the effect to a destination node.
   * @method
   * @param {AudioNode} destination - The destination node.
   */
  connect(destination) {
    this.output.connect(destination);
  }

  /**
   * Disconnects the effect from its current destination.
   * @method
   */
  disconnect() {
    this.output.disconnect();
  }
}

/**
 * TGainEffect class
 * @class
 * @classdesc A class for creating a gain effect.
 * @extends TEffect
 * @constructor
 * @param {Object} aOptions - Options for the gain effect.
 * @param {number} aOptions.gain - The gain value.
 */
class TGainEffect extends TEffect {
  constructor(aOptions) {
    super(aOptions);
    this.gain = aOptions.gain || 1;
    this.gainNode = this.context.createGain(); // Create a dedicated GainNode
    this.gainNode.gain.value = this.gain;
    this.input.connect(this.gainNode); // Connect input to the GainNode
    this.gainNode.connect(this.output); // Connect the GainNode to the output
  }
}

/**
 * Enum of delay types
 * @enum {string}
 */
// prettier-ignore
export const EDelayType = {
    Delay: "delay", Pitch: "pitch", LoPass: "lowpass", HiPass: "highpass", BandPass: "bandpass"
};

/**
 * TDelayEffect class
 * @classdesc A class for creating a delay effect.
 * @extends TEffect
 * @constructor
 * @param {Object} aOptions - Options for the delay effect.
 * @param {number} aOptions.delayTime - The delay time in seconds.
 * @param {number} aOptions.feedback - The feedback value.
 * @param {number} aOptions.wet - The wet value.
 * @param {number} aOptions.dry - The dry value.
 */
class TDelayEffect extends TEffect {
  constructor(aOptions) {
    super(aOptions);
    this.delayTime = aOptions.delayTime || 0.5;
    this.feedback = aOptions.feedback || 0.5;
    this.wet = aOptions.wet || 0.5;
    this.dry = aOptions.dry || 0.5;

    this.delayNode = this.context.createDelay(this.maxDelayTime);
    this.delayNode.delayTime.value = this.delayTime;
    this.feedbackGain = this.context.createGain();
    this.feedbackGain.gain.value = this.feedback;
    this.wetGain = this.context.createGain();
    this.wetGain.gain.value = this.wet;
    this.dryGain = this.context.createGain();
    this.dryGain.gain.value = this.dry;

    // Connect the nodes
    this.input.connect(this.delayNode);
    this.delayNode.connect(this.feedbackGain);
    this.feedbackGain.connect(this.delayNode);
    this.delayNode.connect(this.wetGain);
    this.wetGain.connect(this.output);
    this.input.connect(this.dryGain);
    this.dryGain.connect(this.output);
  }

  /**
   * Regenerates the the effect with alter values.
   * @function
   */
  regenerate() {
    this.delayNode.delayTime.value = this.delayTime;
    this.feedbackGain.gain.value = this.feedback;
    this.wetGain.gain.value = this.wet;
    this.dryGain.gain.value = this.dry;
  }
}

/**
 * TSoundGenerator class
 * @class
 * @classdesc An abstract base class for all sound-generating nodes (oscillators, samplers, etc.).
 * @constructor
 * @param {Object} aOptions - Options for the sound generator
 */
class TSoundGenerator {
  constructor(aOptions) {
    if (new.target === TSoundGenerator) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
    this.context = aOptions.context; // The AudioContextWrapper instance
    this.output = null; // The output node of the generator (will be set in subclasses)
    this.envelope = aOptions.envelope || null; // An Envelope object
    this.effects = []; // An array of Effect objects

    // Create the GainNode for click/pop reduction
    this.gainClickPopReduceNode = this.context.createGain();
    this.gainClickPopReduceNode.gain.value = 1; // Initialize with full volume
  }

  /**
   * Starts the sound generation.
   * @method
   */
  start() {
    throw new Error("Method 'start()' must be implemented.");
  }

  /**
   * Stops the sound generation.
   * @method
   */
  stop() {
    throw new Error("Method 'stop()' must be implemented.");
  }

  /**
   * Connects the generator to a destination node.
   * @method
   * @param {AudioNode} aDestination - The destination node to connect to.
   */
  connect(aDestination, aFadeInTime = 0.01) {
    if (this.output) {
      this.gainClickPopReduceNode.gain.linearRampToValueAtTime(1, this.context.currentTime + aFadeInTime);
      this.output.connect(aDestination);
    }
  }

  /**
   * Disconnects the generator from its output node.
   * @method
   * @param {number} aFadeOutTime - The time in seconds to fade out before disconnecting.
   */
  disconnect(aFadeOutTime = 0.01) {
    if (this.output) {
      this.gainClickPopReduceNode.gain.linearRampToValueAtTime(0, this.context.currentTime + aFadeOutTime);
      // Schedule disconnect after fade-out to prevent pops
      setTimeout(() => this.output.disconnect(), aFadeOutTime * 1000);
    }
  }

  /**
   * Applies the envelope to the generator's output.
   * @method
   */
  applyEnvelope() {
    if (this.envelope && this.output) {
      this.envelope.applyTo(this.output);
    }
  }

  /**
   * Adds an effect to the generator.
   * @method
   * @param {Effect} aEffect - The effect to add.
   */
  addEffect(aEffect) {
    this.effects.push(aEffect);

    if (this.effects.length === 1) {
      this.gainClickPopReduceNode.connect(aEffect.input);
    } else {
      const previousEffect = this.effects[this.effects.length - 2];
      previousEffect.output.connect(aEffect.input);
    }

    this.output = aEffect.output;
  }
}

/**
 * Enum of waveform types
 * @enum {string}
 */
// prettier-ignore
export const EWaveformType = {
    Sine: "sine", Square: "square", Sawtooth: "sawtooth", Triangle: "triangle"
};

/**
 * TWaveformGenerator class
 * @class
 * @classdesc A class for generating basic waveforms (sine, square, sawtooth, triangle).
 * @extends TSoundGenerator
 * @constructor
 * @param {Object} aOptions - Options for the sound generator
 * @param {EWaveformType} aOptions.type - The type of waveform to generate.
 * @param {ENoteName} aOptions.noteName - The name of the note (e.g., 'C', 'A#').
 * @param {EOctave} aOptions.octave - The octave of the note.
 */
class TWaveformGenerator extends TSoundGenerator {
  // Private property to keep track of whether the oscillator is playing. Used to prevent multiple starts.
  // Remember to reset this property when the sound effects are changed.
  constructor(aOptions) {
    super(aOptions);

    this.type = aOptions.type || EWaveformType.Sine;
    this.noteName = aOptions.noteName || ENoteName.A;
    this.octave = aOptions.octave || EOctave.Octave4;

    this.#createOscillator();
  }

  /**
   * Starts the sound generation.
   * @method
   */
  start() {
    this.#createOscillator();
    this.oscillator.start();
  }

  /**
   * Stops the sound generation.
   * @method
   */
  stop() {
    this.disconnect();
    this.oscillator.stop();
  }

  /**
   * Sets the waveform type.
   * @method
   * @param {EWaveformType} type - The waveform type.
   */
  setType(type) {
    this.type = type;
    this.oscillator.type = type;
    this.#createOscillator();
  }

  /**
   * Sets the note name and octave.
   * @method
   * @param {ENoteName} noteName - The note name.
   * @param {EOctave} octave - The octave.
   */
  setNote(noteName, octave) {
    this.noteName = noteName;
    this.octave = octave;
    this.oscillator.frequency.value = this.getFrequency();
    this.#createOscillator();
  }

  /**
   * Gets the frequency for the current note and octave.
   * @method
   * @returns {number} The frequency.
   */
  getFrequency() {
    return Notes[this.noteName][this.octave];
  }

  // ----------------------------------- Private methods -----------------------------------

  #createOscillator() {
    this.oscillator = this.context.createOscillator();
    this.oscillator.type = this.type;
    this.oscillator.frequency.value = this.getFrequency();
  
    // Store the current output BEFORE disconnecting anything
    const currentOutput = this.output; 
  
    this.output = this.oscillator;
    this.output.connect(this.gainClickPopReduceNode);
    this.output = this.gainClickPopReduceNode;
  
    // Reconnect the effects chain (if it exists)
    if (currentOutput) {
      this.output.connect(currentOutput.input); // Connect to the INPUT of the first effect
    } else {
      this.connect(this.context.destination); 
    }
    
  }
}

/**
 * TAudioContext class
 * @class
 * @classdesc A static class that wraps the AudioContext and provides access to it.
 * Ensures that only one AudioContext is active.
 */
export class TAudioContext {
  static #context = null; // Private static property to hold the AudioContext instance

  /**
   * Gets the AudioContext instance. Creates one if it doesn't exist.
   * @method
   * @returns {AudioContext} The AudioContext instance.
   */
  static getContext() {
    if (!TAudioContext.#context) {
      TAudioContext.#context = new AudioContext();
    }
    return TAudioContext.#context;
  }

  /**
   * Creates a sound.
   * @method
   * @returns {TWaveformGenerator} The created GainNode.
   */
  static createSound({ type, noteName, octave }) {
    const sound = new TWaveformGenerator({
      context: TAudioContext.getContext(),
      type: type,
      noteName: noteName,
      octave: octave,
    });
    return sound;
  }

  static addGain({ sound, gain = 1 }) {
    const gainEffect = new TGainEffect({
      context: TAudioContext.getContext(),
      gain: gain,
    });
    sound.addEffect(gainEffect);
    return gainEffect;
  }

  static addDelay({ sound, delayTime, feedback, wet, dry }) {
    const delayEffect = new TDelayEffect({
      context: TAudioContext.getContext(),
      delayTime: delayTime,
      feedback: feedback,
      wet: wet,
      dry: dry,
    });
    sound.addEffect(delayEffect);
    return delayEffect;
  }

  // Add other methods to wrap AudioContext functionality as needed...
  // For example:
  // static createDelay() { ... }
  // static createFilter() { ... }
  // ... and so on
}
