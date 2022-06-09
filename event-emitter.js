const { EventEmitter } = require("events");

const emitter = new EventEmitter();

emitter.on("test-emmit", () => {
  console.log("Начали слушать");
});

emitter.emit('test-emmit')
