import { deleteCarAPi, deleteWinnerApi, getWinnerCarAPi, getWinnersApi } from '../api/api';
import { renderContainerCARS, renderContainerResultWin } from '../create/render';
import { checkbuttonRacePagination } from './LogicPaginationRace';
import { checkbuttonWinnerPagination } from './LogicPaginationWinner';
import { GLOBAL_STATE } from '../constants/constants';

// Логика удаления машины из гаража
export async function deleteCarFromGarge(id: string) {
  await deleteCarAPi(id);
  await renderContainerCARS();
  checkbuttonRacePagination();
}

// Логика удаления машины из победителей
export async function deleteCarFromWinners(id: string) {
  const winners = await getWinnersApi(-1);
  console.log('winners ЛОГИК ДЕЛЕТ', winners);
  GLOBAL_STATE.countCarsInGarageWinners = +winners.countWinnerCars;
  // console.log('GLOBAL_STATE.countCarsInGarageWinners', GLOBAL_STATE.countCarsInGarageWinners);
  const key: boolean = winners.winnersCarsArray.some((car) => car.id === +id);
  // console.log('key', key);
  if (key) {
    await deleteWinnerApi(id);
  }
  checkbuttonWinnerPagination();
  await renderContainerResultWin();
}

