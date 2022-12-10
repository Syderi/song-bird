import { option } from './_type'

interface ISource {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

interface INews {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: {
        id: string,
        name: string
    };
    title: string;
    url: string;
    urlToImage: string;
}



interface I {
    "status": "error",
    "code": "apiKeyMissing",
    "message": "Your API key is missing. Append this to the URL with the apiKey param, or use the x-api-key HTTP header."
}


interface IGetResp {
    endpoint: string;
    options?: option;
}


interface IDrawSources {
    status: string;
    sources: ISource[];
}

interface IdrawNews {
    status: string;
    totalResults: number;
    articles: INews[];

}

interface IdrawNewsError {
    status: string;
    code: string;
    message: string;
}

export { ISource, INews, IGetResp, IDrawSources, IdrawNews, IdrawNewsError }