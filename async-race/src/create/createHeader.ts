import { createElement, addChildren } from './createElement';

const header = createElement('header', { className: 'header' });
export const buttonHeaderGarage = createElement('button',
  { className: 'button header__garage', textContent: 'TO GARAGE' }) as HTMLButtonElement;
buttonHeaderGarage.disabled = true;
export const buttonHeaderWinner = createElement('button',
  { className: 'button header__winner', textContent: 'TO WINNER' }) as HTMLButtonElement;
export const messageHeaderWinner = createElement('div', { className: 'header__message' });

addChildren(header, [buttonHeaderGarage, buttonHeaderWinner, messageHeaderWinner]);
export { header };