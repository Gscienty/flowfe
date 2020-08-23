import 'jsplumb';
import {ConnectParams} from 'jsplumb';

export interface IConnectionParams extends ConnectParams {
    [extraParams: string]: any;
}
