/* ДЗ 3 - работа с исключениями и отладчиком */

/*
 Задание 1:

 1.1: Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива

 1.2: Необходимо выбрасывать исключение в случаях:
   - array не массив или пустой массив (с текстом "empty array")
   - fn не является функцией (с текстом "fn is not a function")

 Зарпещено использовать встроенные методы для работы с массивами

 Пример:
   isAllTrue([1, 2, 3, 4, 5], n => n < 10) // вернет true
   isAllTrue([100, 2, 3, 4, 5], n => n < 10) // вернет false
 */
function isAllTrue(array, fn) {
    if (array.length == 0 || !Array.isArray(array)) {
        throw new Error('empty array');
    }
    if (typeof fn != 'function') {
        throw new Error('fn is not a function');
    }

    let result = true;

    for (const elem of array) {
        if (fn(elem) != true) {
            result = false;
        }
    }

    return result;
}

try {
    console.log(isAllTrue([100, 2, 3, 4, 5], 56));
} catch (e) {
    console.log(e.message);
}

/*
 Задание 2:

 2.1: Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива

 2.2: Необходимо выбрасывать исключение в случаях:
   - array не массив или пустой массив (с текстом "empty array")
   - fn не является функцией (с текстом "fn is not a function")

 Зарпещено использовать встроенные методы для работы с массивами

 Пример:
   isSomeTrue([1, 2, 30, 4, 5], n => n > 20) // вернет true
   isSomeTrue([1, 2, 3, 4, 5], n => n > 20) // вернет false
 */
function isSomeTrue(array, fn) {
    if (array.length == 0 || !Array.isArray(array)) {
        throw new Error('empty array');
    }
    if (typeof fn != 'function') {
        throw new Error('fn is not a function');
    }

    let result = false;

    for (const elem of array) {
        if (fn(elem) == true) {
            result = true;
        }
    }

    return result;
}

try {
    console.log(isSomeTrue([1, 2, 3, 4, 5], n => n > 20));
} catch (e) {
    console.log(e.message);
}

/*
 Задание 3:

 3.1: Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запустить fn для каждого переданного аргумента (кроме самой fn)

 3.2: Функция должна вернуть массив аргументов, для которых fn выбросила исключение

 3.3: Необходимо выбрасывать исключение в случаях:
   - fn не является функцией (с текстом "fn is not a function")
 */

function returnBadArguments(fn, ...rest) {
    if (typeof fn != 'function') {
        throw new Error('fn is not a function');
    }

    if (rest.length == 0) {
        return [];
    }
    let exepArr = [];

    for (const elem of rest) {
        try {
            fn(elem);
        } catch (e) {
            exepArr.push(elem);
            console.log(e.message);
        } 
    }
    
    return exepArr;
}

let checkEven = n => {
    if (n % 2 != 0) {
        throw new Error('not even');
    }
}

try {
    console.log(returnBadArguments(checkEven, 7, 4, 8, 3, 1));
} catch (e) {
    console.log(e.message);
} 

/*
 Задание 4:

 4.1: Функция имеет параметр number (по умолчанию - 0)

 4.2: Функция должна вернуть объект, у которого должно быть несколько методов:
   - sum - складывает number с переданными аргументами
   - dif - вычитает из number переданные аргументы
   - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
   - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно

 4.3: Необходимо выбрасывать исключение в случаях:
   - number не является числом (с текстом "number is not a number")
   - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number = 0) {
    if (typeof number != 'number' && !isFinite(number)) {
        throw new Error('number is not a number');
    }

    return {
        sum(...args) {
            return args.reduce((prev, elem) => prev + elem, number);
        },
        dif(...args) {
            return args.reduce((prev, elem) => prev - elem, number);
        },
        div(...args) {
            args.forEach(elem => {
                if (elem === 0) {
                    throw new Error('division by 0');
                }
            });

            return args.reduce((prev, elem) => prev / elem, number);
        },
        mul(...args) {
            return args.reduce((prev, elem) => prev * elem, number);
        }
    }
}

try {
    console.log(calculator(20).sum(1, 2, 5));
    console.log(calculator(20).dif(1, 2, 5));
    console.log(calculator(20).div(1, 2, 5));
    console.log(calculator(20).mul(1, 2));
    console.log(calculator(20).div(1, 0));
} catch (e) {
    console.log(e.message);
}

/* При решении задач, пострайтесь использовать отладчик */

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    calculator
};
