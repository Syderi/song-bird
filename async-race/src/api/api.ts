import { urlEngine, urlGarage, urlWinners } from '../constants/constants';
import { ICar } from '../types/_interfaces';


// const base: string = 'http://localhost:3000';
// export const urlGarage = `${urlBase}/garage`;
// export const urlWinners = `${urlBase}/winners`;
// export const urlEngine = `${urlBase}/engine`;



// Возвращает json данные об автомобилях в гараже.
async function getCars(page: number = 1, limit: number = 7): Promise<ICar[]> {
  const res: Response = await fetch(`${urlGarage}?_page=${page}&_limit=${limit}`,{
    method: 'GET',
  });
  const data: Promise<ICar[]> = await res.json();
  console.log('res.headers',Object.fromEntries(res.headers))
  console.log('rres.headers.get(x-total-count)=',res.headers.get('x-total-count'))
  return data
}

async function getWinners(): Promise<ICar[]> {
  const res: Response = await fetch(urlWinners);
  const data: Promise<ICar[]> = await res.json();
  return data
}




// async function getCarsList() {
//   const res: Response = await fetch(garage);
//   const data = await res.json() as mProise<ICar[]>;
//   return await data
// }

export { getCars, getWinners };