import favicon from '../../assets/img/png/bmw-mini-icon.png';

// функция добавления фавиконки на проект
export default function addFavicon(): void {
  const link: HTMLLinkElement = document.createElement('link');
  link.rel = 'icon';
  link.href = favicon;
  document.head.appendChild(link);
}

addFavicon();

