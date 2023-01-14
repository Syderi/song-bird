import { GLOBAL_STATE } from '../constants/constants';
import { StringObject } from '../types/_type';
import { svgCar } from '../constants/car';
import flag from '../assets/img/png/flag.png';
import { deleteCarFromGarge, deleteCarFromWinners } from '../logic/logicDeleteCar';
import { buttonsSelectetIsTrue, updateInputsValues } from '../logic/logicUpdateCar';
import { startAnimateCar, stopAnimateCar } from '../logic/logicDriveCar';

function createElement(tagName: string = 'div', options?: StringObject) {
  const element = document.createElement(tagName);
  if (options) {
    Object.assign(element, options);
  }
  return element;
}

function addChildren(Father: HTMLElement, children: (HTMLElement | string)[]): void {
  Father.append(...children);
}

// Функция получения HTML элемента из строки
function createElementfromString(textString: string): HTMLElement {
  const div = document.createElement('div');
  div.innerHTML = textString;
  return div.firstElementChild as HTMLElement;
}

// функция создания одиночной гонки
function createContainerCar(id: number, nameCar: string = 'Audi', color: string = 'red') {
  const containerCar = createElement('div', { className: 'container-car' });
  const raceWrapper = createElement('div', { className: 'race__wrapper' });
  const buttonSelect = createElement('button', { className: 'button button_select', textContent: 'SELECT' }) as HTMLButtonElement;
  buttonSelect.setAttribute('data-select', `${id}`);
  // внутренний слушатель на кнопке селект
  buttonSelect.addEventListener('click', () => {
    const idSelect = buttonSelect.getAttribute('data-select');
    if (idSelect) {
      console.log('ИЗ КРЕАТЕ ЭЛЕМЕНТ АЙДИ СЕЛЕКТА', idSelect);
      GLOBAL_STATE.idSelectedCar = idSelect;
      console.log('ИЗ КРЕАТЕ ЭGLOBAL_STATE.idSelectedCar', GLOBAL_STATE);
      updateInputsValues();
      buttonsSelectetIsTrue();
      buttonSelect.disabled = true;
    }
  });

  const buttonRemove = createElement('button', { className: 'button button_remove', textContent: 'REMOVE' }) as HTMLButtonElement;
  buttonRemove.setAttribute('data-remove', `${id}`);
  // внутренний слушатель на кнопке ремув
  buttonRemove.addEventListener('click', () => {
    const idRemove = buttonRemove.getAttribute('data-remove');
    if (idRemove) {
      deleteCarFromGarge(idRemove);
      deleteCarFromWinners(idRemove);
    }
  });
  // .onclick = deleteCarFromGarge(buttonRemove.getAttribute('data-remove'));

  const carName = createElement('p', { className: 'car-name', textContent: `${nameCar}` });
  addChildren(raceWrapper, [buttonSelect, buttonRemove, carName]);

  const trackCar = createElement('div', { className: 'race__wrapper track__car' });
  const buttonStartA = createElement('button', { className: 'button button_start', textContent: 'A' }) as HTMLButtonElement;
  buttonStartA.setAttribute('data-startA', `${id}`);
  
  const buttonStopB = createElement('button', { className: 'button button_stop', textContent: 'B' }) as HTMLButtonElement;
  buttonStopB.setAttribute('data-StopB', `${id}`);
  buttonStopB.disabled = true;
  
  buttonStartA.addEventListener('click', () => {
    const startA = buttonStartA.getAttribute('data-startA');
    if (startA) {
      // buttonStartA.disabled = true;
      console.log('НАЖАЛ startA');
      startAnimateCar(startA);
    }
    // buttonStopB.disabled = false;
  });

  buttonStopB.addEventListener('click', () => {
    buttonStopB.disabled = true;
    const stopB = buttonStopB.getAttribute('data-StopB');
    if (stopB) {
      console.log('НАЖАЛ stopB');
      stopAnimateCar(stopB);
    }
    // buttonStartA.disabled = false;
  });
  const trackCarSvg = createElement('div', { className: 'container__track__car-svg' });
  trackCarSvg.setAttribute('data-trackCarSvg', `${id}`);

  const car = createElementfromString(svgCar);
  car.style.fill = `${color}`;
  car.style.width = '50px';
  car.style.height = '50px';
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
    trackCarSvg: trackCarSvg,
  };
}
// Конец функции создания одиночной гонки

// функция создания одиночного результата победы
function createContainerResultWin(count: number = 1, color: string = 'red', nameCar: string = 'Audi', wins: number = 1, time: number = 0): HTMLElement {

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