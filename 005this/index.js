Function.prototype.myApply = function (context) {
  if (typeof context === 'undefined' || context === null) {
    context = window;
  }

  const that = Symbol();
  context[that] = this;
  let result;
  if (arguments[1]) {
    result = context[that](arguments[1]);
  } else {
    result = context[that]();
  }
  delete context[that];
  return result;
};

Function.prototype.myCall = function (context) {
  if (typeof context === 'undefined' || context === null) {
    context = window;
  }

  const that = Symbol();
  context[that] = this;
  const result = context[that](...[...arguments].slice(1));
  delete context[that];
  return result;
};

Function.prototype.myBind = function (context) {
  if (typeof context === 'undefined' || context === null) {
    context = window;
  }
  const that = this;
  const args = [...arguments].slice(1);

  return function F() {
    if (this instanceof F) {
      return new that(...args, ...arguments);
    }
    return that.myApply(context, args.concat(...arguments));
  };
};
