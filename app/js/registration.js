'use strict';
let result;
let topInfo = $('#topInfo');
let createElement = (element, className, parent)=> {
    $(element).addClass(className);
    $(parent).append(element);
};
let createExitBtn = (user)=>{
    let exitBtn = document.createElement('button');
    let exitIcon = document.createElement('i');
    createElement(exitIcon, ['fa', 'fa-sign-out-alt'], exitBtn);
    createElement(exitBtn, '', topInfo);
    $(exitBtn).on('click', exitUser);
};
let exitUser = (user)=>{
    topInfo[0].removeChild(topInfo[0].lastChild);
    createEnterBtn();
    localStorage.removeItem('checkUser');
};
let createEnterBtn = ()=>{
    let enterBtn = document.createElement('button');
    let enterIcon = document.createElement('i');
    createElement(enterIcon, ['fa', 'fa-sign-in-alt'], enterBtn);
    createElement(enterBtn,'', topInfo);
    $(enterBtn).attr('data-toggle', 'modal');
    $(enterBtn).attr('data-target', '#registerForm');
    $(enterBtn).on('click', enterUser);
};
let enterUser = ()=>{
    $('#formRegister').html('');
    let loginLabel = $('<label>');
    let labelLoginP = document.createElement('p');
    $(labelLoginP).html('Логин:');
    $(loginLabel).append(labelLoginP);

    $('#formRegister').append(loginLabel);
    let passwordLabel = $('<label>');
    let labelPasswordP = document.createElement('p');
    $(labelPasswordP).html('Пароль:');
    $(passwordLabel).append(labelPasswordP);
    $('#formRegister').append(passwordLabel);

    let enterLogin = document.createElement('input');
    createInput(enterLogin, 'text', 'Your Login', 'enterLogin', $(loginLabel));
    let enterPassword = document.createElement('input');
    createInput(enterPassword, 'password', 'Your Password', 'enterPassword', $(passwordLabel));
    let enterUserBtn = document.createElement('input');
    createBtn(enterUserBtn, $('#formRegister'), 'Вoйти');
    let errorMsg = document.createElement('p');
    $(errorMsg).html('');
    $('#formRegister').append(errorMsg);
    $(enterUserBtn).on('click', ()=>{
        createEnterMsg(enterLogin, enterPassword, errorMsg);
    });
};


let createEnterMsg = (enterLogin, enterPassword, errorMsg)=>{
    if(!users[0]) {
        $(errorMsg).html('Зарегестрируйтесь, пожалуйста');
    }else if(!enterLogin.value||!enterPassword.value){
        $(errorMsg).html('Заполните поля');
    } else if((users[0].email===enterLogin.value)&&(users[0].password===enterPassword.value)){
        $('#registerForm').modal('toggle');
        $(welcome).show('fade');
        $(welcome).addClass('welcome');
        $(welcome).html(`Добро пожаловать, ${users[0].name}`);
        setTimeout(()=>$(welcome).hide('fade'), 2000);
        topInfo[0].removeChild(topInfo[0].lastChild);
        createExitBtn();
        let checkUserJson = 'user enter';
        localStorage['checkUser'] = checkUserJson;
    } else if((users[0].email===enterLogin.value)&&(users[0].password!=enterPassword.value)) {
        $(errorMsg).html('Не верно указан пароль');
    } else if(users[0].email!=enterLogin.value) {
        $(errorMsg).html('Пользователь с таким emаil не разегестрирован');
    }
};
let welcome = document.createElement('div');
createElement(welcome, '', $('body'));
let users = [];
if(localStorage.getItem('usersArray')) {
    users = JSON.parse(localStorage['usersArray']);
}
function showMessage(error, message) {
    $(error).text('');
    $(error).text(message);
}
let emailValid = (formElement, error) => {
    let pattern = /^.+@.+\..+$/i;
    result = pattern.exec(formElement);
    if (!result) {
        return showMessage(error, 'Введите корректную почту');
    } else {
        return true;
    }
};
let nameValid  = (formElement, error) => {
    let pattern = /^[A-Z][a-z]{1,}\s([A-Z][a-z]{1,})+$/;
    let result = pattern.exec(formElement);
    if (!result) {
        return showMessage(error, 'Введите корректное имя');
    } else {
        return true;
    }
};
let passwordValid = (password, secondPassword, error) => {
    if (password!==secondPassword) {
        return showMessage(error, 'Пароли должны быть одинаковыми');
    } else {
        return true;
    }
};

let createInput = (element, type, placeholder, name, parent)=>{
    $(element).attr('type', type);
    $(element).attr('placeholder', placeholder);
    $(element).attr('name', name);
    $(parent).append(element);
};
let createBtn = (element, parent, value) =>{
    $(element).addClass('btn');
    $(element).attr('value', value);
    $(element).attr('type', 'button');
    $(parent).append(element);
};
let localWelcome = (elem) =>{
    let welcomeJson = JSON.stringify(elem);
    localStorage['welcome'] = welcomeJson;
};

