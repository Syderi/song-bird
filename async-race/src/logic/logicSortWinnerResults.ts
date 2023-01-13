import { WinnersSortOrderEnum, WinnersSortEnum } from './../types/_enum';
import { GLOBAL_STATE } from './../constants/constants';

import { clickResultsTableSortWins, clickResultsTableSortTime } from '../create/createSectionResults';
import { renderContainerResultWin } from '../create/render';


// фунция переключения сортировки по возрастанию и убыванию
function changeOrderSort(): void {
  if (GLOBAL_STATE.winnersSortOrder === WinnersSortOrderEnum.DESC) {
    GLOBAL_STATE.winnersSortOrder = WinnersSortOrderEnum.ASC;
  } else {
    GLOBAL_STATE.winnersSortOrder = WinnersSortOrderEnum.DESC;
  }
  console.log('GLOBAL_STATE.WinnersSortOrder', GLOBAL_STATE.winnersSortOrder);
}

// слушатель на кнопке сортировки побед
clickResultsTableSortWins.addEventListener('click', () => {
  console.log('КЛИКНУЛ ПО СОРТИРОВКЕ ПОБЕД');
  GLOBAL_STATE.winnersSort = WinnersSortEnum.wins;
  changeOrderSort();
  renderContainerResultWin();
});

// слушатель на кнопке сортировки побед
clickResultsTableSortTime.addEventListener('click', () => {
  console.log('КЛИКНУЛ ПО СОРТИРОВКЕ ВРЕМЕНИ');
  GLOBAL_STATE.winnersSort = WinnersSortEnum.time;
  changeOrderSort();
  renderContainerResultWin();
});