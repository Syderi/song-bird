import { updateInputsValues } from '../logic/logicUpdateCar';
import { addChildren, createContainerCar, createContainerResultWin } from './createElement';

import { getCarsApi, getWinnersApi, getCarAPi } from '../api/api';
import { ICarApi } from '../types/_interfaces';
import { containerCARS, trackItems, trackNumberPage } from './createSectionRace';
import { resultsTbody, resultsTableTitleRow, resultsWinners, resultsPage } from './createSectionResults';
import { GLOBAL_STATE, GLOBAL_DEFAULT_MINUS_ONE, MAX_WINNERS_CARS_IN_PAGE } from '../constants/constants';
import { checkbuttonWinnerPagination } from '../logic/LogicPaginationWinner';

// функция заполнения номера страницы и количества машин в гараже
async function renrderTrackItemsAndNumberPage(
  page: number = GLOBAL_STATE.countOfPageRace,
  // countCars: string = GLOBAL_STATE.countCarsInGarageRace.toString(),
) {
  const cars = await getCarsApi(GLOBAL_DEFAULT_MINUS_ONE);
  console.log('КОЛИЧЕСТВО МАШИН В ГАРАЖЕ cars', cars);
  console.log('КОЛИЧЕСТВО МАШИН В ГАРАЖЕ', GLOBAL_STATE.countCarsInGarageRace);
  GLOBAL_STATE.countCarsInGarageRace = +cars.countCars;
  trackItems.textContent = `Page #${page}`;
  // trackNumberPage.textContent = `garage (${countCars})`;
  trackNumberPage.textContent = `garage (${cars.countCars})`;
}

// функция заполнения номера страницы и количества машин в ПОБЕДИТЕЛЯХ
function renrderWinnersItemsAndNumberPage(
  countWinners: string = '1',
  page: number = GLOBAL_STATE.countOfPageWinners,
) {
  resultsWinners.textContent = `winners ${countWinners}`;
  resultsPage.textContent = `Page #${page}`;
}

// функция заполнения контейнера ГОНОК машшинами по номеру страницы
export async function renderContainerCARS(page: number = GLOBAL_STATE.countOfPageRace) {
  containerCARS.innerHTML = '';
  const res = await getCarsApi(page);
  const carsArray: ICarApi[] = res.carsArray;
  // const countCars = res.countCars;
  GLOBAL_STATE.idSelectedCar = GLOBAL_DEFAULT_MINUS_ONE;
  GLOBAL_STATE.arraybuttonStartA = [];
  GLOBAL_STATE.arraybuttonStopB = [];
  GLOBAL_STATE.arrayButtonSelect = [];
  GLOBAL_STATE.arrayButtonRemove = [];
  GLOBAL_STATE.arraytrackCarSvg = [];
  GLOBAL_STATE.isRace = false;
  GLOBAL_STATE.isWinnerCarinRace = false;
  GLOBAL_STATE.engineCarsStatusMap.clear();
  carsArray.forEach(car => {
    if (car.id) {
      const tempCar = createContainerCar(car.id, car.name, car.color);
      GLOBAL_STATE.arraybuttonStartA.push(tempCar.buttonStartA);
      GLOBAL_STATE.arraybuttonStopB.push(tempCar.buttonStopB);
      GLOBAL_STATE.arrayButtonSelect.push(tempCar.buttonSelect);
      GLOBAL_STATE.arrayButtonRemove.push(tempCar.buttonRemove);
      GLOBAL_STATE.arraytrackCarSvg.push(tempCar.trackCarSvg);
      addChildren(containerCARS, [tempCar.containerCar]);
    }
  });
  renrderTrackItemsAndNumberPage(page);
  updateInputsValues();
  console.log('РЕНДЕР КОНТуйнер КАРС ГЛОБАЛЬНЫЙ СТЕЙТ', GLOBAL_STATE);
}

// функция заполнения контейнера РЕЗУЛЬТАТА ПОБЕДИТЕЛЕЙ гонок
export async function renderContainerResultWin(page: number = GLOBAL_STATE.countOfPageWinners) {
  const winnerCars = await getWinnersApi(page);
  // console.log('WinnerCars RENDER TS', WinnerCars);
  GLOBAL_STATE.countCarsInGarageWinners = +winnerCars.countWinnerCars;
  // console.log('GLOBAL_STATE.countCarsInGarageWinners RENDER TS', GLOBAL_STATE.countCarsInGarageWinners);
  resultsTbody.innerHTML = '';
  addChildren(resultsTbody, [resultsTableTitleRow]);

  for (let index = 0; index < winnerCars.winnersCarsArray.length; index++) {
    const winCar = winnerCars.winnersCarsArray[index];
    if (winCar.id) {
      const car = await getCarAPi(winCar.id);
      // if (winCar.car) {
      addChildren(resultsTbody,
        [createContainerResultWin(
          (page * 10 + index - 9),
          car.color,
          car.name,
          winCar.wins,
          winCar.time)]);
      // }
    }
  }
  checkbuttonWinnerPagination();
  renrderWinnersItemsAndNumberPage(winnerCars.countWinnerCars, page);
}

renderContainerCARS(GLOBAL_STATE.countOfPageRace);
renderContainerResultWin(GLOBAL_STATE.countOfPageWinners);


