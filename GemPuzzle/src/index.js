// import '../src/assets/js/_buildhtml'
import { wrapperGame, btnShuffle, btnStop } from "./assets/js/_buildhtml";
import "../index.html";
import "./style.scss";

let radioValue = document.getElementsByName("radio");
let typeGame = 16;
let cellsNodes;
let cellsNodesArray
let sizeCell
let matrix
console.log('20', cellsNodes)
//  Начало получаю значение размера матрицы

radioValue.forEach((element) => {
  element.addEventListener("click", () => {
    typeGame = +element.value;
    addCells(typeGame);
  });
});

//  Конец получаю значение размера матрицы

function addCells(typeGame) {
  wrapperGame.innerHTML = "";
  sizeCell = Math.sqrt(typeGame);
  let startArray = [...Array(typeGame).keys()];
  console.log('10', startArray)
  // let startArray1 = shuffle(startArray);
  startArray.forEach((el, ind, array) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = el + 1;
    cell.dataset.matrixId = el + 1;
    cell.style.width = `${100 / sizeCell}%`;
    cell.style.height = `${100 / sizeCell}%`;
    wrapperGame.append(cell);
  });
  cellsNodes = Array.from(wrapperGame.querySelectorAll('.cell'))
  cellsNodesArray = cellsNodes.map((item) => Number(item.dataset.matrixId))
  // console.log('99-cellsNodesArray',cellsNodesArray)
  cellsNodes.at(-1).style.display = 'none'
  matrix = getMatrix(cellsNodesArray)
  // console.log('300', matrix)
  setPositionItems(matrix)
  shuffleCells()
}
addCells(typeGame);

// Начало кнопка перемешивания
btnShuffle.addEventListener('click', (e) => {
  shuffleCells()
})

function shuffleCells() {
  const flatMatrix = matrix.flat()
  const shuffleArray = shuffle(flatMatrix)
  matrix = getMatrix(shuffleArray)
  console.log('matrixSSSSSSSS = ', matrix)
  setPositionItems(matrix)
}

// Конец кнопка перемешивания

// Начало изменения позиций по клику
wrapperGame.addEventListener('click', (e) => {
  const cellNode = e.target.closest('.cell')
  if (!cellNode) {
    return
  }

  const celNumber = Number(cellNode.dataset.matrixId)
  const celCoords = findCoordsByNumber(celNumber, matrix)
  const sizeCellCoords = findCoordsByNumber(typeGame, matrix)
  const isValid = isValidForSwap(celCoords, sizeCellCoords)
  if (isValid) {
    swap(sizeCellCoords, celCoords, matrix)
    setPositionItems(matrix)
    console.log('matrix',matrix)
  }
})

// Конец  изменения позиций по клику

// Начало Функция перемешивания массива
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
// Конец Функция перемешивания массива

// Начало Создание матрицы
function getMatrix(array) {
  const matrix = []
  for (let i = 0; i < sizeCell; i++) {
    matrix.push([])
  }
  let x = 0;
  let y = 0;
  for (let i = 0; i < array.length; i++) {
    if (x >= sizeCell) {
      y++;
      x = 0;
    }
    matrix[y][x] = array[i];
    x++
  }
  return matrix;
}
// Конец конец создания матрицы

function setPositionItems(matrix) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const value = matrix[y][x]
      const node = cellsNodes[value - 1]
      setNodeStyles(node, x, y)
    }
  }
}

function setNodeStyles(node, x, y) {
  const shiftPs = 100;
  node.style.transform = `translate3D(${x * shiftPs}%, ${y * shiftPs}%, 0)`
}

// 

function findCoordsByNumber(number, matrix) {
for (let y = 0; y < matrix.length; y++) {
  for (let x = 0; x < matrix[y].length; x++) {
    if (matrix[y][x] === number) {
      return {x, y};
    }
  }
}
return null
}
// 

// Начало проверки валидации
function isValidForSwap(coords1, coords2) {
  const diffX = Math.abs(coords1.x - coords2.x)
  const diffY = Math.abs(coords1.y - coords2.y)
  return (diffX === 1 || diffY === 1) && (coords1.x === coords2.x || coords1.y === coords2.y)
}

// Конец проверки валидации

// Начало замены значений матрицы
function swap(coords1, coords2, matrix) {
  const coords1Number = matrix[coords1.y][coords1.x]
  matrix[coords1.y][coords1.x] = matrix[coords2.y][coords2.x]
  matrix[coords2.y][coords2.x] = coords1Number

}

// Конец  замены значений матрицы

btnStop.addEventListener('click', () => {
  typeGame = 25
  addCells(typeGame)
  matrix = [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[25,24,23,22,21]]
  let a = JSON.stringify([[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[25,24,23,22,21]])
  console.log('a',a)
  let b = JSON.parse(a)
  console.log('b',b)
  
  setPositionItems(b)
})
