import { GLOBAL_STATE, GLOBAL_DEFAULT_MINUS_ONE } from './../constants/constants';
import { EngineDriveEnum } from './../types/_enum';

import {
  checkEngineDriveCar,
  getWinnersApi,
  startEngineCarApi,
  stopEngineCarApi,
  сreateWinnerCarAPi,
  updateWinnerCarAPi,
  getWinnerCarAPi,
  getCarAPi,
} from '../api/api';
import { buttonRaceStart, buttonRaceReset } from '../create/createSectionRace';
import { renderContainerResultWin } from '../create/render';
import { messageHeaderWinner } from '../create/createHeader';

// получение ширины экрана
function getOffsetWidth() {
  return Math.floor(document.body.offsetWidth - 220);
}

// функция возвращения дива с картинкой машины
function getImageSVGDivCar(id: string): HTMLElement | null {
  const div = GLOBAL_STATE.arraytrackCarSvg.find(
    (track) => track.getAttribute('data-trackCarSvg') === id,
  );
  // console.log('DIV DRIVE', div);
  if (div) return div;
  return null;
}

// функция ловли поломки двигателя
async function getEngineDriveCarStatus(id: string): Promise<void> {
  const res = await checkEngineDriveCar(id);
  if (res.success) return;
  // console.log('res', res);
  GLOBAL_STATE.engineCarsStatusMap.set(id, EngineDriveEnum.drive);
}


// функция обновления или добавления победителя
async function createWinnersCar(id: string, time: string) {
  const winners = await getWinnersApi(GLOBAL_DEFAULT_MINUS_ONE);
  console.log(winners);
  const key: boolean = winners.winnersCarsArray.some((car) => car.id === +id);
  if (key) {
    const winCar = await getWinnerCarAPi(id);
    const wins = winCar.wins + 1;
    const newTime = winCar.time < +time ? winCar.time : +time;
    updateWinnerCarAPi(id, {
      wins: wins,
      time: newTime,
    });
    console.log('ЕСТЬ В БАЗЕ победителей');
  } else {
    await сreateWinnerCarAPi({
      id: +id,
      wins: 1,
      time: +time,
    });
    console.log('НЕ было в базе победителей');
  }
  console.log('перестраиваю победителей');
  const car = await getCarAPi(+id);
  messageHeaderWinner.textContent = `Win car ${car.name} with time: ${time} sec`;
  renderContainerResultWin();
}


// функция движения машины
function driveCar(time: number, id: string, endWidth = getOffsetWidth()) {
  // console.log('GLOBAL_STATE из драйва', GLOBAL_STATE);
  let curentWidth = 0;
  const frame = (time / 1000) * 60;
  const step = (endWidth - 0) / frame;
  const div = getImageSVGDivCar(id);
  const moveCar = () => {
    const status = GLOBAL_STATE.engineCarsStatusMap.get(id);
    curentWidth += step;
    if (curentWidth < endWidth && status === EngineDriveEnum.started) {
      if (div) {
        div.style.transform = `translateX(${curentWidth}px)`;
      }
      requestAnimationFrame(moveCar);
    } else if (GLOBAL_STATE.isRace
      && status === EngineDriveEnum.started
      && !GLOBAL_STATE.isWinnerCarinRace) {
      GLOBAL_STATE.isWinnerCarinRace = !GLOBAL_STATE.isWinnerCarinRace;
      console.log('id ПОБЕДИТЕЛЯ УРА =', id, 'время = ', time.toFixed(3));
      createWinnersCar(id, (time / 1000).toFixed(3));
    }
  };
  moveCar();
}

// функция анимации движения
export async function startAnimateCar(id: string) {
  const btnStartA = GLOBAL_STATE.arraybuttonStartA.find((btn) => btn.getAttribute('data-startA') === id);
  if (btnStartA) btnStartA.disabled = true;
  const engineCarData = await startEngineCarApi(id);
  GLOBAL_STATE.engineCarsStatusMap.set(id, EngineDriveEnum.started);
  const btnStopB = GLOBAL_STATE.arraybuttonStopB.find((btn) => btn.getAttribute('data-StopB') === id);
  if (btnStopB) btnStopB.disabled = false;
  const time = engineCarData.distance / engineCarData.velocity;
  driveCar(time, id);
  getEngineDriveCarStatus(id);
}

// функция остановки движения по кнопке В
export async function stopAnimateCar(id: string) {
  const btnStopB = GLOBAL_STATE.arraybuttonStopB.find((btn) => btn.getAttribute('data-StopB') === id);
  if (btnStopB) btnStopB.disabled = true;
  await stopEngineCarApi(id);
  GLOBAL_STATE.engineCarsStatusMap.set(id, EngineDriveEnum.stopped);
  const div = getImageSVGDivCar(id);
  const btnStartA = GLOBAL_STATE.arraybuttonStartA.find((btn) => btn.getAttribute('data-startA') === id);
  if (btnStartA) btnStartA.disabled = false;
  if (div) {
    div.style.transform = 'translateX(0px)';
  }
}

// функция Старта всех гонок
async function startAnimateAllCar() {
  await Promise.all(GLOBAL_STATE.arraytrackCarSvg.map(async (el) => {
    const id = el.getAttribute('data-trackCarSvg');
    if (id) {
      return startAnimateCar(id);
    }
  },
  ));
  buttonRaceReset.disabled = false;
  // messageHeaderWinner.textContent = '';
}

// слушатель старта ГОНКИ
buttonRaceStart.addEventListener('click', () => {
  buttonRaceStart.disabled = true;
  GLOBAL_STATE.isRace = true;
  startAnimateAllCar();
  // GLOBAL_STATE.arraybuttonStartA.forEach((btnA) => btnA.click());
});

// функция остановки всех гонок
async function stopAnimateAllCar() {
  await Promise.all(GLOBAL_STATE.arraytrackCarSvg.map(async (el) => {
    const id = el.getAttribute('data-trackCarSvg');
    if (id) {
      return stopAnimateCar(id);
    }
  },
  ));
  messageHeaderWinner.textContent = '';

  buttonRaceStart.disabled = false;
}

// слушатель остановки  ГОНКИ
buttonRaceReset.addEventListener('click', () => {
  buttonRaceReset.disabled = true;
  stopAnimateAllCar();
  GLOBAL_STATE.isRace = false;
  GLOBAL_STATE.isWinnerCarinRace = false;

});






