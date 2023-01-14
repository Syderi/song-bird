import { deleteCarAPi, deleteWinnerApi, getWinnersApi } from '../api/api';
import { renderContainerCARS, renderContainerResultWin } from '../create/render';
import { checkbuttonRacePagination } from './LogicPaginationRace';
import { checkbuttonWinnerPagination } from './LogicPaginationWinner';
import { GLOBAL_STATE, GLOBAL_DEFAULT_MINUS_ONE } from '../constants/constants';

// Логика удаления машины из гаража
export async function deleteCarFromGarge(id: string) {
  await deleteCarAPi(id);
  await renderContainerCARS();
  checkbuttonRacePagination();
}

// Логика удаления машины из победителей
export async function deleteCarFromWinners(id: string) {
  let winners = await getWinnersApi(GLOBAL_DEFAULT_MINUS_ONE);
  console.log('winners ЛОГИК ДЕЛЕТ', winners);
  GLOBAL_STATE.countCarsInGarageWinners = +winners.countWinnerCars;
  // console.log('GLOBAL_STATE.countCarsInGarageWinners', GLOBAL_STATE.countCarsInGarageWinners);
  const key: boolean = winners.winnersCarsArray.some((car) => car.id === +id);
  // console.log('key', key);
  if (key) {
    await deleteWinnerApi(id);
  }
  winners = await getWinnersApi(GLOBAL_DEFAULT_MINUS_ONE);
  GLOBAL_STATE.countCarsInGarageWinners = +winners.countWinnerCars;
  checkbuttonWinnerPagination();
  await renderContainerResultWin();
}

