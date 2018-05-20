'use strict';
   let data = {
       "categories": {
           "cases": {
               "Apple": [
                   {
                       "articul": "1",
                       "title": "Чехол на iPhone 6",
                       "price": "950",
                       "colors": ["Beige"],
                       "images": [
                           "img/cases/case-1/beige.jpg",
                       ],
                       "description": [
                           "Выполнен из качественного материала",
                           "Легко держится в руке, не скользит",
                           "Защищает смартфон от царапин и сколов",
                           "Удобные вырезы для кнопок, камер, портов"
                       ],
                       "characteristics": {
                           "manufacturers": ["Apple"],
                           "materials": ["Кожезаменитель"],
                           "availability": "10",
                           "models": ["iPhone 6"]
                       },
                       "counter": "11",
                       "comments": [],
                       "date": "04/29/2018"
                   },

                   {
                       "articul": "2",
                       "title": "Чехол на iPhone 5",
                       "price": "750",
                       "colors": ["Pink"],
                       "images": [
                           "img/cases/case-2/pink.jpg",
                       ],
                       "description": [
                           "Ультра-тонкий чехол на iPhone 5 из полиуретана",
                           "Легко держится в руке, не скользит",
                           "Защищает смартфон от царапин и сколов",
                           "Удобные вырезы для кнопок, камер, портов"
                       ],
                       "characteristics": {
                           "manufacturers": ["Apple"],
                           "materials": ["Полиуретан"],
                           "availability": "10",
                           "models": ["iPhone 5"]
                       },
                       "counter": "3",
                       "comments": [],
                       "date": "04/30/2018"
                   },
                   {
                       "articul": "3",
                       "title": "Чехол на iPhone 5",
                       "price": "900",
                       "colors": ["White"],
                       "images": [
                           "img/cases/case-3/white.jpg",
                       ],
                       "description": [
                           "Прочный чехол на iPhone 5 из стекла",
                           "Легко держится в руке, не скользит",
                           "Защищает смартфон от царапин и сколов",
                           "Удобные вырезы для кнопок, камер, портов"
                       ],
                       "characteristics": {
                           "manufacturers": ["Apple"],
                           "materials": ["Стекло"],
                           "availability": "10",
                           "models": ["iPhone 5"]
                       },
                       "counter": "4",
                       "comments": [],
                       "date": "05/01/2018"
                   },
                   {
                       "articul": "4",
                       "title": "Чехол на iPhone 5",
                       "price": "750",
                       "colors": ["Pink", "Blue", "Orange"],
                       "images": [
                           "img/cases/case-4/pink.jpg",
                           "img/cases/case-4/blue.jpg",
                           "img/cases/case-4/orange.jpg",
                       ],
                       "description": [
                           "Ультра-тонкий пластиковый чехол для iPhone 5",
                           "Легко держится в руке, не скользит",
                           "Защищает смартфон от царапин и сколов",
                           "Удобные вырезы для кнопок, камер, портов"
                       ],
                       "characteristics": {
                           "manufacturers": ["Apple"],
                           "materials": ["Пластик"],
                           "availability": "10",
                           "models": ["iPhone 5"]
                       },
                       "counter": "5",
                       "comments": [],
                       "date": "05/02/2018"
                   }
               ],

               "Samsung": [
                   {
                       "articul": "5",
                       "title": "Чехол на Samsung Galaxy",
                       "price": "650",
                       "colors": ["Green", "Orange", "Violet"],
                       "images": [
                           "img/cases/case-5/orange.jpg",
                           "img/cases/case-5/green.jpg",
                           "img/cases/case-5/purple.jpg"
                       ],
                       "description": [
                           "Ультра-тонкий пластиковый чехол на Samsung Galaxy",
                           "Легко держится в руке, не скользит",
                           "Защищает смартфон от царапин и сколов",
                           "Удобные вырезы для кнопок, камер, портов"
                       ],
                       "characteristics": {
                           "manufacturers": ["Samsung"],
                           "materials": ["Пластик"],
                           "availability": "10",
                           "models": ["Samsung Galaxy"]
                       },
                       "counter": "6",
                       "comments": [],
                       "date": "05/03/2018"
                   },
               ],
               "Huawei": [
                   {
                       "articul": "6",
                       "title": "Чехол на Huawei",
                       "price": "850",
                       "colors": ["Yellow"],
                       "images": [
                           "img/cases/case-6/yellow.jpg",
                       ],
                       "description": [
                           "Ультра-тонкий пластиковый чехол на Huawei",
                           "Легко держится в руке, не скользит",
                           "Защищает смартфон от царапин и сколов",
                           "Удобные вырезы для кнопок, камер, портов"
                       ],
                       "characteristics": {
                           "manufacturers": ["Huawei"],
                           "materials": ["Стекло"],
                           "availability": "10",
                           "models": ["Huawei LW"]
                       },
                       "counter": "6",
                       "comments": [],
                       "date": "05/04/2018"
                   },
               ]
           },
           "glass": {
               "Apple": [
                   {
                       "articul": "7",
                       "title": "Защитное стекло на IPhone 6",
                       "price": "400",
                       "colors": ["Transparent"],
                       "images": [
                           "img/glass/glass-1/white.jpg"
                       ],
                       "description": [
                           "Прочное защитное стекло на iPhone 6",
                           "Прозрачное стекло для экрана телефона",
                           "Толщина экрана-0,2 мм",
                           "Легко устанавливается и не скользит"
                       ],
                       "characteristics": {
                           "manufacturers": ["Apple"],
                           "materials": ["Стекло"],
                           "availability": "7",
                           "models": ["iPhone 6"]
                       },
                       "counter": "2",
                       "comments":[],
                       "date": "05/05/2018"
                   },
                   {
                       "articul": "8",
                       "title": "Защитное стекло на iPhone 5",
                       "price": "750",
                       "colors": ["Transparent"],
                       "images": [
                           "img/glass/glass-2/white.jpg"
                       ],
                       "description": [
                           "Прочное защитное стекло на iPhone 6",
                           "Прозрачное стекло для экрана телефона",
                           "Толщина экрана-0,2 мм",
                           "Легко устанавливается и не скользит"
                       ],
                       "characteristics": {
                           "manufacturers": ["Apple"],
                           "materials": ["Стекло"],
                           "availability": "4",
                           "models": ["iPhone 5"]
                       },
                       "counter": "2",
                       "comments": [],
                       "date": "05/06/2018"
                   }
               ],
               "Samsung": [
                   {
                       "articul": "9",
                       "title": "Защитное стекло на Samsung Galaxy",
                       "price": "650",
                       "colors": ["Transparent"],
                       "images": [
                           "img/glass/glass-3/white.jpg"
                       ],
                       "description": [
                           "Прочное защитное стекло на Samsung Galaxy",
                           "Прозрачное стекло для экрана телефона",
                           "Толщина экрана-0,2 мм",
                           "Легко устанавливается и не скользит"
                       ],
                       "characteristics": {
                           "manufacturers": ["Samsung"],
                           "materials": ["Стекло"],
                           "availability": "3",
                           "models": ["Samsung Galaxy"]
                       },
                       "counter": "2",
                       "comments": [],
                       "date": "05/07/2018"
                   },
                   {
                       "articul": "10",
                       "title": "Защитное стекло на Samsung Galaxy",
                       "price": "430",
                       "colors": ["Transparent"],
                       "images": [
                           "img/glass/glass-4/white.jpg"
                       ],
                       "description": [
                           "Прочное защитное стекло на Samsung Galaxy",
                           "Прозрачное стекло для экрана телефона",
                           "Толщина экрана-0,2 мм",
                           "Легко устанавливается и не скользит"
                       ],
                       "characteristics": {
                           "manufacturers": ["Samsung"],
                           "materials": ["Стекло"],
                           "availability": "5",
                           "models": ["Samsung Galaxy"]
                       },
                       "counter": "2",
                       "comments": [],
                       "date": "05/08/2018"
                   },
                   {
                       "articul": "11",
                       "title": "Защитное стекло на Samsung Galaxy",
                       "price": "650",
                       "colors": ["Transparent"],
                       "images": [
                           "img/glass/glass-5/black.jpg"
                       ],
                       "description": [
                           "Прочное защитное стекло на Samsung Galaxy",
                           "Прозрачное стекло для экрана телефона",
                           "Толщина экрана-0,2 мм",
                           "Легко устанавливается и не скользит"
                       ],
                       "characteristics": {
                           "manufacturers": ["Samsung"],
                           "materials": ["Стекло"],
                           "availability": "5",
                           "models": ["Samsung Galaxy"]
                       },
                       "counter": "4",
                       "comments": [],
                       "date": "05/09/2018"
                   }

               ],
               "Huawei": [
                   {
                       "articul": "12",
                       "title": "Защитное стекло на Huawei LW",
                       "price": "790",
                       "colors": ["Transparent"],
                       "images": [
                           "img/glass/glass-6/white.jpg"
                       ],
                       "description": [
                           "Прочное защитное стекло на Huawei LW",
                           "Прозрачное стекло для экрана телефона",
                           "Толщина экрана-0,2 мм",
                           "Легко устанавливается и не скользит"
                       ],
                       "characteristics": {
                           "manufacturers": ["Huawei"],
                           "materials": ["Стекло"],
                           "availability": "5",
                           "models": ["Huawei LW"]
                       },
                       "counter": "4",
                       "comments": [],
                       "date": "05/10/2018"
                   },
                   {
                       "articul": "13",
                       "title": "Защитное стекло на Huawei LW",
                       "price": "750",
                       "colors": ["Transparent"],
                       "images": [
                           "img/glass/glass-7/white.jpg"
                       ],
                       "description": [
                           "Прочное защитное стекло на Huawei LW",
                           "прозрачное стекло для экрана телефона",
                           "толщина экрана-0,2 мм",
                           "легко устанавливается и не скользит"
                       ],
                       "characteristics": {
                           "manufacturers": ["Huawei"],
                           "materials": ["Стекло"],
                           "availability": "5",
                           "models": ["Huawei LW"]
                       },
                       "counter": "4",
                       "comments": [],
                       "date": "05/11/2018"
                   }
               ]
           },
           "chargers": {
               "Apple": [
                   {
                       "articul": "14",
                       "title": "Зарядное устройство для iPhone 5/6",
                       "price": "1700",
                       "colors": ["White"],
                       "images": [
                           "img/chargers/charger-1/white.jpg"
                       ],
                       "description": [
                           "Зарядное устройство для iPhone 5/6",
                           "Сетевое зарядное устройство с USB разъемом",
                           "Приятный внешний вид",
                           "Высокое качество"
                       ],
                       "characteristics": {
                           "manufacturers": ["Apple"],
                           "materials": ["Пластик"],
                           "availability": "10",
                           "models": [
                               "iPhone 5",
                               "iPhone 6"
                           ]
                       },
                       "counter": "6",
                       "comments": [],
                       "date": "05/12/2018"
                   },
                   {
                       "articul": "15",
                       "title": "Зарядное устройство для iPhone 5/6",
                       "price": "1900",
                       "colors": ["White"],
                       "images": [
                           "img/chargers/charger-2/white.jpg"
                       ],
                       "description": [
                           "Зарядное устройство для iPhone 5/6",
                           "Сетевое зарядное устройство с USB разъемом",
                           "Подходит для дома и офиса",
                           "Высокое качество"
                       ],
                       "characteristics": {
                           "manufacturers": ["Apple"],
                           "materials": ["Пластик"],
                           "availability": "10",
                           "models": [
                               "iPhone 5",
                               "iPhone 6"
                           ]
                       },
                       "counter": "2",
                       "comments": [],
                       "date": "05/13/2018"
                   }
               ],
               "Samsung": [
                   {
                       "articul": "16",
                       "title": "Зарядное устройство для Samsung Galaxy",
                       "price": "2700",
                       "colors": ["Black"],
                       "images": [
                           "img/chargers/charger-3/black.jpg"
                       ],
                       "description": [
                           "Зарядное устройство для Samsung Galaxy",
                           "Зарядное устройство с USB разъемом",
                           "Высокое качество",
                           "Совместимо со многими телефонами"
                       ],
                       "characteristics": {
                           "manufacturers": ["Samsung"],
                           "materials": ["Пластик"],
                           "availability": "10",
                           "models": [
                               "Samsung Galaxy",
                               "iPhone"
                           ]
                       },
                       "counter": "2",
                       "comments": [],
                       "date": "05/14/2018"
                   },
                   {
                       "articul": "17",
                       "title": "Зарядное устройство для Samsung Galaxy",
                       "price": "1600",
                       "colors": ["White"],
                       "images": [
                           "img/chargers/charger-4/white.jpg"
                       ],
                       "description": [
                           "Зарядное устройство для Samsung Galaxy",
                           "Сетевое зарядное устройство с USB разъемом",
                           "Высокое качество"
                       ],
                       "characteristics": {
                           "manufacturers": ["Samsung"],
                           "materials": ["Пластик"],
                           "availability": "10",
                           "models": ["Samsung Galaxy"]
                       },
                       "counter": "10",
                       "comments": [],
                       "date": "05/15/2018"
                   }
               ],
               "Huawei": [
                   {
                       "articul": "18",
                       "title": "Зарядное устройство для Huawei LW",
                       "price": "950",
                       "colors": ["Black"],
                       "images": [
                           "img/chargers/charger-5/black.jpg"
                       ],
                       "description": [
                           "Зарядное устройство для Huawei LW",
                           "Зарядное устройство с USB разъемом",
                           "Высокое качество"
                       ],
                       "characteristics": {
                           "manufacturers": ["Huawei"],
                           "materials": ["Пластик"],
                           "availability": "10",
                           "models": ["Huawei LW"]
                       },
                       "counter": "10",
                       "comments": [],
                       "date": "05/16/2018"
                   },
                   {
                       "articul": "19",
                       "title": "Зарядное устройство для Huawei LW",
                       "price": "950",
                       "colors": ["Black"],
                       "images": [
                           "img/chargers/charger-6/black.jpg"
                       ],
                       "description": [
                           "Зарядное устройство для Huawei LW",
                           "Зарядное устройство с USB разъемом",
                           "Высокое качество"
                       ],
                       "characteristics": {
                           "manufacturers": ["Huawei"],
                           "materials": ["Пластик"],
                           "availability": "10",
                           "models": ["Huawei LW"]
                       },
                       "counter": "10",
                       "comments": [],
                       "date": "05/17/2018"
                   }
               ]
           }
       },
       "carousel": [
            {"img": "img/main-carousel/slide-image-1.jpg", "title": "Коллекция техники", "text": "Уже в продаже", "link": "url"},
            {"img": "img/main-carousel/slide-image-2.jpg", "title": "Новый Iphone", "text": "Успей купить", "link": "url"},
            {"img": "img/main-carousel/slide-image-3.jpeg", "title": "Старый Iphone", "text": "Скидочки", "link": "url"},
            {"img": "img/main-carousel/slide-image-4.jpg", "title": "Лес!!!", "text": "Успей сходить", "link": "url"},
       ],
       "advertising": {
           "advert1": {"img": "src", "text": "text", "link": "url"}
       },
       "team": {
           "Dan": {"img": "img", "position": "position"},
           "Sergey": {"img": "img", "position": "position"},
           "Marina": {"img": "img", "position": "position"}
       },
       "users": {
           "login1": {
               "name": "",
               "password": ""
           },
           "login2": {
               "name": "",
               "password": ""
           },
           "login3": {
               "name": "",
               "password": ""
           },
           "login4": {
               "name": "",
               "password": ""
           }
       },
       "conformity": {
           "cases": "Чехлы",
           "glass": "Защитное стекло",
           "chargers": "Зарядные устройства",
       }
   };
let categories = data.categories,
    conformity = data.conformity,
    carouselSlides = data.carousel,
    items=[],
    popularItems;

for (let category in categories) {
    for (let company in categories[category]) {
        for (let item in categories[category][company]){
            items.push(categories[category][company][item]);
        }
    }
}

items = _.reverse(items.sort((a, b) => {
    let firsDate = moment(a.date, "MM-DD-YYYY");
    let secondDate = moment(b.date, "MM-DD-YYYY");
    return firsDate.diff(secondDate, 'days');
}));


popularItems = items.slice(0);
popularItems = _.reverse(popularItems.sort((a, b) => {
    return a.counter - b.counter;
}));



// console.log(popularItems);
// console.log(itemsFromNewToOld);
