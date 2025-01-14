"use strict";
import libSprite from "../../common/libs/libSprite.mjs";
import { GameProps } from "./FlappyBird.mjs";

class THero extends libSprite.TSprite {
  constructor(aSpriteCanvas, aSpriteInfo, aPosition) {
    super(aSpriteCanvas, aSpriteInfo, aPosition);
    this.animateSpeed = 10;
  }

  draw(){
    super.draw();
  }

  update(){
    if(this.posY < 300){
      this.translate(0, 1);
    }else{
      this.posY = 300;
    }
  }
}

export default THero;