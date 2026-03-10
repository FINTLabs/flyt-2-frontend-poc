import type { DataTypeDefinition } from '~/types/data/datatypes';
import type { HandleData } from '~/types/handleTypes';
import { type Node } from '@xyflow/react';

export type CustomNodeType =
    | 'flowInput'
    | 'flowOutput'
    | 'operation'
    | 'externalFunction'
    | 'inputText'
    | 'operationJoinText';

export type CustomNodeTypeValue = `${CustomNodeType}`;

export type BaseNodeData = {
    label: string;
    typeName?: string;
    type?: DataTypeDefinition;
    iconType?: string;
    targetHandles?: HandleData[];
    sourceHandles?: HandleData[];
};

export type InputNodeData = BaseNodeData & {
    text: string;
};

export type SelectNodeData = BaseNodeData & {
    options: { id: string; displayName: string }[];
    value: string;
};

export type CustomNodeDemo = Node<BaseNodeData | InputNodeData | SelectNodeData>;
