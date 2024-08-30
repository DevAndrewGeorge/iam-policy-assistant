declare module "actions";

declare type Action = {
    [key: string]: string[];
}

declare const actions: Action;
export default actions;