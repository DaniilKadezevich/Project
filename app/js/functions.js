'use strict';
// Header Menu
let generateMenuCategories = (parent) => {
    for (let category in categories) {



        let categoryItems = [],
            manufacters = {};

        for (let manufacter in categories[category]) {
            manufacters[manufacter] = categories[category][manufacter];
            for (let items in categories[category][manufacter]) {
                categoryItems.push(categories[category][manufacter][items]);
            }
        }
        console.log(manufacters);

        categoryItems = _.reverse(categoryItems.sort((a, b) => {
            let firsDate = moment(a.date, "MM-DD-YYYY");
            let secondDate = moment(b.date, "MM-DD-YYYY");
            return firsDate.diff(secondDate, 'days');
        }));







        let categoryTitle = conformity[category];

        let menuElement = $('<li>', {id: `link-${category}`}),
            menuElementTitle = $('<a>', {class: 'main-link', text: categoryTitle, href: '#header'}),
            menuElementIconArrow = $('<div>', {class: 'main-icon icon-arrows-down'}),
            subMenuContainer = $('<div>', {class: 'sub-menu'}),
            subMenu = $ ('<ul>');

        for (let key in categories[category]) {
            let subMenuElement = $('<li>'),
                subMenuElementTitle = $('<a>', {class: 'secondary-link', text: key, href: '#header'});

            let manufacterItems = manufacters[key];

            subMenuElement.on('click', generateCatalog.bind(null, manufacterItems));

            subMenuElementTitle.appendTo(subMenuElement);
            subMenuElement.appendTo(subMenu);
        }

        subMenu.hide();

        menuElement.on('mouseenter', () => {
            subMenu.slideDown({
                duration: 200
            });
        });
        menuElement.on('mouseleave', () => {
            subMenu.hide();
        });

        menuElementTitle.on('click', generateCatalog.bind(null, categoryItems));

        menuElementTitle.appendTo(menuElement);
        menuElementIconArrow.appendTo(menuElement);
        subMenu.appendTo(subMenuContainer);
        subMenuContainer.appendTo(menuElement);
        menuElement.insertAfter(parent.find('#link-main-page'));
    }
};
let generateMainPage = () => {
    let mainPage = new MainPage();
    mainPage.generateMainPage();
};
let generateCatalog = (items) => {
    let catalog = new Catalog();
    catalog.generateCatalog(items);
};


let addFixedOnScrollEvent = (element) => {
    let elementTopBoundary = element.offset().top;

    window.onscroll = function() {
        if (element.hasClass('position-fixed') && window.pageYOffset < elementTopBoundary) {
            $('.header-top').css('margin-bottom', '0px');
            element.removeClass('position-fixed');
        } else if (window.pageYOffset > elementTopBoundary) {
            element.addClass('position-fixed');
            $('.header-top').css('margin-bottom', '50px');
        }
    };
};
