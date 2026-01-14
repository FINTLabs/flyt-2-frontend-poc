import type { DataTypeOld } from '~/demo/types/datatypes';
import type { HandleDataOld } from '~/types/handleTypes';
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
    typeName?: string;
    type?: DataTypeOld;
    iconType?: string;
    targetHandles?: HandleDataOld[];
    sourceHandles?: HandleDataOld[];
};

export type InputNodeData = BaseNodeData & {
    text: string;
};

export type SelectNodeData = BaseNodeData & {
    options: string[];
    value: string;
};

export type CustomNodeOld = Node<BaseNodeData | InputNodeData | SelectNodeData>;
