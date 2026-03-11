import type { Node } from '@xyflow/react';
import type { BaseNodeData } from '~/types/nodeTypes';
import { DataTypeDefinition } from '~/types/data/datatypes';
import { defaultOutputPosition, defaultPosition } from '~/utils/constants';

export const egrunnervervSakInstance: Node<BaseNodeData> = {
    id: 'instanceEGrunnervervSak',
    type: 'flowInput',
    data: {
        label: 'eGrunnerverv sak',
        typeName: 'eGrv Sak',
        type: DataTypeDefinition.Object,
        iconType: 'dataInstanceIn',
        sourceHandles: [
            {
                id: 'instanceEGrunnervervSak:s:a',
                label: 'eGrunnerverv sak',
                type: DataTypeDefinition.Object,
                typeName: 'eGrv Sak',
                required: true,
            },
        ],
    },
    position: defaultPosition,
};
export const acosInstance: Node<BaseNodeData> = {
    id: 'acosInstance',
    type: 'flowInput',
    data: {
        label: 'ACOS dokument',
        typeName: 'ACOS',
        type: DataTypeDefinition.Object,
        iconType: 'dataInstanceIn',
        sourceHandles: [
            {
                id: 'acosInstance:s:a',
                label: 'ACOS instans',
                type: DataTypeDefinition.Object,
                typeName: 'ACOS',
                required: true,
            },
        ],
    },
    position: defaultPosition,
};
export const acosInstanceVIK304: Node<BaseNodeData> = {
    id: 'acosInstanceVIK304',
    type: 'flowInput',
    data: {
        label: 'ACOS VIK304',
        typeName: 'ACOS VIK304',
        type: DataTypeDefinition.Object,
        iconType: 'dataInstanceIn',
        sourceHandles: [
            {
                id: 'acosInstanceVIK304:s:a',
                label: 'ACOS VIK304',
                type: DataTypeDefinition.Object,
                typeName: 'ACOS VIK304',
                required: true,
            },
        ],
    },
    position: defaultPosition,
};
export const arkivInstanceOutput: Node<BaseNodeData> = {
    id: 'instanceOutputArkivsak',
    type: 'flowOutput',
    data: {
        label: 'Arkivsak',
        type: DataTypeDefinition.Object,
        typeName: 'Arkiv Sak',
        iconType: 'dataInstanceOut',
        targetHandles: [
            {
                id: 'instanceOutputArkivsak:t:a',
                type: DataTypeDefinition.Object,
                typeName: 'Arkiv Sak',
                required: true,
            },
        ],
    },
    position: defaultOutputPosition,
};
export const allIntegrationsInputNodes = [
    egrunnervervSakInstance,
    acosInstance,
    acosInstanceVIK304,
];
export const allIntegrationsNodes = [...allIntegrationsInputNodes, arkivInstanceOutput];
