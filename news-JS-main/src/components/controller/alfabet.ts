import App from "../app/app";

const alfaBetArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

const main: HTMLElement | null = document.querySelector('.main')
const alfaBetUl = document.createElement('ul');
alfaBetUl.classList.add('alfaBet')
if (main) main.prepend(alfaBetUl)

alfaBetArray.forEach(el => {
  const alfaBetItem: HTMLLIElement | null = document.createElement('li');

  if (alfaBetItem) {
    alfaBetItem.classList.add('alfaBet__item')
    alfaBetItem.textContent = el
    if (alfaBetUl) alfaBetUl.append(alfaBetItem)
  }
})

class AlfaBet {
  private app: App;
  public letter: string;

  constructor() {
    this.app = new App();
    this.letter = 'A';
  }

  showAlfaBet() {
    alfaBetUl.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('alfaBet__item')) {
        const alfaBetItems: NodeListOf<HTMLLIElement> = document.querySelectorAll('.alfaBet__item');
        alfaBetItems.forEach((li) => {
          li.classList.remove('alfaBet__item_active');
        });
        target.classList.toggle('alfaBet__item_active');
        if (target.textContent) this.letter = target.textContent;
        this.app.start(this.letter);
      }
    })
  }
}

export default AlfaBet