import { getTemplate } from '../utils/util.js';

const ALERT_SHOW_TIME = 5000;

const body = document.body;
const errorLoadDataTemplate = getTemplate('data-error');

const errorLoadData = () => {
  const errorArea = errorLoadDataTemplate.cloneNode(true);
  body.append(errorArea);

  setTimeout(() => {
    errorArea.remove();
  }, ALERT_SHOW_TIME);
};

export {errorLoadData };
