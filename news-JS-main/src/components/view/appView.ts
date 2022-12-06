import News from './news/news';
import Sources from './sources/sources';
import { IDrawSources, IdrawNews } from '../../dataTs/_interfaces';

export class AppView {
    private news: News;
    private sources: Sources

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: IdrawNews | undefined): void {
        if (data) {
            const values = data.articles ? data.articles : [];
            this.news.draw(values);
        }
    }

    drawSources(data: IDrawSources | undefined, letter: string): void {
        if (data) {
            const values = data.sources ? data.sources : [];
            this.sources.draw(values, letter);
        }
    }
}

export default AppView;
