export const omit = (value, keys) => {
  const clone = { ...value };

  if (Array.isArray(keys)) {
    keys.forEach((key) => {
      delete clone[key];
    });
  } else if (typeof keys === 'string') {
    delete clone[keys];
  } else if (typeof keys === 'function') {
    Object.keys(value).forEach((key) => {
      const isMatched = keys(value[key]);

      if (isMatched) {
        delete clone[key];
      }
    });
  }

  return clone;
};

export const isNil = (value) => value === null || typeof value === 'undefined';
export const getRandomFromArray = (array) =>
  array[Math.floor(Math.random() * array.length)];
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
export const toPairs = (list) => {
  const copy = [...list];
  const result = [];

  while (copy.length > 0) {
    result.push(copy.splice(0, 2));
  }

  return result;
};
