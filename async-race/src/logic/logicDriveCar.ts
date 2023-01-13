import { GLOBAL_STATE } from '../constants/constants';
import { startEngineCarApi } from '../api/api';

// получение ширины экрана
function getOffsetWidth() {
  return Math.floor(document.body.offsetWidth - 220);
}

// функция движения машины
function drive(time: number, id: string, endWidth = getOffsetWidth()) {

  let curentWidth = 0;
  const frame = (time / 1000) * 60;
  const step = (endWidth - 0) / frame;
  const div = GLOBAL_STATE.arraytrackCarSvg.find(
    (track) => track.getAttribute('data-trackCarSvg') === id,
  );

  const moveCar = () => {
    curentWidth += step;
    if (div) {
      div.style.transform = `translateX(${curentWidth}px)`;
    }
    if (curentWidth < endWidth) {
      requestAnimationFrame(moveCar);
    }
  };
  moveCar();
}

// функция анимации движения
export async function animate(id: string) {
  const engineCarData = await startEngineCarApi(id);
  // console.log('engineCarData ID 1', engineCarData);
  const time = engineCarData.distance / engineCarData.velocity;
  // console.log('time ID 1', time);
  drive(time, id);
}

// animate('1');





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




