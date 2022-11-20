
type template = HTMLTemplateElement | null

type option = {
    [x: string]: string;
};

type callbackVoid = <T>(arg: T) => void;

export { template, option, callbackVoid }