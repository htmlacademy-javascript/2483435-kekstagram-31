import { renderThumbnails } from '../thumbnails.js';
import { clearThumbnails } from './clear-thumbnails.js';
import { Filters, defaultFilter, randomFilter, discussedFilter} from './filter-options.js';

const filtersForm = document.querySelector('.img-filters');
const filterItems = document.querySelector('.img-filters__form');

filtersForm.classList.remove('img-filters--inactive');


const handleSelectFilters = (photos) => {
  let sortedPhotos = [];

  filterItems.addEventListener('click', (evt) => {

    clearThumbnails();

    const activeFilter = filtersForm.querySelector(
      '.img-filters__button--active'
    );
    const newFilter = evt.target;

    if (newFilter !== activeFilter) {
      newFilter.classList.add('img-filters__button--active');
      activeFilter.classList.remove('img-filters__button--active');
    }

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
    renderThumbnails(filteredPhotos);
  });
};

export { handleSelectFilters };
