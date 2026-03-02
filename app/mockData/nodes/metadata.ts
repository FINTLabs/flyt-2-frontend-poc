import type { Node } from '@xyflow/react';
import type { BaseNodeData } from '~/types/nodeTypes';
import { DataTypeDefinition } from '~/types/data/datatypes';
import { getSourceHandlesFromMetadata } from '~/mockData/getNodesFromData';
import { defaultPosition } from '~/utils/constants';

export const egrunnervervMetadata: Node<BaseNodeData> = {
    id: 'eGrunnervervMetadata',
    type: 'inputMetadata',
    data: {
        label: 'eGrunnerverv',
        typeName: 'eGrv',
        type: DataTypeDefinition.Object,
        iconType: 'dataInstanceIn',
        sourceHandles: getSourceHandlesFromMetadata(),
        targetHandles: [
            { id: 'a', type: DataTypeDefinition.Object, required: true, typeName: 'eGrv Sak' },
        ],
    },
    position: defaultPosition,
};
