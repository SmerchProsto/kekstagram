var pictures = [];

var getRandomNumber = function (maxNumber, include) {
  if (include) {
    return Math.round(Math.random() * maxNumber);
  } else {
    return Math.floor(Math.random() * maxNumber);
  }
};

var getRandomUrl = function (numberOfAddress) {
  return 'photos/' + getRandomNumber(numberOfAddress, true) + '.jpg';
};

var getRandomNumberLike = function (maxNumberLike) {
  var randomNumber = getRandomNumber(maxNumberLike, true);
  return randomNumber < 15 ? randomNumber += (15 - randomNumber) : randomNumber;
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
    var comment1 = getRandomNumber(comments.length);
    var comment2 = getRandomNumber(comments.length);

    while (comment1 === comment2) {
      comment1 = getRandomNumber(comments.length);
      comment2 = getRandomNumber(comments.length)
    }

    // Проверка комментариев на повторы
    for (var j = 0; j < usingIndexComments.length; j++) {
      while (comment1 === usingIndexComments[j] || comment2 === usingIndexComments[j] || comment1 === comment2) {
        if (comment1 === usingIndexComments[j]) {
          comment1 = getRandomNumber(comments.length);
        }

        if (comment2 === usingIndexComments[j]) {
          comment2 = getRandomNumber(comments.length);
        }

        if (comment1 === comment2) {
          comment1 = getRandomNumber(comments.length);
          comment2 = getRandomNumber(comments.length);
        }

        j = -1;
      }
    }

    var newRandomComment = comments[comment1] + ' ' + comments[comment2];
    usingIndexComments.push(comment1);
    usingIndexComments.push(comment2);

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

  return descriptions[getRandomNumber(descriptions.length)];
}

var getPicturesData = function (amoutOfDataPictures) {
  for (var i = 0; i < amoutOfDataPictures; i++) {
    pictures.push(
      {
        url: getRandomUrl(25),
        likes: getRandomNumberLike(200),
        comments: getComments(),
        description: getDescription()
      }
    );
  }
};

getPicturesData(5);