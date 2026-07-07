import type { Node } from '@xyflow/react';
import type { HandleData } from '~/types/handleTypes';

type BaseNodeData = {
    label: string;
    typeName: string;
    type: string;
    sourceHandles?: HandleData[];
    targetHandles?: HandleData[];
    minHeight?: number;
    minWidth?: number;
};

type MetadataNodeData = BaseNodeData;

type ConfigurationNodeData = BaseNodeData;

export type CustomNode = Node<MetadataNodeData | ConfigurationNodeData>;
