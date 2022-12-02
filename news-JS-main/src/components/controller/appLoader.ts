import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi-redirect-production.up.railway.app/', {
        // super('https://nodenews.herokuapp.com/', {
        // super('https://newsapi.org/v2/', {
            apiKey: 'beb9565b064d45e59d52c0a9c93178cf', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
