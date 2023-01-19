import { buttonRaceReset, buttonRaceStart } from './createSectionRace';
import { BIG_SIZE_SVG, DEFAULT_HTML_ELEMENT, GLOBAL_STATE } from '../constants/constants';
import { StringObject } from '../types/_type';
import { svgCar } from '../constants/car';
import flag from '../assets/img/png/flag.png';
import { deleteCarFromGarge, deleteCarFromWinners } from '../logic/logicDeleteCar';
import { buttonsSelectetIsTrue, updateInputsValues } from '../logic/logicUpdateCar';
import { startAnimateCar, stopAnimateCar } from '../logic/logicDriveCar';
import { IContainerCar } from '../types/_interfaces';

// функция создания НТМЛ Елементов
function createElement(tagName: string = DEFAULT_HTML_ELEMENT, options?: StringObject): HTMLElement {
  const element = document.createElement(tagName);
  if (options) {
    Object.assign(element, options);
  }
  return element;
}

// Функция добавления детей в HTML элемент
function addChildren(Father: HTMLElement, children: (HTMLElement | string)[]): void {
  Father.append(...children);
}

// Функция получения HTML дива элемента из строки
function createElementfromString(textString: string): HTMLElement {
  const div = document.createElement(DEFAULT_HTML_ELEMENT);
  div.innerHTML = textString;
  return div.firstElementChild as HTMLElement;
}

// функция создания слушателя на кнопке селект
function addListenerOnSelectButton(element: HTMLButtonElement): void {
  element.addEventListener('click', () => {
    const idSelect = element.getAttribute('data-select');
    if (idSelect) {
      GLOBAL_STATE.idSelectedCar = idSelect;
      updateInputsValues();
      buttonsSelectetIsTrue();
      element.disabled = true;
    }
  });
}

// функция создания слушателя на кнопке ремув
function addListenerOnRemoveButton(element: HTMLButtonElement): void {
  element.addEventListener('click', () => {
    const idRemove = element.getAttribute('data-remove');
    if (idRemove) {
      deleteCarFromGarge(idRemove);
      deleteCarFromWinners(idRemove);
    }
  });
}

// функция создания слушателя на кнопке Старт А
function addListenerOnStartAButton(element: HTMLButtonElement): void {
  element.addEventListener('click', () => {
    const startA = element.getAttribute('data-startA');
    if (startA) startAnimateCar(startA);
    buttonRaceStart.disabled = true;
    buttonRaceReset.disabled = false;
  });
}

// функция создания слушателя на кнопке Старт В
function addListenerOnStopBButton(element: HTMLButtonElement): void {
  element.addEventListener('click', () => {
    const stopB = element.getAttribute('data-StopB');
    if (stopB) stopAnimateCar(stopB);
    // buttonRaceReset.disabled = false;
  });
}

// функция создания одиночной гонки
function createContainerCar(id: number, nameCar: string, color: string): IContainerCar {
  const containerCar = createElement('div', { className: 'container-car' });
  const raceWrapper = createElement('div', { className: 'race__wrapper' });
  const buttonSelect = createElement('button', { className: 'button button_select', textContent: 'SELECT' }) as HTMLButtonElement;
  buttonSelect.setAttribute('data-select', `${id}`);
  addListenerOnSelectButton(buttonSelect);
  const buttonRemove = createElement('button', { className: 'button button_remove', textContent: 'REMOVE' }) as HTMLButtonElement;
  buttonRemove.setAttribute('data-remove', `${id}`);
  addListenerOnRemoveButton(buttonRemove);
  const carName = createElement('p', { className: 'car-name', textContent: `${nameCar}` });
  addChildren(raceWrapper, [buttonSelect, buttonRemove, carName]);
  const trackCar = createElement('div', { className: 'race__wrapper track__car' });
  const buttonStartA = createElement('button', { className: 'button button_start', textContent: 'A' }) as HTMLButtonElement;
  buttonStartA.setAttribute('data-startA', `${id}`);
  const buttonStopB = createElement('button', { className: 'button button_stop', textContent: 'B' }) as HTMLButtonElement;
  buttonStopB.setAttribute('data-StopB', `${id}`);
  buttonStopB.disabled = true;
  addListenerOnStartAButton(buttonStartA);
  addListenerOnStopBButton(buttonStopB);
  const trackCarSvg = createElement('div', { className: 'container__track__car-svg' });
  trackCarSvg.setAttribute('data-trackCarSvg', `${id}`);
  const car = createElementfromString(svgCar);
  car.style.fill = `${color}`;
  car.style.width = BIG_SIZE_SVG;
  car.style.height = BIG_SIZE_SVG;
  car.setAttribute('class', 'track__car-image');
  addChildren(trackCarSvg, [car]);
  const trackFinish = createElement('img', { className: 'track__finish', src: flag, alt: 'finish flag' }) as HTMLImageElement;
  addChildren(trackCar, [buttonStartA, buttonStopB, trackCarSvg, trackFinish]);
  addChildren(containerCar, [raceWrapper, trackCar]);
  return {
    containerCar: containerCar,
    buttonStartA: buttonStartA,
    buttonStopB: buttonStopB,
    buttonSelect: buttonSelect,
    buttonRemove: buttonRemove,
    trackCarSvg: trackCarSvg,
  };
}
// Конец функции создания одиночной гонки

// функция создания одиночного результата победы
function createContainerResultWin(
  count: number,
  color: string,
  nameCar: string,
  wins: number,
  time: number,
): HTMLElement {
  const resultsTableWinnerRow = createElement('tr', { className: 'results__table__winner-row' }) as HTMLElement;
  const rowItemCount = createElement('td', { className: 'title-row-item', textContent: `${count}` }) as HTMLTableElement;
  const rowItemSVG = createElement('td', { className: 'title-row-item' }) as HTMLTableElement;
  const carSmall = createElementfromString(svgCar);
  carSmall.style.fill = `${color}`;

  addChildren(rowItemSVG, [carSmall]);

  const rowItemName = createElement('td', { className: 'title-row-item', textContent: `${nameCar}` }) as HTMLTableElement;
  const rowItemWins = createElement('td', { className: 'title-row-item', textContent: `${wins}` }) as HTMLTableElement;
  const rowItemTime = createElement('td', { className: 'title-row-item', textContent: `${time} sec` }) as HTMLTableElement;

  addChildren(resultsTableWinnerRow, [rowItemCount, rowItemSVG, rowItemName, rowItemWins, rowItemTime]);

  return resultsTableWinnerRow;
}

export { createElement, addChildren, createElementfromString, createContainerCar, createContainerResultWin };
