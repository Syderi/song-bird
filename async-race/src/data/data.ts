import { ICar } from '../types/_interfaces';

const base: string = 'http://localhost:3000';

const garage = `${base}/garage`;
const winners = `${base}/winners`;




async function getCars(): Promise<ICar[]> {
  const res: Response = await fetch(`${garage}?_page=1&_limit=7`);
  const data: Promise<ICar[]> = await res.json();
  console.log('res.headers',Object.fromEntries(res.headers))
  console.log('rres.headers.get(x-total-count)=',res.headers.get('x-total-count'))
  return data
}

async function getWinners(): Promise<ICar[]> {
  const res: Response = await fetch(winners);
  const data: Promise<ICar[]> = await res.json();
  return data
}




// async function getCarsList() {
//   const res: Response = await fetch(garage);
//   const data = await res.json() as mProise<ICar[]>;
//   return await data
// }

export { getCars, getWinners };