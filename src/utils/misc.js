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
