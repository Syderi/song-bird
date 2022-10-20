// import '../src/assets/js/_buildhtml'
import {
  wrapperGame,
  wrapperWin,
  btnShuffle,
  btnSave,
  btnLoad,
  btnSound,
  btnResult,
  countMoves,
  countTime,
} from "./assets/js/_buildhtml";
import "../index.html";
import "./style.scss";
import audio from "./assets/audio/move.mp3";

let radioValue = document.getElementsByName("radio");
let typeGame = 16;
let cellsNodes;
let cellsNodesArray;
let sizeCell;
let matrix;
let timeDuration = 0;
let countMovesValue = 0;
let isValid;
let isValidTransition = true;
let resultArray = [];
let keyLocal = false;
const audioObj = new Audio(audio);

//  Начало получаю значение размера матрицы

radioValue.forEach((element) => {
  element.addEventListener("change", () => {
    typeGame = +element.value;
    addCells(typeGame);
    timeDuration = 0;
    countMovesValue = 0;
    countTime.textContent = "00:00:00";
    countMoves.textContent = `${countMovesValue}`;
  });
});

//  Конец получаю значение размера матрицы

function addCells(typeGame) {
  // if (keyLocal) {
  //   typeGame = Number(localStorage.getItem('typeGameLocalStorage'))
  // }
  wrapperGame.innerHTML = "";
  sizeCell = Math.sqrt(typeGame);
  let startArray = [...Array(typeGame).keys()];
  // console.log("10", startArray);
  startArray.forEach((el, ind, array) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = el + 1;
    cell.dataset.matrixId = el + 1;
    cell.id = el + 1;
    cell.style.width = `${100 / sizeCell}%`;
    cell.style.height = `${100 / sizeCell}%`;
    cell.draggable = true
    cell.addEventListener('dragstart',dragStart)
    cell.addEventListener('dragend',dragEnd)
    wrapperGame.append(cell);
  });
  cellsNodes = Array.from(wrapperGame.querySelectorAll(".cell"));
  cellsNodesArray = cellsNodes.map((item) => Number(item.dataset.matrixId));
  // console.log("99-cellsNodesArray", cellsNodesArray);
  cellsNodes.at(-1).style.display = "none";

  matrix = getMatrix(cellsNodesArray);
  // console.log("befor 99-matrix", matrix);
  if (keyLocal) {
    matrix = JSON.parse(localStorage.getItem("matrixLocalStorage"));
  }
  // console.log("after 99-matrix", matrix);
  // console.log('300', matrix)
  setPositionItems(matrix);
  shuffleCells();
  // timeDuration = 0;
  // formatTimeDuration(timeDuration)
  // showTime()
}
addCells(typeGame);

// Начало кнопка перемешивания
btnShuffle.addEventListener("click", (e) => {
  timeDuration = 0;
  countMovesValue = 0;
  countTime.textContent = "00:00:00";
  shuffleCells();
  countMoves.textContent = `${countMovesValue}`;
});

function shuffleCells() {
  const flatMatrix = matrix.flat();
  let shuffleArray = shuffle(flatMatrix)
  
  while (!searchErrorArray(shuffleArray)) {
    shuffleArray = shuffle(flatMatrix);
  }
  if (keyLocal) {
    matrix = JSON.parse(localStorage.getItem("matrixLocalStorage"));
  } else {
    matrix = getMatrix(shuffleArray);
  }
  setPositionItems(matrix);
}

// Конец кнопка перемешивания

// Начало изменения позиций по клику
wrapperGame.addEventListener("click", (e) => {
  const cellNode = e.target.closest(".cell");
  // console.log("click cellNode",cellNode)
  if (!cellNode) {
    // console.log('Пустота',e)
    return;
  }
  audioObj.pause();
  audioObj.currentTime = 0;

  const celNumber = Number(cellNode.dataset.matrixId);
  const celCoords = findCoordsByNumber(celNumber, matrix);
  const sizeCellCoords = findCoordsByNumber(typeGame, matrix);
  isValid = isValidForSwap(celCoords, sizeCellCoords);
  if (isValid && isValidTransition) {
    swap(sizeCellCoords, celCoords, matrix);
    setPositionItems(matrix);
    audioObj.play();
  }
});

// Конец  изменения позиций по клику

// Начало изменения позиций по движению мыши

wrapperGame.addEventListener('dragover', (e)=>{
  e.preventDefault()
})

