import { inputNameCreate, inputColorCreate, buttonCreate } from '../create/createSectionRace';
import { сreateCarAPi } from '../api/api';
import { renderContainerCARS } from '../create/render';
import { checkbuttonRacePagination } from './LogicPaginationRace';
import { generateRandomName } from './logigGenerate100Cars';

// Логика добавления машины в гараж
export async function createCar(
  name: string = inputNameCreate.value,
  color: string = inputColorCreate.value,
): Promise<void> {
  if (!name.trim()) name = generateRandomName();
  await сreateCarAPi({
    name: name,
    color: color,
  });
  await renderContainerCARS();
  checkbuttonRacePagination();
}

buttonCreate.addEventListener('click', () => {
  createCar();
});
