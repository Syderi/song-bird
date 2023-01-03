import './_sources.scss';
import { ISource } from '../../../dataTs/_interfaces';
import { template } from '../../../dataTs/_type'

class Sources {
    draw(data: Readonly<ISource[]>, letter: string): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: template = document.querySelector('#sourceItemTemp');
        data.forEach((item) => {

            if (item.name[0] === letter) {

                if (sourceItemTemp) {
                    const sourceClone: Node | null = sourceItemTemp.content.cloneNode(true);

                    if (sourceClone instanceof DocumentFragment) {

                        const sourceItemName: HTMLDivElement | null = sourceClone.querySelector('.source__item-name')
                        if (sourceItemName) sourceItemName.textContent = item.name;

                        const sourceItem: HTMLDivElement | null = sourceClone.querySelector('.source__item')
                        if (sourceItem) sourceItem.setAttribute('data-source-id', item.id);

                        fragment.append(sourceClone);
                    }
                }

            }
        });

        const sources: HTMLElement | null = document.querySelector('.sources')
        if (sources) sources.append(fragment);
    }
}

export default Sources;
