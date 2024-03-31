const getTemplate = (id) => {
  const template = document.getElementById(id);

  if (!template) {
    throw new Error('Is not found');
  }

  if (!(template instanceof HTMLTemplateElement)) {
    throw new Error(`${id} is not template element`);
  }

  return template.content.firstElementChild;
};

const isUniqueArray = (array) => new Set(array).size === array.length;

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { isUniqueArray, getTemplate, debounce };
