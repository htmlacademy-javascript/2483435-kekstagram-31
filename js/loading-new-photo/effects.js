import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const FROM_ZERO_TO_HUNDRED = createSliderOptions();
const FROM_ZERO_TO_ONE = createSliderOptions(0, 1, 0.1);
const FROM_ZERO_TO_THREE = createSliderOptions(0, 3, 0.1);
const FROM_ONE_TO_THREE = createSliderOptions(1, 3, 0.1);

const form = document.querySelector('.img-upload__form');
const effectsList = form.querySelector('.effects__list');
const sliderFieldset = form.querySelector('.img-upload__effect-level');
const sliderElement = form.querySelector('.effect-level__slider');
const previewImage = document.querySelector('.img-upload__preview img');


const filterParameters = {
  none: {
    slider: FROM_ZERO_TO_HUNDRED,
  },

  chrome: {
    slider: FROM_ZERO_TO_ONE,
    filter: (value) => `grayscale(${value})`,
  },

  sepia: {
    slider: FROM_ZERO_TO_ONE,
    filter: (value) => `sepia(${value})`,
  },

  marvin: {
    slider: FROM_ZERO_TO_HUNDRED,
    filter: (value) => `invert(${value}%)`,
  },

  phobos: {
    slider: FROM_ZERO_TO_THREE,
    filter: (value) => `blur(${value}px)`,
  },

  heat: {
    slider: FROM_ONE_TO_THREE,
    filter: (value) => `brightness(${value})`,
  },
};

function createSliderOptions(min = 0, max = 100, step = 1, start = max) {
  return {
    range: {
      min,
      max,
    },
    start,
    step,
  };
}

const customSlider = noUiSlider.create(sliderElement, {
  ...filterParameters.none.slider,
  connect: 'lower',
});

sliderFieldset.classList.add('hidden');

customSlider.on('update', () => {

  const value = Number(customSlider.get());
  const currentFilter = form.effect.value;
  const filter = filterParameters[currentFilter].filter;

  if (filter) {
    previewImage.style.filter = filter(value);
  } else {
    previewImage.style.removeProperty('filter');
  }

  form['effect-level'].value = value;
});

effectsList.addEventListener('change', () => {
  const filterName = form.effect.value;

  const isDefault = filterName === 'none';
  sliderFieldset.classList.toggle('hidden', isDefault);

  const nextOptions = filterParameters[filterName].slider;
  customSlider.updateOptions(nextOptions);

});

const resetSlider = () => {
  sliderFieldset.classList.add('hidden');
  customSlider.updateOptions(filterParameters.none.slider);
};

export { resetSlider };
