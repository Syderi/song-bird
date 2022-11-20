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

interface IGetResp {
    endpoint: string;
    options: { [x: string]: string };
}

export { ISource, INews, IGetResp }