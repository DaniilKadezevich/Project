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
                showFullInfo(itemInfo);
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
                showWindow(itemInfo);
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