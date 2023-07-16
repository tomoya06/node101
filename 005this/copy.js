Function.prototype.hisApply = function (context) {
  if (typeof context === 'undefined' || context === null) {
    context = window;
  }

  const fn = Symbol();
  context[fn] = this;

  let result;
  if (arguments[1]) {
    result = context[fn](arguments);
  } else {
    result = context[fn]();
  }

  delete context[fn];

  return result;
};

Function.prototype.hisCall = function (context) {
  if (typeof context === 'undefined' || context === null) {
    context = window;
  }

  const fn = Symbol();
  context[fn] = this;

  const result = context[fn](...[...arguments].slice(1));
  delete context[fn];

  return result;
};

Function.prototype.hisBind = function (context) {
  const that = this;
  const args = [...arguments].slice(1);

  return function F(...innerArgs) {
    if (this instanceof F) {
      return new that(...args.concat(innerArgs));
    }

    return that.hisApply(context, args.concat(innerArgs));
  };
};
