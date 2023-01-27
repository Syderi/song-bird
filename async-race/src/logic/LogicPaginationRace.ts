import {
  buttonRacePaginationPrev,
  buttonRacePaginationNext,
} from '../create/createSectionRace';

import {
  DEFAULT_PAGE_IN_CARS_API,
  GLOBAL_DEFAULT_MINUS_ONE,
  GLOBAL_STATE,
  MAX_CARS_IN_PAGE,
} from '../constants/constants';

import { renderContainerCARS } from '../create/render';
import { getCarsApi } from '../api/api';

// функция проверки активации кнопок переключения страниц
export default async function checkbuttonRacePagination(
  numberOfPage: number = GLOBAL_STATE.countOfPageRace,
): Promise<void> {
  if (numberOfPage <= DEFAULT_PAGE_IN_CARS_API) {
    buttonRacePaginationPrev.disabled = true;
  } else {
    buttonRacePaginationPrev.disabled = false;
  }
  const maxCars = await getCarsApi(GLOBAL_DEFAULT_MINUS_ONE);
  GLOBAL_STATE.countCarsInGarageRace = +maxCars.countCars;
  const maxPage = Math.ceil(GLOBAL_STATE.countCarsInGarageRace / MAX_CARS_IN_PAGE);

  if (GLOBAL_STATE.countOfPageRace >= maxPage) {
    buttonRacePaginationNext.disabled = true;
  } else {
    buttonRacePaginationNext.disabled = false;
  }
}
checkbuttonRacePagination();

// функция обновления страницы машин
async function undateCarsPage(): Promise<void> {
  await renderContainerCARS();
  checkbuttonRacePagination();
}

// слушатель на кнопке следующей страницы
buttonRacePaginationNext.addEventListener('click', () => {
  GLOBAL_STATE.countOfPageRace += 1;
  undateCarsPage();
});

// слушатель на кнопке предыдущей страницы
buttonRacePaginationPrev.addEventListener('click', () => {
  GLOBAL_STATE.countOfPageRace -= 1;
  undateCarsPage();
});
