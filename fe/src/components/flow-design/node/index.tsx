import React, {Component, ReactElement} from 'react';
import {IProps} from './props';
import {IInitParam} from './jsplumb-param';
import {EndpointOptions, PaintStyle} from 'jsplumb';
import {IConfig} from './config';

const defaultStyle = {
    display: 'inline-block',
    position: 'absolute'
}

export interface INode {
    id: string;
    props?: IProps;
    config?: IConfig;
    element: (props: IProps) => React.ReactElement<Node>;
}

export default abstract class Node extends Component<IProps, {}> {
    private rootRef: HTMLElement | null = null;

    protected abstract renderNode(): ReactElement;

    public componentDidMount() {
        const { id, init } = this.props; 

        const options: EndpointOptions = {
            maxConnections: -1,
            cssClass: `${id}-source`,
            endpoint: 'Dot',
            isSource: true,
            paintStyle: {
                fill: 'black',
                lineWidth: 3,
                radius: 5,
                stroke: 'black'
            } as PaintStyle,
            connectorStyle: {
                lineWidth: 2,
                outlineColor: 'transparent',
                strokeStyle: '#4e5568',
                strokeWidth: 3
            } as PaintStyle,
        };

        const initParams: IInitParam = {
            id,
            params: [
                {
                    element: this.rootRef as Element,
                    options,
                    referenceOptions: {
                        maxConnections: -1
                    }
                }
            ]
        };

        init!(initParams);
    }

    public render() {
        const { id, config } = this.props;
        let style: {} = { ...defaultStyle, ...config?.style };

        console.log(this.renderNode);

        return (
            <div id={id} ref={ref => this.rootRef = ref} style={style}>
                {this.renderNode()}
            </div>
        );
    }
}
