import '../index.html';
import './_global.scss';
import './components/favicon/_add_favicon'; // добавил фавиконку
import './create/createBody';
import './create/render';
import './logic/mainLogic';

console.log('ПРОВЕРКА');


import { sectionRace } from './create/createSectionRace';
import { buttonHeaderGarage, buttonHeaderWinner } from './create/createHeader';

buttonHeaderGarage.addEventListener('click', () => {
  sectionRace.style.display = 'none';
});

buttonHeaderWinner.addEventListener('click', () => {
  sectionRace.style.display = 'block';
});