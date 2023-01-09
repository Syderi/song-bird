import { createElement, addChildren } from './createElement'

const header = createElement('header', { className: 'header' })
const buttonHeaderGarage = createElement('button', { className: 'button header__garage', textContent: 'TO GARAGE' })
const buttonHeaderWinner = createElement('button', { className: 'button header__winner', textContent: 'TO WINNER' })

addChildren(header, [buttonHeaderGarage, buttonHeaderWinner])
export { header }