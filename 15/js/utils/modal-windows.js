const isEscapeKey = (evt) => evt.key === 'Escape';

const toggleModalClasses = (wrapper, willBeOpened = true) => {
  wrapper.classList.toggle('hidden', !willBeOpened);
  document.body.classList.toggle('modal-open', willBeOpened);
};

export { isEscapeKey, toggleModalClasses };
