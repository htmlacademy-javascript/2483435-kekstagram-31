const ScaleParameters = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
  PERCENT_COEFFICIENT: 100,
};

const form = document.querySelector('.img-upload__form');
const zoomDownButton = form.querySelector('.scale__control--smaller');
const zoomUpButton = form.querySelector('.scale__control--bigger');
const scaleValue = form.scale;
const previewImage = document.querySelector('.img-upload__preview img');
const slider = document.querySelector('.img-upload__effect-level');


let currentScale = parseInt(scaleValue.value, 10);

const setScale = (value) => {
  const scaleField = value / ScaleParameters.PERCENT_COEFFICIENT;
  previewImage.style.transform = `scale(${scaleField})`;
  scaleValue.value = `${value}%`;
  currentScale = value;
};

zoomDownButton.addEventListener('click', () => {
  if (currentScale <= ScaleParameters.MIN) {
    return;
  }

  setScale(currentScale - ScaleParameters.STEP);
});

zoomUpButton.addEventListener('click', () => {
  if (currentScale >= ScaleParameters.MAX) {
    return;
  }

  setScale(currentScale + ScaleParameters.STEP);
});


export const resetScale = () => previewImage.style.removeProperty('transform');
