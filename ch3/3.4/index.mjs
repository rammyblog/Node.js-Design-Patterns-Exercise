`3.4 Playing with errors: Modify the function created in exercise 3.3 so that it produces an error if the timestamp at the moment of a tick 
    (including the initial one that we added as part of exercise 3.3) is divisible by 5. 
    Propagate the error using both the callback and the event emitter. 
    Hint: use Date.now() to get the timestamp and the remainder (%) operator to check whether the timestamp is divisible by 5.”`;

import { EventEmitter } from 'events';

const Ticker = (number, callback) => {
  const emitter = new EventEmitter();
  process.nextTick(() => {
    timeStampDivisibleBy5(Date.now())
      ? tickerError(emitter, cb)
      : emitter.emit('tick');
  });
  let count = 0;
  const tick = () => {
    count++;
    timeStampDivisibleBy5(Date.now())
      ? tickerError(emitter, cb)
      : emitter.emit('tick');
    if (count < number) {
      setTimeout(tick, 50);
    } else {
      callback(count);
    }
  };
  setTimeout(tick, 50);
};

const timeStampDivisibleBy5 = (timestamp) => {
  return timestamp % 5 === 0;
};

const tickerError = (emitter, cb) => {
  emitter.emit('error', 'Divisible by 5');
  cb(new Error('Divisible by 5'));
};
