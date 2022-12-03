import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi-redirect-production.up.railway.app/', {
            apiKey: 'beb9565b064d45e59d52c0a9c93178cf',
        });
    }
}

export default AppLoader;
