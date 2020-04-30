/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {

    for (var i=0; i<array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let newArr = [];

    for (var i=0; i<array.length; i++) {
        newArr.push(fn(array[i], i, array));
    }
    return newArr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let arr = array;
    let n = initial ? 0 : 1;
    let sumElem = initial ? initial : array[0];

    for (var i = n; i < arr.length; i++) {
        sumElem = fn(sumElem, arr[i], i, arr);
    }

    return sumElem;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let arr = [];

    for (const name in obj) {
        arr.push(name.toUpperCase());
    }

    return arr;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {
    let arr = [];

    if (to < 0) {
        to = array.length + to;
    }
    if (from < 0) {
        from = array.length + from;
    }

    for (let i = from; i < to; i++) {
        if (array[i]) {
            arr.push(array[i])
        }
    }

    return arr;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    const handler = {
        get(target, name) {
            return target[name] ** 2;
        }
    }

    return new Proxy(obj, handler)
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
