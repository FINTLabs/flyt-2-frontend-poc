import type { Node, NodeTypes } from '@xyflow/react';
import { MetadataNode } from '~/components/customNodes/MetadataNode';
import type { HandleData, HandlesWithCategories } from '~/types/flow/edges';

export type CustomNodeTypes = 'metadataNode';

export type MetadataNodeData = {
    label: string;
    typeName: string;
    type: string;
    sourceHandles?: HandlesWithCategories;
    targetHandles?: HandleData[];
};
export type MetadataNodeType = Node<MetadataNodeData, 'metadataNode'>;

export type ElkNodeData = {
    label: string;
    sourceHandles: { id: string }[];
    targetHandles: { id: string }[];
};
export type ElkNode = Node<ElkNodeData, 'elk'>;

export const allNodeTypes: NodeTypes = {
    metadataNode: MetadataNode,
};

export type CustomNode = Node<MetadataNodeData>;
