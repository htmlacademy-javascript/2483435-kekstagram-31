import { renderThumbnails, clearThumbnails } from '../thumbnails.js';
import { debounce } from '../utils/util.js';
import { idToFilter } from './filter-options.js';

const filtersForm = document.querySelector('.img-filters');
const filterItems = filtersForm.querySelector('.img-filters__form');

let activeFilter = filtersForm.querySelector('.img-filters__button--active');

const switchButtons = (newActive) => {
  activeFilter.classList.remove('img-filters__button--active');
  newActive.classList.add('img-filters__button--active');
  activeFilter = newActive;
};

const sortPhotos = (filterId, photos) => {
  clearThumbnails();

  let sortedPhotos = photos;

  if (filterId in idToFilter) {
    const sort = idToFilter[filterId];
    sortedPhotos = sort(photos);
  }

  renderThumbnails(sortedPhotos);
};

const debouncedSortPhotos = debounce(sortPhotos);

const handleSelectFilters = (photos) => {
  filtersForm.classList.remove('img-filters--inactive');

  filterItems.addEventListener('click', (evt) => {
    const newFilter = evt.target;
    if (activeFilter !== newFilter) {
      switchButtons(newFilter);
      debouncedSortPhotos(newFilter.id, photos);
    }
  });
};

export { handleSelectFilters };
