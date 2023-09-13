
export default class Sizes {
  static instance;
  
  constructor() {
    if (Sizes.instance) {
      return Sizes.instance;
    }
    Sizes.instance = this;

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
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