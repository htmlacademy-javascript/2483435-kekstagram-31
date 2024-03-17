const slider = document.querySelector('.img-upload__effect-level');
const effectValue = document.querySelector('.effect-level__value');


const filterParameters = new Map([

['filterParameters'] = ([

  effect-none:
}

])






noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
});

slider.noUiSlider.on('update', (...rest) => {
  console.log(rest);
});
