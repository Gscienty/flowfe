import {IConnectionParams} from './jsplumb-param';
import {jsPlumbInstance} from 'jsplumb';
import {INode} from '../node';

export interface IConnection {
    from: string;
    to: string;

    rules?: ((params: IConnectionParams, instance: jsPlumbInstance, nodes: INode[]) => IConnectionParams)[];
}
