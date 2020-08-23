import React from 'react';
import FlowDesign from '@/components/flow-design';
import Node, {INode} from '@/components/flow-design/node';
import {IProps} from '@/components/flow-design/node/props';
import {IConnection} from '@/components/flow-design/connection';
import {IConnectionParams} from '@/components/flow-design/connection/jsplumb-param';
import {EndpointOptions, PaintStyle} from 'jsplumb';

class SimpleNode extends Node {
    private endpointRef: HTMLElement | null = null;
    
    componentDidMount() {
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

        init!({
            id,
            params: [
                {
                    element: this.endpointRef,
                    options,
                    referenceOptions: { maxConnections: -1 }
                }
            ]
        })
    }

    renderNode() {
        const {id} = this.props;
        return (<div style={{width: 100, height: 100, background: '#666666'}}>
                    FUCK
                    <div id={id} ref={ref => this.endpointRef = ref}></div>
                </div>);
    }
};

export default function() {
    const nodes: INode[] = [
        {
            key: 1,
            id: '1',
            config: { label: '123' },
            element: (props: IProps) => <SimpleNode {...props} />,
        } as INode,
        {

            key: 2,
            id: '2',
            config: { label: '123' },
            element: (props: IProps) => <SimpleNode {...props} />,
        } as INode
    ];

    const connections: IConnection[] = [
        {
            from: '1',
            to: '2',
            rules: [
                (params: IConnectionParams): IConnectionParams => {
                    const nextParams: IConnectionParams = { ...params };

                    nextParams.connector = ['Flowchart', {
                        alwaysRespectStubs: true,
                        cornerRadius: 20,
                        midpoint: 0.2,
                        stub: [10, 15]
                    }];

                    nextParams.endpoint = 'Dot';
                    nextParams.detachable = true;
                    nextParams.anchors = [ 'ContinuousBottom', 'ContinuousTop' ]

                    return nextParams;
                }
            ]
        }
    ];

    return (
        <div>
        <FlowDesign nodes={nodes} connections={connections} />
        </div>
    );
}
