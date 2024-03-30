const FILE_TYPES = ['.jpg', '.jpeg', '.png'];
const newPhoto = document.querySelector('.img-upload__input');
const photoPreview = document.querySelector(
  '.img-upload__preview'
).firstElementChild;
const photoPreviewEffects = document.querySelectorAll('.effects__preview');

newPhoto.addEventListener('change', () => {
  const file = newPhoto.files[0];
  const fileName = file.name.toLowerCase();
  const fileExt = fileName.split('.').pop();
  const matches = FILE_TYPES.some(() => fileName.endsWith(fileExt));

  if (matches) {
    const url = URL.createObjectURL(file);
    photoPreview.src = url;
    photoPreviewEffects.forEach(
      (it) => (it.style.backgroundImage = `url(${url})`));
  }
});
