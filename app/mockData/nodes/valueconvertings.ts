import type { Node } from '@xyflow/react';
import type { BaseNodeData } from '~/types/nodeTypes';
import { DataTypeDefinition } from '~/types/data/datatypes';
import { defaultPosition } from '~/utils/constants';

export const vcHMSregDeptToAdminUnit: Node<BaseNodeData> = {
    id: 'vcHMSregDeptToAdminUnit',
    type: 'operation',
    data: {
        label: 'HMSreg avdeling til adminenhet v1',
        iconType: 'conversion',
        targetHandles: [
            {
                id: 'vcHMSregDeptToAdminUnit:t:a',
                type: DataTypeDefinition.Text,
                label: 'Avdeling',
                required: true,
            },
        ],
        sourceHandles: [
            {
                id: 'vcHMSregDeptToAdminUnit:s:a',
                label: 'Administrativ enhet',
                type: DataTypeDefinition.Text,
                required: true,
            },
        ],
    },
    position: defaultPosition,
};

export const HMSregMediaToFile: Node<BaseNodeData> = {
    id: 'vcHMSregMediaToFile',
    type: 'operation',
    data: {
        label: 'HMSReg mediatype til filformat',
        iconType: 'conversion',
        targetHandles: [
            {
                id: 'vcHMSregMediaToFile:t:a',
                type: DataTypeDefinition.Text,
                label: 'Mediatype',
                required: true,
            },
        ],
        sourceHandles: [
            {
                id: 'vcHMSregMediaToFile:s:a',
                label: 'Filformat',
                type: DataTypeDefinition.Text,
                required: true,
            },
        ],
    },
    position: defaultPosition,
};

export const allValueConvertings = [vcHMSregDeptToAdminUnit, HMSregMediaToFile];
