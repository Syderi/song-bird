
import { createGallery } from "./_create_gallery"
import { createMainGame } from "./_game"
import {
  goodLuckData,
  headerSelectLabelData,
  navData,
  levelGameData,
  gameNextButtonData,
  scoreData, resultMessageData,resultDescriptionTextData,resultNewGameButtonData
} from "./data/_languageData"

const languageSelect = document.getElementById("lang")
// console.log("langSelect", languageSelect)
// console.log("langSelect", languageSelect.value)

if (localStorage.getItem("languageSelectLocalStorage")) {
  // console.log("Данные присутствуют")
  languageSelect.value = localStorage.getItem("languageSelectLocalStorage")
} else {
  // console.log("Данные отсутсвтуют")
  localStorage.setItem("languageSelectLocalStorage", languageSelect.value)
}

languageSelect.addEventListener("change", () => {
  localStorage.setItem("languageSelectLocalStorage", languageSelect.value)
  startAll()

})

function startAll() {
  createGallery();
  createMainGame();
  changelanguageHome();
  changelanguageheaderSelectLabel();
  changelanguageNav();
  changelanguagelevelGameData();
  changelanguageNextButton();
  changelanguageGameScore();
  changelanguageResultMessage();
  changelanguageResultDescriptionText();
  changelanguageResultNewGameButton();
}

startAll()


export function getIndexlanguage() {
  if (localStorage.getItem("languageSelectLocalStorage") === "ru") return 0;
  if (localStorage.getItem("languageSelectLocalStorage") === "en") return 1;
}

function changelanguageHome() {
  const mainTitle = document.querySelector(".main__title")
  mainTitle.textContent = goodLuckData[getIndexlanguage()]
}

function changelanguageheaderSelectLabel() {
  const headerSelectLabel = document.querySelector(".header__select__label")
  headerSelectLabel.textContent = headerSelectLabelData[getIndexlanguage()]
}

function changelanguageNav() {
  const navItemHome = document.querySelector(".nav__item_home")
  const navItemGame = document.querySelector(".nav__item_game")
  const navItemResult = document.querySelector(".nav__item_result")
  const navItemGallery = document.querySelector(".nav__item_gallery")

  navItemHome.textContent = navData[getIndexlanguage()].home
  navItemGame.textContent = navData[getIndexlanguage()].game
  navItemResult.textContent = navData[getIndexlanguage()].result
  navItemGallery.textContent = navData[getIndexlanguage()].gallery
}

function changelanguagelevelGameData() {
  const gameSelect = document.querySelector(".game__select")
  const gameSelectArray = gameSelect.children
  for (let index = 0; index < gameSelectArray.length; index++) {
    gameSelectArray[index].textContent = levelGameData[getIndexlanguage()][index]
  }

}

function changelanguageNextButton() {
  const gameNextButton = document.querySelector(".game__next-button")
  gameNextButton.textContent = gameNextButtonData[getIndexlanguage()]
}


function changelanguageGameScore() {
  const score = document.querySelector(".score")
  score.textContent = scoreData[getIndexlanguage()]
}


function changelanguageResultMessage() {
  const resultMessage = document.querySelector(".result__message")
  resultMessage.textContent = resultMessageData[getIndexlanguage()]
}

function changelanguageResultDescriptionText() {
  const resultDescriptionText = document.querySelector(".result_description_text")
  resultDescriptionText.textContent = resultDescriptionTextData[getIndexlanguage()]
}

function changelanguageResultNewGameButton() {
  const resultNewGameButton = document.querySelector(".result__new-game-button")
  resultNewGameButton.textContent = resultNewGameButtonData[getIndexlanguage()]
}

