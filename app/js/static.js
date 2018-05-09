'use strict';
$(document).ready( () => {
    let mainPageBtn = $('#link-main-page'),
        footerLogoBtn = $('#footer-logo'),
        headerLogoBtn = $('#header-logo');

    headerLogoBtn.on('click', generateMainPage);
    mainPageBtn.on('click', generateMainPage);
    footerLogoBtn.on('click', generateMainPage);


    let mainMenu = $('#main-menu'),
        headerBot = $('.header-bot');

    addFixedOnScrollEvent(headerBot);

    generateMenuCategories(mainMenu);
});