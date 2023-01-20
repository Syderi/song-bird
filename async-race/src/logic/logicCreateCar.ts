import { inputNameCreate, inputColorCreate, buttonCreate } from '../create/createSectionRace';
import { сreateCarAPi } from '../api/api';
import { renderContainerCARS } from '../create/render';
import checkbuttonRacePagination from './LogicPaginationRace';
import generateRandomName from './logigGenerate100Cars';

// Логика добавления машины в гараж
export default async function createCar(
  name: string = inputNameCreate.value,
  color: string = inputColorCreate.value,
): Promise<void> {
  let newName = name;
  if (!newName.trim()) {
    newName = generateRandomName();
  }
  await сreateCarAPi({
    name: newName,
    color,
  });
  await renderContainerCARS();
  checkbuttonRacePagination();
}

buttonCreate.addEventListener('click', () => {
  createCar();
});
