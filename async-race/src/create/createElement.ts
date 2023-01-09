import { stringObject } from '../types/_type'

function createElement(tagName: string = 'div', options?: stringObject) {
    const element = document.createElement(tagName);
    if (options) {
      Object.assign(element, options);
    }
    return element
  }

 function addChildren(Father: HTMLElement, children: (HTMLElement | string)[]) {
    Father.append(...children);
  }


  // Функция получения HTML элемента из строки
function createElementfromString(textString: string): HTMLElement {
  const div = document.createElement('div');
  div.innerHTML = textString;
  return div.firstElementChild as HTMLElement
}

export {createElement, addChildren, createElementfromString}