import { buttonResultsPaginationPrev, buttonResultsPaginationNext } from '../create/createSectionResults';
import {
  GLOBAL_STATE,
  MAX_WINNERS_CARS_IN_PAGE,
  DEFAULT_PAGE_IN_CARS_API,
} from '../constants/constants';
import { renderContainerResultWin } from '../create/render';


// функция проверки активации кнопок переключения страниц
export async function checkbuttonWinnerPagination(
  numberOfPage: number = GLOBAL_STATE.countOfPageWinners,
): Promise<void> {
  if (numberOfPage <= DEFAULT_PAGE_IN_CARS_API) {
    buttonResultsPaginationPrev.disabled = true;
  } else {
    buttonResultsPaginationPrev.disabled = false;
  }

  const maxPage = Math.ceil(GLOBAL_STATE.countCarsInGarageWinners / MAX_WINNERS_CARS_IN_PAGE);
  if (GLOBAL_STATE.countOfPageWinners >= maxPage) {
    buttonResultsPaginationNext.disabled = true;
  } else {
    buttonResultsPaginationNext.disabled = false;
  }
}

// функция обновления страницы победителей
async function undateCarsPageWinners(): Promise<void> {
  await renderContainerResultWin();
  checkbuttonWinnerPagination();
}

// слушатель на кнопке следующей страницы
buttonResultsPaginationNext.addEventListener('click', () => {
  GLOBAL_STATE.countOfPageWinners += 1;
  undateCarsPageWinners();
});

// слушатель на кнопке предыдущей страницы
buttonResultsPaginationPrev.addEventListener('click', () => {
  GLOBAL_STATE.countOfPageWinners -= 1;
  undateCarsPageWinners();
});
