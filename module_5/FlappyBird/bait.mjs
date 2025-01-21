"use strict";

import lib2d from "../../common/libs/lib2d.mjs";
import libSprite from "../../common/libs/libSprite.mjs";
import { GameProps, EGameStatus } from "./FlappyBird.mjs";

export class TBait extends libSprite.TSprite{
  #speed;
  #sineWave;
  constructor(aSpriteCanvas, aSpriteInfo, aPosition){
    super(aSpriteCanvas, aSpriteInfo, aPosition);
    this.animateSpeed = 28;
    this.#speed = Math.ceil(Math.random() * 10) / 10 + 0.5; // Math.random() * (1.5 - 0.5) + 0.5
    const amplitude = Math.ceil(Math.random() * 3);
    console.log(amplitude);
    this.#sineWave = new lib2d.TSinWave(amplitude, 1);
    this.posY = this.#sineWave.value;
  }
  

  update(){
    if (GameProps.status === EGameStatus.playing){
    this.translate(-this.#speed, this.#sineWave.value);
    } else{
      this.translate(this.#speed / 2, this.#sineWave.value);
    }
  }
}