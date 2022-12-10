import News from './news/news';
import Sources from './sources/sources';
import { IDrawSources, IdrawNews, IdrawNewsError } from '../../dataTs/_interfaces';

export class AppView {
    private news: News;
    private sources: Sources

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: IdrawNews | IdrawNewsError | undefined): void {
        if (data) {
            if ('message' in data) { console.log(data) }
            else if ('articles' in data) {
                const values = data.articles ? data.articles : [];
                this.news.draw(values);
            }
        }
    }

    drawSources(data: IDrawSources | IdrawNewsError | undefined, letter: string): void {
        if (data) {
            if ('message' in data) { console.log(data) }
            else if ('sources' in data) {
                const values = data.sources ? data.sources : [];
                this.sources.draw(values, letter);
            }
        }
    }
}

export default AppView;
