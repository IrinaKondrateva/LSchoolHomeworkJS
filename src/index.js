/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
    return new Promise( resolve => {
        setTimeout(resolve, seconds * 1000);
    });
}

delayPromise(3).then(() => console.log('промис разрешился'));

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */

// реализация через XMLHttpRequest:

/*
function loadAndSortTowns() {
    return new Promise( (resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        xhr.responseType = 'json';
        xhr.send();
        xhr.addEventListener('load', () => {
            (xhr.status >= 400) ? reject() : resolve(xhr.response.sort(compareTowns));
        });
        xhr.addEventListener('error', () => reject(new Error('Не удалось загрузить города')));

        let compareTowns = (a, b) => 
            (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1;
    });
}

loadAndSortTowns().then(towns => console.log(towns), err => console.log(err));
*/

// реализация через fetch:

function loadAndSortTowns() {
    return fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Не удалось загрузить города');
            }

            return response.json();
        })
        .then(towns => towns.sort(compareTowns))
        .catch(e => {
            console.warn(e.message);
        })
}

function compareTowns(a, b) { 
    return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 0;
}

loadAndSortTowns().then(towns => console.log(towns));

export {
    delayPromise,
    loadAndSortTowns
};
