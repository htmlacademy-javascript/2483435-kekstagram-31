const scale = document.querySelector('.img-upload__scale');
const zoomOutButton = scale.querySelector('.scale__control--smaller');
const zoomInButton = scale.querySelector('.scale__control--bigger');
const scaleValue = scale.querySelector('.scale__control--value');
const scaleSlider = scale.querySelector('.scale__slider');
const previewImage = document.querySelector('.img-upload__preview');

let scaleField = parseInt(scaleValue.value, 10) / 100;


scale.addEventListener('click', (evt) => {
  const img = previewImage.firstElementChild;
  evt.preventDefault();
  if (evt.target === zoomOutButton) {
    scaleSlider.stepDown();
  }
  if (evt.target === zoomInButton) {
    scaleSlider.stepUp();
  }

  scaleValue.value = `${scaleSlider.value}%`;
  scaleField = parseInt(scaleValue.value, 10) / 100;
  img.style = `transform:scale(${scaleField})`;
});
