import EventEmitter from "events";

export default class Time extends EventEmitter {
  constructor() {
    super();
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = {};
    this.delta.milliseconds = 0;
    this.delta.seconds = 0;

    this.update();
  }

  update() {
    const currentTime = Date.now();
    this.delta.milliseconds = currentTime - this.current;
    this.delta.seconds = this.delta.milliseconds * 0.001;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.emit("update");
    window.requestAnimationFrame(() => {
      this.update();
    });
  }
}