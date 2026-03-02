import { type Node, type Edge } from '@xyflow/react';
import { allIntegrationsInputNodes } from '~/mockData/nodes/instances';
import { egrunnervervMetadata } from '~/mockData/nodes/metadata';
import type { BaseNodeData } from '~/types/nodeTypes';

export const getInitialNodesOnCreateNew = (
    instanceID: string
):
    | {
          instanceNode: Node<BaseNodeData>;
          metadataNode?: Node<BaseNodeData>;
          edge?: Edge;
      }
    | undefined => {
    console.log('getInitialNodes', instanceID);
    const inputNode = allIntegrationsInputNodes.find((node) => node.id === instanceID);

    if (!inputNode) return;

    if (instanceID === 'instanceEGrunnervervSak') {
        const metadataNode = egrunnervervMetadata;

        return {
            instanceNode: inputNode,
            metadataNode: metadataNode,
            edge: {
                id: `e-${inputNode.id}-${metadataNode.id}`,
                source: inputNode.id,
                target: metadataNode.id,
                type: 'step',
            },
        };
    }

    return {
        instanceNode: inputNode,
    };
};

export default getInitialNodesOnCreateNew;
