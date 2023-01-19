import { deleteCarAPi, deleteWinnerApi, getWinnersApi } from '../api/api';
import { renderContainerCARS, renderContainerResultWin } from '../create/render';
import { checkbuttonRacePagination } from './LogicPaginationRace';
import { checkbuttonWinnerPagination } from './LogicPaginationWinner';
import { GLOBAL_STATE, GLOBAL_DEFAULT_MINUS_ONE } from '../constants/constants';

// Логика удаления машины из гаража
export async function deleteCarFromGarge(id: string): Promise<void> {
  await deleteCarAPi(id);
  await renderContainerCARS();
  checkbuttonRacePagination();
}

// Логика удаления машины из победителей
export async function deleteCarFromWinners(id: string): Promise<void> {
  let winners = await getWinnersApi(GLOBAL_DEFAULT_MINUS_ONE);
  GLOBAL_STATE.countCarsInGarageWinners = +winners.countWinnerCars;
  const key: boolean = winners.winnersCarsArray.some((car) => car.id === +id);
  if (key) {
    await deleteWinnerApi(id);
  }
  winners = await getWinnersApi(GLOBAL_DEFAULT_MINUS_ONE);
  GLOBAL_STATE.countCarsInGarageWinners = +winners.countWinnerCars;
  checkbuttonWinnerPagination();
  await renderContainerResultWin();
}
