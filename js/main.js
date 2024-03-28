import { renderThumbnails } from './thumbnails.js';
import { savePhotos } from './show-big-photo/photo-state.js';
import './loading-new-photo/loading-module.js';
import { getPhotos } from './utils/api.js';
import { errorLoadData } from './loading-new-photo/error-load-photos.js';
import { handleSelectFilters } from './filters/filters.js';

getPhotos()
  .then((photos) => {
    savePhotos(photos);
    renderThumbnails(photos);
    handleSelectFilters(photos);
  })
  .catch(errorLoadData);
