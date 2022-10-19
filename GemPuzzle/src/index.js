// import '../src/assets/js/_buildhtml'
import { wrapperGame, btnShuffle, btnStop, btnSound, countMoves, countTime } from "./assets/js/_buildhtml";
import "../index.html";
import "./style.scss";
import audio from "./assets/audio/move.mp3";

let radioValue = document.getElementsByName("radio");
let typeGame = 16;
let cellsNodes;
let cellsNodesArray
let sizeCell
let matrix
let timeDuration = 0;
let countMovesValue = 0
let isValid
let isValidTransition = true
const audioObj = new Audio(audio);

console.log('20', audioObj)
//  Начало получаю значение размера матрицы

radioValue.forEach((element) => {
  element.addEventListener("change", () => {
    typeGame = +element.value;
    addCells(typeGame);
    timeDuration = 0;
    countMovesValue = 0
    countTime.textContent = '00:00:00'
    // shuffleCells()
    countMoves.textContent = `${countMovesValue}`  
  });
});

//  Конец получаю значение размера матрицы

function addCells(typeGame) {
  wrapperGame.innerHTML = "";
  sizeCell = Math.sqrt(typeGame);
  let startArray = [...Array(typeGame).keys()];
  console.log('10', startArray)
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
  // timeDuration = 0;
  // formatTimeDuration(timeDuration)
  // showTime()
}
addCells(typeGame);

// Начало кнопка перемешивания
btnShuffle.addEventListener('click', (e) => {
  timeDuration = 0;
  countMovesValue = 0
  countTime.textContent = '00:00:00'
  shuffleCells()
  countMoves.textContent = `${countMovesValue}`
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
  audioObj.pause();
  audioObj.currentTime = 0;

  const celNumber = Number(cellNode.dataset.matrixId)
  const celCoords = findCoordsByNumber(celNumber, matrix)
  const sizeCellCoords = findCoordsByNumber(typeGame, matrix)
  isValid = isValidForSwap(celCoords, sizeCellCoords)
  if (isValid && isValidTransition) {

    swap(sizeCellCoords, celCoords, matrix)
    setPositionItems(matrix)
    console.log('matrix',matrix)
    audioObj.play()

  }
})


// Конец  изменения позиций по клику

wrapperGame.addEventListener("transitionstart", (e) => {
  isValidTransition = false
})

wrapperGame.addEventListener("transitionend", (e) => {
  isValidTransition = true
})



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
  changecountMovesValue()

}

// Конец  замены значений матрицы

// Начало отображения времени и ходов

// let timeDuration = 0;

function formatTimeDuration(timeDuration) {
    const date = new Date(2022, 0, 1);
    // console.log('date',date)
    date.setSeconds(timeDuration);

    return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
}

function showTime() {
    setInterval(() => {
      timeDuration++
      countTime.textContent = `${formatTimeDuration(timeDuration)}`
    }, 1000)
}


function changecountMovesValue() {
  countMovesValue++
  countMoves.textContent = `${countMovesValue}`
}

showTime()

// countMoves, countTime


// Конец отображения времени и ходов


// Начало обработка кнопки звука

btnSound.addEventListener('click', (e) => {
  btnSound.classList.toggle('sound-mute')
  console.log(e)

if (e.target.classList.contains('sound-mute')) {
  audioObj.volume = 0
} else {
  audioObj.volume = 1
}

})

// Конец обработка кнопки звука



btnStop.addEventListener('click', () => {
  typeGame = 25
  addCells(typeGame)
  matrix = [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[25,24,23,22,21]]
  let a = JSON.stringify([[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[25,24,23,22,21]])
  // console.log('a',a)
  let b = JSON.parse(a)
  // console.log('b',b)
  
  setPositionItems(b)
})