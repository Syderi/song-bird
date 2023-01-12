import { GLOBAL_STATE, ZERO, GENERATE_CARS_LENGTH, CAR_DATA, GENERATE_COLOR_LENGTH, GENERATE_COLOR_16FORMAT_LENGTH } from '../constants/constants';
import { buttonRaceGenerateCars } from '../create/createSectionRace';
import { createCar } from './logicCreateCar';
import { сreateCarAPi } from '../api/api';
import { renderContainerCARS } from '../create/render';
import { checkbuttonRacePagination } from './LogicPaginationRace';


// Функция случайного числа
// function getRandomNum(start: number, end: number): number {
//   return Math.floor(Math.random() * (end - start)) + end;
// }

function getRandomNum(min: number, max: number): number {
  // случайное число от min до (max+1)
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}


// Функция генерации случайного цвета
function generateRandomColor(): string {
  const arr: string[] = [];
  for (let index = ZERO; index < GENERATE_COLOR_LENGTH; index++) {
    arr.push(getRandomNum(ZERO, GENERATE_COLOR_16FORMAT_LENGTH).toString(16));
  }
  return `#${arr.join('')}`;
}

// Функция генерации случайного имени
function generateRandomName(): string {

  const brandKeys = Object.keys(CAR_DATA);
  const brand = brandKeys[getRandomNum(ZERO, brandKeys.length - 1)];
  const modelCar = CAR_DATA[brand][getRandomNum(ZERO, CAR_DATA[brand].length - 1)];
  // const arr: string[] = [];
  // for (let index = ZERO; index < GENERATE_COLOR_LENGTH; index++) {
  //   arr.push(getRandomNum(ZERO, GENERATE_COLOR_16FORMAT_LENGTH).toString(16));
  // }
  return `${brand} ${modelCar}`;
}

function create100Cars() {
  for (let index = ZERO; index < GENERATE_CARS_LENGTH; index++) {
    const color = generateRandomColor();
    const name = generateRandomName();
    сreateCarAPi({
      name: name,
      color: color,
    });
    // createCar(name, color);
  }
  renderContainerCARS();
  checkbuttonRacePagination();
}

buttonRaceGenerateCars.addEventListener('click', () => {
  console.log('КЛИК ПО ГЕНЕРАЦИИ 100');
  create100Cars();
});
