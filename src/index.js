/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

console.log(forEach([1, 2, 4], (...args) => console.log(args[0])));

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    const resultArr = [];

    for (let i = 0; i < array.length; i++) {
        resultArr.push(fn(array[i], i, array));
    }

    return resultArr;
}

console.log(map(['HTML', 'CSS', 'JavaScript'], (...args) => args[0].length));

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let prev = (initial !== undefined) ? initial : array[0];

    let i = (initial !== undefined) ? 0 : 1;

    for (; i < array.length; i++) {
        prev = fn(prev, array[i], i, array);
    }

    return prev;
}

console.log(reduce([3, 5, 6], (...args) => args[0] = args[0] + args[1], 1));

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    return Object.keys(obj).map((item) => item.toUpperCase());
}

console.log( upperProps({ name: 'Сергей', lastName: 'Петров' }) );

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */

let isNumericOrUndef = n => 
    n == undefined || (typeof n == 'number' && !isNaN(n) && isFinite(n));

function slice(array, from, to) {
    if (!isNumericOrUndef(from) || !isNumericOrUndef(to)) {
        console.log('Введено не число');

        return;
    }
    if (from < 0) {
        from += array.length;
    }
    if (to < 0) {
        to += array.length;
    }
    let resultArr = [];

    for (let i = 0; i < array.length; i++) {
        if ((from == undefined || i >= from) && (to == undefined || i < to)) {
            resultArr.push(array[i]);
        }
    }

    return resultArr;
}

console.log(slice([0, 'a', 'b', 2, 4, 'word'], 2, 4));
console.log(slice([0, 'a', 'b', 2, 4, 'word']));
console.log(slice([0, 'a', 'b', 2, 4, 'word'], 4));
console.log(slice([0, 'a', 'b', 2, 4, 'word'], -4, 5));
console.log(slice([0, 'a', 'b', 2, 4, 'word'], 'fdh', 5));

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        set(target, prop, value) {
            target[prop] = value * value;

            return true;
        }
    });
}

let obj = {};

obj = createProxy(obj);
obj.a = 2;
obj.b = 5;
obj.c = 11;

console.log(obj);

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
