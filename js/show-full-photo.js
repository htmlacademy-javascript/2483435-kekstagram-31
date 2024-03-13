import { isEscapeKey } from './util.js';
import { renderComments } from './comments.js';

const bigPhotoModal = document.querySelector('.big-picture');
const closeModalButton = document.querySelector('.big-picture__cancel');

const showBigPhoto = ({ url, likes, description }) => {
  bigPhotoModal.querySelector('.big-picture__img img').src = url;
  bigPhotoModal.querySelector('.likes-count').textContent = likes;

  bigPhotoModal.querySelector('.social__caption').textContent = description;
};

const toggleClasses = (willBeOpened = true) => {
  bigPhotoModal.classList.toggle('hidden', !willBeOpened);
  // commentsLoader.classList.toggle('hidden', !willBeOpened);
  document.body.classList.toggle('modal-open', willBeOpened);
};

// commentsLoader.addEventListener('click', (evt) => {
//   evt.preventDefault();
//   countShownComments.textContent = +countShownComments.textContent + +5;
//   toShowComments();
// });

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

function closeModal() {
  toggleClasses(false);
  document.removeEventListener('keydown', onDocumentKeyDown);
}

function openModal(photo) {
  toggleClasses(true);
  showBigPhoto(photo);
  renderComments(photo.comments);
  document.addEventListener('keydown', onDocumentKeyDown);
}

const onCloseModalButtonClick = closeModal;
closeModalButton.addEventListener('click', onCloseModalButtonClick);
export { openModal };
