import { INode } from './node';
import { Defaults } from 'jsplumb';
import { IConnection } from './connection';

export interface IFlowDesignProps {
    name?: string;
    nodes: INode[];
    connections: IConnection[];
    setting?: Defaults;
}

