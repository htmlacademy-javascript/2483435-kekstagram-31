// import { openModal } from './showFullPhoto.js';

const template = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createThumbnail = (photo) => {
  const thumbnail = template.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');

  image.src = photo.url;
  image.alt = photo.description;

  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent =
    photo.comments.length;

  return thumbnail;
};

export const renderThumbnails = (photos) =>
  container.append(...photos.map(createThumbnail));
