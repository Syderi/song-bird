import { ICarData } from '../types/_interfaces';

const urlBase: string = 'http://localhost:3000';

export const urlGarage = `${urlBase}/garage`;
export const urlWinners = `${urlBase}/winners`;
export const urlEngine = `${urlBase}/engine`;

export const MAX_CARS_IN_PAGE = 7;
export const MAX_WINNERS_CARS_IN_PAGE = 10; // временно изменил
// export const MAX_WINNERS_CARS_IN_PAGE = 2;
export const GENERATE_CARS_LENGTH = 100;
export const GENERATE_COLOR_LENGTH = 6;
export const GENERATE_COLOR_16FORMAT_LENGTH = 15;
export const ZERO = 0;




export const CAR_DATA: ICarData = {
  'Alfa Romeo': ['105/115', '145', '146', '147', '155', '156', '159', '164', '166', '1900'],
  'Audi': ['100', '200', '50', '80', '90', '920', 'A1', 'A2', 'A3', 'A4'],
  'Austin': ['Allegro', 'Ambassador', 'FL2', 'FX4', 'Maestro', 'Maxi', 'Metro', 'Mini', 'Montego', 'Princess', 'Sprite'],
  'Bentley': ['Arnage', 'Azure', 'Bentayga', 'Brooklands', 'Continental', 'Continental Flying Spur', 'Continental GT', 'Eight', 'Flying Spur', 'Mark VI'],
  'Buick': ['Cascada', 'Century', 'Electra', 'Enclave', 'Encore', 'Encore GX', 'Envision', 'Estate Wagon', 'Excelle', 'GL8'],
  'Changan': ['Alsvin V7', 'Auchan A600 EV', 'Benni', 'Benni EC/EV', 'CM-8', 'CS15', 'CS35', 'CS35PLUS', 'CS55', 'CS75'],
  'Dacia': ['1300', '1310', '1410', 'Dokker', 'Duster', 'Jogger', 'Lodgy', 'Logan', 'Nova', 'Pick-Up'],
  'Infiniti': ['EX', 'FX', 'G', 'I', 'J', 'JX', 'M', 'Q', 'Q30', 'Q40'],
  'Jaguar': ['E-Pace', 'E-type', 'F-Pace', 'F-Type', 'I-Pace', 'Mark 2', 'Mark IX', 'S-Type', 'X-Type', 'XE'],
  'LADA (ВАЗ)': ['1111 Ока', '2101', '2102', '2103', '2104', '2105', '2106', '2107', '2108', '2109'],
  'Lamborghini': ['350/400 GT', 'Aventador', 'Centenario', 'Countach', 'Countach LPI 800-4', 'Diablo', 'Egoista', 'Espada', 'Gallardo', 'Huracán'],
};

interface IGlobalState {
  countOfPageRace: number;
  countOfPageWinners: number;
  countCarsInGarageRace: number;
  countCarsInGarageWinners: number;
}

export const GLOBAL_STATE: IGlobalState = {
  countOfPageRace: 1,
  countOfPageWinners: 1,
  countCarsInGarageRace: 0,
  countCarsInGarageWinners: 0,
};