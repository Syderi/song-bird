import '../index.html';
import './_global.scss';
import './components/favicon/_add_favicon' // добавил фавиконку


import { ICar} from './types/_interfaces'
import { getCars } from './data/data'

console.log('ПРОВЕРКА')

async function displayGarage() {
  const carsLength: ICar[] = await getCars();
  console.log('carsLength',carsLength)
  return carsLength
}

void displayGarage();