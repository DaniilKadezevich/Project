'use strict';
function Catalog() {
    this.generateCatalog = (items) => {
        let main = $('main');
        let catalogPage = $('<section>', {id: 'catalog-page'}),
            catalogMain = $('<div>', {id: 'catalog-main', class: 'container'}),
            catalogMainRow = $('<div>', {class: 'row'});
        let catalogContentContainer = $('<div>', {id: 'catalog-content', class: 'col'});
        let catalogTopWrapper = $('<div>', {id: 'catalog-top'});

        this.clearCatalog(main);

        this.generateCatalogTop(catalogTopWrapper, items);
        this.generateCatalogSidebar(catalogMainRow, items);
        this.generateCatalogContent(catalogContentContainer, items);

        catalogTopWrapper.appendTo(catalogPage);
        catalogContentContainer.appendTo(catalogMainRow);
        catalogMainRow.appendTo(catalogMain);
        catalogMain.appendTo(catalogPage);
        catalogPage.appendTo(main);

        this.setIonRangeSlider(items);
    };
    // Catalog Top
    this.generateCatalogTop = (parent, items) => {
        let catalogTopContainer = $('<div>', {class: 'container'}),
            catalogTopRow = $('<div>', {class: 'row'});

        this.clearCatalog(parent);

        this.generateSortBlock(catalogTopRow);
        this.generateCatalogSortBlock(catalogTopRow, items);

        catalogTopRow.appendTo(catalogTopContainer);
        catalogTopContainer.appendTo(parent);
    };
    this.generateCatalogSortBlock = (parent, items) => {
        let col = $('<div>', {class: 'col-7 d-flex justify-content-end'}),
            sortBlock = $('<div>', {class: 'sort-block bd-transparent'}),
            sortIcon = $('<div>', {class: 'sort-icon icon-arrows-down'}),
            sortMenuContainer = $('<div>', {class: 'sort-menu-container'});

        this.generateSortTextBlock(sortBlock, items);
        this.generateSortMenu(sortMenuContainer, items);

        sortMenuContainer.hide();

        sortBlock.on('click', () => {
            sortMenuContainer.toggle();
            sortBlock.toggleClass('bd-transparent bd-accent');
            sortIcon.toggleClass('icon-arrows-down icon-arrows-up')
        });

        sortIcon.appendTo(sortBlock);
        sortMenuContainer.appendTo(sortBlock);
        sortBlock.appendTo(col);
        col.appendTo(parent);
    };
    this.generateSortTextBlock = (parent) => {
        let sortTextBlock = $('<div>', {class: 'sort-text-block', text: 'Сортировать по: '}),
            sortTextSpan = $('<span>', {id: 'sort-block-span', text: 'Новизне'});

        sortTextSpan.appendTo(sortTextBlock);
        sortTextBlock.appendTo(parent);
    };
    this.generateSortMenu = (parent, items) => {
        let sortMenu = $('<ul>');

        this.generateSortMenuElements(sortMenu, items);

        sortMenu.appendTo(parent);
    };
    this.generateSortMenuElements = (parent, items) => {

        let sortMenuElementNewFirst = $('<li>', {id: 'new-first', text: 'Новизне'}),
            sortMenuElementExpensiveFirst = $('<li>', {id: 'exp-first', text: 'Цене(убывание)'}),
            sortMenuElementCheapFirst = $('<li>', {id: 'cheap-first',text: 'Цене(возрастание)'}),
            sortMenuElementPopularFirst = $('<li>', {id: 'popular-first',text: 'Популярности'});

        this.addEventsOnSortMenuElements(sortMenuElementNewFirst, sortMenuElementExpensiveFirst, sortMenuElementCheapFirst, sortMenuElementPopularFirst, items, items);

        sortMenuElementNewFirst.appendTo(parent);
        sortMenuElementPopularFirst.appendTo(parent);
        sortMenuElementExpensiveFirst.appendTo(parent);
        sortMenuElementCheapFirst.appendTo(parent);
    };
    this.addEventsOnSortMenuElements = (newFirst, expFirst, cheapFirst, popularFirst, filtredItems, items) => {

        filtredItems = _.reverse(filtredItems.sort((a, b) => {
            let firsDate = moment(a.date, "MM-DD-YYYY");
            let secondDate = moment(b.date, "MM-DD-YYYY");
            return firsDate.diff(secondDate, 'days');
        }));

        let filtredItemsExpensiveFirst, filtredItemsCheapFirst;
        filtredItemsCheapFirst = filtredItems.slice(0);
        filtredItemsCheapFirst = filtredItemsCheapFirst.sort((a, b) => {
            let firsPrice = a.price;
            let secondPrice = b.price;
            return firsPrice - secondPrice
        });
        filtredItemsExpensiveFirst = filtredItemsCheapFirst.slice(0);
        filtredItemsExpensiveFirst = _.reverse(filtredItemsExpensiveFirst);

        let filtredItemsPopularFirst = filtredItems.slice(0);
        filtredItemsPopularFirst = _.reverse(filtredItemsPopularFirst.sort((a, b) => {
            let firsCounter = a.counter;
            let secondCounter = b.counter;
            return firsCounter - secondCounter
        }));

        cheapFirst.off();
        expFirst.off();
        newFirst.off();
        popularFirst.off();

        newFirst.on('click', () => {
            items = _.reverse(items.sort((a, b) => {
                let firsDate = moment(a.date, "MM-DD-YYYY");
                let secondDate = moment(b.date, "MM-DD-YYYY");
                return firsDate.diff(secondDate, 'days');
            }));

            let catalogContent = $('#catalog-content');
            let filterCheckboxes = $('#catalog-sidebar .filter-checkbox');
            let filterBtns = $('#catalog-sidebar .filter-btn-ok');

            this.generateCatalogContent(catalogContent, filtredItems);
            this.addEventUseFilters(filterCheckboxes, items);
            this.addEventUseFilters(filterBtns, items);

            $('#sort-block-span').text('Новизне');
        });
        cheapFirst.on('click', () => {
            let itemsCheapFirst = items.slice(0);

            itemsCheapFirst = itemsCheapFirst.sort((a, b) => {
                let firsPrice = a.price;
                let secondPrice = b.price;
                return firsPrice - secondPrice
            });

            let catalogContent = $('#catalog-content');
            let filterCheckboxes = $('#catalog-sidebar .filter-checkbox');
            let filterBtns = $('#catalog-sidebar .filter-btn-ok');

            this.generateCatalogContent(catalogContent, filtredItemsCheapFirst);
            this.addEventUseFilters(filterCheckboxes, itemsCheapFirst);
            this.addEventUseFilters(filterBtns, itemsCheapFirst);

            $('#sort-block-span').text('Цене(возрастание)');
        });
        expFirst.on('click', () => {
            let itemsExpensiveFirst = items.slice(0);

            itemsExpensiveFirst = _.reverse(itemsExpensiveFirst.sort((a, b) => {
                let firsPrice = a.price;
                let secondPrice = b.price;
                return firsPrice - secondPrice
            }));

            let catalogContent = $('#catalog-content');
            let filterCheckboxes = $('#catalog-sidebar .filter-checkbox');
            let filterBtns = $('#catalog-sidebar .filter-btn-ok');

            this.generateCatalogContent(catalogContent, filtredItemsExpensiveFirst);
            this.addEventUseFilters(filterCheckboxes, itemsExpensiveFirst);
            this.addEventUseFilters(filterBtns, itemsExpensiveFirst);

            $('#sort-block-span').text('Цене(убывание)');
        });
        popularFirst.on('click', () => {
            let itemsPopularFirst = items.slice(0);

            itemsPopularFirst = _.reverse(itemsPopularFirst.sort((a, b) => {
                let firsPrice = a.price;
                let secondPrice = b.price;
                return firsPrice - secondPrice
            }));

            let catalogContent = $('#catalog-content');
            let filterCheckboxes = $('#catalog-sidebar .filter-checkbox');
            let filterBtns = $('#catalog-sidebar .filter-btn-ok');

            this.generateCatalogContent(catalogContent, filtredItemsPopularFirst);
            this.addEventUseFilters(filterCheckboxes, itemsPopularFirst);
            this.addEventUseFilters(filterBtns, itemsPopularFirst);

            $('#sort-block-span').text('Популярности');
        });

    };
    this.generateSortBlock = (parent) => {
        let col = $('<div>', {class: 'col-5'});
        col.appendTo(parent);
    };
    // Catalog Content
    this.generateCatalogContent = (parent, items) => {
        this.clearCatalog(parent);
        if (items.length !== 0) {
            let splitItems = items.slice(0);
            splitItems = _.chunk(splitItems, 3);

            for (let items in splitItems) {
                let row = $('<div>', {class: 'row'});

                this.generateRowCols(row, splitItems[items]);

                row.appendTo(parent);
            }
        } else {
            this.generateMessageNoItems(parent)
        }

    };
    this.generateRowCols = (parent, items) => {
        for (let item in items){
            this.generateRowCol(parent, items[item]);
        }
    };
    this.generateRowCol = (parent, item) => {
        let col = $('<div>', {class: 'col-4'}),
            itemContainer = $('<div>', {class: 'catalog-item d-flex flex-column justify-content-center align-items-center'});

            this.generateItemImgBlock(itemContainer, item);
            this.generateItemTextBlock(itemContainer, item);
            this.generateItemColorsBlock(itemContainer, item);

        itemContainer.appendTo(col);
        col.appendTo(parent);
    };
    this.generateItemImgBlock = (parent, item) => {
        let itemImgBlock = $('<div>', {class: 'item-img-block'}),
            itemImg = $('<img>', {src: `${item.images[0]}`}),
            itemBtn = $('<button>', {class: 'item-btn', text: 'Быстрый просмотр'});
        $(itemBtn).attr('type', 'button');
        $(itemBtn).attr({'data-toggle': 'modal', 'data-target': '#modalWindow'});
        itemBtn.hide();

        itemImgBlock.on('mouseenter', () => {
            itemBtn.show()
        });
        itemImgBlock.on('mouseleave', () => {
            itemBtn.hide();
        });
        itemBtn.on('click', () => {
            this.showWindow(item);
        });

        itemImg.appendTo(itemImgBlock);
        itemBtn.appendTo(itemImgBlock);
        itemImgBlock.appendTo(parent);
    };
    this.showWindow = (item) => {
        let self = this;
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
        this.value = 0;
        $('#fastPlus').on('click', function(e) {
            e.stopImmediatePropagation();
            self.plusFastQuantity ();

        });
        $('#fastMinus').on('click', (e)=>{
            e.stopImmediatePropagation();
            self.minusFastQuantity();
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


    this.generateItemTextBlock = (parent, item) => {
        let itemTextBlock = $('<div>', {class: 'item-text-block d-flex flex-column justify-content-center align-items-center'}),
            itemTitle = $('<h5>', {text: item.title}),
            itemPrice = $('<p>', {class: 'item-price', text: `${item.price} грн`});

        itemTitle.appendTo(itemTextBlock);
        itemPrice.appendTo(itemTextBlock);
        itemTextBlock.appendTo(parent);
        $(itemTitle).on('click', () =>{
            this.showFullInfo(item);
        })
    };

    this.showFullInfo = (item) =>{
        let self = this;
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

        $(fullPlus).on('click', function(e) {
            e.stopImmediatePropagation();
            self.plusQuantity (fullQuantity);
        });
        $(fullMinus).on('click', (e)=>{
            e.stopImmediatePropagation();
            self.minusQuantity(fullQuantity);
        });
        $(commentsLink).on('click', (e) => {
            $(commentsLink).addClass('selectedLink');
            $(elseInfoLink).removeClass('selectedLink');
            e.preventDefault();
            let articul = item.articul;
            self.showComments(articul, inputComments, allComments, commentsDiv, elseInfo);
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


    this.generateItemColorsBlock = (parent, item) => {
        let itemColorsBlock = $('<div>', {class: 'item-colors-block d-flex align-items-center justify-content-center'}),
            itemColorsGallery = $('<ul>', {class: 'colors-gallery'});

        let itemColors = item.colors;

        this.generateItemColorsGallery(itemColorsGallery, itemColors);

        itemColorsGallery.appendTo(itemColorsBlock);
        itemColorsBlock.appendTo(parent);
    };
    this.generateItemColorsGallery = (parent, colors) => {
        for (let index in colors){
            let galleryElement = $('<li>'),
                galleryElementColor = $('<div>', {class: 'item-color', style: `background-color: ${colors[index]}`});

            galleryElementColor.appendTo(galleryElement);
            galleryElement.appendTo(parent);
        }
    };
    // Catalog Filters
    this.generateCatalogSidebar = (parent, items) => {
        let catalogSidebar = $('<div>', {id: 'catalog-sidebar', class: 'col-3'}),
            catalogFiltersWrapper = $('<div>', {id: 'filters-wrapper'}),
            catalogFiltersTitle = $('<h3>', {text: 'Фильтры'}),
            catalogFilters = $('<div>', {id: 'filters'}),
            offFiltersWrapper = $('<div>', {id: 'off-filters'}),
            catalogOffFiltersBtn = $('<button>', {class: 'off-filters-btn', text: 'Сбросить фильтры'});

        this.generatePriceFilter(catalogFilters,items);
        this.generateManufacturerFilter(catalogFilters, items);
        this.generateColorsFilter(catalogFilters, items);
        this.generateModelFilter(catalogFilters, items);
        this.generateMaterialFilter(catalogFilters, items);

        catalogOffFiltersBtn.on('click', this.generateCatalog.bind(this, items));

        catalogFiltersTitle.appendTo(catalogFiltersWrapper);
        catalogFilters.appendTo(catalogFiltersWrapper);
        catalogFiltersWrapper.appendTo(catalogSidebar);
        catalogOffFiltersBtn.appendTo(offFiltersWrapper);
        offFiltersWrapper.appendTo(catalogSidebar);
        catalogSidebar.appendTo(parent);

        this.addEventUseFilters(catalogSidebar.find('.filter-checkbox'), items);
    };

    this.generateFilterHeader = (parent, title) => {
        let filterTitle = $('<h4>', {text: title}),
            icon = $('<div>', {class: 'icon icon-arrows-down'});

        filterTitle.appendTo(parent);
        icon.appendTo(parent);
    };
    this.generateFilterListElement = (parent, category) => {
        let filterListElement = $('<li>'),
            filterListCheckbox = $('<div>', {id: category, class: 'filter-checkbox before-icon-white', text: category});

        filterListCheckbox.on('click', () => {
            filterListCheckbox.toggleClass('before-icon-white before-icon-black')
        });

        filterListCheckbox.appendTo(filterListElement);
        filterListElement.appendTo(parent);
    };
    this.addEventUseFilters = (btn, items) => {
        btn.off('click.useFilters');
        btn.on('click.useFilters', () => {

            let materialList = $('#material-list'),
                materialListCheckboxes = materialList.find('.filter-checkbox');
            let materials = [];

            if (materialListCheckboxes.hasClass('before-icon-black')) {
                materialListCheckboxes.each((index) => {
                    let checkbox = materialListCheckboxes.eq(index);
                    if (checkbox.hasClass('before-icon-black')){
                        materials.push(checkbox.attr('id'))
                    }
                });
            } else {
                materialListCheckboxes.each((index) => {
                    let checkbox = materialListCheckboxes.eq(index);
                    if (checkbox.hasClass('before-icon-white')){
                        materials.push(checkbox.attr('id'))
                    }
                });
            }

            let modelList = $('#models-list'),
                modelListCheckboxes = modelList.find('.filter-checkbox');
            let models = [];

            if (modelListCheckboxes.hasClass('before-icon-black')){
                modelListCheckboxes.each((index) => {
                    let checkbox = modelListCheckboxes.eq(index);
                    if (checkbox.hasClass('before-icon-black')){
                        models.push(checkbox.attr('id'))
                    }
                });
            } else {
                modelListCheckboxes.each((index) => {
                    let checkbox = modelListCheckboxes.eq(index);
                    if (checkbox.hasClass('before-icon-white')){
                        models.push(checkbox.attr('id'))
                    }
                });
            }


            let colorList = $('#colors-list'),
                colorListCheckboxes = colorList.find('.filter-checkbox');
            let colors = [];

            if (colorListCheckboxes.hasClass('before-icon-black')) {
                colorListCheckboxes.each((index) => {
                    let checkbox = colorListCheckboxes.eq(index);
                    if (checkbox.hasClass('before-icon-black')){
                        colors.push(checkbox.attr('id'))
                    }
                });
            } else {
                colorListCheckboxes.each((index) => {
                    let checkbox = colorListCheckboxes.eq(index);
                    if (checkbox.hasClass('before-icon-white')){
                        colors.push(checkbox.attr('id'))
                    }
                });
            }


            let manufacturerList = $('#manufacturers-list'),
                manufacturerListCheckboxes = manufacturerList.find('.filter-checkbox');
            let manufacturers = [];

            if (manufacturerListCheckboxes.hasClass('before-icon-black')) {
                manufacturerListCheckboxes.each((index) => {
                    let checkbox = manufacturerListCheckboxes.eq(index);
                    if (checkbox.hasClass('before-icon-black')){
                        manufacturers.push(checkbox.attr('id'))
                    }
                });
            } else {
                manufacturerListCheckboxes.each((index) => {
                    let checkbox = manufacturerListCheckboxes.eq(index);
                    if (checkbox.hasClass('before-icon-white')){
                        manufacturers.push(checkbox.attr('id'))
                    }
                });
            }


            let allFilters = {
                materials,
                models,
                colors,
                manufacturers
            };

            let filtredItems = [];

            for (let item in items) {
                for (let material in items[item].characteristics.materials){
                    for (let model in items[item].characteristics.models) {
                        for (let color in items[item].colors) {
                            for (let manufacturer in items[item].characteristics.manufacturers) {
                                for (let mat in allFilters.materials) {
                                    if (items[item].characteristics.materials[material] === allFilters.materials[mat]){
                                        for (let mod in allFilters.models){
                                            if (items[item].characteristics.models[model] === allFilters.models[mod]){
                                                for (let col in allFilters.colors) {
                                                    if (items[item].colors[color] === allFilters.colors[col]) {
                                                        for (let man in allFilters.manufacturers) {
                                                            if (items[item].characteristics.manufacturers[manufacturer] === allFilters.manufacturers[man]){
                                                                filtredItems.push(items[item]);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            filtredItems = _.uniq(filtredItems);

            let slider = $('#price-bar').data("ionRangeSlider");

            let from = slider.result.from;
            let to = slider.result.to;

            filtredItems = _.filter(filtredItems, (el) => {
                return el.price <= to && el.price >= from
            });

            let catalogContent = $('#catalog-content');

            this.generateCatalogContent(catalogContent, filtredItems);
            this.addEventsOnSortMenuElements($('#new-first'), $('#exp-first'), $('#cheap-first'), $('#popular-first'), filtredItems, items);
        });
    };
    // Material Filter
    this.generateMaterialFilter = (parent, items) => {
        let filterBlock = $('<div>', {id: 'manufacturer-filter-block', class: 'filter-block'}),
            filterHeader = $('<div>', {class: 'filter-header'}),
            filterBody = $('<div>', {class: 'filter-body'});

        this.generateFilterHeader(filterHeader, 'Материал');
        this.generateMaterialFilterBody(filterBody, items);

        filterBody.hide();

        filterHeader.on('click', () => {
            filterBody.slideToggle();
            filterHeader.find('.icon').toggleClass('rotate');
        });

        filterHeader.appendTo(filterBlock);
        filterBody.appendTo(filterBlock);
        filterBlock.appendTo(parent);
    };
    this.generateMaterialFilterBody = (parent, items) => {
        let itemsMaterials = [];
        for (let index in items) {
            for (let material in items[index].characteristics.materials){
                itemsMaterials.push(items[index].characteristics.materials[material]);
            }
        }
        itemsMaterials = _.uniq(itemsMaterials);

        this.generateMaterialFiltersList(parent, itemsMaterials);
    };
    this.generateMaterialFiltersList = (parent, listTitles) => {
        let filtersList = $('<ul>', {id: 'material-list', class: 'filters-list'});

        for (let index in listTitles) {
            this.generateFilterListElement(filtersList, listTitles[index])
        }

        filtersList.appendTo(parent);
    };
    // Model Filter
    this.generateModelFilter = (parent, items) => {
        let filterBlock = $('<div>', {id: 'manufacturer-filter-block', class: 'filter-block'}),
            filterHeader = $('<div>', {class: 'filter-header'}),
            filterBody = $('<div>', {class: 'filter-body'});

        this.generateFilterHeader(filterHeader, 'Модель');
        this.generateModelFilterBody(filterBody, items);

        filterBody.hide();

        filterHeader.on('click', () => {
            filterBody.slideToggle();
            filterHeader.find('.icon').toggleClass('rotate');
        });

        filterHeader.appendTo(filterBlock);
        filterBody.appendTo(filterBlock);
        filterBlock.appendTo(parent);
    };
    this.generateModelFilterBody = (parent, items) => {
        let itemsModels = [];
        for (let index in items) {
            for (let model in items[index].characteristics.models) {
                itemsModels.push(items[index].characteristics.models[model]);
            }
        }
        itemsModels = _.uniq(itemsModels);

        this.generateModelFiltersList(parent, itemsModels);
    };
    this.generateModelFiltersList = (parent, listTitles) => {
        let filtersList = $('<ul>', {id: 'models-list', class: 'filters-list'});

        for (let index in listTitles) {
            this.generateFilterListElement(filtersList, listTitles[index])
        }

        filtersList.appendTo(parent);
    };
    // Color Filter
    this.generateColorsFilter = (parent, items) => {
        let filterBlock = $('<div>', {id: 'manufacturer-filter-block', class: 'filter-block'}),
            filterHeader = $('<div>', {class: 'filter-header'}),
            filterBody = $('<div>', {class: 'filter-body'});

        this.generateFilterHeader(filterHeader, 'Цвет');
        this.generateColorsFilterBody(filterBody, items);

        filterBody.hide();

        filterHeader.on('click', () => {
            filterBody.slideToggle();
            filterHeader.find('.icon').toggleClass('rotate');
        });

        filterHeader.appendTo(filterBlock);
        filterBody.appendTo(filterBlock);
        filterBlock.appendTo(parent);
    };
    this.generateColorsFilterBody = (parent, items) => {
        let itemsColors = [];
        for (let index in items) {
            for (let color in items[index].colors) {
                itemsColors.push(items[index].colors[color])
            }
        }
        itemsColors = _.uniq(itemsColors);

        this.generateColorFiltersList(parent, itemsColors);
    };
    this.generateColorFiltersList = (parent, listTitles) => {
        let filtersList = $('<ul>', {id: 'colors-list', class: 'filters-list'});

        for (let index in listTitles) {
            this.generateFilterListElement(filtersList, listTitles[index])
        }

        filtersList.appendTo(parent);
    };
    // Manufacturer Filter
    this.generateManufacturerFilter = (parent, items) => {
        let filterBlock = $('<div>', {id: 'manufacturer-filter-block', class: 'filter-block'}),
            filterHeader = $('<div>', {class: 'filter-header'}),
            filterBody = $('<div>', {class: 'filter-body'});

        this.generateFilterHeader(filterHeader, 'Производитель');
        this.generateManufacturerFilterBody(filterBody, items);

        filterBody.hide();

        filterHeader.on('click', () => {
            filterBody.slideToggle();
            filterHeader.find('.icon').toggleClass('rotate');
        });

        filterHeader.appendTo(filterBlock);
        filterBody.appendTo(filterBlock);
        filterBlock.appendTo(parent);
    };
    this.generateManufacturerFilterBody = (parent, items) => {

        let itemsManufacturers = [];
        for (let index in items) {
            for (let manufacturer in items[index].characteristics.manufacturers){
                itemsManufacturers.push(items[index].characteristics.manufacturers[manufacturer]);
            }
        }
        itemsManufacturers = _.uniq(itemsManufacturers);

        this.generateManufacturerFiltersList(parent, itemsManufacturers);
    };
    this.generateManufacturerFiltersList = (parent, listTitles) => {
        let filtersList = $('<ul>', {id: 'manufacturers-list', class: 'filters-list'});

        for (let index in listTitles) {
            this.generateFilterListElement(filtersList, listTitles[index])
        }

        filtersList.appendTo(parent);
    };
    // Price Filter
    this.generatePriceFilter = (parent, items) => {
        let filterBlock = $('<div>', {id: 'price-filter-block', class: 'filter-block'}),
            filterHeader = $('<div>', {class: 'filter-header'}),
            filterBody = $('<div>', {class: 'filter-body'});

        this.generateFilterHeader(filterHeader, 'Цена');
        this.generatePriceFilterBody(filterBody, items);

        filterBody.hide();

        filterHeader.on('click', () => {
            filterBody.slideToggle();
            filterHeader.find('.icon').toggleClass('rotate');
        });

        filterHeader.appendTo(filterBlock);
        filterBody.appendTo(filterBlock);
        filterBlock.appendTo(parent);
    };
    this.generatePriceFilterBody = (parent, items) => {
        let priceInputsBlock = $('<div>', {class: 'price-inputs d-flex justify-content-between'});

        this.generatePriceInputs(priceInputsBlock);
        priceInputsBlock.appendTo(parent);
        this.generatePriceBar(parent);
        this.generateUsePriceFiltersBtn(parent, items);
    };
    this.generatePriceInputs = (parent) => {
        let priceInputFrom = $('<input>', {id: 'price-from', class: 'input-range input-field', name: 'price-min', value: ''}),
            priceInputTo = $('<input>', {id: 'price-to', class: 'input-range input-field', name: 'price-max', value: ''}),
            line = $('<div>', {class: 'line'});

        priceInputFrom.appendTo(parent);
        line.appendTo(parent);
        priceInputTo.appendTo(parent);
    };
    this.generatePriceBar = (parent) => {
        let priceBar = $('<input>', {id: 'price-bar', name: 'price_bar', value: ''});

        priceBar.appendTo(parent);
    };
    this.generateUsePriceFiltersBtn = (parent, items) => {
        let useFiltersBtn = $('<button>', {class: 'filter-btn-ok', text: 'Ok'});

        this.addEventUseFilters(useFiltersBtn, items);

        useFiltersBtn.appendTo(parent);
    };
    this.setIonRangeSlider = (items) => {
        let priceBar = $('#price-bar');

        let prices = [];
        for (let index in items) {
            prices.push(items[index].price);
        }

        let min = Math.min(...prices),
            max = Math.max(...prices);

        priceBar.ionRangeSlider({
            type: "double",
            min: min,
            max: max,
            hide_min_max: true,
            hide_from_to: true,
            grid: false,
            step: 10,
            onStart: (data) => {
                $('#price-from').prop("value", data.from);
                $('#price-to').prop("value", data.to);
            },
            onChange: (data) => {
                $('#price-from').prop("value", data.from);
                $('#price-to').prop("value", data.to);
            }
        });

        let slider = priceBar.data("ionRangeSlider");
        let priceFrom =  $('#price-from'),
            priceTo =  $('#price-to');

        priceFrom.on("change",  function() {
            if (parseInt($(this).val()) < min){
                $(this).val(min)
            }
            if (parseInt($(this).val()) > max) {
                $(this).val(max)
            }

            if (parseInt($(this).val()) > priceTo.val()){
                priceTo.val($(this).val());
                slider.update({
                    from: $(this).val(),
                    to: priceTo.val()
                })
            } else {
                slider.update({
                    from: $(this).val()
                })
            }

        });
        priceTo.on("change ", function() {
            if (parseInt($(this).val()) > max) {
                $(this).val(max)
            }
            if (parseInt($(this).val()) < min){
                $(this).val(min)
            }

            if (parseInt($(this).val()) < priceFrom.val()){
                priceFrom.val($(this).val());
                slider.update({
                    from: priceFrom.val(),
                    to: $(this).val()
                })
            } else {
                slider.update({
                    to: $(this).val()
                })
            }
        });
    };


    this.clearCatalog = (element) => {
        element.html('');
    };
    this.generateMessageNoItems = (parent) => {
        let $alert = $('<div>', {class: 'alert alert-warning', role: 'alert', text: 'По выбранным параметрам ничего не найдено. Попробуйте выбрать другие значения.'});
        $alert.appendTo(parent)
    };

}
