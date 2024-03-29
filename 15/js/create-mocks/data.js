import {
  getRandomElement,
  getRandomInteger,
  createIdGenerator,
} from '../utils/random-values.js';

const AMOUNT_PHOTOS = 25;

const RangeIdOfPhotos = {
  MIN: 1,
  MAX: 25,
};

const RangeIdOfComments = {
  MIN: 1,
  MAX: 1000,
};

const RangeNumberOfAvatar = {
  MIN: 1,
  MAX: 6,
};

const RangeNumberOfLikes = {
  MIN: 15,
  MAX: 200,
};

const RangeNumberOfComments = {
  MIN: 0,
  MAX: 30,
};

const PHOTO_DESCRIPTIONS = [
  'поле',
  'табличка',
  'озеро',
  'девушка',
  'шоколад',
  'черная машина',
  'клубника',
  'стакан',
  'самолёт',
  'ботинки',
  'песок',
  'белая машина',
  'мясо',
  'кот',
  'валенки',
  'небо',
  'хор',
  'кирпич',
  'фонарик',
  'пальма',
  'вилка',
  'море',
  'краб',
  'концерт',
  'бегемот',
];

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const USER_NAMES = [
  'Иван',
  'Андрей',
  'Дима',
  'Анна',
  'Ольга',
  'Мария',
  'Анастасия',
  'Евгений',
  'Геннадий',
  'Леопольд',
];

const getPhotoId = createIdGenerator(
  RangeIdOfPhotos.MIN,
  RangeIdOfPhotos.MAX,
  true
);
const getCommentId = createIdGenerator(
  RangeIdOfComments.MIN,
  RangeIdOfComments.MAX,
  true
);

const generateDescription = () => getRandomElement(PHOTO_DESCRIPTIONS);

const generateMessage = () =>
  Array.from({ length: getRandomInteger(1, 2) }, () =>
    getRandomElement(COMMENT_MESSAGES)
  ).join(' ');

const generateComments = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomInteger(
    RangeNumberOfAvatar.MIN,
    RangeNumberOfAvatar.MAX
  )}.svg`,
  message: generateMessage(),
  name: getRandomElement(USER_NAMES),
});

const mockedPhoto = () => {
  const id = getPhotoId();

  return {
    id,
    url: `photos/${id}.jpg`,
    description: generateDescription(),
    likes: getRandomInteger(RangeNumberOfLikes.MIN, RangeNumberOfLikes.MAX),
    comments: Array.from(
      {
        length: getRandomInteger(
          RangeNumberOfComments.MIN,
          RangeNumberOfComments.MAX
        ),
      },
      generateComments
    ),
  };
};

const mockedPhotos = () => Array.from({ length: AMOUNT_PHOTOS }, mockedPhoto);

export { mockedPhotos };
