var getRandomNumber = function (maxNumber, includeMaxNumber, includeZero) {
  var randomNumber = Math.round(Math.random() * maxNumber);
  if (includeMaxNumber && includeZero) {
    return randomNumber;

  } else if (includeMaxNumber && !includeZero) {

    while (randomNumber === 0) {
      randomNumber = Math.round(Math.random() * maxNumber);
    }

    return randomNumber;

  } else if (!includeMaxNumber && !includeZero) {

    randomNumber = Math.floor(Math.random() * maxNumber);

    while (randomNumber === 0) {
      randomNumber = Math.floor(Math.random() * maxNumber);
    }

    return randomNumber;

  } else if (!includeMaxNumber && includeZero) {

    randomNumber = Math.floor(Math.random() * maxNumber);

    return randomNumber;
  }
};

var getRandomUrl = function (numberOfAddress) {
  return 'photos/' + getRandomNumber(numberOfAddress, true, false) + '.jpg';
};

var getRandomNumberLike = function (maxNumberLike) {
  var randomNumberLike = getRandomNumber(maxNumberLike, true, true);
  return randomNumberLike < 15 ? randomNumberLike += (15 - randomNumberLike) : randomNumberLike;
};

var getComments = function () {
  var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var finalComments = [];

  var usingIndexComments = [];


  for (var i = 0; i < comments.length; i++) {
    if (usingIndexComments.length === comments.length) {
      break;
    }

    var comment = getRandomNumber(comments.length, false, true);

    // Проверка комментариев на повторы
    for (var j = 0; j < usingIndexComments.length; j++) {
      if (comment === usingIndexComments[j]) {
        comment = getRandomNumber(comments.length, false, true);
        j = 0;
      }
    }

    var newRandomComment = comments[comment];
    usingIndexComments.push(comment);

    finalComments.push(newRandomComment);
  }

  return finalComments;
};

var getDescription = function () {
  var descriptions = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  return descriptions[getRandomNumber(descriptions.length, false, true)];
}

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var fragment = document.createDocumentFragment();

var pictureList = document.querySelector('.pictures');

var fullScreenImg = document.querySelector('.big-picture');

var createPictureElements = function (amoutOfDataPictures) {
  createdPictures = [];
  for (var i = 0; i < amoutOfDataPictures; i++) {
    createdPictures.push(
      {
        url: getRandomUrl(25),
        likes: getRandomNumberLike(200),
        comments: getComments(),
        description: getDescription()
      }
    );

    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = createdPictures[i].url;

    pictureElement.querySelector('.picture__comments').textContent = createdPictures[i].comments.length;

    pictureElement.querySelector('.picture__likes').textContent = createdPictures[i].likes;

    fragment.appendChild(pictureElement);
  }

  pictureList.appendChild(fragment);
};

var downloadDataToFullImage = function () {
  var comments = getComments()

  var commentsImgCount = fullScreenImg.querySelector('.social__comment-count');

  var commentsLoader = fullScreenImg.querySelector('.social__comments-loader');

  commentsImgCount.classList.add('visually-hidden');
  commentsLoader.classList.add('visually-hidden');

  fullScreenImg.querySelector('.likes-count').textContent = getRandomNumberLike(200);

  fullScreenImg.querySelector('.comments-count').textContent = comments.length;

  var socialComments = document.querySelector('.social__comments');

  for (var i = 0; i < comments.length; i++) {
    var socialComment = socialComments.querySelector('.social__comment').cloneNode(true);

    socialComment.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(6, true, false) + '.svg';

    socialComment.querySelector('.social__text').textContent = comments[i];

    fragment.appendChild(socialComment);
  }

  fullScreenImg.querySelector('.social__caption').textContent = getDescription();

  socialComments.appendChild(fragment);

};

var openFullScreenPicture = function () {
  fullScreenImg.classList.remove('hidden');
};

createPictureElements(3);