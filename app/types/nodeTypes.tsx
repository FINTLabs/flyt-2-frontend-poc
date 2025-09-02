import type { DataType } from '~/types/datatypes';
import type { HandleData } from '~/types/handleTypes';
import { type Node } from '@xyflow/react';

export type CustomNodeType =
    | 'flowInput'
    | 'flowOutput'
    | 'operation'
    | 'externalFunction'
    | 'variableInput'
    | 'operationJoinText';

export type CustomNodeTypeValue = `${CustomNodeType}`;

export type BaseNodeData = {
    label: string;
    text?: string;
    typeName?: string;
    type?: DataType;
    iconType?: string;
    targetHandles?: HandleData[];
    sourceHandles?: HandleData[];
};

export type CustomNode = Node<BaseNodeData>;
