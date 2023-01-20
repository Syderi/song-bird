import {
  GLOBAL_STATE,
  GLOBAL_DEFAULT_MINUS_ONE,
  DISTANCE_TAKEN_RACE_DIV,
  ZERO,
  MILISECOND_IN_SECOND,
  FRAME_IN_SECOND,
  DECALS,
} from '../constants/constants';
import { EngineDriveEnum } from '../types/_enum';

import {
  checkEngineDriveCar, getWinnersApi, startEngineCarApi, stopEngineCarApi,
  сreateWinnerCarAPi, updateWinnerCarAPi, getWinnerCarAPi, getCarAPi,
} from '../api/api';
import {
  buttonRaceStart, buttonRaceReset, inputNameCreate, inputColorCreate,
  buttonCreate, inputNameUpdate, buttonUpdate, inputColorUpdate,
  buttonRaceGenerateCars, buttonRacePaginationPrev, buttonRacePaginationNext,
} from '../create/createSectionRace';
import { renderContainerResultWin } from '../create/render';
import { messageHeaderWinner } from '../create/createHeader';
import checkbuttonRacePagination from './LogicPaginationRace';

// получение ширины экрана
function getOffsetWidth(): number {
  return Math.floor(document.body.offsetWidth - DISTANCE_TAKEN_RACE_DIV);
}

// функция заморозки кнопок
function disableButtonsInRace(status: boolean): void {
  [inputNameCreate,
    inputColorCreate,
    buttonCreate,
    inputNameUpdate,
    inputColorUpdate,
    inputColorCreate,
    buttonUpdate,
    buttonRaceGenerateCars,
    buttonRacePaginationPrev,
    buttonRacePaginationNext].forEach((btn) => {
    const newBtn = btn;
    newBtn.disabled = status;
  });
  GLOBAL_STATE.arrayButtonRemove.forEach((btn) => {
    const newBtn = btn;
    newBtn.disabled = status;
  });
  if (!status) checkbuttonRacePagination();
}

// функция возвращения дива с картинкой машины
function getImageSVGDivCar(id: string): HTMLElement | null {
  const div = GLOBAL_STATE.arraytrackCarSvg.find(
    (track) => track.getAttribute('data-trackCarSvg') === id,
  );
  if (div) return div;
  return null;
}

// функция ловли поломки двигателя
async function getEngineDriveCarStatus(id: string): Promise<void> {
  const res = await checkEngineDriveCar(id);
  if (res.success) return;
  GLOBAL_STATE.engineCarsStatusMap.set(id, EngineDriveEnum.drive);
}

// функция обновления или добавления победителя
async function createWinnersCar(id: string, time: string): Promise<void> {
  const winners = await getWinnersApi(GLOBAL_DEFAULT_MINUS_ONE);
  const key: boolean = winners.winnersCarsArray.some((car) => car.id === +id);
  if (key) {
    const winCar = await getWinnerCarAPi(id);
    const wins = winCar.wins + 1;
    const newTime = winCar.time < +time ? winCar.time : +time;
    updateWinnerCarAPi(id, {
      wins,
      time: newTime,
    });
  } else {
    await сreateWinnerCarAPi({
      id: +id,
      wins: 1,
      time: +time,
    });
  }
  const car = await getCarAPi(+id);
  messageHeaderWinner.textContent = `Win car ${car.name} with time: ${time} sec`;
  renderContainerResultWin();
}

