

const urlBase: string = 'http://localhost:3000';

export const urlGarage = `${urlBase}/garage`;
export const urlWinners = `${urlBase}/winners`;
export const urlEngine = `${urlBase}/engine`;

export const MAX_CARS_IN_PAGE = 7;
export const MAX_WINNERS_CARS_IN_PAGE = 10; // временно изменил
// export const MAX_WINNERS_CARS_IN_PAGE = 2;

interface IGlobalState {
  countOfPageRace: number;
  countOfPageWinners: number;
  countCarsInGarageRace: number;
  countCarsInGarageWinners: number;
}

export const GLOBAL_STATE: IGlobalState = {
  countOfPageRace: 1,
  countOfPageWinners: 1,
  countCarsInGarageRace: 0,
  countCarsInGarageWinners: 0,
};