import Pristine from 'pristinejs';
import { isUniqueArray } from '../utils/util.js';

const form = document.querySelector('.img-upload__form');
const hashtags = form.hashtags;
const description = form.description;

const Hashtags = {
  MAX_COUNT: 5,
  MAX_COUNT_ERROR: 'Максимальное количество хэштегов 5',
  FIRST_SYMBOL_ERROR: 'Хэштег должен начинаться с символа #',
  ALLOWED_SYMBOLS: /^#[a-zа-яё0-9]{1,19}$/,
  SYMBOLS_ERROR: 'Хэштег должен состоять только из букв и чисел',
  MIN_LENGTH: 2,
  MIN_LENGTH_ERROR: 'Хэштег не может состоять только из #',
  MAX_LENGTH: 20,
  MAX_LENGTH_ERROR: 'Максимальная длина хэштега 20 символов',
  REUSE_HASHTAGS_ERROR: 'Хэштеги повторяются',
};

const Description = {
  MAX_LENGTH: 140,
};

let errorMessage = '';

const validateHashtags = (value) => {
  if (!value.length) {
    return true;
  }

  const tags = value
    .trim()
    .toLowerCase()
    .split(/\s+(?=#)/);

  if (tags.length > Hashtags.MAX_COUNT) {
    errorMessage = Hashtags.MAX_COUNT_ERROR;
    return false;
  }

  if (!isUniqueArray(tags)) {
    errorMessage = Hashtags.REUSE_HASHTAGS_ERROR;
    return false;
  }

  return tags.every((tag) => {
    if (tag[0] !== '#') {
      errorMessage = Hashtags.FIRST_SYMBOL_ERROR;
      return false;
    }

    if (tag === '#') {
      errorMessage = Hashtags.MIN_LENGTH_ERROR;
      return false;
    }

    if (tag.length > Hashtags.MAX_LENGTH) {
      errorMessage = Hashtags.MAX_LENGTH_ERROR;
      return false;
    }

    if (!Hashtags.ALLOWED_SYMBOLS.test(tag)) {
      errorMessage = Hashtags.SYMBOLS_ERROR;
      return false;
    }

    return true;
  });
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error',
});

pristine.addValidator(hashtags, validateHashtags, () => errorMessage);

pristine.addValidator(
  description,
  (value) => value.length <= Description.MAX_LENGTH,
  `Максимальная длина комментария ${Description.MAX_LENGTH} символов`
);

const validate = () => pristine.validate();
const resetValidation = () => pristine.reset();


export { validate, resetValidation };
