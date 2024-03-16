const isEscapeKey = (evt) => evt.key === 'Escape';


const showModal = (modal, closeButton) => {

  const toggleClasses = (willBeOpened = true) => {
    modal.classList.toggle('hidden', !willBeOpened);
    document.body.classList.toggle('modal-open', willBeOpened);
  };

  const onDocumentKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeModal();
    }
  };

  function openModal() {
    toggleClasses(true);
    document.addEventListener('keydown', onDocumentKeyDown);
  }

  function closeModal() {
    toggleClasses(false);
    document.removeEventListener('keydown', onDocumentKeyDown);
  }

  const onCloseModalButtonClick = closeModal;
  closeButton.addEventListener('click', onCloseModalButtonClick);

  return openModal();
};

export { showModal };
