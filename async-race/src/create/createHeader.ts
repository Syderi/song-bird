import { createElement, addChildren } from './createElement';

const header = createElement('header', { className: 'header' });
export const buttonHeaderGarage = createElement('button', { className: 'button header__garage', textContent: 'TO GARAGE' });
export const buttonHeaderWinner = createElement('button', { className: 'button header__winner', textContent: 'TO WINNER' });

addChildren(header, [buttonHeaderGarage, buttonHeaderWinner]);
export { header };