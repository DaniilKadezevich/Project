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
});