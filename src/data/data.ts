import { ICar } from '../types/_interfaces';

const base: string = 'http://localhost:3000';

const garage = `${base}/garage`;

async function getCars(): Promise<ICar[]> {
  const res: Response = await fetch(garage);
  const data: Promise<ICar[]> = await res.json();
  return data
}


// async function getCarsList() {
//   const res: Response = await fetch(garage);
//   const data = await res.json() as mProise<ICar[]>;
//   return await data
// }

export { getCars };