import { createDescriptionImages } from './data.js';


const container = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');
const newFragment = document.createDocumentFragment();

Array.from(createDescriptionImages).forEach(({id, url, description, likes, comments}) => {
  const thumbnail = template.cloneNode(true);
  thumbnail.href = `/photos/${id}.jpg`;
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  newFragment.append(thumbnail);
});

container.append(newFragment);

