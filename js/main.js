import { mockedPhotos } from './create-mocks/data.js';
import { renderThumbnails } from './thumbnails.js';
import { savePhotos } from './show-big-photo/photo-state.js';
import './loading-new-photo/loading-module.js';
const photos = mockedPhotos();
savePhotos(photos);

renderThumbnails(photos);
