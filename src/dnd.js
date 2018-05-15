/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
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

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */

function createDiv() {
    const newDiv = document.createElement('div');

    newDiv.classList.add('draggable-div');
    newDiv.style.backgroundColor = '#' + ('00000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6);
    newDiv.style.width = randomInteger(10, 150) + 'px';
    newDiv.style.height = randomInteger(10, 150) + 'px';
    newDiv.style.position = 'absolute';
    newDiv.style.top = randomInteger(0, 400) + 'px';
    newDiv.style.left = randomInteger(0, 400) + 'px';

    return newDiv;
}

function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);

    rand = Math.floor(rand);

    return rand;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    document.addEventListener('mousedown', e => {
        if (!e.target.classList.contains('draggable-div')) {
            return;
        }
        dragDrop(e);
    });

    function dragDrop(e) {
        if (e.which != 1) {
            return;
        }
        let target = e.target;
        let divCoords = getCoords(target);

        let shiftX = e.pageX - divCoords.left;
        let shiftY = e.pageY - divCoords.top;

        target.style.position = 'absolute';
        document.body.appendChild(target); 
        moveAt(e);
        target.style.zIndex = 100;

        document.addEventListener('mousemove', moveAt);
        document.addEventListener('mouseup', dropPic);

        function moveAt(e) {
            let newLeft = e.pageX - shiftX; 
            let newtop = e.pageY - shiftY;

            target.style.left = newLeft + 'px';
            target.style.top = newtop + 'px';
        }

        function dropPic() {
            document.removeEventListener('mousemove', moveAt);
            document.removeEventListener('mouseup', dropPic);
        }

        target.ondragstart = function() {
            return false;
        }
        // отменим действие по умолчанию на mousedown (выделение текста, оно лишнее)

        return false;
    }

    function getCoords(elem) {
        let box = elem.getBoundingClientRect();

        return {
            left: box.left + pageXOffset,
            top: box.top + pageYOffset,
        };
    }
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
