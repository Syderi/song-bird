import {
  ZERO, GENERATE_CARS_LENGTH, CAR_DATA, GENERATE_COLOR_LENGTH, GENERATE_COLOR_16FORMAT_LENGTH,
} from '../constants/constants';
import { buttonRaceGenerateCars } from '../create/createSectionRace';
import { сreateCarAPi } from '../api/api';
import { renderContainerCARS } from '../create/render';
import checkbuttonRacePagination from './LogicPaginationRace';

// Функция генерации случайного числа от min до (max+1)
function getRandomNum(min: number, max: number): number {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

// Функция генерации случайного цвета
function generateRandomColor(): string {
  const arr: string[] = [];
  for (let index = ZERO; index < GENERATE_COLOR_LENGTH; index += 1) {
    arr.push(getRandomNum(ZERO, GENERATE_COLOR_16FORMAT_LENGTH).toString(16));
  }
  return `#${arr.join('')}`;
}

// Функция генерации случайного имени
export default function generateRandomName(): string {
  const brandKeys = Object.keys(CAR_DATA);
  const brand = brandKeys[getRandomNum(ZERO, brandKeys.length - 1)];
  const modelCar = CAR_DATA[brand][getRandomNum(ZERO, CAR_DATA[brand].length - 1)];
  return `${brand} ${modelCar}`;
}

// Функция генерации случайных 100 машин
function create100Cars(): void {
  for (let index = ZERO; index < GENERATE_CARS_LENGTH; index += 1) {
    const color = generateRandomColor();
    const name = generateRandomName();
    сreateCarAPi({
      name,
      color,
    });
  }
  renderContainerCARS();
  checkbuttonRacePagination();
}

buttonRaceGenerateCars.addEventListener('click', () => {
  create100Cars();
});
