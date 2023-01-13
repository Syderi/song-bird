import { EngineDriveEnum } from './../types/_enum';
import { GLOBAL_STATE } from '../constants/constants';
import { startEngineCarApi, stopEngineCarApi } from '../api/api';

// получение ширины экрана
function getOffsetWidth() {
  return Math.floor(document.body.offsetWidth - 220);
}
// функция возвращения дива с картинкой машины
function getImageSVGDivCar(id: string): HTMLElement | null {
  const div = GLOBAL_STATE.arraytrackCarSvg.find(
    (track) => track.getAttribute('data-trackCarSvg') === id,
  );
  console.log('DIV DRIVE', div);
  if (div) return div;
  return null;
}

// функция движения машины
function driveCar(time: number, id: string, endWidth = getOffsetWidth()) {
  console.log('GLOBAL_STATE из драйва', GLOBAL_STATE);
  let curentWidth = 0;
  const frame = (time / 1000) * 60;
  const step = (endWidth - 0) / frame;
  const div = getImageSVGDivCar(id);
  const moveCar = () => {
    const status = GLOBAL_STATE.engineCarsStatusMap.get(id);
    curentWidth += step;
    if (curentWidth < endWidth && status === EngineDriveEnum.started) {
      if (div) {
        div.style.transform = `translateX(${curentWidth}px)`;
      }
      requestAnimationFrame(moveCar);
    }
  };
  moveCar();
}

// функция анимации движения
export async function startAnimateCar(id: string) {
  const engineCarData = await startEngineCarApi(id);
  GLOBAL_STATE.engineCarsStatusMap.set(id, EngineDriveEnum.started);
  // console.log('engineCarData ID 1', engineCarData);
  const time = engineCarData.distance / engineCarData.velocity;
  // console.log('time ID 1', time);
  driveCar(time, id);
}

// animate('1');

// функция остановки движения по кнопке В
export async function stopAnimateCar(id: string) {
  await stopEngineCarApi(id);
  GLOBAL_STATE.engineCarsStatusMap.set(id, EngineDriveEnum.stopped);
  const div = getImageSVGDivCar(id);
  console.log('DIV DRIVE STOP', div);
  if (div) {
    div.style.transform = 'translateX(0px)';
    console.log('GLOBAL_STATE из стопа', GLOBAL_STATE);
  }

}












// class Car {
//   satatus = null


//   async drive() {
//     this.move()
//     this.status = 'move'
//     const response = await fetch('/drive')
//     if (response.status === 500) this.status = 'broken'
//   }

//   move() {
//     // animation

//     settimeout(() => {
//       if (this.status === 'move') this.move()
//       if (this.status === 'broken') this.broken()
//     }, 50)
//   }

//   broken() {
//     // broken
//     fetch('/stopped')
//   }
// }




