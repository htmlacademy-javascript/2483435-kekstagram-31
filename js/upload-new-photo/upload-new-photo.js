const FILE_TYPES = ['.jpg', '.jpeg', '.png'];

const photoPreview = document.querySelector('.img-upload__preview img');
const photoPreviewEffects = document.querySelectorAll('.effects__preview');

const updatePhoto = (file) => {
  const url = URL.createObjectURL(file);
  photoPreview.src = url;
  photoPreviewEffects.forEach(
    (it) => (it.style.backgroundImage = `url(${url})`)
  );
};

const validateExt = (fileName) => {
  fileName = fileName.toLowerCase();
  return FILE_TYPES.some((ext) => fileName.endsWith(ext));
};

export const parsePhoto = (file) => {
  if (validateExt(file.name)) {
    updatePhoto(file);
    return true;
  }

  return false;
};
