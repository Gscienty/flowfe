import 'jsplumb';
import {jsPlumbInstance} from 'jsplumb';
import {INode} from './node';
import {IConnectionParams} from './connection/jsplumb-param';

export interface IFlowDesignState {
    instance: jsPlumbInstance;
    created: boolean;
    nodes: INode[];
    connections: IConnectionParams[];
}
