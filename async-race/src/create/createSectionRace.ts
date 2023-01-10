import { createElement, addChildren, createContainerCar, createElementfromString } from './createElement'
// import { svgCar } from '../constants/car'
// import flag from '../assets/img/png/flag.png'

const sectionRace = createElement('section', { className: 'race' })

const raceInputs = createElement('div', { className: 'race__inputs' })

const raceCreate = createElement('div', { className: 'race__wrapper race-create' })
const inputNameCreate = createElement('input', { className: 'input name-create', type: 'text' }) as HTMLInputElement
const inputColorCreate = createElement('input', { className: 'input color-create', type: 'color' }) as HTMLInputElement
const buttonCreate = createElement('button', { className: 'button button_create', textContent: 'CREATE' }) as HTMLButtonElement
addChildren(raceCreate, [inputNameCreate, inputColorCreate, buttonCreate])

const raceUpdate = createElement('div', { className: 'race__wrapper race-update' })
const inputNameUpdate = createElement('input', { className: 'input name-update', type: 'text' }) as HTMLInputElement
const inputColorUpdate = createElement('input', { className: 'input color-update', type: 'color' }) as HTMLInputElement
const buttonUpdate = createElement('button', { className: 'button button_update', textContent: 'UPDATE' }) as HTMLButtonElement
addChildren(raceUpdate, [inputNameUpdate, inputColorUpdate, buttonUpdate])

const raceStart = createElement('div', { className: 'race__wrapper race-start' })
const buttonRaceStart = createElement('button', { className: 'button button_race-start', textContent: 'START' }) as HTMLButtonElement
const buttonRaceReset = createElement('button', { className: 'button button_race-reset', textContent: 'RESET' }) as HTMLButtonElement
const buttonRaceGenerateCars = createElement('button', { className: 'button button_race-generate-cars', textContent: 'GENERATE CARS' }) as HTMLButtonElement
addChildren(raceStart, [buttonRaceStart, buttonRaceReset, buttonRaceGenerateCars])

addChildren(raceInputs, [raceCreate, raceUpdate, raceStart])

// создание переменного враппера с гонками
const wrapperTrack = createElement('div', { className: 'wrapper-track' })
const trackItems = createElement('div', { className: 'track-items', textContent: `garage (1)` })
const trackNumberPage = createElement('div', { className: 'track-number-page', textContent: `Page #1` })
const containerCARS = createElement('div', { className: 'container-cars' })

// // функция создания одиночной гонки
// function createContainerCar() { 
//   const containerCar = createElement('div', { className: 'container-car' })
//   const raceWrapper = createElement('div', { className: 'race__wrapper' })
//   const buttonSelect = createElement('button', { className: 'button button_select', textContent: 'SELECT' }) as HTMLButtonElement
//   const buttonRemove = createElement('button', { className: 'button button_remove', textContent: 'REMOVE' }) as HTMLButtonElement
//   const carName = createElement('p', { className: 'car-name', textContent: `Audi` })
//   addChildren(raceWrapper, [buttonSelect, buttonRemove, carName])
  
//   const trackCar = createElement('div', { className: 'race__wrapper track__car' })
//   const buttonStartA = createElement('button', { className: 'button button_start', textContent: 'A' }) as HTMLButtonElement
//   const buttonStopB = createElement('button', { className: 'button button_stop', textContent: 'B' }) as HTMLButtonElement
//   const trackCarSvg = createElement('div', { className: 'container__track__car-svg' })


//   const car = createElementfromString(svgCar) as HTMLOrSVGImageElement
//   car.style.fill = `#123456`
//   car.style.width = `50px`
//   car.style.height = `50px`
//   car.setAttribute('class', 'track__car-image')
//   trackCarSvg.append(car)

//   const trackFinish = createElement('img', { className: 'track__finish', src: flag, alt:'finish flag' }) as HTMLImageElement
//   addChildren(trackCar, [buttonStartA,buttonStopB, trackCarSvg, trackFinish])
//   addChildren(containerCar, [raceWrapper, trackCar])
//   return containerCar
// }

const mapHtml = new Set<HTMLButtonElement>()

for (let index = 0; index < 5; index++) {
  const temp = createContainerCar(`#${index}5${index}${index}0${index}`)
  addChildren(containerCARS, [temp.containerCar])
  mapHtml.add(temp.buttonStartA)
}

for (const user of mapHtml) {
  console.log('',user); // John (потом Pete и Mary)
}

addChildren(wrapperTrack, [trackItems, trackNumberPage, containerCARS])
// конец создания переменного враппера с гонками

const racePagination = createElement('div', { className: 'race__pagination' })
const buttonRacePaginationPrev = createElement('button', { className: 'button button_race__pagination-prev', textContent: 'PREV' }) as HTMLButtonElement
const buttonRacePaginationNext = createElement('button', { className: 'button button_race__pagination-next', textContent: 'NEXT' }) as HTMLButtonElement
addChildren(racePagination, [buttonRacePaginationPrev, buttonRacePaginationNext])

addChildren(sectionRace, [raceInputs, wrapperTrack, racePagination])

export { sectionRace, mapHtml}


buttonRaceStart.addEventListener('click', ()=> {
  let user: HTMLButtonElement;
  for (user of mapHtml) {

    // console.log('user',user); // John (потом Pete и Mary)
    user.click()
  }
})