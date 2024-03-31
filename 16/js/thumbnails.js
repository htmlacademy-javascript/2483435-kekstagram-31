import { showBigPhoto } from './show-big-photo/show-big-photo.js';
import { getPhotoById } from './show-big-photo/photo-state.js';
import { getTemplate } from './utils/util.js';

const template = getTemplate('picture');
const container = document.querySelector('.pictures');

const createThumbnail = (photo) => {
  const thumbnail = template.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');

  image.src = photo.url;
  image.alt = photo.description;

  thumbnail.href = `${photo.id}`;
  thumbnail.dataset.id = photo.id;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent =
    photo.comments.length;

  return thumbnail;
};

const renderThumbnails = (photos) =>
  container.append(...photos.map(createThumbnail));

container.addEventListener('click', (evt) => {
  const thumbnail = evt.target.closest('.picture');
  if (thumbnail) {
    evt.preventDefault();
    const id = Number(thumbnail.dataset.id);
    const photo = getPhotoById(id);
    showBigPhoto (photo);
  }
});

const clearThumbnails = () => {

  Array.prototype.slice
    .call(container.getElementsByTagName('a'))
    .forEach((item) => {
      item.remove();
    });

};


export { renderThumbnails, clearThumbnails };
