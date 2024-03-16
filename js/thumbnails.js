import { openModal } from './show-big-photo/show-modal.js';
import { getPhotoById } from './show-big-photo/photo-state.js';

const template = document
  .querySelector('#picture')
  .content.querySelector('.picture');
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
    openModal(photo);
  }
});

export { renderThumbnails };
