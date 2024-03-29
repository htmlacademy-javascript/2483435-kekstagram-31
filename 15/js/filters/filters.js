import { renderThumbnails } from '../thumbnails.js';
import { clearThumbnails } from './clear-thumbnails.js';
import {
  Filters,
  defaultFilter,
  randomFilter,
  discussedFilter,
} from './filter-options.js';
import { debounce } from '../utils/util.js';

const filtersForm = document.querySelector('.img-filters');
const filterItems = document.querySelector('.img-filters__form');

const handleSelectFilters = (photos) => {
  filtersForm.classList.remove('img-filters--inactive');

  let sortedPhotos = [];

  filterItems.addEventListener('click', (evt) => {
    const activeFilter = filtersForm.querySelector(
      '.img-filters__button--active'
    );
    const newFilter = evt.target;

    if (newFilter !== activeFilter) {
      newFilter.classList.add('img-filters__button--active');
      activeFilter.classList.remove('img-filters__button--active');
    }
  });

  filterItems.addEventListener(
    'click',
    debounce((evt) => {
      const newFilter = evt.target;

      if (newFilter.id === Filters.DEFAULT_FILTER) {
        sortedPhotos = () => defaultFilter(photos);
      }

      if (newFilter.id === Filters.RANDOM_FILTER) {
        sortedPhotos = () => randomFilter(photos);
      }

      if (newFilter.id === Filters.DISCUSSED_FILTER) {
        sortedPhotos = () => discussedFilter(photos);
      }

      const filteredPhotos = sortedPhotos();
      clearThumbnails();
      renderThumbnails(filteredPhotos);
    })
  );
};

export { handleSelectFilters };
