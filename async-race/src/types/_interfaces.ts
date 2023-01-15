import { EngineDriveEnum, WinnersSortEnum, WinnersSortOrderEnum } from './_enum';

export interface ICarApi {
  name: string;
  color: string;
  id?: number;
}

export interface IResponseGetCarsApi {
  countCars: string;
  carsArray: ICarApi[];
}

export interface IWinnerCarApi {
  id?: number;
  wins: number;
  time: number;
}

export interface IGeneralWinnersResponse {
  countWinnerCars: string;
  winnersCarsArray: IWinnerCarApi[];
}

export interface ICarData {
  [x: string]: Array<string>
}

export interface IStartStop {
  velocity: number;
  distance: number;
}

export interface ICheckEngine {
  success: boolean;
}

export interface IGlobalState {
  countOfPageRace: number;
  countOfPageWinners: number;
  countCarsInGarageRace: number;
  countCarsInGarageWinners: number;
  winnersSort: WinnersSortEnum;
  winnersSortOrder: WinnersSortOrderEnum;
  idSelectedCar: number | string;
  arraybuttonStartA: HTMLButtonElement[];
  arraybuttonStopB: HTMLButtonElement[];
  arrayButtonRemove: HTMLButtonElement[];
  arrayButtonSelect: HTMLButtonElement[];
  arraytrackCarSvg: HTMLElement[];
  engineCarsStatusMap: Map<string, EngineDriveEnum>;
  isRace: boolean;
  isAllCarsReady: boolean,
  isWinnerCarinRace: boolean;
}

export interface IContainerCar {
  containerCar: HTMLElement;
  buttonStartA: HTMLButtonElement;
  buttonStopB: HTMLButtonElement;
  buttonSelect: HTMLButtonElement;
  buttonRemove: HTMLButtonElement;
  trackCarSvg: HTMLElement;
}



