const PHOTO_DESCRIPTIONS =
[
  'поле', 'табличка', 'озеро', 'девушка', 'шоколад',
  'черная машина', 'клубника', 'стакан', 'самолёт', 'ботинки',
  'песок', 'белая машина', 'мясо', 'кот','валенки',
  'небо', 'хор', 'кирпич', 'фонарик', 'пальма',
  'вилка', 'море', 'краб', 'концерт', 'бегемот'
];

const COMMENT_MESSAGES =
[
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const USER_NAMES =
[
  'Иван','Андрей','Дима', 'Анна', 'Ольга',
  'Мария', 'Анастасия', 'Евгений', 'Геннадий', 'Леопольд'
];


const getRandomInteger = (min,max) => {
  const lower = Math.ceil(Math.min(min,max));
  const upper = Math.floor(Math.max(min,max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createIdGenerator = (min, max, uniqueness = false) => {
  const storage = [];

  return () => {
    let randomValue = getRandomInteger(min, max);

    if (uniqueness){
      while (storage.includes(randomValue)) {
        randomValue = getRandomInteger(min, max);
      }
      storage.push(randomValue);
    }
    return randomValue;
  };
};

const generateMessage = (value, storageMessage) => {
  const message = [];
  for(let i = 0; i < value; i++){
    let sentence = getRandomElement(storageMessage);
    while(message.includes(sentence)) {
      sentence = getRandomElement(storageMessage);
    }
    message.push(sentence);
  }
  return message.join(' ');
};

const GENERATION_PARAMETERS = {
  id : createIdGenerator(1,25, true),
  url : createIdGenerator(1,25, true),
  description : createIdGenerator(1,25),
  getCommentId : createIdGenerator(1,1000, true)
};

const generateComments = (value) => {
  const comments = [];
  for (let i = 0; i < value; i ++) {
    comments.push({
      id: GENERATION_PARAMETERS.getCommentId(),
      avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
      message: generateMessage (Math.ceil(Math.random() * 2), COMMENT_MESSAGES),
      name: getRandomElement(USER_NAMES)
    });
  }
  return comments;
};

const createDescriptionImage = () => ({
  id: GENERATION_PARAMETERS.getCommentId(),
  url: `photos/${GENERATION_PARAMETERS.url()}.jpg`,
  description: PHOTO_DESCRIPTIONS[GENERATION_PARAMETERS.description()],
  likes: getRandomInteger(15,200),
  comments: generateComments(getRandomInteger(0,30))
});


createDescriptionImage();
