/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    const url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

    return fetch(url)
        .then(response => response.json())
        .then((towns) => {
            return towns.sort((a, b) => new Intl.Collator().compare(a.name, b.name));
        })
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    let regexp = new RegExp(chunk, 'i');

    if (full.search(regexp) > -1) {
        return true;
    }

    return false;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

filterInput.addEventListener('keyup', (e) => {
    // это обработчик нажатия кливиш в текстовом поле
    try {
        loadingBlock.style.display = 'block';
        let res = JSON.parse(sessionStorage.getItem('towns'));
        filterResult.innerHTML = '';
        let filterTowns = [];

        for (let item of res) {
            if (isMatching(item.name, e.target.value)) {
                filterTowns.push(item)
            }
        }

        filterResult.appendChild(createNodeListTowns(filterTowns));
        loadingBlock.style.display = 'none';

        if (e.target.value === '') {
            filterResult.innerHTML = '';
        }
    } catch (e) {
        throw new Error(e.message)
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        let res = await loadTowns();

        if (res) {
            filterResult.appendChild(createNodeListTowns(res));
            loadingBlock.style.display = 'none';
            filterBlock.style.display = 'block';
        }

        try {
            sessionStorage.setItem('towns', JSON.stringify(res));

        } catch (e) {
            console.error(e.message);
        }

    } catch (e) {
        console.error(e.message);
        reloadTowns();
    }
});

// Запарос данный у сервера при нажатии кнопки.
function reloadTowns() {
    const readyBlockMessage = document.querySelector('.blockMessage');

    if (readyBlockMessage) {
        readyBlockMessage.remove();
    }
    const button = document.createElement('button');
    const message = document.createElement('span');
    const blockMessage = document.createElement('div');

    blockMessage.classList.add('blockMessage');
    button.classList.add('button');
    button.textContent = 'Перезапросить данные';
    message.classList.add('message');
    message.textContent = 'Не удалось загрузить города';

    blockMessage.appendChild(button);
    blockMessage.appendChild(message);

    homeworkContainer.appendChild(blockMessage);

    button.addEventListener('click', async () => {
        try {
            let res = await loadTowns();

            if (res) {
                filterResult.appendChild(createNodeListTowns(res));
                blockMessage.textContent = '';
                loadingBlock.style.display = 'none';
                filterBlock.style.display = 'block';
            }

            try {
                sessionStorage.setItem('towns', JSON.stringify(res));
            } catch (e) {
                console.error(e.message)
            }
        } catch (e) {
            loadingBlock.textContent = '';
            reloadTowns();
        }
    });
}
// Формирование списка городов
let createNodeListTowns = (listTowns) => {
    let fragment = document.createDocumentFragment();

    for (let item of listTowns) {
        let span = document.createElement('span');
        span.innerText = item.name;
        fragment.appendChild(span);
    }

    return fragment;
};

export {
    loadTowns,
    isMatching
};
