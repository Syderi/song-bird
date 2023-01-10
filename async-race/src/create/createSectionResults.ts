import { createElement, addChildren, createElementfromString , createContainerResultWin } from './createElement'
// import { svgCar } from '../constants/car'

const sectionResults = createElement('section', { className: 'results' })

const resultsWinners = createElement('div', { className: 'results__winners', textContent: `winners (1)` })
const resultsPage = createElement('div', { className: 'results__page', textContent: `Page #1` })

const resultsTable = createElement('table', { className: 'results__table' }) as HTMLTableElement
const resultsTbody = createElement('tbody', { className: 'results__tbody' }) as HTMLTableElement
addChildren(resultsTable, [resultsTbody])

const resultsTableTitleRow = createElement('tr', { className: 'results__table__title-row' }) as HTMLTableElement
const resultsTableTitleNumber = createElement('th', { className: 'title-row-item', textContent: 'Number' }) as HTMLTableElement
const resultsTableTitleCar = createElement('th', { className: 'title-row-item', textContent: 'Car' }) as HTMLTableElement
const resultsTableTitleName = createElement('th', { className: 'title-row-item', textContent: 'Name' }) as HTMLTableElement
// СОРТИРОВКИ ЭЛЕМЕНТЫ РЕЗУЛЬТАТОВ
const clickResultsTableSortWins = createElement('th', { className: 'title-row-item wins-sort', textContent: 'Wins ⮃' }) as HTMLTableElement
const clickResultsTableSortTime = createElement('th', { className: 'title-row-item time-sort', textContent: 'Best time ⮃ (seconds)' }) as HTMLTableElement

addChildren(resultsTableTitleRow, [resultsTableTitleNumber, resultsTableTitleCar, resultsTableTitleName, clickResultsTableSortWins, clickResultsTableSortTime])

// // функция создания одиночного результата победы
// function createContainerResultWin(count: number = 1, color: string = 'red', nameCar: string = 'Audi', wins: number = 1,  time: number = 0,): HTMLTableElement{

//   const resultsTableWinnerRow = createElement('tr', { className: 'results__table__winner-row' }) as HTMLTableElement
//   const rowItemCount = createElement('td', { className: 'title-row-item', textContent: `${count}` }) as HTMLTableElement
//   const rowItemSVG = createElement('td', { className: 'title-row-item' }) as HTMLTableElement
//   const carSmall = createElementfromString(svgCar) as HTMLOrSVGImageElement
//   carSmall.style.fill = `${color}`
//   rowItemSVG.append(carSmall)
//   const rowItemName = createElement('td', { className: 'title-row-item', textContent: `${nameCar}` }) as HTMLTableElement
//   const rowItemWins = createElement('td', { className: 'title-row-item', textContent: `${wins}` }) as HTMLTableElement
//   const rowItemTime = createElement('td', { className: 'title-row-item', textContent: `${time} sec` }) as HTMLTableElement

//   addChildren(resultsTableWinnerRow, [rowItemCount, rowItemSVG, rowItemName, rowItemWins, rowItemTime])
//   return resultsTableWinnerRow
// }

addChildren(resultsTbody, [resultsTableTitleRow])
addChildren(resultsTbody, [createContainerResultWin()])

const resultsPagination = createElement('div', { className: 'race__pagination pagination_results' })
const buttonResultsPaginationPrev = createElement('button', { className: 'button button_results__pagination-prev', textContent: 'PREV' }) as HTMLButtonElement
const buttonResultsPaginationNext = createElement('button', { className: 'button button_results__pagination-next', textContent: 'NEXT' }) as HTMLButtonElement
addChildren(resultsPagination, [buttonResultsPaginationPrev, buttonResultsPaginationNext])

addChildren(sectionResults, [resultsWinners, resultsPage, resultsTable, resultsPagination])

export { sectionResults }