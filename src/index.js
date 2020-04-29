/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    let arr = array;

    for (var i=0; i<arr.length; i++) {
        fn(arr[i], i, arr);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let arr = array;
    let newArr = [];

    for (var i=0; i<arr.length; i++) {
        newArr.push(fn(arr[i], i, arr));
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
    let n = initial === undefined ? 1 : 0;
    let sumElem = initial === undefined ? array[0] : initial;

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
function slice(array, from, to) {
    let arr = [];
    let f;
    let t;

    if (from === undefined || array.length + from < 0) {
        f = 0;
    } else if (from < 0 && Math.abs(from) < array.length) {
        f = array.length - 1 + from;
    } else if (from > array.length - 1) {
        return arr;
    } else {
        f = from;
    }

    if (to === undefined || to > array.length){
        t = array.length;
    } else if (to < 0 && Math.abs(to) < array.length) {
        t = array.length + to;
    } else if (to === 0 || array.length + to < 0){
        return arr;
    } else {
        t = to;
    }

    for (let i=f; i<t; i++) {
        arr.push(array[i]);
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
