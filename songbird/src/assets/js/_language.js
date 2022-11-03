import {createGallery} from "./_create_gallery"
import {createMainGame} from "./_game"

const languageSelect = document.getElementById("lang")
// console.log("langSelect", languageSelect)
// console.log("langSelect", languageSelect.value)

if (localStorage.getItem("languageSelectLocalStorage")) {
  console.log("Данные присутствуют")
  languageSelect.value = localStorage.getItem("languageSelectLocalStorage")
} else {
  console.log("Данные отсутсвтуют")
  localStorage.setItem("languageSelectLocalStorage", languageSelect.value)
}

languageSelect.addEventListener("change", () => {
  localStorage.setItem("languageSelectLocalStorage", languageSelect.value)
  createGallery()
  createMainGame()
})


export function getIndexlanguage() {
  if (localStorage.getItem("languageSelectLocalStorage") === "ru") return 0
  if (localStorage.getItem("languageSelectLocalStorage") === "en") return 1
}


// localStorage.setItem("typeGameLocalStorage", typeGame);
// typeGame = localStorage.getItem("typeGameLocalStorage");