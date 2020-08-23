import {IConfig} from './config';
import {IInitParam} from './jsplumb-param';

export interface IProps {
    id: string;
    config?: IConfig;
    init?: (initParams: IInitParam) => void;
    remove?: (id: string, uuid: string[]) => void;
}
