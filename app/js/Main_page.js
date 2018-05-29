'use strict';

function MainPage() {
    this.generateMainPage = () => {
        let main = $('main');
        let mainPage = $('<section>', {id: 'main-page'});

        this.clearMain(main);

        this.generateMainCarousel(mainPage);

        this.generatePopularBlock(mainPage);

        mainPage.appendTo(main);

    };

    //Main carousel
    this.generateMainCarousel = (parent) => {
        let carousel = $('<div>', {id: 'main-carousel'});

        this.generateMainCarouselSlides(carousel);

        carousel.slick({
            autoplay: false,
            dots: true,
            arrows: false
        });

        carousel.appendTo(parent);
    };
    this.generateMainCarouselSlides = (parent) => {
        for (let slide in carouselSlides) {
            let slideInfo = carouselSlides[slide];

            let slideContainer = $('<div>'),
                slideContentContainer = $('<div>', {class: 'main-slide-content'}),
                slideTextBlock = $('<div>', {class: 'slide-text-block d-flex flex-column justify-content-center align-items-center'}),
                slideTitle = $('<h2>', {text: slideInfo.title}),
                slideText = $('<p>', {class: 'slide-text', text: slideInfo.text}),
                slideBtn = $('<button>', {class: 'slide-btn', text: 'Подробнее'}),
                slideImgBlock = $('<div>', {class: 'main-slide-img-block'}),
                slideImg = $('<img>', {src: slideInfo.img});

            slideTitle.appendTo(slideTextBlock);
            slideText.appendTo(slideTextBlock);
            slideBtn.appendTo(slideTextBlock);
            slideTextBlock.appendTo(slideContentContainer);
            slideImg.appendTo(slideImgBlock);
            slideImgBlock.appendTo(slideContentContainer);
            slideContentContainer.appendTo(slideContainer);

            slideContainer.appendTo(parent);
        }
    };
    // Popular carousel
    this.generatePopularBlock = (parent) => {
        let popularContainer = $('<div>', {id: 'main-popular'}),
            container = $('<div>', {class: 'container'}),
            row = $('<div>', {class: 'row d-block'}),
            popularTitle = $('<h3>', {text: 'Лидеры продаж'});

        popularTitle.appendTo(row);

        this.generatePopularCarousel(row);

        row.appendTo(container);
        container.appendTo(popularContainer);

        popularContainer.on('mouseenter', () => {
            $('.slick-arrow').fadeIn({
                duration: 200
            });
        });
        popularContainer.on('mouseleave', () => {
            $('.slick-arrow').fadeOut({
                duration: 200
            });
        });

        popularContainer.appendTo(parent);
    };
    this.generatePopularCarousel = (parent) => {
        let carousel = $('<div>', {id: 'popular-carousel'});

        this.generatePopularCarouselSlides(carousel);

        carousel.slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplaySpeed: 1000,
            infinite: false
        });

        $('.slick-arrow').hide();


        carousel.appendTo(parent);
    };
    this.generatePopularCarouselSlides = (parent) => {
        for (let i = 0; i < 10; i++){
            let itemInfo = popularItems[i];

            let slideContainer = $('<div>', {class: 'popular-carousel-slide'}),
                slideContentContainer = $('<div>', {class: 'slide-content d-flex flex-column justify-content-center align-items-center'}),
                slideImgBlock = $('<div>', {class: 'slide-img-block'}),
                slideImg = $('<img>', {src: itemInfo.images[0]}),
                slideBtn = $('<button>', {class: 'slide-btn', text: 'Быстрый просмотр'}),
                slideTextBlock = $('<div>', {class: 'slide-text-block d-flex flex-column justify-content-center align-items-center'}),
                slideTitle = $('<h5>', {text: itemInfo.title}),
                slidePrice = $('<p>', {class: 'slide-price', text: `${itemInfo.price} грн`}),
                slideColorsBlock = $('<div>', {class: 'slide-colors-block d-flex align-items-center justify-content-center'}),
                slideColorsGallery = $('<ul>', {class: 'colors-gallery'});
            $(slideBtn).attr('type', 'button');
            $(slideBtn).attr({'data-toggle': 'modal', 'data-target': '#modalWindow'});
            $(slideTitle).on('click', () =>{
                this.showFullInfo(itemInfo);
            });
            this.generateColorsGallery(slideColorsGallery, itemInfo);

            slideBtn.hide();

            slideImgBlock.on('mouseenter', () => {
                slideBtn.show()
            });
            slideImgBlock.on('mouseleave', () => {
                slideBtn.hide();
            });
            slideBtn.on('click', () => {
                this.showWindow(itemInfo);
            });

            slideColorsGallery.appendTo(slideColorsBlock);
            slideImg.appendTo(slideImgBlock);
            slideBtn.appendTo(slideImgBlock);
            slideTitle.appendTo(slideTextBlock);
            slidePrice.appendTo(slideTextBlock);
            slideImgBlock.appendTo(slideContentContainer);
            slideTextBlock.appendTo(slideContentContainer);
            slideColorsBlock.appendTo(slideContentContainer);
            slideContentContainer.appendTo(slideContainer);

            slideContainer.appendTo(parent);
        }
    };

    this.showFullInfo = (item) =>{
        //let self = this;
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
        let fullPhoto = document.createElement('img');
        $(fullPhoto).attr('src', item.images[0]);
        $(photoDiv).append(fullPhoto);
        $(photoDiv).addClass('fullPhotoDiv');
        $(photoDiv).on('click', ()=>{
            $('#showPhoto').modal('toggle');
            $('#showPhotoBlock').append(fullPhoto);
        });
        $(fullProductInfo).append(photoDiv);
        //item.images.forEach((path)=>{
        //    let photoDiv = document.createElement('div');
        //    let photo = document.createElement('img');
        //    $(photo).attr('src', path);
        //    $(photoDiv).append(photo);
        //    $(fullProductInfo).append(photoDiv);
        //
        //});
        //item.images.forEach((path)=>{
        //    let photoSmall = document.createElement('img');
        //    $(photoSmall).attr('src', path);
        //    let photoSmallDiv = document.createElement('div');
        //    let smallPhotos = document.createElement('div');
        //    $(photoSmallDiv).append(photoSmall);
        //    $(smallPhotos).append(photoSmallDiv);
        //    $(fullProductInfo).append(smallPhotos);
        //});

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

        //$(colorFullChange).on('change', ()=>{
        //    item.colors.forEach((color, ind)=>{
        //        if(color===$(colorFullChange).value) {
        //            $("#fullPhoto").attr('src', item.images[ind]);
        //        }
        //    });
        //});
        let fullPrice = document.createElement('div');
        $(fullPrice).addClass('fullPrice');
        $(fullInfo).append(fullPrice);
        if(topInfo[0].lastChild.value==="Выйти") {
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
        this.fullAvailability = item.characteristics.availability;
        this.value = 0;
        let fullAmount = document.createElement('div');
        $(fullAmount).addClass('fullAmount');
        let fullPlus = document.createElement('button');
        let plusIcon = document.createElement('i');
        $(plusIcon).addClass('fa');
        $(plusIcon).addClass('fa-angle-up');
        $(fullPlus).append(plusIcon);
        $(fullAmount).append(fullPlus);
        let fullQuantity = document.createElement('input');
        createInput(fullQuantity, 'text', '', fullQuantity,  fullAmount);
        $(fullQuantity).attr('value', 0);
        $(fullQuantity).prop("disabled", true);

        let fullMinus = document.createElement('button');
        let minusIcon = document.createElement('i');
        $(minusIcon).addClass('fa');
        $(minusIcon).addClass('fa-angle-down');
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

        $(fullPlus).on('click', (e) =>{
            e.stopImmediatePropagation();
            this.plusQuantity (fullQuantity);
        });
        $(fullMinus).on('click', (e)=>{
            e.stopImmediatePropagation();
            this.minusQuantity(fullQuantity);
        });
        $(commentsLink).on('click', (e) => {
            $(commentsLink).addClass('selectedLink');
            $(elseInfoLink).removeClass('selectedLink');
            e.preventDefault();
            let articul = item.articul;
            this.showComments(articul, inputComments, allComments, commentsDiv, elseInfo);
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
    this.plusQuantity = (fullQuantity) =>{
        ++this.value;
        if(this.value>this.fullAvailability) {
            this.value=this.fullAvailability;
        }
        $(fullQuantity).attr('value', this.value);
    };
    this.minusQuantity = (fullQuantity) => {
        --this.value;
        if(this.value<0) {
            this.value=0;
        }
        $(fullQuantity).attr('value', this.value);
    };
    this.showComments = (articul, inputComments, allComments, commentsDiv, elseInfo) =>{
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

        this.createAddCommentBtn(comments, articul, inputComments, commentsDiv, commentBigBlock);
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

    this.createAddCommentBtn = (comments, articul, inputComments, commentsDiv, commentBigBlock) =>{
        let addComment = $('<input>', {type: 'button', value: 'Add comment', class: 'btn'});
        $(inputComments).append(addComment);
        $(commentsDiv).append(inputComments);
        $(commentsDiv).append(commentBigBlock);
        $(addComment).on('click', ()=>{
            this.addComment (comments, inputComments, articul, commentsDiv, commentBigBlock);
        });
    };


    this.addComment = (comments, inputComments, articul, commentsDiv, commentBigBlock)=>{
        $(inputComments).html('');
        let commentInput = $('<textarea>', {placeholder: 'Введите сообщение'});
        $(inputComments).addClass('commentInput');
        let commentBtn = $('<input>', {type: 'button', value: 'Send', class: 'btn'});
        let commentdate = moment().format('L');
        $(inputComments).append(commentInput);
        $(inputComments).append(commentBtn);
        $(commentBtn).on('click', ()=>{
            this.sendComment(commentInput, comments, articul, commentsDiv, commentdate, commentBigBlock);
        });
    };

    this.sendComment = (commentInput, comments, articul, commentsDiv, commentdate, commentBigBlock) => {
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
    this.showElseInfo = (descriptionInfo, elseInfo, commentsDiv) => {
        $(elseInfo).html('');
        descriptionInfo.forEach(function(element) {
            let descriptionDiv = $('<p>');
            $(descriptionDiv).html(element);
            $(elseInfo).append(descriptionDiv);
        });
        $(commentsDiv).addClass('hidden');
        $(elseInfo).removeClass('hidden');
    };


    this.showWindow = (item) => {
        //let self = this;
        $('#fastQuantity').attr('value', 0);
        $("#fastPhoto").attr('src', item.images[0]);
        $("#fastTitle").html(item.title);
        $('#colorChange').html('');
        item.colors.forEach((elem)=>{
            let option = document.createElement("option");
            $(option).text(elem);
            $('#colorChange').append(option);
        });
        $('#colorChange').on('change', ()=>{
            item.colors.forEach((color, ind)=>{
                if(color===$('#colorChange')[0].value) {
                    $("#fastPhoto").attr('src', item.images[ind]);
                }
            });
        });
        $("#fastPrice").html(`${item.price} грн.`);
        this.availability = item.characteristics.availability;
        console.log(item);
        this.value = 0;
        $("#fastQuantity").prop("disabled", true);
        $('#fastPlus').on('click', (e)=> {
            e.stopImmediatePropagation();
            this.plusFastQuantity ();

        });
        $('#fastMinus').on('click', (e)=>{
            e.stopImmediatePropagation();
            this.minusFastQuantity();
        });

    };
    this.plusFastQuantity = () =>{
        ++this.value;
        if(this.value>this.availability) {
            this.value=this.availability;
        }
        $('#fastQuantity').attr('value', this.value);
    };
    this.minusFastQuantity = () => {
        --this.value;
        if(this.value<0) {
            this.value=0;
        }
        $('#fastQuantity').attr('value', this.value);
    };




    this.generateColorsGallery = (parent, itemInfo) => {
        let colors = itemInfo.colors;
        console.log(colors);
        for (let index in colors){
            console.log(colors[index]);
            let galleryElement = $('<li>'),
                galleryElementColor = $('<div>', {class: 'item-color', style: `background-color: ${colors[index]}`});

            galleryElementColor.appendTo(galleryElement);
            galleryElement.appendTo(parent);
        }
    };

    this.clearMain = (element) => {
        element.html('');
    }
}