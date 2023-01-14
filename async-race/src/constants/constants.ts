import { ICarData } from '../types/_interfaces';
import { EngineDriveEnum, WinnersSortEnum, WinnersSortOrderEnum } from '../types/_enum';

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
export const GLOBAL_DEFAULT_MINUS_ONE = -1;
export const COLOR_BLACK = '#000000';




export const CAR_DATA: ICarData = {
  'Alfa Romeo': ['105/115', '145', '146', '147', '155', '156', '159', '164', '166', '1900'],
  'Audi': ['100', '200', '50', '80', '90', '920', 'A1', 'A2', 'A3', 'A4'],
  'Austin': ['Allegro', 'Ambassador', 'FL2', 'FX4', 'Maestro', 'Maxi', 'Metro', 'Mini', 'Montego', 'Princess', 'Sprite'],
  'Bentley': ['Arnage', 'Azure', 'Bentayga', 'Brooklands', 'Continental', 'Continental Flying Spur', 'Continental GT', 'Eight', 'Flying Spur', 'Mark VI'],
  'Buick': ['Cascada', 'Century', 'Electra', 'Enclave', 'Encore', 'Encore GX', 'Envision', 'Estate Wagon', 'Excelle', 'GL8'],
  'Cadillac': ['Allante', 'ATS', 'ATS-V', 'BLS', 'Brougham', 'Catera', 'CT4', 'CT4-V', 'CT5', 'CT5-V'],
  'Changan': ['Alsvin V7', 'Auchan A600 EV', 'Benni', 'Benni EC/EV', 'CM-8', 'CS15', 'CS35', 'CS35PLUS', 'CS55', 'CS75'],
  'Dacia': ['1300', '1310', '1410', 'Dokker', 'Duster', 'Jogger', 'Lodgy', 'Logan', 'Nova', 'Pick-Up'],
  'Infiniti': ['EX', 'FX', 'G', 'I', 'J', 'JX', 'M', 'Q', 'Q30', 'Q40'],
  'Jaguar': ['E-Pace', 'E-type', 'F-Pace', 'F-Type', 'I-Pace', 'Mark 2', 'Mark IX', 'S-Type', 'X-Type', 'XE'],
  'LADA (ВАЗ)': ['1111 Ока', '2101', '2102', '2103', '2104', '2105', '2106', '2107', '2108', '2109'],
  'Lamborghini': ['350/400 GT', 'Aventador', 'Centenario', 'Countach', 'Countach LPI 800-4', 'Diablo', 'Egoista', 'Espada', 'Gallardo', 'Huracán'],
  'Москвич': ['2136', '2137', '2138', '2140', '2141', '2142', '400', '408', 'Князь Владимир', 'Святогор', 'Юрий Долгорукий'],
  'УАЗ': ['3151', '3153', '3159', '3160', '3162 Simbir', '469', 'Hunter', 'Patriot', 'Pickup', 'Астеро'],
};

interface IGlobalState {
  countOfPageRace: number;
  countOfPageWinners: number;
  countCarsInGarageRace: number;
  countCarsInGarageWinners: number;
  winnersSort: WinnersSortEnum;
  winnersSortOrder: WinnersSortOrderEnum;
  idSelectedCar: number | string;
  arraybuttonStartA: HTMLButtonElement[];
  arraybuttonStopB: HTMLButtonElement[];
  arrayButtonRemove: HTMLButtonElement[];
  arrayButtonSelect: HTMLButtonElement[];
  arraytrackCarSvg: HTMLElement[];
  engineCarsStatusMap: Map<string, EngineDriveEnum>;
  isRace: boolean;
  isAllCarsReady: boolean,
  isWinnerCarinRace: boolean;
}

export const GLOBAL_STATE: IGlobalState = {
  countOfPageRace: 1,
  countOfPageWinners: 1,
  countCarsInGarageRace: 0,
  countCarsInGarageWinners: 0,
  winnersSort: WinnersSortEnum.wins,
  winnersSortOrder: WinnersSortOrderEnum.DESC,
  idSelectedCar: GLOBAL_DEFAULT_MINUS_ONE,
  arraybuttonStartA: [],
  arraybuttonStopB: [],
  arrayButtonSelect: [],
  arrayButtonRemove: [],
  arraytrackCarSvg: [],
  engineCarsStatusMap: new Map(),
  isRace: false,
  isAllCarsReady: false,
  isWinnerCarinRace: false,
};