let localForm = (arr) =>{
    let usersJson = JSON.stringify(arr);
    localStorage['usersArray'] = usersJson;
};

let registerUser = (formRegistration, nameFormRegister, emailFormRegister, passwordFormRegister, error, stickBlock, passwordSecondFormRegister) =>{
    let name = nameFormRegister.value;
    let email = emailFormRegister.value;
    let password = passwordFormRegister.value;
    let secondPassword = passwordSecondFormRegister.value;
    let registerArr = [name, email, password];
    $(error).html('');
    registerArr.forEach((elem) =>{
        if(!elem){
            $(error).html('Заполните все поля');
        } else{
            $(error).html('');
        }
    });
    if(!error.childNodes.length){
        if(nameValid(name, error) && emailValid(email, error)&&passwordValid(password, secondPassword, error)){
            $(error).html('Регистрация успешна');

            let user = {name:name, email:email, password:password};
            users.push(user);
            localForm(users);
            $(stickBlock).addClass('hidden');

            setTimeout(()=>{$('#registerForm').modal('toggle')}, 1000);
            $(welcome).addClass('welcome');
            $(welcome).show('fade');
            $(welcome).html(`Добро пожаловать, ${name}`);
            setTimeout(()=>$(welcome).hide('fade'), 3000);
            localWelcome(welcome);
            topInfo[0].removeChild(topInfo[0].lastChild);
            createExitBtn();
            let checkUserJson = 'user enter';
            localStorage['checkUser'] = checkUserJson;
        }
    }
};
let showRegisterForm = (stickBlock) => {
    let formRegistration = $('#formRegister');
    $(formRegistration).html('');
    let form = document.createElement('form');
    createElement(form, '', formRegistration);
    let nameLabel = $('<label>');
    let labelNameP = document.createElement('p');
    $(labelNameP).html('Имя:');
    $(nameLabel).append(labelNameP);

    $(form).append(nameLabel);
    let emailLabel = $('<label>');
    $(form).append(emailLabel);
    let labelEmailP = document.createElement('p');
    $(labelEmailP).html('Email:');
    $(emailLabel).append(labelEmailP);
    let passwordLabel = $('<label>');
    let labelPasswordP = document.createElement('p');
    $(labelPasswordP).html('Пароль:');
    $(passwordLabel).append(labelPasswordP);
    $(form).append(passwordLabel);

    let passwordSecondLabel = $('<label>');
    let labelSecondPasswordP = document.createElement('p');
    $(labelSecondPasswordP).html('Повторите пароль:');
    $(passwordSecondLabel).append(labelSecondPasswordP);
    $(form).append(passwordSecondLabel);
    let nameFormRegister = document.createElement('input');
    createInput(nameFormRegister, 'text', 'Enter your name', 'name', nameLabel );
    let emailFormRegister = document.createElement('input');
    createInput(emailFormRegister, 'text', 'Enter your email', 'email', emailLabel );
    let passwordFormRegister = document.createElement('input');
    createInput(passwordFormRegister, 'password', 'Enter your password', 'password', passwordLabel );
    let passwordSecondFormRegister = document.createElement('input');
    createInput(passwordSecondFormRegister, 'password', 'Enter your password', 'password', passwordSecondLabel );
    let sendBtn = document.createElement('input');
    createBtn(sendBtn, form, 'Зарегестрироваться и войти');
    let error = document.createElement('p');
    createElement(error, '', formRegistration);
    $(sendBtn).on('click', () => {
        registerUser(formRegistration, nameFormRegister, emailFormRegister, passwordFormRegister, error, stickBlock, passwordSecondFormRegister);
    });
};
let createStickBlock = () =>{
    let stickBlock = document.createElement('div');
    createElement(stickBlock, 'stickBlock', 'body');
    $(stickBlock).addClass('stickBlock');
    let stickText = document.createElement('p');
    createElement(stickText, 'stickText', stickBlock);
    $(stickText).html('Register now and get 10% sale!');
    let stickBtn = document.createElement('input');
    createBtn(stickBtn, stickBlock, 'Press to register');
    $(stickBtn).attr('data-toggle', 'modal');
    $(stickBtn).attr('data-target', '#registerForm');
    createElement(stickBtn, ['btn', 'stickBtn'], '');
    $(stickBtn).on('click', () =>{
        showRegisterForm(stickBlock);
    });
};
$(document).ready(function() {
    if(!localStorage.getItem('welcome')) {
        createStickBlock();
        topInfo[0].removeChild(topInfo[0].lastChild);
        createEnterBtn();
    } else if(localStorage.getItem('checkUser')){
        topInfo[0].removeChild(topInfo[0].lastChild);
        createExitBtn();
    } else{
        topInfo[0].removeChild(topInfo[0].lastChild);
        createEnterBtn();
    }
});
