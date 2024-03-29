const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};


const getRandomElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const createIdGenerator = (min, max, uniqueness = false) => {
  const storage = [];

  return () => {
    let randomValue = getRandomInteger(min, max);

    if (uniqueness) {
      while (storage.includes(randomValue)) {
        randomValue = getRandomInteger(min, max);
      }
      storage.push(randomValue);
    }
    return randomValue;
  };
};


export { getRandomInteger, getRandomElement, createIdGenerator };
