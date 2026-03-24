import { type Node, type Edge } from '@xyflow/react';
import { allIntegrationsInputNodes, arkivInstanceOutput } from '~/mockData/nodes/instances';
import type { BaseNodeData } from '~/types/nodeTypes';
import { operationCreateObject, operationOpenObject } from '~/mockData/nodes/general';

export const getInitialNodesOnCreateNew = (
    instanceID: string
): {
    nodes: Node<BaseNodeData>[];
    edges: Edge[];
} => {
    let nodes: Node<BaseNodeData>[] = [];
    let edges: Edge[] = [];
    console.log('getInitialNodes', instanceID);
    const inputNode = allIntegrationsInputNodes.find((node) => node.id === instanceID);
    if (inputNode) {
        const outPut = arkivInstanceOutput;
        nodes.push(outPut);

        nodes.push(inputNode);

        const metadataNode = operationOpenObject;
        nodes.push(metadataNode);

        const metadataEdge: Edge = {
            id: `e-${inputNode.id}-${metadataNode.id}`,
            source: inputNode.id,
            sourceHandle: `${inputNode.id}:s:a`,
            target: metadataNode.id,
            targetHandle: `${metadataNode.id}:t:a`,
            type: 'smoothstep',
        };
        edges.push(metadataEdge);

        const archiveSakNode = operationCreateObject;
        nodes.push(archiveSakNode);

        const archiveSakEdge = {
            id: `e-${archiveSakNode.id}-${outPut.id}`,
            source: archiveSakNode.id,
            sourceHandle: `${archiveSakNode.id}:s:a`,
            target: outPut.id,
            targetHandle: `${outPut.id}:t:a`,
            type: 'smoothstep',
        };

        edges.push(archiveSakEdge);
    }

    return {
        nodes: nodes,
        edges: edges,
    };
};

export default getInitialNodesOnCreateNew;
