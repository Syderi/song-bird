

const urlBase: string = 'http://localhost:3000';

export const urlGarage = `${urlBase}/garage`;
export const urlWinners = `${urlBase}/winners`;
export const urlEngine = `${urlBase}/engine`;

export const MAX_CARS_IN_PAGE = 7;
export const MAX_WINNERS_CARS_IN_PAGE = 10;

interface IGlobalState {
  countOfPageRace: number;
  countCarsInGarageRace: number;
  countOfPageWinners: number;
}

export const GLOBAL_STATE: IGlobalState = {
  countOfPageRace: 1,
  countCarsInGarageRace: 0,
  countOfPageWinners: 1,
};