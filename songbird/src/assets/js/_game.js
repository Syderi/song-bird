import birdsDataEN from "./data/_birdsData_en";
import birdsDataRU from "./data/_birdsData_ru";
import { createGameCard } from "./_create_gallery";
import { createRandomCard } from "./_create_random_card";
import { addTagsClickHandler } from "./_choice_page"
import correctAnswer from "../audio/pravilnyiy-otvet.mp3";
import wrongAnswer from "../audio/nepravilnyiy-otvet.mp3";


// addTagsClickHandler()

// Начало ОСНОВНЫЕ КОНСТАНТЫ
const correctAudio = new Audio(correctAnswer);
// correctAudio.play()
correctAudio.volume = 0.5;

const wrongAudio = new Audio(wrongAnswer);
// wrongAudio.play()
wrongAudio.volume = 0.9;

const gameChoiseConteiner = document.querySelector(".game__choice");
const gameNextButton = document.querySelector(".game__next-button");
const resultNewGameButton = document.querySelector(".result__new-game-button");
const gameScoreCount = document.querySelector(".game__score__count");
const navItemResult = document.querySelector(".nav__item_result");
const resultMessage = document.querySelector(".result__message");
const navItemGame = document.querySelector(".nav__item_game");
const resultDescriptionScore = document.querySelector(".result_description_score");




let gameScore = 0;
let countLoop = 0;
let keyBlockChoiseColor = false;
let numberOfAttempts = 5;

let mainArray = birdsDataRU.slice(); // Создал копию массива от базы. ссылки объекты
let loopArray = getloopArray(countLoop); // Взял часть массива
let randomLoopValue = getRandomNum(0, 6); // Правильный ответ 0-5
resultDescriptionScore.textContent = gameScore;
console.log("ПЕРвЫЙ РАНДОМ ОТВЕТ randomLoopValue", randomLoopValue);

// Создал карточку рандомную
const mainGame = document.querySelector(".main__game");
const gameCardRandom = createRandomCard(mainArray, 37, false);
mainGame.insertBefore(gameCardRandom, mainGame.children[1]);
// Конец создания карточеки рандомной

// Создал карточку просмотра ответов
const gamePlayWrapper = document.querySelector(".game__play__wrapper");
let gameCardgame = createGameCard(mainArray, 37);
gamePlayWrapper.insertBefore(gameCardgame, gamePlayWrapper.children[1]);
// Конец создания карточек просмотра ответа

// Начало Функция заполнения  вопросов и обновления
function repaceGameChoiceItem(array = loopArray) {
   array.forEach((element, index, arr) => {
      gameChoiseConteiner.children[
         index
      ].innerHTML = `<span class="game__choice__item-btn"></span>${element.name}`;
   });
   const gameChoiceItemSpan = document.querySelectorAll(
      ".game__choice__item-btn"
   );
   array.forEach((element, index, arr) => {
      gameChoiceItemSpan[index].className = "game__choice__item-btn";
   });
}
repaceGameChoiceItem();
// Конец Функция заполнения вопросов

// Конец ОСНОВНЫЕ КОНСТАНТЫ

// Начало функция возврата части главного массива
function getloopArray(currentLoop = countLoop) {
   return mainArray.slice(currentLoop * 6, currentLoop * 6 + 6);
}
// Конец функция возврата части главного массива

// Начало функция возврата ID главного массива
function getmainArrayID(index, currentLoop = countLoop) {
   return currentLoop * 6 + index + 1;
}
// Конец функция возврата ID главного массива

// Начало Функция случайного числа
function getRandomNum(min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
}
// Конец Функция случайного числа

// Начало фунции заполнения игры Создаю рандом и карту с заданием
function createGameWthisRandom(
   array = loopArray,
   randomValue = randomLoopValue
) {
   let id = array[randomValue].id;
   gameCardgame = createGameCard(mainArray, 37);
   mainGame.children[1].replaceWith(createRandomCard(mainArray, id, false));
   gamePlayWrapper.children[1].replaceWith(gameCardgame);
}

createGameWthisRandom();
// Конец фунции заполнения игры

// Функция перемотки аудио ошибок
function resetAudioDurationWrongCorrect() {
   wrongAudio.pause();
   wrongAudio.currentTime = 0;
   correctAudio.pause();
   correctAudio.currentTime = 0;
}
// Конец фунции перемотки аудио ошибок

// Начало фунций выделения вопроса
function changeSelectedTagsQuestion(countLoop) {
   let tags = document.querySelectorAll(".game__select__item");
   tags.forEach((tag) => {
      tag.classList.remove("active");
   });
   tags[countLoop].classList.add("active");
}
// Конец функций выделения вопроса

// Начало слушатель кликов на выборе птиц
gameChoiseConteiner.addEventListener("click", (e) => {
   if (e.target.classList.contains("game__choice__item")) {
      resetAudioDurationWrongCorrect();
      const gameChoiceItemSpan = document.querySelectorAll(".game__choice__item-btn");
      let clickedTag = e.target;
      const numberli = clickedTag.closest(".game__choice__item");
      const indexNumberLi = Array.from(gameChoiseConteiner.children).indexOf(numberli);
      const mainArrayID = getmainArrayID(indexNumberLi);

      gamePlayWrapper.children[1].replaceWith(createGameCard(mainArray, mainArrayID));
      resultNewGameButton.disabled = true

      if (randomLoopValue === indexNumberLi) {
         if (!keyBlockChoiseColor) {
            if (!gameChoiceItemSpan[indexNumberLi].classList.contains("game__choice__item-btn_green")) {
               correctAudio.play();
               gameScore = gameScore + numberOfAttempts;
               gameScoreCount.textContent = gameScore;
               resultDescriptionScore.textContent = gameScore;
               mainGame.children[1].replaceWith(createRandomCard(mainArray, mainArrayID, true));
               gameNextButton.disabled = false;

               // if(countLoop ===5) {
               //    gameNextButton.click()
               // }

            }
            gameChoiceItemSpan[indexNumberLi].classList.add("game__choice__item-btn_green");
            keyBlockChoiseColor = !keyBlockChoiseColor;
         }
      } else {
         if (!keyBlockChoiseColor) {
            if (!gameChoiceItemSpan[indexNumberLi].classList.contains("game__choice__item-btn_red")) {
               wrongAudio.play();
               numberOfAttempts--;
            }
            gameChoiceItemSpan[indexNumberLi].classList.add("game__choice__item-btn_red");
         }
      }
   }
});
// Конец слушатель кликов на выборе птиц

// Начало слушатель на Главном Баттоне
gameNextButton.addEventListener("click", () => {
   countLoop++;

   if (countLoop === 6) {
      keyBlockChoiseColor = false;
      countLoop = 0
      gameScore = 0
      gameScoreCount.textContent = gameScore
      navItemResult.click()
      if (gameScore !== 36) {
         resultNewGameButton.disabled = false
         resultMessage.textContent = "Поздарвляем. Игра окончена"
      }
      // resultMessage.textContent = "Проверка"
   }

   keyBlockChoiseColor = false;
   numberOfAttempts = 5;
   loopArray = getloopArray(countLoop); // Взял часть массива
   randomLoopValue = getRandomNum(0, 6);

   repaceGameChoiceItem();
   createGameWthisRandom();
   changeSelectedTagsQuestion(countLoop);
   gameNextButton.disabled = true;

});
// Конец  слушатель на Главном Баттоне

// Начало слушатель на Баттоне рандом
resultNewGameButton.addEventListener("click", () => {
   resultDescriptionScore.textContent = gameScore;
   navItemGame.click()
});
// Конец  слушатель на Баттоне рандом


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
