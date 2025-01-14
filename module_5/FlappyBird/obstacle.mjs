"use strict";
import libSprite from "../../common/libs/libSprite.mjs";
import lib2d from "../../common/libs/lib2d.mjs";

class TObstacle {
  #upper;
  #lower;
  #spi;
  constructor(aSpriteCanvas, aSpriteInfo) {
    this.#spi = aSpriteInfo;
    const pos = new lib2d.TPosition(400, -100);
    this.#upper = new libSprite.TSprite(aSpriteCanvas, aSpriteInfo, pos);
    this.#upper.index = 3;

    pos.y = 350;
    this.#lower = new libSprite.TSprite(aSpriteCanvas, aSpriteInfo, pos);
    this.#lower.index = 2;
  }

  draw(){
    this.#upper.draw();
    this.#lower.draw();
  }

  update(){
    this.#upper.translate(-1, 0);
    this.#lower.translate(-1, 0);
  }
}

export default TObstacle;
