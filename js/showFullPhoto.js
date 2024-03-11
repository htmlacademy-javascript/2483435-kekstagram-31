import { isEscapeKey } from './util.js';

const bigPhotoModal = document.querySelector('.big-picture');
const commentsList = bigPhotoModal.querySelector('.social__comments');
const commentsListItem = commentsList.querySelector('.social__comment');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const closeModalButton = document.querySelector('.big-picture__cancel');

const showBigPhoto = ({ url, likes, comments, description }) => {
  bigPhotoModal.querySelector('.big-picture__img img').src = url;
  bigPhotoModal.querySelector('.likes-count').textContent = likes;
  bigPhotoModal.querySelector('.social__comment-shown-count').textContent = comments.length;
  bigPhotoModal.querySelector('.social__comment-total-count').textContent =
    comments.length;
  bigPhotoModal.querySelector('.social__caption').textContent = description;
};

const showBigPhotoComments = (comments) => {
  commentsList.innerHTML = '';
  comments.forEach(({ message, avatar, name }) => {
    const currentComment = commentsListItem.cloneNode(true);
    const userOfCurrentComment =
      currentComment.querySelector('.social__picture');
    currentComment.querySelector('.social__text').textContent = message;
    userOfCurrentComment.src = avatar;
    userOfCurrentComment.alt = name;
    commentsList.append(currentComment);
  });
};

const renderBigPhoto = (targetThumbnail) => {
  bigPhotoModal.classList.remove('hidden');
  showBigPhoto(targetThumbnail);
  showBigPhotoComments(targetThumbnail.comments);
};

const hideBlocks = () => {
  commentsCount.classList.toggle('hidden');
  commentsLoader.classList.toggle('hidden');
};

const blockScrolling = () => {
  document.body.classList.toggle('modal-open');
};

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

function closeModal() {
  bigPhotoModal.classList.add('hidden');
  hideBlocks();
  blockScrolling();
  document.removeEventListener('keydown', onDocumentKeyDown);
}

function openModal(targetThumbnail) {
  renderBigPhoto(targetThumbnail);
  hideBlocks();
  blockScrolling();
  closeModalButton.addEventListener('click', () => closeModal());
  document.addEventListener('keydown', onDocumentKeyDown);
}

export { openModal };
