// 3.3 A simple modification: Modify the function created in exercise 3.2 so that it emits a tick event immediately after the function is invoked.

import { EventEmitter } from 'events';

const Ticker = (number, callback) => {
  const emitter = new EventEmitter();
  process.nextTick(() => {
    emitter.emit('tick');
  });
  let count = 0;
  const tick = () => {
    count++;
    emitter.emit('tick');
    if (count < number) {
      setTimeout(tick, 50);
    } else {
      callback(count);
    }
  };
  setTimeout(tick, 50);
};
