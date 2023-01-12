// import { extends, WinnerCarApi } from './_interfaces';

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
  id: number;
  wins: number;
  time: number;
  // car?: ICarApi;
}


export interface IGeneralWinnersResponse {
  countWinnerCars: string;
  winnersCarsArray: IWinnerCarApi[];
}

export interface ICarData {
  [x: string]: Array<string>
}

