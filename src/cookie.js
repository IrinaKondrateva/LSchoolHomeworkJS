/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

addCookieTr(getCookies());

document.addEventListener('click', (e) => {
    if (!e.target.closest('.delete-btn')) return;
    deleteCookie(e.target.closest('tr').children[0].textContent);
    e.target.closest('tr').remove();
});

addButton.addEventListener('click', () => {
    let prevCookies = getCookies();

    setCookie(addNameInput.value, addValueInput.value, { expires: 3600 });

    if (!prevCookies[addNameInput.value] && (isMatching(addNameInput.value, filterNameInput.value) || 
        isMatching(addValueInput.value, filterNameInput.value))) {
        addCookieTr({ [`${addNameInput.value}`]: `${addValueInput.value}` });
    } else if (isMatching(addValueInput.value, filterNameInput.value)) {
        for (const row of listTable.rows) {
            if (row.children[0].textContent === addNameInput.value) {
                row.children[1].textContent = addValueInput.value;
            }
        }
    } else if (prevCookies[addNameInput.value]) {
        for (const row of listTable.rows) {
            if (row.children[0].textContent === addNameInput.value) row.remove();
        }
    }

    // addNameInput.value = addValueInput.value = '';
});

filterNameInput.addEventListener('keyup', () => {
    listTable.innerHTML = '';
    
    let cookies = getCookies();

    for (let key in cookies) {
        if (!isMatching(key, filterNameInput.value) && !isMatching(cookies[key], filterNameInput.value)) {
            delete cookies[key];
        }
    }
    addCookieTr(cookies);
});

function setCookie(name, value, options) {
    options = options || {};

    let expires = options.expires;

    if (typeof expires == 'number' && expires) {
        let d = new Date();

        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = `${name}=${value}`;

    for (let propName in options) {
        updatedCookie += '; ' + propName;
        if (options[propName] !== true) {
            updatedCookie += '=' + options[propName];
        }
    }

    document.cookie = updatedCookie;    
}

function getCookies() {
    return document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');

        if (name !== 'expires' || name !== 'path' || name !== 'domain') {
            prev[name] = value;
        }

        return prev;
    }, {});
}

function deleteCookie(name) {
    setCookie(name, '', {
        expires: -1
    })
}

function addCookieTr(cookies) {
    for (let key in cookies) {
        const newTr = document.createElement('tr');

        newTr.innerHTML += `<td>${key}</td><td>${cookies[key]}</td>`;

        const tableBtn = document.createElement('button');

        tableBtn.textContent = 'Удалить cookie';
        tableBtn.classList.add('delete-btn'); 
        
        newTr.append(tableBtn);

        listTable.append(newTr);
    }
}

function isMatching(full, chunk) {
    return (~full.toLowerCase().indexOf(chunk.toLowerCase())) ? true : false;
} 