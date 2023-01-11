import { createElement, addChildren, createContainerCar, createElementfromString } from './createElement';
// import { svgCar } from '../constants/car'
// import flag from '../assets/img/png/flag.png'
import { getCarsApi } from '../api/api';
import {  ICar } from '../types/_interfaces';
import { containerCARS } from './createSectionRace';



export async function renderContainerCARS(page: number = 1) {
  containerCARS.innerHTML = '';
  const carsArray: ICar[] = await getCarsApi(page);
  console.log('carsArray', carsArray);
  carsArray.forEach(car => {
    const tempCar = createContainerCar(car.name, car.color);
    addChildren(containerCARS, [tempCar.containerCar]);
  });
}

