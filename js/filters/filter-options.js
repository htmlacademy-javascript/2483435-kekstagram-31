import { sortRandom } from '../utils/random-values.js';

const Filters = {
  DEFAULT_FILTER: 'filter-default',
  RANDOM_FILTER: 'filter-random',
  DISCUSSED_FILTER: 'filter-discussed',
};

const RandomFilterParams = {
  MIN: 0,
  MAX: 10,
};

const filterRandom = (photos) =>
  photos
    .toSorted(sortRandom)
    .slice(RandomFilterParams.MIN, RandomFilterParams.MAX);

const getCommentsAmount = (photo) => photo.comments.length;

const sortByComments = (photoA, photoB) => {
  const commentsA = getCommentsAmount(photoA);
  const commentsB = getCommentsAmount(photoB);

  return commentsB - commentsA;
};

const sortDiscussed = (photos) => photos.toSorted(sortByComments);

const idToFilter = {
  [Filters.RANDOM_FILTER]: filterRandom,
  [Filters.DISCUSSED_FILTER]: sortDiscussed,
};

export { idToFilter };