wrapperGame.addEventListener('drop', (e)=>{
  // console.log('10 = drop',e)
  // console.log('20 = drop id', e.dataTransfer.getData('id'))

  let cellNode = document.getElementById(e.dataTransfer.getData('id'))



  // const cellNode = e.target.closest(".cell");
  // console.log("drop cellNode",cellNode)
  // if (!cellNode) {
  //   console.log('Пустота',e)
  //   return;
  // }

  if (!e.target.classList.contains('cell'))  {

    // console.log('НА КЛЕТКАХ')
  audioObj.pause();
  audioObj.currentTime = 0;

  const celNumber = Number(cellNode.dataset.matrixId);
  const celCoords = findCoordsByNumber(celNumber, matrix);
  const sizeCellCoords = findCoordsByNumber(typeGame, matrix);
  isValid = isValidForSwap(celCoords, sizeCellCoords);
  if (isValid && isValidTransition) {
    swap(sizeCellCoords, celCoords, matrix);
    setPositionItems(matrix);
    audioObj.play();
  }
  }



})


function dragStart(e) {
  let cell = e.target.id
  e.dataTransfer.setData('id',e.target.id)
  // console.log('0000 = dragstart e=',e)
  let elemCellDragStart = document.getElementById(cell)
  elemCellDragStart.style.opacity = '0'
}

function dragEnd(e) {
   let cell = e.target.id
   let elemCellDragStart = document.getElementById(cell)
   
setTimeout(() => {
  elemCellDragStart.style.opacity = '1'
  
},110);



}



// wrapperGame.addEventListener("mousedown", (e) => {
//   const cellNode = e.target.closest(".cell");
//   if (!cellNode) {
//     return;
//   }
//   // console.log('cellNode',cellNode)
//   // cellNode.draggable = true
//   // console.log('e',e)
//   cellNode.addEventListener('dragend',(event)=>{
// // console.log('event',event)
// if (!e.target.classList.contains(".wrapper-game")) {
//   // console.log('Отпустил над пустотой')
// }
//   })

// });

// Конец изменения позиций по движению мыши

wrapperGame.addEventListener("transitionstart", (e) => {
  isValidTransition = false;
});

wrapperGame.addEventListener("transitionend", (e) => {
  isValidTransition = true;
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

// Начало Создание матрицы
function getMatrix(array) {
  const matrix = [];
  for (let i = 0; i < sizeCell; i++) {
    matrix.push([]);
  }
  let x = 0;
  let y = 0;
  for (let i = 0; i < array.length; i++) {
    if (x >= sizeCell) {
      y++;
      x = 0;
    }
    matrix[y][x] = array[i];
    x++;
  }
  return matrix;
}
// Конец конец создания матрицы

function setPositionItems(matrix) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const value = matrix[y][x];
      const node = cellsNodes[value - 1];
      setNodeStyles(node, x, y);
    }
  }
}

function setNodeStyles(node, x, y) {
  const shiftPs = 100;
  node.style.transform = `translate3D(${x * shiftPs}%, ${y * shiftPs}%, 0)`;
}

//

function findCoordsByNumber(number, matrix) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === number) {
        return { x, y };
      }
    }
  }
  return null;
}
//

// Начало проверки валидации
function isValidForSwap(coords1, coords2) {
  const diffX = Math.abs(coords1.x - coords2.x);
  const diffY = Math.abs(coords1.y - coords2.y);
  return (
    (diffX === 1 || diffY === 1) &&
    (coords1.x === coords2.x || coords1.y === coords2.y)
  );
}

// Конец проверки валидации

// Начало замены значений матрицы
function swap(coords1, coords2, matrix) {
  const coords1Number = matrix[coords1.y][coords1.x];
  matrix[coords1.y][coords1.x] = matrix[coords2.y][coords2.x];
  matrix[coords2.y][coords2.x] = coords1Number;
  changecountMovesValue();
  if (isWonGame(matrix)) {
    addWonClass();
  }
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
    timeDuration++;
    countTime.textContent = `${formatTimeDuration(timeDuration)}`;
  }, 1000);
}

function changecountMovesValue() {
  countMovesValue++;
  countMoves.textContent = `${countMovesValue}`;
}

showTime();

// countMoves, countTime

// Конец отображения времени и ходов

// Начало обработка кнопки звука

btnSound.addEventListener("click", (e) => {
  btnSound.classList.toggle("sound-mute");
  // console.log(e);

  if (e.target.classList.contains("sound-mute")) {
    audioObj.volume = 0;
  } else {
    audioObj.volume = 1;
  }
});

