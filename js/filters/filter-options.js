import { getRandomInteger } from '../utils/random-values.js';

const Filters = {
  DEFAULT_FILTER: 'filter-default',
  RANDOM_FILTER: 'filter-random',
  DISCUSSED_FILTER: 'filter-discussed',
};

const RandomFilterParamters = {
  MIN: 0,
  MAX: 10,
};

const defaultFilter = (photos) => photos;

const randomFilter = (photos) => {
  const newPhotos = photos;
  const min = 0;

  for (let i = newPhotos.length - 1; i > 0; i--) {
    const max = i + 1;
    const j = getRandomInteger(min, max);
    [newPhotos[i], newPhotos[j]] = [newPhotos[j], newPhotos[i]];
  }

  return newPhotos.slice(RandomFilterParamters.MIN, RandomFilterParamters.MAX);
};

const discussedFilter = (photos) => {
  const newPhotos = photos;

  const getCommentsAmount = (photo) => photo.comments.length;

  const discussedSort = (photoA, photoB) => {
    const commentsA = getCommentsAmount(photoA);
    const commentsB = getCommentsAmount(photoB);

    return commentsB - commentsA;
  };

  return newPhotos.sort(discussedSort);
};

export { Filters, defaultFilter, randomFilter, discussedFilter };
