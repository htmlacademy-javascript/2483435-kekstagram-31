import { createDescriptionImages } from './data.js';
import { openModal } from './showFullPhoto.js';

const createdThumbnails = createDescriptionImages();
const container = document.querySelector('.pictures');
const template = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const newFragment = document.createDocumentFragment();

createdThumbnails.forEach((item) => {
  const thumbnail = template.cloneNode(true);
  thumbnail.href = `/photos/${item.id}.jpg`;
  thumbnail.querySelector('.picture__img').src = item.url;
  thumbnail.querySelector('.picture__img').alt = item.description;
  thumbnail.querySelector('.picture__likes').textContent = item.likes;
  thumbnail.querySelector('.picture__comments').textContent =
    item.comments.length;
  newFragment.append(thumbnail);
});

container.append(newFragment);

const targetThumbnails = container.querySelectorAll('.picture__img');

for (let i = 0; i < targetThumbnails.length; i++) {
  targetThumbnails[i].addEventListener('click', (evt) => {
    evt.preventDefault();
    openModal(createdThumbnails[i]);
  });
}
