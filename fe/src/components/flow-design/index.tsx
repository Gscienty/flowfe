import React, {Component} from 'react';
import {IFlowDesignProps} from './props';
import {css, StyleAttribute} from 'glamor';
import {IFlowDesignState} from './state';
import jsPlumb, {EndpointOptions, jsPlumbInstance} from 'jsplumb';
import {IProps} from './node/props';
import {IInitParam} from './node/jsplumb-param';
import {IConnectionParams} from './connection/jsplumb-param';
import {IConfig} from './node/config';
import {IConnection} from './connection';

const inhertDivStyles: StyleAttribute = css({
    height: 'inherit'
});


export default class FlowDesign extends Component<IFlowDesignProps, IFlowDesignState> {
    public state: IFlowDesignState;

    constructor(props: IFlowDesignProps) {
        super(props);

        const { setting, nodes, connections } = props;

        this.state = {
            instance: jsPlumb.jsPlumb.getInstance(setting || {}),
            created: false,
            nodes,
            connections
        };
    }

    private addEndpoint(element: Element | null,
                        options: EndpointOptions = { maxConnections: -1 },
                        referenceOptions: EndpointOptions = { maxConnections: -1 }): void {
        if (!element) {
            return;
        }

        const { instance } = this.state;

        instance.addEndpoint(element, {
            ...options,
            connectorClass: 'connector-class',
        },
        referenceOptions);
    }

    private draggable(id: string): void {
        const { instance } = this.state;

        instance.draggable(id);
    }

    private makeConnections(): void {
        const { instance } = this.state;
        const { connections } = this.props;

        instance.deleteEveryConnection();
        connections.forEach(conn => {
            const createdConn = this.createConnection(conn);
            if ((instance.getEndpoints(conn.from).length || instance.isSource(conn.from))
               && (instance.getEndpoints(conn.to).length || instance.isTarget(conn.to))) {
                   instance.connect(createdConn);
               }
        })
    }

    public init = ({id, params = [], makeSourceParams = {}, makeTargetParams = {}}: IInitParam): void => {
        const { instance } = this.state;
        params.map(({ element, options, referenceOptions}) => this.addEndpoint(element, options, referenceOptions));

        if (Object.keys(makeSourceParams).length) {
            instance.makeSource(id, makeSourceParams);
        }

        if (Object.keys(makeTargetParams).length) {
            instance.makeTarget(id, makeTargetParams);
        }

        this.draggable(id);
        this.makeConnections();
    }

    public remove = (id: string, uuid: string[]): void => {
        console.log(id);
        console.log(uuid);
    }

    private getConfig(id: string): IConfig | undefined {
        const { nodes } = this.props;
        const node = nodes.find(({id: nodeId}) => nodeId === id);

        if (!node) {
            return {};
        }

        return node.config;
    }

    private createConnection(conn: IConnection): IConnectionParams {
        const {instance} = this.state;
        const {nodes} = this.props;

        return {
            ...conn.rules?.reduce((prev, curr) => curr(prev, instance, nodes), { }),

            cssClass: 'connector-class',
            source: conn.from,
            target: conn.to
        };
    }

    private renderChildren() {
        const { created } = this.state;
        const { nodes } = this.props;

       if (!created) {
            return 'loading...';
        }

        return nodes.map(({ id, element }) => element({
            key: id,
            id: id,
            config: this.getConfig(id),
            init: this.init,
            remove: this.remove,
        } as IProps));
    }

    public componentDidMount() {
        const {instance} = this.state;

        instance.ready(() => {
            const mountedInstance: jsPlumbInstance = jsPlumb.jsPlumb.getInstance({
                Container: 'flow-design-container'
            });

            mountedInstance.setContainer(document.getElementById('flow-design-container') as Element);
            // TODO bind

            this.setState({
                instance: mountedInstance,
                created: true
            });
        });
    }

    public render() {
        const {name} = this.props

        return (
            <div className={name}>
                <div id='flow-design-container' className={`${inhertDivStyles}`}>
                    {this.renderChildren()}
                </div>
            </div>
        );
    }
}
