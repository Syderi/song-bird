import { createElement, addChildren } from './createElement';

export const sectionResults = createElement('section', { className: 'results' });
sectionResults.style.display = 'none';
export const resultsWinners = createElement(
  'div',
  { className: 'results__winners', textContent: 'winners (1)' },
);
export const resultsPage = createElement(
  'div',
  { className: 'results__page', textContent: 'Page #1' },
);

const resultsTable = createElement('table', { className: 'results__table' }) as HTMLTableElement;
export const resultsTbody = createElement('tbody', { className: 'results__tbody' }) as HTMLTableElement;
addChildren(resultsTable, [resultsTbody]);

export const resultsTableTitleRow = createElement(
  'tr',
  { className: 'results__table__title-row' },
) as HTMLTableElement;
const resultsTableTitleNumber = createElement(
  'th',
  { className: 'title-row-item', textContent: 'Number' },
) as HTMLTableElement;
const resultsTableTitleCar = createElement(
  'th',
  { className: 'title-row-item', textContent: 'Car' },
) as HTMLTableElement;
const resultsTableTitleName = createElement(
  'th',
  { className: 'title-row-item', textContent: 'Name' },
) as HTMLTableElement;
// СОРТИРОВКИ ЭЛЕМЕНТЫ РЕЗУЛЬТАТОВ
export const clickResultsTableSortWins = createElement(
  'th',
  { className: 'title-row-item wins-sort', textContent: 'Wins ⮃' },
) as HTMLTableElement;
export const clickResultsTableSortTime = createElement(
  'th',
  { className: 'title-row-item time-sort', textContent: 'Best time ⮃ (seconds)' },
) as HTMLTableElement;

addChildren(
  resultsTableTitleRow,
  [resultsTableTitleNumber,
    resultsTableTitleCar,
    resultsTableTitleName,
    clickResultsTableSortWins,
    clickResultsTableSortTime],
);

const resultsPagination = createElement(
  'div',
  { className: 'race__pagination pagination_results' },
);
export const buttonResultsPaginationPrev = createElement(
  'button',
  { className: 'button button_results__pagination-prev', textContent: 'PREV' },
) as HTMLButtonElement;
export const buttonResultsPaginationNext = createElement(
  'button',
  { className: 'button button_results__pagination-next', textContent: 'NEXT' },
) as HTMLButtonElement;
addChildren(resultsPagination, [buttonResultsPaginationPrev, buttonResultsPaginationNext]);

addChildren(sectionResults, [resultsWinners, resultsPage, resultsTable, resultsPagination]);
