"use strict";
/**
 * @library lib2d
 * @description A library for classes that manage 2D graphics.
 */

class TPoint {
  x = 0;
  y = 0;
  constructor(aX, aY){
    this.x = aX;
    this.y = aY;
  }
} // End of TPoint class

class TPosition extends TPoint{
  constructor(aX, aY){
    super(aX, aY);
  }

  clone(){
    return new TPosition(this.x, this.y);
  }

  distanceToPoint(aPoint){
    const dx = this.x - aPoint.x;
    const dy = this.y - aPoint.y;
    return Math.hypot(dx, dy);
  }

}// End of TPosition class

export default {
  /**
   * @class TPoint
   * @description A class representation for x and y point in 2D.
   * @param {number} aX - The x-coordinate.
   * @param {number} aY - The y-coordinate.
   */
  TPoint,
  /**
   * @class TPosition
   * @description A position class for manipulation of point in 2D.
   * @param {number} aX - The x-coordinate.
   * @param {number} aY - The y-coordinate.
   * @extends TPoint
   * @method clone - A method to clone the position object.
   * @method distanceToPoint - A method to calculate the distance to another point.
   */
  TPosition
}