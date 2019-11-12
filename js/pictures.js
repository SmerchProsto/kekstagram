'use strict';

(function () {
  window.onload = function () {
    'use strict';

    var ESC_KEYCODE = 27;
    var ENTER_KEYCODE = 13;

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

    var fullScreen = {
      block: document.querySelector('.big-picture'),
      img: document.querySelector('.big-picture__img img'),
      cancelButton: document.querySelector('.big-picture__cancel'),
      overlay: document.querySelector('big-picture overlay'),
      close: function (eventOnButton) {
        this.block.classList.add('hidden');
        this.cancelButton.removeEventListener('click', onCancelButtonClick);
        document.removeEventListener('click', onEscPress);
      }
    };

    var createPictureElements = function (amountOfDataPictures) {
      var createdPictures = [];
      for (var i = 0; i < amountOfDataPictures; i++) {
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

      var userImageBlocks = document.querySelectorAll('.picture');
      userImageBlocks.forEach(function (imageElement) {
        imageElement.addEventListener('click', function () {
          openFullScreenPicture(imageElement);
        });
      });

    };

    var downloadDataToFullImage = function (picObject) {
      var comments = getComments()

      var commentsImgCount = fullScreen.block.querySelector('.social__comment-count');

      var commentsLoader = fullScreen.block.querySelector('.social__comments-loader');

      commentsImgCount.classList.add('visually-hidden');
      commentsLoader.classList.add('visually-hidden');

      fullScreen.block.querySelector('.likes-count').textContent = picObject.querySelector('.picture__likes').textContent;/* getRandomNumberLike(200) */;

      fullScreen.block.querySelector('.comments-count').textContent = picObject.querySelector('.picture__comments').textContent; /* comments.length */;

      var socialComments = document.querySelector('.social__comments');

      for (var i = 0; i < comments.length; i++) {
        var socialComment = socialComments.querySelector('.social__comment').cloneNode(true);

        socialComment.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(6, true, false) + '.svg';

        socialComment.querySelector('.social__text').textContent = comments[i];

        fragment.appendChild(socialComment);
      }

      fullScreen.block.querySelector('.social__caption').textContent = getDescription();

      socialComments.appendChild(fragment);

    };

    var uploadInput = document.querySelector('#upload-file');

    var editImgForm = {
      block: document.querySelector('.img-upload__overlay'),
      cancelBtn: document.querySelector('#upload-cancel'),
      mainImgContainer: document.querySelector('.img-upload__preview'),
      mainImg: document.querySelector('.img-upload__preview img')
    };

    var openEditImgForm = function () {
      uploadInput.blur();
      editImgForm.block.classList.remove('hidden');
      document.addEventListener('keydown', onEscPress);
    };

    var closeEditImgForm = function () {
      editImgForm.block.classList.add('hidden');
      uploadInput.value = '';
      document.removeEventListener('keydown', onEscPress);
    };


    var onEscPress = function (evt) {
      var isNotAButtons = evt.target.nodeName !== 'INPUT' && evt.target.nodeName !== 'BUTTON' && evt.target.nodeName !== 'TEXTAREA';

      var isEditImgFormOpen = editImgForm.block.classList.contains('hidden');

      var isFullScreenBlockOpen = fullScreen.block.classList.contains('hidden');

      if (evt.keyCode === ESC_KEYCODE && isNotAButtons) {
        if (!isEditImgFormOpen) {
          closeEditImgForm();
        }

        if (!isFullScreenBlockOpen) {
          fullScreen.close();
        }
      } else {
        evt.stopPropagation();
      }
    };

    var onCancelButtonClick = function () {
      fullScreen.close();
    };

    uploadInput.addEventListener('change', function () {
      openEditImgForm();
    });

    editImgForm.cancelBtn.addEventListener('click', function () {
      closeEditImgForm();
    });

    var resizeControl = {
      minus: editImgForm.block.querySelector('.img-upload__scale .scale__control--smaller'),
      valueString: editImgForm.block.querySelector('.img-upload__scale .scale__control--value').value,
      getValueNumber: function () {
        var numberValue = this.valueString.slice(0, -1);
        numberValue -= 0;
        return numberValue;
      },
      plus: editImgForm.block.querySelector('.img-upload__scale .scale__control--bigger')
    };

    var openFullScreenPicture = function (picObject) {
      downloadDataToFullImage(picObject);
      fullScreen.img.src = picObject.querySelector('.picture__img').src;
      fullScreen.block.classList.remove('hidden');
      fullScreen.cancelButton.addEventListener('click', onCancelButtonClick);
      document.addEventListener('keydown', onEscPress);
    };

    var resizeImage = function (minusOrPlus) {
      var PERCENT_RESIZING = 25;

      var imgSizeValue = resizeControl.getValueNumber();
      var isLessThan100 = imgSizeValue + PERCENT_RESIZING <= 100;
      var isMoreThan0 = imgSizeValue - PERCENT_RESIZING > 0;

      if (minusOrPlus === resizeControl.minus && isMoreThan0) {
        imgSizeValue -= PERCENT_RESIZING;
      }

      if (minusOrPlus === resizeControl.plus && isLessThan100) {
        imgSizeValue += PERCENT_RESIZING;
      }
      document.querySelector('.img-upload__scale .scale__control--value').value = imgSizeValue + '%';
      resizeControl.valueString = imgSizeValue + '%';
      editImgForm.mainImgContainer.style.transform = 'scale(' + imgSizeValue / 100 + ')';
    };

    resizeControl.minus.addEventListener('click', function () {
      resizeImage(resizeControl.minus);
    });

    resizeControl.plus.addEventListener('click', function () {
      resizeImage(resizeControl.plus);
    });

    var effectSlider = {
      line: document.querySelector('.effect-level__line'),
      slider: document.querySelector('.img-upload__effect-level'),
      value: document.querySelector('.effect-level__value'),
      range: document.querySelector('.effect-level__pin'),
      indentPercentages: 0
    };

    var effects = [
      document.querySelector('#effect-none'),
      document.querySelector('#effect-chrome'),
      document.querySelector('#effect-sepia'),
      document.querySelector('#effect-marvin'),
      document.querySelector('#effect-phobos'),
      document.querySelector('#effect-heat')
    ];


    var checkFilterClasses = function (constCssClass) {
      var differentCssClasses = editImgForm.mainImg.classList;
      var differentCssClassesLength = differentCssClasses.length;

      var effectsCssClasses = effectSlider.slider.classList;

      if (differentCssClassesLength === 1 && differentCssClasses[0] === constCssClass) {
        return;
      }

      effectSlider.indentPercentages = 0;

      if (constCssClass === 'effects__preview--none') {
        effectsCssClasses.add('hidden');
      } else {
        effectsCssClasses.remove('hidden');
      }

      for (var i = 0; i < differentCssClassesLength; i++) {
        differentCssClasses.remove(differentCssClasses[i]);
      }

      differentCssClasses.add(constCssClass);
    }

    effects[0].addEventListener('click', function () {
      checkFilterClasses('effects__preview--none');
    });

    effects[1].addEventListener('click', function () {
      checkFilterClasses('effects__preview--chrome');
    });

    effects[2].addEventListener('click', function () {
      checkFilterClasses('effects__preview--sepia');
    });

    effects[3].addEventListener('click', function () {
      checkFilterClasses('effects__preview--marvin');
    });

    effects[4].addEventListener('click', function () {
      checkFilterClasses('effects__preview--phobos');
    });

    effects[5].addEventListener('click', function () {
      checkFilterClasses('effects__preview--heat');
    });

    var getSaturatuion = function () {
      var effectLineData = effectSlider.line.getBoundingClientRect();
      var effectRangeData = effectSlider.range.getBoundingClientRect();
      var rangeXInLine = effectRangeData.x - effectLineData.x;

      indentPercentages = Math.round((100 * rangeXInLine) / effectLineData.width);

      console.log(indentPercentages);
    };

    effectSlider.range.addEventListener('mouseup', function () {
      getSaturatuion();
    });

    var main = function (amountOfPictures) {
      createPictureElements(amountOfPictures);
    };

    main(10);
  };
})();