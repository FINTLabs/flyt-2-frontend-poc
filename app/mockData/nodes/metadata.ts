import type { Node } from '@xyflow/react';
import type { BaseNodeData } from '~/types/nodeTypes';
import { DataTypeDefinition } from '~/types/data/datatypes';
import { defaultPosition } from '~/utils/constants';
import eGrunnervervHandles from '~/mockData/objectDataContent/eGrunnerverv/eGrunnerverv';
import archiveSak from '~/mockData/objectDataContent/archiveSak';

export const egrunnervervMetadata: Node<BaseNodeData> = {
    id: 'eGrunnervervMetadata',
    type: 'operation',
    data: {
        label: 'eGrunnerverv',
        typeName: 'eGrv',
        type: DataTypeDefinition.Object,
        iconType: 'openData2',
        sourceHandles: eGrunnervervHandles,
        targetHandles: [
            {
                id: 'eGrunnervervMetadata:t:a',
                type: DataTypeDefinition.Object,
                required: true,
                typeName: 'eGrv',
                label: 'Metadata',
            },
        ],
    },
    position: defaultPosition,
};

export const archiveSakMetadata: Node<BaseNodeData> = {
    id: 'arkivsak',
    type: 'operation',
    data: {
        label: 'Sak',
        typeName: 'sak',
        type: DataTypeDefinition.Object,
        iconType: 'dataInstanceIn',
        targetHandles: archiveSak,
        sourceHandles: [
            {
                id: 'arkivsak:s:a',
                type: DataTypeDefinition.Object,
                required: true,
                typeName: 'sak',
                label: 'Sak',
            },
        ],
    },
    position: defaultPosition,
};
