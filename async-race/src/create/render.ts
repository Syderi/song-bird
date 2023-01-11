import { addChildren, createContainerCar, createElementfromString, createContainerResultWin } from './createElement';
// import { svgCar } from '../constants/car'
// import flag from '../assets/img/png/flag.png'
import { getCarsApi, getWinnersApi, getCarAPi } from '../api/api';
import { ICarApi } from '../types/_interfaces';
import { containerCARS, trackItems, trackNumberPage } from './createSectionRace';
import { resultsTbody, resultsTableTitleRow } from './createSectionResults';

// функция заполнения номера страницы и количества машин в гараже
function renrderTrackItemsAndNumberPage(countCars: string = '1', page: number = 1) {
  trackItems.textContent = `Page #${page}`;
  trackNumberPage.textContent = `garage (${countCars})`;
}

// функция заполнения контейнера ГОНОК машшинами по номеру страницы
export async function renderContainerCARS(page: number = 1) {
  containerCARS.innerHTML = '';
  const res = await getCarsApi(page);
  const carsArray: ICarApi[] = res.carsArray;
  const countCars = res.countCars;

  carsArray.forEach(car => {
    const tempCar = createContainerCar(car.name, car.color);
    addChildren(containerCARS, [tempCar.containerCar]);
  });
  renrderTrackItemsAndNumberPage(countCars, page);
}

renderContainerCARS();


// функция заполнения контейнера РЕЗУЛЬТАТА ПОБЕДИТЕЛЕЙ гонок
export async function renderContainerResultWin() {

  const WinnerCars = await getWinnersApi();
  console.log('getWinnersApi res', WinnerCars);

  resultsTbody.innerHTML = '';
  addChildren(resultsTbody, [resultsTableTitleRow]);

  WinnerCars.winnersCarsArray.forEach((winCar, index) => {
    // if (winCar.car) {
    console.log(winCar.car?.color);

    const c = color(winCar.id.toString())


    addChildren(resultsTbody, [createContainerResultWin(index + 1, +c , winCar.car?.name, winCar.wins, winCar.time)]);
    // }

    // const tempCar = createContainerCar(car.name, car.color);
    // addChildren(containerCARS, [tempCar.containerCar]);
  });

async function color(id: string) {
  const car = await getCarAPi(id)
  return car.color
}

  // containerCARS.innerHTML = '';
  // const res = await getCarsApi(page);
  // const carsArray: ICar[] = res.carsArray;
  // const countCars = res.countCars;

  // carsArray.forEach(car => {
  //   const tempCar = createContainerCar(car.name, car.color);
  //   addChildren(containerCARS, [tempCar.containerCar]);
  // });
  // renrderTrackItemsAndNumberPage(countCars, page);
}

renderContainerResultWin();


