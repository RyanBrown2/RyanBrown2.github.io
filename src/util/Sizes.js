import EventEmitter from "events";

export default class Sizes extends EventEmitter {
  static instance;
  
  constructor() {
    if (Sizes.instance) {
      return Sizes.instance;
    }
    super();
    Sizes.instance = this;

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspectRatio = this.width / this.height;

    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.aspectRatio = this.width / this.height;
      this.emit('resize');
    });
  }

  /**
   * Get the position of pixel coordinates as a percentage of the screen
   * Note: top left is (0, 0), bottom right is (1, 1)
   * @param {number} x 
   * @param {number} y 
   */
  getPosPercent(x, y) {
    return {
      x: x / this.width,
      y: y / this.height,
    }
  }
}