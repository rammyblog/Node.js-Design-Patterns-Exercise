`3.2 Ticker: Write a function that accepts a number and a callback as the arguments. 
The function will return an EventEmitter that emits an event called tick every 50 milliseconds until the number of milliseconds is passed from the invocation of the function. 
The function will also call the callback when the number of milliseconds has passed, providing, as the result, the total count of tick events emitted.
 Hint: you can use setTimeout() to schedule another setTimeout() recursively.`;

import { EventEmitter } from 'events';

const Ticker = (number, callback) => {
  const emitter = new EventEmitter();
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
