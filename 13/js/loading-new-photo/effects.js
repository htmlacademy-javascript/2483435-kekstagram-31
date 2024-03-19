const form = document.querySelector('.img-upload__form');
const sliderElement = document.querySelector('.img-upload__effect-level');
const effectValue = document.querySelector('.effect-level__value');
const previewImage = document.querySelector('.img-upload__preview');

const FROM_ZERO_TO_HUNDRED = createSlider();
const FROM_ZERO_TO_ONE = createSlider(0, 1, 0.1);
const FROM_ZERO_TO_THREE = createSlider(0, 3, 0.1);
const FROM_ONE_TO_THREE = createSlider(1, 3, 0.1);


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
    filter: (value) => `invert(${value}px)`,
  },

  heat: {
    slider: FROM_ONE_TO_THREE,
    filter: function(value) { `invert(${value}px)`},
  },
};

const applyFilter = (currentFilter) => {
  if (currentFilter === 'none') {
    sliderElement.noUiSlider.updateOptions(createSlider());
    sliderElement.classList.add('hidden');
    return;
  }

  sliderElement.classList.remove('hidden');
  const currentFilterParameters = filterParameters[currentFilter];
  const slider = currentFilterParameters.slider;
  console.log(currentFilterParameters.filter);
  const filterField = currentFilterParameters.filter;
  sliderElement.noUiSlider.updateOptions(slider);


  effectValue.value = (Number(sliderElement.noUiSlider.get()));

  previewImage.style = 'filterField';

};


function createSlider(min = 0, max = 100, step = 1, start = max) {
  return {
    range: {
      min,
      max,
    },
    start,
    step,
  };
}

form.addEventListener('click', (evt) => {
  const filter = evt.target;
  if (filter.checked) {
    const currentFilter = filter.id.split('-')[1];
    applyFilter(currentFilter);
  }
});

export { createSlider };
