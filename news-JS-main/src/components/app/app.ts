import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(letter:string) {
        (document
            .querySelector('.sources') as HTMLDivElement).innerHTML = '';

        (document
            .querySelector('.sources') as HTMLDivElement)
            .addEventListener('click', (e: Event) => this.controller.getNews(e, (data) => {
                if (data) return this.view.drawNews(data)
            }));
        this.controller.getSources((data) => {
            if (data) return this.view.drawSources(data, letter)
        });
    }
}

export default App;