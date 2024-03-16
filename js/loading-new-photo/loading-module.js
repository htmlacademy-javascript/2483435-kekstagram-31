const loadingImageButton = document.querySelector('.img-upload__label  img-upload__control');
const editingModal = document.querySelector('.img-upload__overlay');
const loadingImageForm = document.querySelector('.img-upload__input');


loadingImageForm.addEventListener('change', (evt) => {
  evt.preventDefault();
  console.log(1);
  editingModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

