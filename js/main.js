import { mockedPhotos } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { savePhotos } from './photo-state.js';

const photos = mockedPhotos;
savePhotos(photos);

renderThumbnails(photos);
