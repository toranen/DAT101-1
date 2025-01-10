"use strict";

/**
 * @library libSprite
 * @description A library for classes that manage sprite animations.
 */

class TSpriteCanvas {
  #cvs;
  #ctx;
  #img;

  constructor(aCanvas) {
    this.#cvs = aCanvas;
    this.#ctx = aCanvas.getContext("2d");
    this.#img = new Image();
  }

  loadSpriteSheet(aFileName, aLoadedFinal) {
    this.#img.onload = aLoadedFinal;
    this.#img.src = aFileName;
  }

  drawSprite(aSpriteInfo, aDx = 0, aDy = 0, aIndex = 0) {
    let index = aIndex;
    const sx = aSpriteInfo.x + (index * aSpriteInfo.width);
    const sy = aSpriteInfo.y;
    const sw = aSpriteInfo.width;
    const sh = aSpriteInfo.height;
    const dx = aDx;
    const dy = aDy;
    const dw = sw;
    const dh = sh;
    this.#ctx.drawImage(this.#img, sx, sy, sw, sh, dx, dy, dw, dh);
  }

  clearCanvas(){
    this.#ctx.clearRect(0, 0, this.#cvs.width, this.#cvs.height);
  }
} // End of TSpriteCanvas class

/* 
 Lag en klasse TSprite med en konstruktør som tar inn et TSpriteCanvas-objekt og et spriteInfo-objekt.
*/

class TSprite {
  // spcvs, spi
  #spcvs;
  #spi;
  constructor(aSpriteCanvas, aSpriteInfo){
    this.#spcvs = aSpriteCanvas;
    this.#spi = aSpriteInfo;
  }

  draw(){
    this.#spcvs.drawSprite(this.#spi)
  }


} //End of TSprite class


export default {
  /**
   * @class TSpriteCanvas
   * @description A class that manage sprite canvas for lading sprite sheets.
   * @param {HTMLCanvasElement} aCanvas - The canvas element to use.
   * @function loadSpriteSheet - Loads a sprite sheet image.
   * @param {string} aFileName - The file name of the sprite sheet image.
   * @param {function} aLoadedFinal - A callback function to call when the image is done loading.
   */
  TSpriteCanvas: TSpriteCanvas,
};
