import { IGetResp } from '../../dataTs/_interfaces';
import { StatusCodes } from '../../dataTs/_enum';
import { option, callbackVoid } from '../../dataTs/_type'

class Loader {
    protected _baseLink: string;
    protected _options: option;

    constructor(baseLink: string, options: option) {
        this._baseLink = baseLink;
        this._options = options;
    }

    getResp(
        { endpoint, options = {} }: IGetResp,
        callback: callbackVoid = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === StatusCodes.unauthorized || res.status === StatusCodes.notFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: option, endpoint: string):string {
        const urlOptions = { ...this._options, ...options };
        let url = `${this._baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: callbackVoid, options = {}):void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
