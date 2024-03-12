import { isEscapeKey } from './util.js';

const bigPhotoModal = document.querySelector('.big-picture');
const commentsList = bigPhotoModal.querySelector('.social__comments');
const commentsListItem = commentsList.querySelector('.social__comment');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const closeModalButton = document.querySelector('.big-picture__cancel');
const countShownComments = commentsCount.querySelector(
  '.social__comment-shown-count'
);

const showBigPhoto = ({ url, likes, comments, description }) => {
  bigPhotoModal.querySelector('.big-picture__img img').src = url;
  bigPhotoModal.querySelector('.likes-count').textContent = likes;
  bigPhotoModal.querySelector('.social__comment-shown-count').textContent =
    comments.length < 5 ? comments.length : 5;
  bigPhotoModal.querySelector('.social__comment-total-count').textContent =
    comments.length;
  bigPhotoModal.querySelector('.social__caption').textContent = description;
};

const showBigPhotoComments = (comments) => {
  commentsList.innerHTML = '';
  comments.forEach((item, index) => {
    const currentComment = commentsListItem.cloneNode(true);
    const userOfCurrentComment =
      currentComment.querySelector('.social__picture');
    currentComment.querySelector('.social__text').textContent = item.message;
    userOfCurrentComment.src = item.avatar;
    userOfCurrentComment.alt = item.name;
    if (index > 4) {
      currentComment.classList.add('hidden');
    }
    commentsList.append(currentComment);
  });
  toShowComments();
};

function toShowComments() {
  if (commentsList.children.length <= 5) {
    commentsLoader.classList.add('hidden');
  }

  if (+countShownComments.textContent > commentsList.children.length) {
    countShownComments.textContent = commentsList.children.length;
    commentsLoader.classList.add('hidden');
  }

  for (let i = 0; i < commentsList.children.length; i++) {
    if (i < countShownComments.textContent) {
      commentsList.children[i].classList.remove('hidden');
    }
  }

  if (+countShownComments.textContent >= commentsList.children.length) {
    countShownComments.textContent = commentsList.children.length;
    commentsLoader.classList.add('hidden');
  }
}

commentsLoader.addEventListener('click', (evt) => {
  evt.preventDefault();
  countShownComments.textContent = +countShownComments.textContent + +5;
  toShowComments();
});

const renderBigPhoto = (targetThumbnail) => {
  bigPhotoModal.classList.remove('hidden');
  showBigPhoto(targetThumbnail);
  showBigPhotoComments(targetThumbnail.comments);
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
  commentsLoader.classList.remove('hidden');
  blockScrolling();
  document.removeEventListener('keydown', onDocumentKeyDown);
}

function openModal(targetThumbnail) {
  renderBigPhoto(targetThumbnail);
  blockScrolling();
  closeModalButton.addEventListener('click', closeModal);
  document.addEventListener('keydown', onDocumentKeyDown);
}

export { openModal };