// функция движения машины
function driveCar(
  time: number,
  id: string,
  key: boolean,
  endWidth = getOffsetWidth(),
): void {
  let curentWidth = ZERO;
  const frame = (time / MILISECOND_IN_SECOND) * FRAME_IN_SECOND;
  const step = (endWidth - ZERO) / frame;
  const div = getImageSVGDivCar(id);
  const moveCar = () => {
    const status = GLOBAL_STATE.engineCarsStatusMap.get(id);
    curentWidth += step;
    if (curentWidth < endWidth && status === EngineDriveEnum.started) {
      if (div) {
        if (!GLOBAL_STATE.isAllCarsReady && key) {
          curentWidth = ZERO;
        } else {
          div.style.transform = `translateX(${curentWidth}px)`;
        }
      }
      requestAnimationFrame(moveCar);
    } else if (GLOBAL_STATE.isRace
      && status === EngineDriveEnum.started
      && !GLOBAL_STATE.isWinnerCarinRace) {
      GLOBAL_STATE.isWinnerCarinRace = !GLOBAL_STATE.isWinnerCarinRace;
      createWinnersCar(id, (time / MILISECOND_IN_SECOND).toFixed(DECALS));
    }
  };
  moveCar();
}

// функция анимации движения  по кнопке A
export async function startAnimateCar(id: string, key = false): Promise<void> {
  disableButtonsInRace(true);
  const btnStartA = GLOBAL_STATE.arraybuttonStartA.find((btn) => btn.getAttribute('data-startA') === id);
  if (btnStartA) btnStartA.disabled = true;
  const engineCarData = await startEngineCarApi(id);
  GLOBAL_STATE.engineCarsStatusMap.set(id, EngineDriveEnum.started);
  const btnStopB = GLOBAL_STATE.arraybuttonStopB.find((btn) => btn.getAttribute('data-StopB') === id);
  if (btnStopB) btnStopB.disabled = false;
  const time = engineCarData.distance / engineCarData.velocity;
  driveCar(time, id, key);
  getEngineDriveCarStatus(id);
}

// функция остановки движения по кнопке В
export async function stopAnimateCar(id: string): Promise<void> {
  const btnStopB = GLOBAL_STATE.arraybuttonStopB.find((btn) => btn.getAttribute('data-StopB') === id);
  if (btnStopB) btnStopB.disabled = true;
  await stopEngineCarApi(id);
  GLOBAL_STATE.engineCarsStatusMap.set(id, EngineDriveEnum.stopped);
  const div = getImageSVGDivCar(id);
  const btnStartA = GLOBAL_STATE.arraybuttonStartA.find((btn) => btn.getAttribute('data-startA') === id);
  if (btnStartA) btnStartA.disabled = false;
  if (div) {
    div.style.transform = `translateX(${ZERO}px)`;
  }
}

// функция Старта всех гонок
async function startAnimateAllCar(): Promise<void> {
  GLOBAL_STATE.arraybuttonStopB.forEach((btnB) => btnB.click());
  await Promise.all(GLOBAL_STATE.arraytrackCarSvg.map((el) => {
    const id = el.getAttribute('data-trackCarSvg');
    if (id) {
      return startAnimateCar(id, true);
    }
    return null;
  }));
  buttonRaceReset.disabled = false;
  GLOBAL_STATE.isAllCarsReady = true;
}

// слушатель старта ГОНКИ
buttonRaceStart.addEventListener('click', () => {
  buttonRaceStart.disabled = true;
  GLOBAL_STATE.isRace = true;
  startAnimateAllCar();
});

// функция остановки всех гонок
async function stopAnimateAllCar(): Promise<void> {
  await Promise.all(GLOBAL_STATE.arraytrackCarSvg.map(async (el) => {
    const id = el.getAttribute('data-trackCarSvg');
    if (id) {
      return stopAnimateCar(id);
    }
    return null;
  }));
  messageHeaderWinner.textContent = '';
  GLOBAL_STATE.isAllCarsReady = false;
  disableButtonsInRace(false);
  buttonRaceStart.disabled = false;
}

// слушатель остановки  ГОНКИ
buttonRaceReset.addEventListener('click', () => {
  buttonRaceReset.disabled = true;
  stopAnimateAllCar();
  GLOBAL_STATE.isRace = false;
  GLOBAL_STATE.isWinnerCarinRace = false;
});
