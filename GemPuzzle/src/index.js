// import '../src/assets/js/_buildhtml'
import { wrapperGame, cell } from "./assets/js/_buildhtml";
import "../index.html";
import "./style.scss";

console.log("Hello World!");

let typeGame = 16;

function addCells(typeGame) {
  let sizeCell = Math.sqrt(typeGame);
  wrapperGame.innerHTML = "";
  console.log("5", typeGame);
  let startArray = [...Array(+typeGame).keys()];
  console.log("10", startArray);

  let startArray1 = shuffle(startArray);
  console.log("20", startArray1);

  startArray1.forEach((el, ind, array) => {
    if (ind !== 0) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.textContent = el;
      cell.style.width = `${100 / sizeCell}%`;
      cell.style.height = `${100 / sizeCell}%`;
      wrapperGame.append(cell);
    }
  });
}

addCells(typeGame);

// wrapperGame.innerHTML ='55'

let radioValue = document.getElementsByName("radio");
// console.log(radioValue.value)

radioValue.forEach((element) => {
  element.addEventListener("click", () => {
    typeGame = element.value;
    console.log("100-typeGame", typeGame);
    addCells(typeGame);
  });
});

// Начало Функция перемешивания массива
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
// Конец Функция перемешивания массива
