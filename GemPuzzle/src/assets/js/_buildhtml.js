const wrapper = document.createElement('div')
wrapper.className = 'wrapper'
document.body.appendChild(wrapper)

const wrapperButtons = document.createElement('div')
wrapperButtons.className = 'wrapper-Buttons'
wrapper.appendChild(wrapperButtons)

const btnShuffle = document.createElement('button')
btnShuffle.textContent = 'Shuffle and start'
// const btnStop = document.createElement('button')
// btnStop.textContent = 'Stop'
const btnSave = document.createElement('button')
btnSave.textContent = 'Save'
const btnLoad = document.createElement('button')
btnLoad.textContent = 'Load'
const btnSound = document.createElement('button')
btnSound.textContent = 'Sound'
const btnResult = document.createElement('button')
btnResult.textContent = 'Result'

wrapperButtons.append(btnShuffle)
// wrapperButtons.append(btnStop)
wrapperButtons.append(btnSave)
wrapperButtons.append(btnLoad)
wrapperButtons.append(btnSound)
wrapperButtons.append(btnResult)



const wrapperMoveTime = document.createElement('div')
wrapperMoveTime.className = 'wrapper-Move-Time'
wrapper.appendChild(wrapperMoveTime)


const moves = document.createElement('div')
moves.textContent = 'Moves:'
const countMoves = document.createElement('div')
countMoves.textContent = '0'
const time = document.createElement('div')
time.textContent = 'Time:'
const countTime = document.createElement('div')
countTime.textContent = '00:00:00'

wrapperMoveTime.append(moves)
wrapperMoveTime.append(countMoves)
wrapperMoveTime.append(time)
wrapperMoveTime.append(countTime)

const wrapperGame = document.createElement('div')
wrapperGame.className = 'wrapper-game'
wrapper.appendChild(wrapperGame)


// Начало Добавление радио


const wrapperRadio = document.createElement('div')
wrapperRadio.className = 'wrapper-radio'
wrapper.appendChild(wrapperRadio)


const radioLabel33 = document.createElement('label')
radioLabel33.textContent = '3x3'
radioLabel33.setAttribute('for', 'radio9');
const radioLabel44 = document.createElement('label')
radioLabel44.textContent = '4x4'
radioLabel44.setAttribute('for', 'radio16');
const radioLabel55 = document.createElement('label')
radioLabel55.textContent = '5x5'
radioLabel55.setAttribute('for', 'radio25');
const radioLabel66 = document.createElement('label')
radioLabel66.textContent = '6x6'
radioLabel66.setAttribute('for', 'radio36');
const radioLabel77 = document.createElement('label')
radioLabel77.textContent = '7x7'
radioLabel77.setAttribute('for', 'radio49');
const radioLabel88 = document.createElement('label')
radioLabel88.textContent = '8x8'
radioLabel88.setAttribute('for', 'radio64');


const radioInput33 = document.createElement('input');
radioInput33.setAttribute('type', 'radio');
radioInput33.setAttribute('name', 'radio');
radioInput33.setAttribute('id', 'radio9');
radioInput33.setAttribute('value', '9');

const radioInput44 = document.createElement('input');
radioInput44.setAttribute('type', 'radio');
radioInput44.setAttribute('name', 'radio');
radioInput44.setAttribute('id', 'radio16');
radioInput44.setAttribute('value', '16');
radioInput44.checked = true

const radioInput55 = document.createElement('input');
radioInput55.setAttribute('type', 'radio');
radioInput55.setAttribute('name', 'radio');
radioInput55.setAttribute('id', 'radio25');
radioInput55.setAttribute('value', '25');

const radioInput66 = document.createElement('input');
radioInput66.setAttribute('type', 'radio');
radioInput66.setAttribute('name', 'radio');
radioInput66.setAttribute('id', 'radio36');
radioInput66.setAttribute('value', '36');

const radioInput77 = document.createElement('input');
radioInput77.setAttribute('type', 'radio');
radioInput77.setAttribute('name', 'radio');
radioInput77.setAttribute('id', 'radio49');
radioInput77.setAttribute('value', '49');

const radioInput88 = document.createElement('input');
radioInput88.setAttribute('type', 'radio');
radioInput88.setAttribute('name', 'radio');
radioInput88.setAttribute('id', 'radio64');
radioInput88.setAttribute('value', '64');



wrapperRadio.append(radioLabel33)
wrapperRadio.append(radioInput33)
wrapperRadio.append(radioLabel44)
wrapperRadio.append(radioInput44)
wrapperRadio.append(radioLabel55)
wrapperRadio.append(radioInput55)
wrapperRadio.append(radioLabel66)
wrapperRadio.append(radioInput66)
wrapperRadio.append(radioLabel77)
wrapperRadio.append(radioInput77)
wrapperRadio.append(radioLabel88)
wrapperRadio.append(radioInput88)


const wrapperWin = document.createElement('div')
wrapperWin.className = 'wrapper-win'
wrapper.appendChild(wrapperWin)



export {wrapperGame, wrapperWin, btnShuffle, btnSave, btnLoad, btnSound, countMoves, countTime}