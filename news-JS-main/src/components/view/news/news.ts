import './_news.scss';
import { INews } from '../../../dataTs/_interfaces';
import { template } from '../../../dataTs/_type'

class News {
    draw(data: INews[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: template = document.querySelector('#newsItemTemp');

        if (newsItemTemp instanceof HTMLTemplateElement) {
            news.forEach((item: INews, idx: number) => {

                const newsClone: Node | null = newsItemTemp.content.cloneNode(true);

                if (newsClone instanceof DocumentFragment) {

                    if (idx % 2) {
                        const newsItem: HTMLDivElement | null = newsClone.querySelector('.news__item')
                        if (newsItem) newsItem.classList.add('alt');
                    }

                    const newsMetaPhoto: HTMLDivElement | null = newsClone.querySelector('.news__meta-photo')
                    if (newsMetaPhoto) newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

                    const newsMetaAuthor: HTMLLIElement | null = newsClone.querySelector('.news__meta-author')
                    if (newsMetaAuthor) newsMetaAuthor.textContent = item.author || item.source.name;

                    const newsMetaDate: HTMLLIElement | null = newsClone.querySelector('.news__meta-date')
                    if (newsMetaDate) {
                        newsMetaDate.textContent = item.publishedAt
                            .slice(0, 10)
                            .split('-')
                            .reverse()
                            .join('-');

                    }

                    const newsDescriptionTitle: HTMLHeadingElement | null = newsClone.querySelector('.news__description-title')
                    if (newsDescriptionTitle) newsDescriptionTitle.textContent = item.title;

                    const newsDescriptionSource: HTMLHeadingElement | null = newsClone.querySelector('.news__description-source')
                    if (newsDescriptionSource) newsDescriptionSource.textContent = item.source.name;

                    const newsDescriptionContent: HTMLParagraphElement | null = newsClone.querySelector('.news__description-content')
                    if (newsDescriptionContent) newsDescriptionContent.textContent = item.description;

                    const newsReadMore_A: HTMLLinkElement | null = newsClone.querySelector('.news__read-more a')
                    if (newsReadMore_A) newsReadMore_A.setAttribute('href', item.url);

                    fragment.append(newsClone);
                }
            });
        }

        const newsDiv: HTMLDivElement | null = document.querySelector('.news')
        if (newsDiv) {
            newsDiv.innerHTML = '';
            newsDiv.appendChild(fragment);
        }
    }
}

export default News;