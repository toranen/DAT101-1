"use strict";
import libSprite from "../../common/libs/libSprite.mjs";
import { GameProps } from "./FlappyBird.mjs";

class THero extends libSprite.TSprite {
  #spi;
  #gravity = 9.81 / 100;
  #velocity = 0;
  constructor(aSpriteCanvas, aSpriteInfo, aPosition) {
    super(aSpriteCanvas, aSpriteInfo, aPosition);
    this.#spi = aSpriteInfo;
    this.animateSpeed = 10;
  }

  draw() {
    super.draw();
  }

  update() {
    const groundY = GameProps.ground.posY;
    const bottomY = this.posY + this.#spi.height;
    if (bottomY < groundY) {
      if(this.posY < 0){
        this.posY = 0;
        this.#velocity = 0; 
      }
      this.translate(0, this.#velocity);
       this.#velocity += this.#gravity;
    } else {
      this.posY = groundY - this.#spi.height;
    }
  }

  flap() {
    this.#velocity = -5;
  }
}

export default THero;
