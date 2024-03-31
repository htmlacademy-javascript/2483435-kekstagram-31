const shownCountComments = document.querySelector('.social__comment-shown-count');
const totalCountComments = document.querySelector('.social__comment-total-count');
const commentsList = document.querySelector('.social__comments');
const commentsListItem = commentsList.querySelector('.social__comment');
const commentsLoaderButton = document.querySelector('.comments-loader');

const PACK_SIZE = 5;

let currentComments = [];


const createComment = (comment) => {
  const item = commentsListItem.cloneNode(true);
  const img = item.querySelector('.social__picture');

  img.src = comment.avatar;
  img.alt = comment.name;
  item.querySelector('.social__text').textContent = comment.message;

  return item;
};

const onCommentsLoaderButtonClick = () => {
  const shownComments = commentsList.childElementCount;
  let endOfSlice = shownComments + PACK_SIZE;

  const isAllCommentsShown = endOfSlice >= currentComments.length;
  endOfSlice = isAllCommentsShown ? currentComments.length : endOfSlice;

  const commentsSlice = currentComments.slice(shownComments, endOfSlice);

  commentsList.append(...commentsSlice.map(createComment));

  shownCountComments.textContent = endOfSlice;

  commentsLoaderButton.classList.toggle('hidden', isAllCommentsShown);
};

commentsLoaderButton.addEventListener('click', onCommentsLoaderButtonClick);

export const renderComments = (comments) => {
  commentsList.innerHTML = '';
  totalCountComments.textContent = comments.length;
  currentComments = comments;

  commentsLoaderButton.click();
};
