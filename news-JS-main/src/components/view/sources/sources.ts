import './sources.css';
import { ISource } from '../../../dataTs/_interfaces';
import { template } from '../../../dataTs/_type'



class Sources {
    draw(data: ISource[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: template = document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            if (sourceItemTemp) {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLDivElement;

                (sourceClone.querySelector('.source__item-name') as HTMLDivElement).textContent = item.name;
                (sourceClone.querySelector('.source__item') as HTMLDivElement).setAttribute('data-source-id', item.id);

                fragment.append(sourceClone);
            }
        });

        (document.querySelector('.sources') as HTMLElement).append(fragment);
    }
}

export default Sources;
