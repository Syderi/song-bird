import { buttonRacePaginationPrev, buttonRacePaginationNext } from '../create/createSectionRace';
import { GLOBAL_STATE, MAX_CARS_IN_PAGE } from '../constants/constants';
import { renderContainerCARS } from '../create/render';
import { getCarsApi } from '../api/api';

console.log('подключение логики кнопок');
console.log('buttonRacePaginationNext', buttonRacePaginationNext);
// функция проверки активации кнопок переключения страниц

export async function checkbuttonRacePagination(numberOfPage: number = GLOBAL_STATE.countOfPageRace) {
  if (numberOfPage <= 1) {
    buttonRacePaginationPrev.disabled = true;
  } else {
    buttonRacePaginationPrev.disabled = false;
  }
  const maxCars = await getCarsApi();
  GLOBAL_STATE.countCarsInGarageRace = +maxCars.countCars;
  const maxPage = Math.ceil(GLOBAL_STATE.countCarsInGarageRace / MAX_CARS_IN_PAGE);
  // console.log('maxPage', maxPage);
  if (GLOBAL_STATE.countOfPageRace >= maxPage) {
    buttonRacePaginationNext.disabled = true;
  } else {
    buttonRacePaginationNext.disabled = false;
  }
}

checkbuttonRacePagination();

async function undateCarsPage() {
  await renderContainerCARS();
  checkbuttonRacePagination();
}

// слушатель на кнопке следующей страницы
buttonRacePaginationNext.addEventListener('click', () => {
  GLOBAL_STATE.countOfPageRace += 1;
  console.log('next');
  undateCarsPage();
});

// слушатель на кнопке предыдущей страницы
buttonRacePaginationPrev.addEventListener('click', () => {
  GLOBAL_STATE.countOfPageRace -= 1;
  console.log('prev');
  undateCarsPage();
});


