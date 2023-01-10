import { stringObject } from '../types/_type'
import { svgCar } from '../constants/car'
import flag from '../assets/img/png/flag.png'

function createElement(tagName: string = 'div', options?: stringObject) {
  const element = document.createElement(tagName);
  if (options) {
    Object.assign(element, options);
  }
  return element
}

function addChildren(Father: HTMLElement, children: (HTMLElement | string)[]): void {
  Father.append(...children);
}

// Функция получения HTML элемента из строки
function createElementfromString(textString: string): HTMLElement {
  const div = document.createElement('div');
  div.innerHTML = textString;
  return div.firstElementChild as HTMLElement
}

// функция создания одиночной гонки
function createContainerCar(color: string = 'red'): HTMLElement {
  const containerCar = createElement('div', { className: 'container-car' })
  const raceWrapper = createElement('div', { className: 'race__wrapper' })
  const buttonSelect = createElement('button', { className: 'button button_select', textContent: 'SELECT' }) as HTMLButtonElement
  const buttonRemove = createElement('button', { className: 'button button_remove', textContent: 'REMOVE' }) as HTMLButtonElement
  const carName = createElement('p', { className: 'car-name', textContent: `Audi` })
  addChildren(raceWrapper, [buttonSelect, buttonRemove, carName])

  const trackCar = createElement('div', { className: 'race__wrapper track__car' })
  const buttonStartA = createElement('button', { className: 'button button_start', textContent: 'A' }) as HTMLButtonElement
  const buttonStopB = createElement('button', { className: 'button button_stop', textContent: 'B' }) as HTMLButtonElement
  const trackCarSvg = createElement('div', { className: 'container__track__car-svg' })

  const car = createElementfromString(svgCar)
  car.style.fill = `${color}`
  car.style.width = '50px'
  car.style.height = '50px'
  car.setAttribute('class', 'track__car-image')
  addChildren(trackCarSvg, [car])

  const trackFinish = createElement('img', { className: 'track__finish', src: flag, alt: 'finish flag' }) as HTMLImageElement
  addChildren(trackCar, [buttonStartA, buttonStopB, trackCarSvg, trackFinish])
  addChildren(containerCar, [raceWrapper, trackCar])
  return containerCar
}

// функция создания одиночного результата победы
function createContainerResultWin(count: number = 1, color: string = 'red', nameCar: string = 'Audi', wins: number = 1, time: number = 0,): HTMLElement {

  const resultsTableWinnerRow = createElement('tr', { className: 'results__table__winner-row' }) as HTMLElement
  const rowItemCount = createElement('td', { className: 'title-row-item', textContent: `${count}` }) as HTMLTableElement
  const rowItemSVG = createElement('td', { className: 'title-row-item' }) as HTMLTableElement
  const carSmall = createElementfromString(svgCar)
  carSmall.style.fill = `${color}`
  addChildren(rowItemSVG, [carSmall])

  const rowItemName = createElement('td', { className: 'title-row-item', textContent: `${nameCar}` }) as HTMLTableElement
  const rowItemWins = createElement('td', { className: 'title-row-item', textContent: `${wins}` }) as HTMLTableElement
  const rowItemTime = createElement('td', { className: 'title-row-item', textContent: `${time} sec` }) as HTMLTableElement

  addChildren(resultsTableWinnerRow, [rowItemCount, rowItemSVG, rowItemName, rowItemWins, rowItemTime])
  return resultsTableWinnerRow
}

export { createElement, addChildren, createElementfromString, createContainerCar, createContainerResultWin }