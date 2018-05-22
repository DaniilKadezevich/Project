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
        let self = this;
        $('main').html('');
        let fullProduct = document.createElement('div');
        let fullProductInfo = document.createElement('div');
        $(fullProductInfo).addClass('fullProductInfo');
        let fullAdditionalInfo = document.createElement('div');
        //$('#fullProduct').removeClass('hidden');
        $(fullProduct).append(fullProductInfo);
        $(fullProduct).append(fullAdditionalInfo);
        $('main').append(fullProduct);
        let fullPhoto = document.createElement('img');
        $(fullPhoto).attr('src', item.images[0]);
        $(fullProductInfo).append(fullPhoto);
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
        $(fullProductInfo).append(fullInfo);
        let fullTitle = document.createElement('h4');
        $(fullTitle).html(item.title);
        $(fullInfo).append(fullTitle);
        let fullArticle = document.createElement('div');
        $(fullArticle).html(`Арт. ${item.articul}`);
        $(fullInfo).append(fullArticle);

        //$(colorFullChange).on('change', ()=>{
        //    item.colors.forEach((color, ind)=>{
        //        if(color===$(colorFullChange).value) {
        //            $("#fullPhoto").attr('src', item.images[ind]);
        //        }
        //    });
        //});
        let fullPrice = document.createElement('div');
        $(fullInfo).append(fullPrice);
        if(topInfo[0].lastChild.value==="Выйти") {
            let price = item.price*0.9;
            $(fullPrice).html(`${price} грн.`);
        } else {
            $(fullPrice).html(`${item.price} грн.`);

        }
        let fullManufacter = document.createElement('div');
        $(fullManufacter).html(`Производитель ${item.characteristics.manufacturers}`);
        let fullMaterial = document.createElement('div');
        $(fullMaterial).html(`Материал ${item.characteristics.materials}`);
        let fullAvailability = document.createElement('div');
        $(fullAvailability).html(`Наличие ${item.characteristics.availability}`);
        let fullModel = document.createElement('div');
        $(fullModel).html(`Модель ${item.characteristics.models}`);


        $(fullInfo).append(fullManufacter);
        $(fullInfo).append(fullMaterial);
        $(fullInfo).append(fullAvailability);
        $(fullInfo).append(fullModel);
        let fullColor = document.createElement('div');
        $(fullInfo).append(fullColor);
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
        let fullPlus = document.createElement('input');
        createBtn(fullPlus, fullAmount, '+');
        let fullQuantity = document.createElement('input');
        createInput(fullQuantity, 'text', '', fullQuantity,  fullAmount);

        let fullMinus = document.createElement('input');
        createBtn(fullMinus, fullAmount, '-');
        $(fullInfo).append(fullAmount);
        let fullButtons = document.createElement('div');
        let fullBasket = document.createElement('input');
        createBtn(fullBasket, fullButtons, 'В корзину');
        let fullOrder = document.createElement('input');
        createBtn(fullOrder, fullButtons, 'В один клик');
        $(fullInfo).append(fullButtons);

        let links = document.createElement('div');
        let commentsLink = document.createElement('a');
        $(commentsLink).html('Отзывы');
        let elseInfoLink = document.createElement('a');
        $(elseInfoLink).html('Подробнее');
        $(links).append(commentsLink);
        $(links).append(elseInfoLink);
        $(fullAdditionalInfo).append(links);

        let commentsDiv = document.createElement('div');
        let allComments = document.createElement('div');
        let inputComments = document.createElement('div');
        $(commentsDiv).append(allComments);
        $(commentsDiv).append(inputComments);

        let elseInfo = document.createElement('div');
        $(commentsDiv).addClass('hidden');

        $(fullAdditionalInfo).append(commentsDiv);
        $(fullAdditionalInfo).append(elseInfo);

        $(fullPlus).on('click', function(e) {
            e.stopImmediatePropagation();
            self.plusQuantity (fullQuantity);
        });
        $(fullMinus).on('click', (e)=>{
            e.stopImmediatePropagation();
            self.minusQuantity(fullQuantity);
        });
        $(commentsLink).on('click', (e) => {
            e.preventDefault();
            let articul = item.articul;
            self.showComments(articul, inputComments, allComments, commentsDiv, elseInfo);
        });
        $(elseInfoLink).on('click', (e) =>{
            e.preventDefault();
            e.stopImmediatePropagation();
            let descriptionInfo = item.description;
            self.showElseInfo(descriptionInfo, elseInfo, commentsDiv);
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
        //$('#comments').html('');
        let comments;
        if(localStorage.getItem("newComment")) {
            comments = JSON.parse(localStorage["newComment"]);
        } else{
            comments = [];
        }
        this.createAddCommentBtn(comments, articul, inputComments, allComments);
        comments.forEach((comment)=>{
            if(comment.articul===articul) {
                let commentDiv = document.createElement('div');
                $(commentDiv).html(`${comment.author}: ${comment.message}`);
                $(allComments).append(commentDiv);
            }
        });

        $(commentsDiv).removeClass('hidden');
        $(elseInfo).addClass('hidden');
        $(elseInfo).addClass('elseInfo');
    };

    this.createAddCommentBtn = (comments, articul, inputComments, allComments) =>{
        let addComment = $('<input>', {type: 'button', value: 'Add comment', class: 'btn'});
        $(inputComments).append(addComment);

        $(addComment).on('click', ()=>{
            this.addComment (comments, inputComments, articul, allComments);
        });
    };


    this.addComment = (comments, inputComments, articul, allComments)=>{
        $(inputComments).html('');
        let commentInput = $('<input>', {type: 'text', placeholder: 'Write your message'});
        let commentBtn = $('<input>', {type: 'button', value: 'Send', class: 'btn'});
        $(inputComments).append(commentInput);
        $(inputComments).append(commentBtn);


        $(commentBtn).on('click', ()=>{
            this.sendComment(commentInput, comments, articul, allComments);
        });
    };

    this.sendComment = (commentInput, comments, articul, allComments) => {
        let newCommentItem = {};


        let newComment =  commentInput[0].value;
        newCommentItem.author = users[0].name;
        newCommentItem.message = newComment;
        newCommentItem.articul = articul;

        comments.push(newCommentItem);

        let commentsJson = JSON.stringify(comments);
        localStorage.setItem('newComment', commentsJson);
        let commentDiv = document.createElement('div');
        $(commentDiv).html(`${newCommentItem.author}: ${newCommentItem.message}`);
        $(allComments).prepend(commentDiv);
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
        let self = this;
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
        let availability = item.characteristics.availability;

        $('#fastPlus').on('click', function(e) {
            e.stopImmediatePropagation();
            self.plusFastQuantity (availability);

        });
        $('#fastMinus').on('click', (e)=>{
            e.stopImmediatePropagation();
            self.minusFastQuantity();
        });

    };
    this.plusFastQuantity = (availability) =>{
        ++value;
        if(value>availability) {
            value=availability;
        }
        $('#fastQuantity').attr('value', value);
    };
    this.minusFastQuantity = () => {
        --value;
        if(value<0) {
            value=0;
        }
        $('#fastQuantity').attr('value', value);
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