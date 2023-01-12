import { createElement, addChildren, createContainerCar, createElementfromString } from './createElement';

export const sectionRace = createElement('section', { className: 'race' });

const raceInputs = createElement('div', { className: 'race__inputs' });

const raceCreate = createElement('div', { className: 'race__wrapper race-create' });
export const inputNameCreate = createElement('input', { className: 'input name-create', type: 'text' }) as HTMLInputElement;
export const inputColorCreate = createElement('input', { className: 'input color-create', type: 'color' }) as HTMLInputElement;
export const buttonCreate = createElement('button', { className: 'button button_create', textContent: 'CREATE' }) as HTMLButtonElement;
addChildren(raceCreate, [inputNameCreate, inputColorCreate, buttonCreate]);

const raceUpdate = createElement('div', { className: 'race__wrapper race-update' });
const inputNameUpdate = createElement('input', { className: 'input name-update', type: 'text' }) as HTMLInputElement;
const inputColorUpdate = createElement('input', { className: 'input color-update', type: 'color' }) as HTMLInputElement;
const buttonUpdate = createElement('button', { className: 'button button_update', textContent: 'UPDATE' }) as HTMLButtonElement;
addChildren(raceUpdate, [inputNameUpdate, inputColorUpdate, buttonUpdate]);

const raceStart = createElement('div', { className: 'race__wrapper race-start' });
const buttonRaceStart = createElement('button', { className: 'button button_race-start', textContent: 'START' }) as HTMLButtonElement;
const buttonRaceReset = createElement('button', { className: 'button button_race-reset', textContent: 'RESET' }) as HTMLButtonElement;
export const buttonRaceGenerateCars = createElement('button', { className: 'button button_race-generate-cars', textContent: 'GENERATE CARS' }) as HTMLButtonElement;
addChildren(raceStart, [buttonRaceStart, buttonRaceReset, buttonRaceGenerateCars]);

addChildren(raceInputs, [raceCreate, raceUpdate, raceStart]);

// создание переменного враппера с гонками
const wrapperTrack = createElement('div', { className: 'wrapper-track' });
export const trackItems = createElement('div', { className: 'track-items', textContent: 'garage (1)' });
export const trackNumberPage = createElement('div', { className: 'track-number-page', textContent: 'Page #1' });
export const containerCARS = createElement('div', { className: 'container-cars' });

// renderContainerCARS();

// const mapHtml = new Set<HTMLButtonElement>();

// for (let index = 0; index < 3; index++) {
//   const temp = createContainerCar(`#${index}5${index}${index}0${index}`)
//   addChildren(containerCARS, [temp.containerCar])
//   mapHtml.add(temp.buttonStartA)
// }

// for (const user of mapHtml) {
//   console.log('',user); // John (потом Pete и Mary)
// }

addChildren(wrapperTrack, [trackItems, trackNumberPage, containerCARS]);
// конец создания переменного враппера с гонками

const racePagination = createElement('div', { className: 'race__pagination' });
export const buttonRacePaginationPrev = createElement('button', { className: 'button button_race__pagination-prev', textContent: 'PREV' }) as HTMLButtonElement;
// buttonRacePaginationPrev.disabled = true;
export const buttonRacePaginationNext = createElement('button', { className: 'button button_race__pagination-next', textContent: 'NEXT' }) as HTMLButtonElement;
addChildren(racePagination, [buttonRacePaginationPrev, buttonRacePaginationNext]);

addChildren(sectionRace, [raceInputs, wrapperTrack, racePagination]);

// export { sectionRace, mapHtml };


// buttonRaceStart.addEventListener('click', ()=> {
//   let user: HTMLButtonElement;
//   for (user of mapHtml) {
//     // console.log('user',user); // John (потом Pete и Mary)
//     user.click();
//   }
// });