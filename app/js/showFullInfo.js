'use strict';
let showFullInfo = (item) =>{
  $('main').html('');
  let fullProduct = document.createElement('div');
  let fullProductInfo = document.createElement('div');
  $(fullProductInfo).addClass('fullProductInfo');
  let fullAdditionalInfo = document.createElement('div');
  $(fullAdditionalInfo).addClass('fullAdditionalInfo');
  //$('#fullProduct').removeClass('hidden');
  $(fullProduct).append(fullProductInfo);
  $(fullProduct).append(fullAdditionalInfo);
  $('main').append(fullProduct);

  let photoDiv = document.createElement('div');
  let sliderFor = document.createElement('div');
  let sliderNav = document.createElement('div');


  item.images.forEach((path)=>{
    let fullPhoto = document.createElement('img');
    $(fullPhoto).attr('src', path);
    $(sliderFor).append(fullPhoto);

    let fullSmallPhoto = document.createElement('img');
    $(fullSmallPhoto).attr('src', path);
    $(sliderNav).append(fullSmallPhoto);
  });
  $(sliderFor).slick({
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    asNavFor: sliderNav,

  });
  $(sliderNav).slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: sliderFor,
    dots: false,
    centerMode: true,
    focusOnSelect: true,
    centerPadding: 0,

  });
  $(photoDiv).append(sliderFor);
  $(photoDiv).append(sliderNav);


  //let fullPhoto = document.createElement('img');
  //$(fullPhoto).attr('src', item.images[0]);
  //$(photoDiv).append(fullPhoto);
  $(photoDiv).addClass('fullPhotoDiv');
  $(photoDiv).on('click', ()=>{
    //$('#showPhoto').modal('toggle');
    //$('#showPhotoBlock').append(fullPhoto);
  });
  $(fullProductInfo).append(photoDiv);

  let fullInfo = document.createElement('div');
  $(fullInfo).addClass('fullInfo');
  $(fullProductInfo).append(fullInfo);
  let fullTitle = document.createElement('h1');
  $(fullTitle).addClass('fullTitle');
  $(fullTitle).html(item.title);
  $(fullInfo).append(fullTitle);
  let fullArticle = document.createElement('div');
  $(fullArticle).html(`Арт. ${item.articul}`);
  $(fullArticle).addClass('fullArticle');
  $(fullInfo).append(fullArticle);


  let fullPrice = document.createElement('div');
  $(fullPrice).addClass('fullPrice');
  $(fullInfo).append(fullPrice);
  if($(mainMenu[0].lastChild).hasClass('innerBtn')) {
    let price = item.price*0.9;
    $(fullPrice).html(`${price} грн.`);
  } else {
    $(fullPrice).html(`${item.price} грн.`);

  }
  let fullInfoBlock = document.createElement('div');
  $(fullInfoBlock).addClass('fullInfoBlock');
  let infoLeft = document.createElement('div');
  let infoRight = document.createElement('div');
  $(infoLeft).addClass('infoLeft');
  $(infoRight).addClass('infoRight');
  let fullManufacter = document.createElement('div');
  $(fullManufacter).html(`Производитель`);
  let fullMaterial = document.createElement('div');
  $(fullMaterial).html(`Материал`);
  let fullAvailability = document.createElement('div');
  $(fullAvailability).html(`Наличие`);
  let fullModel = document.createElement('div');
  $(fullModel).html(`Модель`);

  let fullManufacterInfo = document.createElement('div');
  $(fullManufacterInfo).html(item.characteristics.manufacturers);
  let fullMaterialInfo = document.createElement('div');
  $(fullMaterialInfo).html(item.characteristics.materials);
  let fullAvailabilityInfo = document.createElement('div');
  $(fullAvailabilityInfo).html(item.characteristics.availability);
  let fullModelInfo = document.createElement('div');
  $(fullModelInfo).html(item.characteristics.models);


  $(infoLeft).append(fullManufacter);
  $(infoLeft).append(fullMaterial);
  $(infoLeft).append(fullAvailability);
  $(infoLeft).append(fullModel);

  $(infoRight).append(fullManufacterInfo);
  $(infoRight).append(fullMaterialInfo);
  $(infoRight).append(fullAvailabilityInfo);
  $(infoRight).append(fullModelInfo);
  $(fullInfoBlock).append(infoLeft);
  $(fullInfoBlock).append(infoRight);
  $(fullInfo).append(fullInfoBlock);

  let fullPickerInfo = document.createElement('div');
  $(fullPickerInfo).addClass('fullPickerInfo');
  let fullColor = document.createElement('div');
  $(fullPickerInfo).append(fullColor);

  let colorFullLabel = document.createElement('label');
  let colorFullChange = document.createElement('select');
  $(colorFullLabel).html('Цвет');
  $(colorFullChange).html('');
  $(colorFullChange).addClass('selectpicker');
  $(fullColor).append(colorFullLabel);
  $(fullColor).append(colorFullChange);

  item.colors.forEach((elem)=>{
    let option = document.createElement("option");
    $(option).text(elem);
    $(colorFullChange).append(option);
  });
  $(colorFullChange).on('change', ()=>{
    item.colors.forEach((color, ind)=>{
      console.log(colorFullChange.value);
      if(color===colorFullChange.value) {
        $(".slick-current").attr('src', item.images[ind]);
      }
    });
  });
  this.fullAvailability = item.characteristics.availability;
  this.value = 0;
  let fullAmount = document.createElement('div');
  $(fullAmount).addClass('fullAmount');
  let fullPlus = document.createElement('button');
  let plusIcon = document.createElement('i');
  //$(plusIcon).addClass('fa');
  //$(plusIcon).addClass('fa-angle-up');
  $(fullPlus).append(plusIcon);
  $(fullAmount).append(fullPlus);
  let fullQuantity = document.createElement('input');
  createInput(fullQuantity, 'text', '', fullQuantity,  fullAmount);
  $(fullQuantity).attr('value', 0);
  $(fullQuantity).prop("disabled", true);

  let fullMinus = document.createElement('button');
  let minusIcon = document.createElement('i');
  //$(minusIcon).addClass('fa');
  //$(minusIcon).addClass('fa-angle-down');
  $(fullMinus).append(minusIcon);
  $(fullAmount).append(fullMinus);
  $(fullPickerInfo).append(fullAmount);
  let fullButtons = document.createElement('div');
  $(fullButtons).addClass('fullButtons');
  let fullBasket = document.createElement('input');
  createBtn(fullBasket, fullButtons, 'В корзину');
  let fullOrder = document.createElement('input');
  createBtn(fullOrder, fullButtons, 'В один клик');
  $(fullInfo).append(fullPickerInfo);
  $(fullInfo).append(fullButtons);


  let links = document.createElement('div');
  $(links).addClass('additionalInfoLinks');
  let commentsLink = document.createElement('a');
  $(commentsLink).html('Отзывы');
  let elseInfoLink = document.createElement('a');
  $(elseInfoLink).addClass('selectedLink');
  $(elseInfoLink).html('Подробнее');
  $(links).append(elseInfoLink);
  $(links).append(commentsLink);
  $(fullAdditionalInfo).append(links);

  let commentsDiv = document.createElement('div');
  $(commentsDiv).addClass('comments');
  let allComments = document.createElement('div');
  let inputComments = document.createElement('div');
  $(commentsDiv).append(allComments);
  $(commentsDiv).append(inputComments);

  let elseInfo = document.createElement('div');
  //$(commentsDiv).addClass('hidden');

  $(fullAdditionalInfo).append(commentsDiv);
  $(fullAdditionalInfo).append(elseInfo);

  $(fullPlus).on('click', (e)=> {
    e.stopImmediatePropagation();
    plusQuantity (fullQuantity);
  });
  $(fullMinus).on('click', (e)=>{
    e.stopImmediatePropagation();
    minusQuantity(fullQuantity);
  });
  $(commentsLink).on('click', (e) => {
    $(commentsLink).addClass('selectedLink');
    $(elseInfoLink).removeClass('selectedLink');
    e.preventDefault();
    let articul = item.articul;
    showComments(articul, inputComments, allComments, commentsDiv, elseInfo);
  });


  //$(elseInfo).html('');
  let descriptionInfo = item.description;
  let newP = document.createElement('p');
  $(newP).html(descriptionInfo[0]);
  $(elseInfo).append(newP);
  descriptionInfo.slice(1).forEach(function(element) {
    let descriptionDiv = $('<p>');
    $(descriptionDiv).html(`-${element};`);
    $(elseInfo).append(descriptionDiv);
  });
  $(commentsDiv).addClass('hidden');
  $(elseInfo).removeClass('hidden');

  $(elseInfoLink).on('click', (e) =>{
    $(commentsLink).removeClass('selectedLink');
    $(elseInfoLink).addClass('selectedLink');
    e.preventDefault();
    e.stopImmediatePropagation();
    $(commentsDiv).addClass('hidden');
    $(elseInfo).removeClass('hidden');
    //self.showElseInfo(descriptionInfo, elseInfo, commentsDiv);
  });
};
let plusQuantity = (fullQuantity) =>{
  ++this.value;
  if(this.value>this.fullAvailability) {
    this.value=this.fullAvailability;
  }
  $(fullQuantity).attr('value', this.value);
};
let minusQuantity = (fullQuantity) => {
  --this.value;
  if(this.value<0) {
    this.value=0;
  }
  $(fullQuantity).attr('value', this.value);
};
let sendComment = (commentInput, comments, articul, commentsDiv, commentdate, commentBigBlock) => {
  let newCommentItem = {};
  let newComment =  commentInput[0].value;
  if(localStorage.getItem('checkUser')) {
    newCommentItem.author = users[0].name;
  } else{
    newCommentItem.author = 'Гость';
  }

  newCommentItem.message = newComment;
  newCommentItem.articul = articul;
  newCommentItem.date = commentdate;

  comments.unshift(newCommentItem);

  let commentSmallBlock = document.createElement('div');
  let commentsJson = JSON.stringify(comments);
  localStorage.setItem('newComment', commentsJson);
  $(commentSmallBlock).addClass('commentDiv');
  let topCommentsInfo = document.createElement('div');
  $(topCommentsInfo).addClass('topCommentInfo');

  let commentDiv = document.createElement('p');
  let authorDiv = document.createElement('p');
  let dateDiv = document.createElement('p');
  $(commentDiv).html(newCommentItem.message);
  $(authorDiv).html(newCommentItem.author);
  $(dateDiv).html(commentdate);
  $(topCommentsInfo).append(authorDiv);
  $(topCommentsInfo).append(dateDiv);
  $(commentSmallBlock).append(topCommentsInfo);
  $(commentSmallBlock).append(commentDiv);
  $(commentBigBlock).prepend(commentSmallBlock);

  commentInput[0].value = '';

  //$('#comments').html(`${newCommentItem.author}: ${newCommentItem.message}`);
};
let showComments = (articul, inputComments, allComments, commentsDiv, elseInfo) =>{
  $(commentsDiv).html('');
  $(inputComments).html('');
  let comments;
  if(localStorage.getItem("newComment")) {
    comments = JSON.parse(localStorage["newComment"]);
  } else{
    comments = [];
  }
  let commentBigBlock = document.createElement('div');
  $(commentBigBlock).addClass('bigBlockComment');

  createAddCommentBtn(comments, articul, inputComments, commentsDiv, commentBigBlock);
  comments.forEach((comment)=>{
    if(comment.articul===articul) {

      let commentBlock=document.createElement('div');
      $(commentBlock).addClass('commentDiv');
      let topCommentsInfo = document.createElement('div');
      $(topCommentsInfo).addClass('topCommentInfo');
      let commentDiv = document.createElement('p');
      let authorDiv = document.createElement('p');
      let dateDiv = document.createElement('p');
      $(commentDiv).addClass('commentDiv');
      $(commentDiv).html(comment.message);
      $(authorDiv).html(comment.author);
      $(dateDiv).html(comment.date);
      $(topCommentsInfo).append(authorDiv);
      $(topCommentsInfo).append(dateDiv);
      $(commentBlock).append(topCommentsInfo);
      $(commentBlock).append(commentDiv);
      $(commentBigBlock).append(commentBlock);
    }
  });
  $(commentsDiv).removeClass('hidden');
  $(elseInfo).addClass('hidden');
  $(elseInfo).addClass('elseInfo');

};
let addComment = (comments, inputComments, articul, commentsDiv, commentBigBlock)=>{
  $(inputComments).html('');
  let commentInput = $('<textarea>', {placeholder: 'Введите сообщение'});
  $(inputComments).addClass('commentInput');
  let commentBtn = $('<input>', {type: 'button', value: 'Send', class: 'btn'});
  let commentdate = moment().format('L');
  $(inputComments).append(commentInput);
  $(inputComments).append(commentBtn);
  $(commentBtn).on('click', ()=>{
    sendComment(commentInput, comments, articul, commentsDiv, commentdate, commentBigBlock);
  });
};
let createAddCommentBtn = (comments, articul, inputComments, commentsDiv, commentBigBlock) =>{
  let addCommentP = $('<input>', {type: 'button', value: 'Add comment', class: 'btn'});
  $(inputComments).append(addCommentP);
  $(commentsDiv).append(inputComments);
  $(commentsDiv).append(commentBigBlock);
  $(addCommentP).on('click', ()=>{
    addComment (comments, inputComments, articul, commentsDiv, commentBigBlock);
  });
};

