import type { Node, NodeTypes } from '@xyflow/react';
import { MetadataNode } from '~/components/customNodes/MetadataNode';
import type { HandleData } from '~/types/flow/edges';
import { ConfigurationNode } from '~/components/customNodes/ConfigurationNode';
import { SakslogikkNode } from '~/components/customNodes/SakslogikkNode';
import { IncomingDataNode } from '~/components/customNodes/IncomingDataNode';

export type BaseNodeData = {
    label: string;
    typeName: string;
    type: string;
    sourceHandles?: HandleData[];
    targetHandles?: HandleData[];
    minHeight?: number;
    minWidth?: number;
};

export type MetadataNodeData = BaseNodeData;
export type MetadataNodeType = Node<MetadataNodeData, 'metadataNode'>;

export type SakslogikkNodeData = BaseNodeData & {
    selectedValue?: string;
};
export type SakslogikkNodeType = Node<SakslogikkNodeData, 'sakslogikkNode'>;

export type ConfigurationNodeData = BaseNodeData;
export type ConfigurationNodeType = Node<ConfigurationNodeData, 'configNode'>;

export type IncomingDataNodeData = BaseNodeData & {
    iconType: string;
};
export type IncomingDataNodeType = Node<IncomingDataNodeData, 'incomingData'>;

export type ElkNodeData = {
    label: string;
    sourceHandles: { id: string }[];
    targetHandles: { id: string }[];
};
export type ElkNode = Node<ElkNodeData, 'elk'>;

export const allNodeTypes: NodeTypes = {
    incomingData: IncomingDataNode,
    metadataNode: MetadataNode,
    configNode: ConfigurationNode,
    sakslogikkNode: SakslogikkNode,
};

export type CustomNode = Node<MetadataNodeData | ConfigurationNodeData>;