// Конец обработка кнопки звука

// Начало сохранения игры и вывод резултатов


function isWonGame(matrix) {
  const winFlatArrGame = new Array(typeGame).fill(0).map((_item, i) => i + 1);
  // console.log("winFlatArrGame", winFlatArrGame);
  const flatMatrix = matrix.flat();
  // console.log("flatMatrix", flatMatrix);
  for (let i = 0; i < winFlatArrGame.length; i++) {
    if (flatMatrix[i] !== winFlatArrGame[i]) {
      return false;
    }
  }
  return true;
}

// Подраздел выигрыша

function addWonClass() {
  let winTime = formatTimeDuration(timeDuration);
  setTimeout(() => {
    setTimeout(() => {
      wrapperWin.classList.remove("wrapper-win-active");
      wrapperWin.textContent = "";
    }, 3000);
    wrapperWin.classList.add("wrapper-win-active");
    wrapperWin.textContent = `Hooray! You solved the puzzle in ${winTime} and ${countMovesValue} moves!`;
    timeDuration = 0
  }, 500);

resultArray.push({
  'typeGame': typeGame,
  'moves': countMovesValue,
  'winTime': winTime,
})

resultArray.sort(function(a, b) {
  return a.moves - b.moves;
});

if (resultArray.length > 10 ) {
  resultArray.length = 10
}

let resultArrayLocalStorage = JSON.stringify(resultArray);
localStorage.setItem("resultArrayLocalStorage", resultArrayLocalStorage);
}

btnSave.addEventListener("click", () => {
  let matrixLocalStorage = JSON.stringify(matrix);
  localStorage.setItem("matrixLocalStorage", matrixLocalStorage);
  localStorage.setItem("typeGameLocalStorage", typeGame);
  localStorage.setItem("movesLocalStorage", countMovesValue);
  localStorage.setItem("timeDurationLocalStorage", timeDuration);
  // localStorage.setItem("typeGameLocalStorage", typeGame);
});

btnLoad.addEventListener("click", () => {
  if (localStorage.getItem("matrixLocalStorage")) {
    keyLocal = true;
    matrix = JSON.parse(localStorage.getItem("matrixLocalStorage"));
    typeGame = Number(localStorage.getItem("typeGameLocalStorage"));
    countMovesValue = Number(localStorage.getItem("movesLocalStorage"));
    timeDuration = Number(localStorage.getItem("timeDurationLocalStorage"));
    countMoves.textContent = countMovesValue
    // radioValue.value = ''+typeGame
    addCells(typeGame);
  }
  // setPositionItems(matrix);
  keyLocal = false;
});


btnResult.addEventListener("click", () => {

  setTimeout(() => {
    setTimeout(() => {
      wrapperWin.classList.remove("wrapper-win-active");
      wrapperWin.textContent = "";
    }, 3000);
    wrapperWin.classList.add("wrapper-win-active");

    if (localStorage.getItem("resultArrayLocalStorage")) {
      resultArray = JSON.parse(localStorage.getItem("resultArrayLocalStorage"));
      resultArray.forEach((el,index,arr) => {
        let myP = document.createElement('p');
        myP.textContent = `${index+1}: Type: ${el.typeGame}, Moves: ${el.moves}, winTime: ${el.winTime}`
        wrapperWin.appendChild(myP);
      })
    } else {
      wrapperWin.textContent = 'No Results' 
    }
  }, 500);
})

// Конец сохранения игры и вывод резултатов

// Начало проверки массива

function searchErrorArray(array) {
let countInversions = 0
let array1 = array.slice()
let blankRowPosition = Math.ceil((array1.indexOf(typeGame)+1)/Math.sqrt(typeGame))-1

array1.splice(array1.indexOf(typeGame), 1)
// console.log(array1)
  for (let i = 0; i < array1.length; i++) {
    for (let j = i; j < array1.length; j++) {
    if (array1[i]>array1[j]) {
      // console.log(array[i],array[j])
      countInversions++
    }
    }
  }
  // console.log('countInversions',countInversions)
if (!(typeGame%2 === 0) && (countInversions%2===0)) {
  // console.log('РЕШАЕМО 3')
  return true
} else if ( !( (countInversions+blankRowPosition)%2===0 ) && (typeGame%2 === 0)) {
  // console.log('РЕШАЕМО 4')
  return true
} else {
  return false
}
}

// Конец проверки массива
