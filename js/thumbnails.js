import { createDescriptionImages } from './data.js';
import { openModal } from './showFullPhoto.js';

const createThumbnails = createDescriptionImages();
const container = document.querySelector('.pictures');
const template = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const newFragment = document.createDocumentFragment();

const onClickThumbnails = () => {
  createThumbnails.forEach((item) => {
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

  addEventListener('click', (evt) => {
    if (evt.target.classList.contains('picture__img')) {
      evt.preventDefault();
      console.log(createThumbnails.filter((item) => item.id === Number(evt.target.src.match(/\d+/g)[1])));
      openModal(createThumbnails.filter((item) => item.id === Number(evt.target.src.match(/\d+/g)[1])));
    }
  });
};

onClickThumbnails();

// const targetThumbnails = container.querySelectorAll('.picture__img');

/* for (let i = 0; i < targetThumbnails.length; i++){
  targetThumbnails[i].addEventListener('click', (evt) => {
    evt.preventDefault();
    openModal(createThumbnails[i]);
  });
} */
