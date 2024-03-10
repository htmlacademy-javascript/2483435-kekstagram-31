import { createDescriptionImages } from './data.js';
import { openModal } from './showFullPhoto.js';

const createThumbnails = createDescriptionImages();
const container = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');
const newFragment = document.createDocumentFragment();

createThumbnails.forEach(({ id, url, description, likes, comments }) => {
  const thumbnail = template.cloneNode(true);
  thumbnail.href = `/photos/${id}.jpg`;
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  newFragment.append(thumbnail);
});

container.append(newFragment);


const targetThumbnails = container.querySelectorAll('.picture__img');

for (let i = 0; i < targetThumbnails.length; i++){
  targetThumbnails[i].addEventListener('click', (evt) => {
    evt.preventDefault();
    openModal(createThumbnails[i]);
  });
}
