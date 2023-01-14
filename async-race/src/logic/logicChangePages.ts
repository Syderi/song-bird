import { sectionRace } from '../create/createSectionRace';
import { sectionResults } from '../create/createSectionResults';
import { buttonHeaderGarage, buttonHeaderWinner } from '../create/createHeader';
import { renderContainerResultWin } from '../create/render';

buttonHeaderGarage.addEventListener('click', () => {
  buttonHeaderWinner.disabled = false;
  buttonHeaderGarage.disabled = true;
  sectionResults.style.display = 'none';
  sectionRace.style.display = 'block';
});

buttonHeaderWinner.addEventListener('click', () => {
  buttonHeaderGarage.disabled = false;
  buttonHeaderWinner.disabled = true;
  sectionRace.style.display = 'none';
  sectionResults.style.display = 'flex';
  // renderContainerResultWin();
});