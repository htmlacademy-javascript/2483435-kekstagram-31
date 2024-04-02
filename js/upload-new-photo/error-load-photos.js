import { getTemplate } from '../utils/util.js';

const ALERT_SHOW_TIME = 5_000;

const body = document.body;
const errorLoadDataTemplate = getTemplate('data-error');

const errorLoadPhotos = () => {
  const errorArea = errorLoadDataTemplate.cloneNode(true);
  body.append(errorArea);

  setTimeout(() => {
    errorArea.remove();
  }, ALERT_SHOW_TIME);
};

export { errorLoadPhotos };
