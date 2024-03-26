
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


export { isUniqueArray, getTemplate };
