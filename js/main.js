import { renderThumbnails } from './thumbnails.js';
import { savePhotos } from './show-big-photo/photo-state.js';
import {setUserFormSumbit} from './loading-new-photo/loading-module.js';
import {getData} from './utils/api.js';
import {errorLoadData} from './utils/util.js';


getData()
  .then((photos) => {
    savePhotos(photos);
    renderThumbnails(photos);
  })
  .catch(() => errorLoadData()
  );

setUserFormSumbit();

