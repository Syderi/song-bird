import birdsDataEN from "./data/_birdsData_en"
import birdsDataRU from "./data/_birdsData_ru"
import {createGameCard} from "./_create_gallery"
import {createRandomCard} from "./_create_random_card"


// Создал карточку рандомную
const mainGame = document.querySelector(".main__game")
const gameCardRandom = createRandomCard(birdsDataRU, 37, false)
mainGame.insertBefore(gameCardRandom, mainGame.children[1])
// Конец создания карточеки рандомной

// Создал карточку просмотра ответов
const gamePlayWrapper = document.querySelector(".game__play__wrapper")
const gameCardgame = createGameCard(birdsDataRU,37)
gamePlayWrapper.insertBefore(gameCardgame, gamePlayWrapper.children[1])
// Конец создания карточек просмотра ответа

// Начало Основные константы
let gameScore = 0;
let countLoop = 0;
let mainArray = birdsDataRU.slice()
console.log("mainArray",mainArray)
// Конец Основные константы

// Начало функция возврата части главного массива
function getloopArray(currentLoop) {
return mainArray.slice(currentLoop*6,((currentLoop*6)+6))
}
// Конец функция возврата части главного массива

// Взял часть массива
let loopArray = getloopArray(countLoop)
console.log("loopArray",loopArray)
// Конец взятия части массива

let randomLoopValue = getRandomNum(0, 6)
console.log("randomLoopValue",randomLoopValue)

// Начало Функция случайного числа
function getRandomNum(min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
};
// Конец Функция случайного числа

// console.log(loopArray[randomLoopValue]);

function createGameWthisRandom(array = loopArray, randomValue = randomLoopValue) {
   console.log(array[randomValue]);
   let id = array[randomValue].id
   console.log(id);


   // const mainGame = document.querySelector(".main__game")
   // const gameCardRandom = createRandomCard(birdsDataRU, 37, false)
   // mainGame.insertBefore(gameCardRandom, mainGame.children[1])


   mainGame.children[1].replaceWith(createRandomCard(mainArray, id, false))
   gamePlayWrapper.children[1].replaceWith(createGameCard(mainArray,37))
}

createGameWthisRandom()

// setTimeout(() => {
//     gamePlayWrapper.children[1].remove()
//     const gameCardgame = createGameCard(birdsDataRU,37)
//     // gameCardgame.audio.play = false
//     console.log(gameCardgame)
//     gamePlayWrapper.insertBefore(gameCardgame, gamePlayWrapper.children[1])
// }, 5000);
// setTimeout(() => {
//     gamePlayWrapper.children[1].replaceWith(createGameCard(birdsDataRU,16))
// }, 10000);
// setTimeout(() => {
//     gamePlayWrapper.children[1].replaceWith(createGameCard(birdsDataRU,17))
// }, 15000);
// setTimeout(() => {
//     gamePlayWrapper.children[1].replaceWith(createGameCard(birdsDataRU,18))
// }, 20000);
// gameCardgame.replaceWith(createGameCard(birdsDataRU,35))

// Начало основной фунции игры


// function maneGame(arrayData) {


// }

// maneGame(birdsDataRU)



// Конец основной фунции игры






// Начало Функция перемешивания массива
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
 }
 // Конец Функция перемешивания массива

