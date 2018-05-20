'use strict';
let value = 0;
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
        $('#catalog-content').html('');
        $('#fullProduct').removeClass('hidden');
        $('#catalog-content').append($('#fullProduct'));
        $("#fullPhoto").attr('src', item.images[0]);
        item.images.forEach((path)=>{
            let photo = document.createElement('img');
            $(photo).attr('src', path);
            $("#photos").append(photo);
        });

        $("#fullTitle").html(item.title);
        $("#fullArticul").html(`Арт. ${item.articul}`);
        $('#colorFullChange').html('');
        item.colors.forEach((elem)=>{
            let option = document.createElement("option");
            $(option).text(elem);
            $('#colorFullChange').append(option);
        });
        $('#colorFullChange').on('change', ()=>{
            item.colors.forEach((color, ind)=>{
                if(color===$('#colorFullChange')[0].value) {
                    $("#fullPhoto").attr('src', item.images[ind]);
                }
            });
        });

        $("#fullPrice").html(`${item.price} грн.`);
        $("#fullManufacter").html(`Производитель ${item.characteristics.manufacturers}`);
        $("#fullMaterial").html(`Материал ${item.characteristics.materials}`);
        $("#fullAvailability").html(`Наличие ${item.characteristics.availability}`);
        $("#fullModel").html(`Модель ${item.characteristics.models}`);
        let availability = item.characteristics.availability;
        $('#fullPlus').on('click', function(e) {
            e.stopImmediatePropagation();
            self. plusQuantity (availability);
        });
        $('#fullMinus').on('click', (e)=>{
            e.stopImmediatePropagation();
            self.minusQuantity();
        });
        $('#commentsLink').on('click', (e) => {
            e.preventDefault();
            let comments = item.comments;
            self.showComments(comments);
        });
        $('#elseInfoLink').on('click', (e) =>{
            e.preventDefault();
            e.stopImmediatePropagation();
            let descriptionInfo = item.description;
            self.showElseInfo(descriptionInfo);
        });
    };

    this.plusQuantity = (availability) =>{
        ++value;
        if(value>availability) {
            value=availability;
        }
        $('#fullQuantity').attr('value', value);
    };
    this.minusQuantity = () => {
        console.log('ddd');
        --value;
        if(value<0) {
            value=0;
        }
        $('#fullQuantity').attr('value', value);
    };
    this.showComments = (comments) =>{
        $('#comments').html('');
        $('#comments').html(comments);
        this.createAddCommentBtn(comments);
        $('#comments').removeClass('hidden');
        $('#elseInfo').addClass('hidden');
    };

    this.createAddCommentBtn = (comments) =>{
        let addComment = $('<input>', {type: 'button', value: 'Add comment', class: 'btn'});
        $('#comments').append(addComment);
        $(addComment).on('click', ()=>{
            this.addComment (comments);
        });

    };

    this.addComment = (comments)=>{
        $('#comments').html('');
        let commentInput = $('<input>', {type: 'text', placeholder: 'Write your message'});
        let commentBtn = $('<input>', {type: 'button', value: 'Send', class: 'btn'});
        $('#comments').append(commentInput);
        $('#comments').append(commentBtn);

        $(commentBtn).on('click', ()=>{
            this.sendComment(commentInput, comments);
        });
    };

    this.sendComment = (commentInput, comments) => {
        let newCommentItem = {};
        let newComment =  commentInput[0].value;
        newCommentItem.author = 'Ssss';
        newCommentItem.message = newComment;

        comments.push(newCommentItem);
        let commentsJson = JSON.stringify(comments);
        localStorage.setItem('newComment', commentsJson);
        $('#comments').html(comments);
    };
    this.showElseInfo = (descriptionInfo) => {
        $('#elseInfo').html('');
        descriptionInfo.forEach(function(element) {
            let descriptiondiv = $('<p>');
            $(descriptiondiv).html(element);
            $('#elseInfo').append(descriptiondiv);
        });
        $('#comments').addClass('hidden');
        $('#elseInfo').removeClass('hidden');
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