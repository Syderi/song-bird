import {
  GLOBAL_STATE,
  GLOBAL_DEFAULT_MINUS_ONE,
  COLOR_BLACK,
} from '../constants/constants';
import { getCarAPi, updateCarAPi } from '../api/api';
import { inputNameUpdate, inputColorUpdate, buttonUpdate } from '../create/createSectionRace';
import { renderContainerCARS, renderContainerResultWin } from '../create/render';

// функция обновления инпутов изменения машины
export async function updateInputsValues(): Promise<void> {
  const id = GLOBAL_STATE.idSelectedCar;
  if (id && id !== GLOBAL_DEFAULT_MINUS_ONE) {
    const car = await getCarAPi(+id);
    inputNameUpdate.value = car.name;
    inputColorUpdate.value = car.color;
  } else {
    inputNameUpdate.value = '';
    inputColorUpdate.value = COLOR_BLACK;
  }
}

// функция обновления селектов Дизайбл
export function buttonsSelectetIsTrue(): void {
  GLOBAL_STATE.arrayButtonSelect.forEach((selectButton) => {
    const newButton = selectButton;
    newButton.disabled = false;
  });
}

// функция обновления машины
async function updateCar(id: string): Promise<void> {
  const name = inputNameUpdate.value;
  const color = inputColorUpdate.value;
  await updateCarAPi(id, {
    name,
    color,
  });
  await renderContainerCARS();
  await renderContainerResultWin();
}

// слушатель на кнопке обновления машины
buttonUpdate.addEventListener('click', () => {
  const id = GLOBAL_STATE.idSelectedCar;
  if (id && id !== GLOBAL_DEFAULT_MINUS_ONE) {
    updateCar(id.toString());
  }
});
