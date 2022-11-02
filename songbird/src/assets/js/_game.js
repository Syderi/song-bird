
import birdsDataEN from "./data/_birdsData_en"
import birdsDataRU from "./data/_birdsData_ru"
import {createGameCard} from "./_create_gallery"
import {createRandomCard} from "./_create_random_card"



// const mainGame = document.querySelector(".main__game")
// mainGame.append(createRandomCard(birdsDataRU, 12, false))




// Создал карточку рандомную
const mainGame = document.querySelector(".main__game")
const gameCardRandom = createRandomCard(birdsDataRU, 13, true)
mainGame.insertBefore(gameCardRandom, mainGame.children[1])
// const gamePlayWrapper = document.querySelector(".game__play__wrapper")
// const gameCardgame = createGameCard(birdsDataRU,37)
// gamePlayWrapper.insertBefore(gameCardgame, gamePlayWrapper.children[1])
// Конец создания карточеки рандомной


// Создал карточку просмотра ответов
const gamePlayWrapper = document.querySelector(".game__play__wrapper")
const gameCardgame = createGameCard(birdsDataRU,37)
gamePlayWrapper.insertBefore(gameCardgame, gamePlayWrapper.children[1])
// Конец создания карточек просмотра ответа


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
function maneGame(arrayData) {

    const gameNextButton = document.querySelector(".game__next-button")
    let gameArray = arrayData.slice()
    // console.log("gameArray",gameArray)
    let mainLoop = 0;
    // console.log(mainLoop < 6)


    // for (let mainLoop = 0; mainLoop < 6; ) {

            console.log("mainLoop",mainLoop)


            // gameNextButton.setAttribute("disabled", true)
            // gameNextButton.setAttribute("disabled", true)

    // gameNextButton.addEventListener("click", (e) => {
    //     console.log("ameNextButton",e)
    //     console.log("ameNextButton",gameNextButton.hasAttribute("disabled"))
    //         mainLoop++
    //         gameNextButton.setAttribute("disabled", true)
    // })

    // }


    




}

maneGame(birdsDataRU)
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

// Начало Функция случайного числа

 function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
 };

 // Конец Функция случайного числа