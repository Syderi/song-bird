import {
  urlEngine, urlGarage,
  urlWinners, MAX_CARS_IN_PAGE,
  MAX_WINNERS_CARS_IN_PAGE,
} from '../constants/constants';

import { WinnersSortOrderEnum, WinnersSortEnum } from '../types/_enum';
import { ICarApi, IResponseGetCarsApi, IGeneralWinnersResponse, IWinnerCarApi } from '../types/_interfaces';



// Возвращает данные об автомобилях в гараже.
export async function getCarsApi(page: number = 1, limit: number = MAX_CARS_IN_PAGE): Promise<IResponseGetCarsApi> {
  const res: Response = await fetch(`${urlGarage}?_page=${page}&_limit=${limit}`, {
    method: 'GET',
  });
  const carsArray: ICarApi[] = await res.json();
  let countCars = res.headers.get('X-Total-Count') ?? '0';
  if (!countCars) countCars = '0';
  return {
    countCars: countCars,
    carsArray: carsArray,
  };
}

// Возвращает данные об указанном автомобиле.
export async function getCarAPi(id: number): Promise<ICarApi> {
  const res = await fetch(`${urlGarage}/${id}`, {
    method: 'GET',
  });
  return res.json();
}

// Создает новую машину в гараже
export async function сreateCarAPi(car: ICarApi): Promise<ICarApi> {
  return (await fetch(urlGarage, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  })).json();
}

















// Возвращает json данные о победителях.
export async function getWinnersApi(
  page: number = 1,
  sort: WinnersSortEnum = WinnersSortEnum.wins,
  order: WinnersSortOrderEnum = WinnersSortOrderEnum.ASC,
  limit = MAX_WINNERS_CARS_IN_PAGE,
): Promise<IGeneralWinnersResponse> {
  const res: Response = await fetch(`${urlWinners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`, {
    method: 'GET',
  });
  const winnersCarsArray: IWinnerCarApi[] = await res.json();
  const countWinnerCars = res.headers.get('X-Total-Count') || '0';
  // if (!countWinnerCars) countWinnerCars = '0';
  await Promise.all(winnersCarsArray.map(async (el) => el.car = await getCarAPi(el.id)));
  return {
    countWinnerCars: countWinnerCars,
    winnersCarsArray: winnersCarsArray,
  };
}
