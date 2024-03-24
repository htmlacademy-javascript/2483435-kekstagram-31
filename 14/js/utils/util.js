const ALERT_SHOW_TIME = 5000;

const body = document.body;
const errorLoadDataTemplate = document.querySelector('#data-error').content;


const errorLoadData = () => {
  const errorArea = errorLoadDataTemplate.cloneNode(true);
  body.append(errorArea);

  const errorLoadDataArea = body.querySelector('.data-error');

  setTimeout(() => {
    errorLoadDataArea.remove();
  }, ALERT_SHOW_TIME);
};


export const isUniqueArray = (array) => new Set(array).size === array.length;


export { errorLoadData };
