import {
  getRandomElement,
  getRandomInteger,
  createIdGenerator,
} from './util.js';

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

const getPhotoId = createIdGenerator(1, 25, true);
const getCommentId = createIdGenerator(1, 1_000, true);

const generateDescription = () => getRandomElement(PHOTO_DESCRIPTIONS);

const generateMessage = () =>
  Array.from({ length: getRandomInteger(1, 2) }, () =>
    getRandomElement(COMMENT_MESSAGES)
  ).join(' ');

const generateComments = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: generateMessage(),
  name: getRandomElement(USER_NAMES),
});

const createDescriptionImage = () => {
  const id = getPhotoId();

  return {
    id,
    url: `photos/${id}.jpg`,
    description: generateDescription(),
    likes: getRandomInteger(15, 200),
    comments: Array.from({ length: getRandomInteger(0, 30) }, generateComments),
  };
};

const createDescriptionImages = () =>
  Array.from({ length: 25 }, createDescriptionImage);

export { createDescriptionImages };
