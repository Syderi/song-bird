import { EngineDriveEnum } from './../types/_enum';
import { GLOBAL_DEFAULT_MINUS_ONE, GLOBAL_STATE } from '../constants/constants';
import {
  checkEngineDriveCar,
  getWinnersApi,
  startEngineCarApi,
  stopEngineCarApi,
  сreateWinnerCarAPi,
  updateWinnerCarAPi,
  getWinnerCarAPi,
} from '../api/api';
import { buttonRaceStart, buttonRaceReset } from '../create/createSectionRace';
import { renderContainerResultWin } from '../create/render';

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
  const engineCarData = await startEngineCarApi(id);
  GLOBAL_STATE.engineCarsStatusMap.set(id, EngineDriveEnum.started);
  // console.log('engineCarData ID 1', engineCarData);
  const time = engineCarData.distance / engineCarData.velocity;
  // console.log('time ID 1', time);
  driveCar(time, id);
  getEngineDriveCarStatus(id);
}

// функция остановки движения по кнопке В
export async function stopAnimateCar(id: string) {
  await stopEngineCarApi(id);
  GLOBAL_STATE.engineCarsStatusMap.set(id, EngineDriveEnum.stopped);
  const div = getImageSVGDivCar(id);
  // console.log('DIV DRIVE STOP', div);
  if (div) {
    div.style.transform = 'translateX(0px)';
    // console.log('GLOBAL_STATE из стопа', GLOBAL_STATE);
  }
}

// слушатель старта ГОНКИ
buttonRaceStart.addEventListener('click', () => {
  GLOBAL_STATE.isRace = true;
  GLOBAL_STATE.arraybuttonStartA.forEach((btnA) => btnA.click());
});

// слушатель возрата  ГОНКИ к начал
buttonRaceReset.addEventListener('click', () => {
  GLOBAL_STATE.arraybuttonStopB.forEach((btnB) => btnB.click());
  GLOBAL_STATE.isRace = false;
  GLOBAL_STATE.isWinnerCarinRace = false;
});






