const PACK_SIZE = 5;

const shownCountComments = document.querySelector(
  '.social__comment-shown-count'
);
const totalCountComments = document.querySelector(
  '.social__comment-total-count'
);
const commentsList = document.querySelector('.social__comments');
const commentsListItem = commentsList.querySelector('.social__comment');
const commentsLoaderButton = document.querySelector('.comments-loader');

let shownComments = 0;

const createComment = (comment) => {
  const item = commentsListItem.cloneNode(true);
  const img = item.querySelector('.social__picture');

  img.src = comment.avatar;
  img.alt = comment.name;
  item.querySelector('.social__text').textContent = comment.message;

  return item;
};



export const renderComments = (comments) => {
  commentsList.innerHTML = '';

  totalCountComments.textContent = comments.length;

  commentsLoaderButton.addEventListener('click', () => {

    let endOfSlice = shownComments + PACK_SIZE;
    const isAllCommentsShown = endOfSlice >= comments.length;
    endOfSlice = isAllCommentsShown ? comments.length : endOfSlice;

    const commentsSlice = comments.slice(shownComments, endOfSlice);

    commentsList.append(...commentsSlice.map(createComment));

    shownCountComments.textContent = endOfSlice;

    shownComments = commentsSlice.length;

    commentsLoaderButton.classList.toggle('hidden', isAllCommentsShown);

  });

  commentsLoaderButton.click();
};
