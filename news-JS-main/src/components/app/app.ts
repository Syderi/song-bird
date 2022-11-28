import AppController from '../controller/controller';
// import { ISource } from '../../dataTs/_interfaces';
import { AppView } from '../view/appView';
import { IDrawSources, IdrawNews } from '../../dataTs/_interfaces';

class App {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        (document
            .querySelector('.sources') as HTMLDivElement)
            .addEventListener('click', (e: Event) => this.controller.getNews(e, (data?: IdrawNews) => {
                // if (data) {
                    return this.view.drawNews(data)
                // } else { return }
            }));
        this.controller.getSources((data?:IDrawSources) => {
            // if (data) {
                return this.view.drawSources(data)
            // } else { return }
        });
    }
}

export default App;