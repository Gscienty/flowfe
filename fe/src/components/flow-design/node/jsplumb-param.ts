import { EndpointOptions } from 'jsplumb';

export interface IJsplumbParam {
    element: Element | null;
    options?: EndpointOptions;
    referenceOptions?: EndpointOptions;
}

export interface IInitParam {
    id: string;
    params?: IJsplumbParam[];
    makeSourceParams?: any;
    makeTargetParams?: any;
}
