import favicon from '../../assets/img/png/bmw-mini-icon.png';

export default function addFavicon() {
  const link: HTMLLinkElement = document.createElement('link');
  link.rel = 'icon';
  link.href = favicon;
  document.head.appendChild(link);
}

addFavicon();

