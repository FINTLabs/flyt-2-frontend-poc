import type { Node, NodeTypes } from '@xyflow/react';
import { ConfigurationNode } from '~/components/customNodes/ConfigurationNodes/ConfigurationNode';
import { SakslogikkNode } from '~/components/customNodes/SakslogikkNode';
import { IncomingDataNode } from '~/components/customNodes/ConfigurationNodes/IncomingDataNode';
import { DynamicStringNode } from '~/components/customNodes/ConfigurationNodes/DynamicStringNode';
import type { HandleData } from '~/types/handleTypes';

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

export type DynamicStringNodeData = BaseNodeData & {
    iconType?: string;
    textString: string;
};
export type DynamicStringNodeType = Node<DynamicStringNodeData, 'dynamicString'>;

export type ElkNodeData = {
    label: string;
    sourceHandles: { id: string }[];
    targetHandles: { id: string }[];
};
export type ElkNode = Node<ElkNodeData, 'elk'>;

export const allNodeTypes: NodeTypes = {
    incomingData: IncomingDataNode,
    configNode: ConfigurationNode,
    sakslogikkNode: SakslogikkNode,
    dynamicString: DynamicStringNode,
};

export type CustomNode = Node<MetadataNodeData | ConfigurationNodeData>;
