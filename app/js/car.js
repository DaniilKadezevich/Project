$(document).ready(function(){
    $('#main-carousel').slick({
        autoplay: true,
        autoplaySpeed: 1000000,
        dots: true,
        arrows: false
    });

    $('#popular-carousel').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplaySpeed: 10000,

    });

    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: true,
        centerMode: false,
        focusOnSelect: true
    });

});