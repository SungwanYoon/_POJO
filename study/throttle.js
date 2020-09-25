const throttle = (callback, interval) => {
  let timerId;
  let allowEvents = true;

  return function () {
    let context = this;
    let args = arguments;

    if (allowEvents) {
      callback.apply(context, args);
      allowEvents = false;
      timerId = setTimeout(function () {
        allowEvents = true;
      }, interval);
    }
  };
};

const hello = () => {
  console.log("Say hello.");
};

const check = throttle(hello, 1000);
check();
