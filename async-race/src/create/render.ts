import { addChildren, createContainerCar, createElementfromString, createContainerResultWin } from './createElement';
// import { svgCar } from '../constants/car'
// import flag from '../assets/img/png/flag.png'
import { getCarsApi, getWinnersApi, getCarAPi } from '../api/api';
import { ICarApi } from '../types/_interfaces';
import { containerCARS, trackItems, trackNumberPage } from './createSectionRace';
import { resultsTbody, resultsTableTitleRow, resultsWinners, resultsPage } from './createSectionResults';
import { GLOBAL_STATE } from '../constants/constants';
import { checkbuttonWinnerPagination } from '../logic/LogicPaginationWinner';

// функция заполнения номера страницы и количества машин в гараже
function renrderTrackItemsAndNumberPage(
  countCars: string = '1',
  page: number = GLOBAL_STATE.countOfPageRace,
) {
  trackItems.textContent = `Page #${page}`;
  trackNumberPage.textContent = `garage (${countCars})`;
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
  const countCars = res.countCars;

  carsArray.forEach(car => {
    if (car.id) {
      const tempCar = createContainerCar(car.id, car.name, car.color);
      addChildren(containerCARS, [tempCar.containerCar]);
    }
  });
  renrderTrackItemsAndNumberPage(countCars, page);
}

// функция заполнения контейнера РЕЗУЛЬТАТА ПОБЕДИТЕЛЕЙ гонок
export async function renderContainerResultWin(page: number = GLOBAL_STATE.countOfPageWinners) {
  const WinnerCars = await getWinnersApi(page);
  // console.log('WinnerCars RENDER TS', WinnerCars);
  GLOBAL_STATE.countCarsInGarageWinners = +WinnerCars.countWinnerCars;
  // console.log('GLOBAL_STATE.countCarsInGarageWinners RENDER TS', GLOBAL_STATE.countCarsInGarageWinners);
  resultsTbody.innerHTML = '';
  addChildren(resultsTbody, [resultsTableTitleRow]);

  for (let index = 0; index < WinnerCars.winnersCarsArray.length; index++) {
    const winCar = WinnerCars.winnersCarsArray[index];
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
  checkbuttonWinnerPagination();
  renrderWinnersItemsAndNumberPage(WinnerCars.countWinnerCars, page);
}


renderContainerCARS(GLOBAL_STATE.countOfPageRace);
renderContainerResultWin(GLOBAL_STATE.countOfPageWinners);


