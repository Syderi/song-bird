import birdsDataEN from "./data/_birdsData_en"
import birdsDataRU from "./data/_birdsData_ru"
import {createGameCard} from "./_create_gallery"
import {createRandomCard} from "./_create_random_card"


// Начало ОСНОВНЫЕ КОНСТАНТЫ
const gameChoiseConteiner = document.querySelector(".game__choice")
const gameNextButton = document.querySelector(".game__next-button")
const gameScoreCount = document.querySelector(".game__score__count")
let gameScore = 0;
let countLoop = 0;
let keyBlockChoiseColor = false
let numberOfAttempts = 5

let mainArray = birdsDataRU.slice() // Создал копию массива от базы. ссылки объекты
let loopArray = getloopArray(countLoop) // Взял часть массива
let randomLoopValue = getRandomNum(0, 6) // Правильный ответ 0-5

// Создал карточку рандомную
const mainGame = document.querySelector(".main__game")
const gameCardRandom = createRandomCard(mainArray, 37, false)
mainGame.insertBefore(gameCardRandom, mainGame.children[1])
// Конец создания карточеки рандомной

// Создал карточку просмотра ответов
const gamePlayWrapper = document.querySelector(".game__play__wrapper")
let gameCardgame = createGameCard(mainArray,37)
gamePlayWrapper.insertBefore(gameCardgame, gamePlayWrapper.children[1])
// Конец создания карточек просмотра ответа

// Начало Функция заполнения вопросов
function repaceGameChoiceItem(array = loopArray) {
   array.forEach((element,index,arr) => {
      gameChoiseConteiner.children[index].innerHTML = `<span class="game__choice__item-btn"></span>${element.name}`
   });
   const gameChoiceItemSpan = document.querySelectorAll(".game__choice__item-btn")
   array.forEach((element,index,arr) => {
      gameChoiceItemSpan[index].className = "game__choice__item-btn"

   });
};
repaceGameChoiceItem()
// Конец Функция заполнения вопросов

// Конец ОСНОВНЫЕ КОНСТАНТЫ

// Начало функция возврата части главного массива
function getloopArray(currentLoop = countLoop) {
return mainArray.slice(currentLoop*6,((currentLoop*6)+6))
}
// Конец функция возврата части главного массива

// Начало функция возврата ID главного массива
function getmainArrayID (index, currentLoop = countLoop) {
return (currentLoop*6 + index + 1)
}
// Конец функция возврата ID главного массива

// Начало Функция случайного числа
function getRandomNum(min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
};
// Конец Функция случайного числа

// Начало фунции заполнения игры Создаю рандом и карту с заданием 
function createGameWthisRandom(array = loopArray, randomValue = randomLoopValue) {
   let id = array[randomValue].id
   gameCardgame = createGameCard(mainArray,37)
   mainGame.children[1].replaceWith(createRandomCard(mainArray, id, false))
   gamePlayWrapper.children[1].replaceWith(gameCardgame)
}

createGameWthisRandom()
// Конец фунции заполнения игры

// Начало слушатель кликов на выборе птиц
gameChoiseConteiner.addEventListener("click", (e) => {
if (e.target.classList.contains('game__choice__item')) {
   const gameChoiceItemSpan = document.querySelectorAll(".game__choice__item-btn")
   let clickedTag = e.target;
   const numberli = clickedTag.closest(".game__choice__item");
   const indexNumberLi = Array.from(gameChoiseConteiner.children).indexOf(numberli);
   const mainArrayID = getmainArrayID(indexNumberLi)

   gamePlayWrapper.children[1].replaceWith(createGameCard(mainArray, mainArrayID))


   // console.log(gameChoiceItemSpan[indexNumberLi].classList.contains("game__choice__item-btn_red"))

// console.log(randomLoopValue)
if (randomLoopValue === indexNumberLi) {
   if (!keyBlockChoiseColor) {
         gameChoiceItemSpan[indexNumberLi].classList.add("game__choice__item-btn_green")
         gameScore =+ numberOfAttempts

         gameScoreCount.textContent = gameScore
         mainGame.children[1].replaceWith(createRandomCard(mainArray, mainArrayID, true))
         gameNextButton.disabled = false
   }
   keyBlockChoiseColor = !keyBlockChoiseColor

} else {
   if (!keyBlockChoiseColor) {
      if (!gameChoiceItemSpan[indexNumberLi].classList.contains("game__choice__item-btn_red")) {
                     numberOfAttempts --
      }
            gameChoiceItemSpan[indexNumberLi].classList.add("game__choice__item-btn_red")

   }

}
}
console.log("numberOfAttempts====",numberOfAttempts)
})
// Конец слушатель кликов на выборе птиц


// Начало слушатель на Главном Баттоне
gameNextButton.addEventListener("click", ()=> {
console.log("УРА КНОПКА ЗАРАБОТАЛА")
countLoop++
console.log("countLoop",countLoop)
})
// Конец  слушатель на Главном Баттоне



// gameCardgame.addEventListener("click", (e) => {
//    console.log("10000===",e);
// })



// setTimeout(() => {
//    gameCardgame = createGameCard(birdsDataRU,16)
//    gameCardgame.addEventListener("click", (e) => {
//       console.log("10000===",e);
//    })
   
//     gamePlayWrapper.children[1].replaceWith(createGameCard(birdsDataRU,16))
// }, 10000);
// setTimeout(() => {
//    gameCardgame = createGameCard(birdsDataRU,17)
//    gameCardgame.addEventListener("click", (e) => {
//       console.log("10000===",e);
//    })
   
//     gamePlayWrapper.children[1].replaceWith(createGameCard(birdsDataRU,17))
// }, 10000);
// setTimeout(() => {
//    gameCardgame = createGameCard(birdsDataRU,18)
//    gameCardgame.addEventListener("click", (e) => {
//       console.log("10000===",e);
//    })
   
//     gamePlayWrapper.children[1].replaceWith(createGameCard(birdsDataRU,18))
// }, 10000);
// setTimeout(() => {
//    gameCardgame.addEventListener("click", (e) => {
//       console.log("10000===",e);
//    })
   
//    gameCardgame = createGameCard(birdsDataRU,19)
//     gamePlayWrapper.children[1].replaceWith(createGameCard(birdsDataRU,19))
// }, 10000);


// Начало основной фунции игры


// function maneGame(arrayData) {


// }

// maneGame(birdsDataRU)



// Конец основной фунции игры





















// // Начало Функция перемешивания массива
// function shuffle(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//        const j = Math.floor(Math.random() * (i + 1));
//        [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//  }
//  // Конец Функция перемешивания массива

