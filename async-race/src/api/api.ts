import {
  ICheckEngine,
  ICarApi,
  IResponseGetCarsApi,
  IGeneralWinnersResponse,
  IWinnerCarApi,
  IStartStop,
} from './../types/_interfaces';

import {
  urlEngine, urlGarage,
  urlWinners, MAX_CARS_IN_PAGE,
  MAX_WINNERS_CARS_IN_PAGE,
  GLOBAL_STATE, GLOBAL_DEFAULT_MINUS_ONE,
  DEFAULT_PAGE_IN_CARS_API,
  DEFAULT_CARS_API,
  ENGINE_STATUS_SUCCSES,
} from '../constants/constants';

import { WinnersSortOrderEnum, WinnersSortEnum } from '../types/_enum';

// Возвращает данные об автомобилях в гараже.
export async function getCarsApi(page: number = DEFAULT_PAGE_IN_CARS_API,
  limit: number = MAX_CARS_IN_PAGE): Promise<IResponseGetCarsApi> {
  const res: Response = await fetch(`${urlGarage}?_page=${page}&_limit=${limit}`, {
    method: 'GET',
  });
  const carsArray: ICarApi[] = await res.json();
  const countCars = res.headers.get('X-Total-Count') || DEFAULT_CARS_API;
  GLOBAL_STATE.countCarsInGarageRace = +countCars;
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

// обновляем машину в ГАРАЖЕ
export async function updateCarAPi(id: string, car: ICarApi): Promise<void> {
  await fetch(`${urlGarage}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
}

//  удаляет машину из гаража
export async function deleteCarAPi(id: string): Promise<void> {
  await fetch(`${urlGarage}/${id}`, {
    method: 'DELETE',
  });
}

// удаляет машину из победителей
export async function deleteWinnerApi(id: string): Promise<void> {
  return (await fetch(`${urlWinners}/${id}`, {
    method: 'DELETE',
  })).json();
}

// метод СТАР переводит двигаетель в старт
export async function startEngineCarApi(id: string | number): Promise<IStartStop> {
  return (await fetch(`${urlEngine}?id=${id}&status=started`, {
    method: 'PATCH',
  })
  ).json();
}

// метод СТОП переводит двигаетель в стоп
export async function stopEngineCarApi(id: string): Promise<IStartStop> {
  return (await fetch(`${urlEngine}?id=${id}&status=stopped`, {
    method: 'PATCH',
  })
  ).json();
}

// метод проверки состояния двигателя
export async function checkEngineDriveCar(id: string): Promise<ICheckEngine> {
  const data = await fetch(`${urlEngine}?id=${id}&status=drive`, {
    method: 'PATCH',
  }).catch();
  if (data.status === ENGINE_STATUS_SUCCSES) {
    return { success: true };
  }
  return { success: false };
}

// Возвращает json данные о победителях.
export async function getWinnersApi(
  page: number = DEFAULT_PAGE_IN_CARS_API,
  sort: WinnersSortEnum = GLOBAL_STATE.winnersSort,
  order: WinnersSortOrderEnum = GLOBAL_STATE.winnersSortOrder,
  limit = MAX_WINNERS_CARS_IN_PAGE,
): Promise<IGeneralWinnersResponse> {
  let res: Response;
  if (page === GLOBAL_DEFAULT_MINUS_ONE) {
    res = await fetch(`${urlWinners}`, {
      method: 'GET',
    });
  } else {
    res = await fetch(`${urlWinners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
      {
        method: 'GET',
      });
  }
  const winnersCarsArray: IWinnerCarApi[] = await res.json();
  const countWinnerCars = res.headers.get('X-Total-Count') || DEFAULT_CARS_API;
  return {
    countWinnerCars: countWinnerCars,
    winnersCarsArray: winnersCarsArray,
  };
}

// Возвращает данные об указанном автомобиле ПОБЕДИТЕЛЯ
export async function getWinnerCarAPi(id: string): Promise<IWinnerCarApi> {
  const res = await fetch(`${urlWinners}/${id}`, {
    method: 'GET',
  });
  return res.json();
}

// Метод создания победителя гонки
export async function сreateWinnerCarAPi(winCar: IWinnerCarApi): Promise<IWinnerCarApi> {
  return (await fetch(urlWinners, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(winCar),
  })).json();
}

// обновляем Машину победителя 
export async function updateWinnerCarAPi(id: string, winCar: IWinnerCarApi): Promise<void> {
  await fetch(`${urlWinners}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(winCar),
  });
}