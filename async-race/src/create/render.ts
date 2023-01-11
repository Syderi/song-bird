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



  console.log('100 =getWinnersApi res==', WinnerCars.winnersCarsArray[0].car);

  resultsTbody.innerHTML = '';
  addChildren(resultsTbody, [resultsTableTitleRow]);
  // addChildren(resultsTbody, [createContainerResultWin(1, WinnerCars[0].car.color, winCar.car.name, winCar.wins, winCar.time)]);

  const a = WinnerCars.winnersCarsArray;

  console.log('200 =a==', a);

  for (let index = 0; index < a.length; index++) {




    const winCar = WinnerCars.winnersCarsArray[index];
    console.log('winCar.car', winCar.car);
    if (winCar.car) {

      addChildren(resultsTbody, [createContainerResultWin(index + 1, winCar.car.color, winCar.car.name, winCar.wins, winCar.time)]);
    }

  }

  // WinnerCars.winnersCarsArray.forEach((winCar, index) => {
  //   if (winCar.car) {
  //     console.log('winCar.car?.color', winCar.car?.color);
  //     console.log('winCar.car', winCar);

  //     // const c = color(winCar.id)


  //     addChildren(resultsTbody, [createContainerResultWin(index + 1, winCar.car?.color, winCar.car?.name, winCar.wins, winCar.time)]);
  //   }

  //   // const tempCar = createContainerCar(car.name, car.color);
  //   // addChildren(containerCARS, [tempCar.containerCar]);
  // });

  // async function color(id: number):string {
  //   const car = await getCarAPi(id)
  //   return car.color
  // }

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


