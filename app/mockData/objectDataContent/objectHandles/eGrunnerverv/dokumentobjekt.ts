import type { HandleData, HandleType } from '~/types/handleTypes';
import { DataTypeDefinition } from '~/types/data/datatypes';

export const dokumentobjekt = (nodeID: string, handleType: HandleType): HandleData[] => [
    {
        id: `${nodeID}:${handleType}:a`,
        type: DataTypeDefinition.Text,
        label: 'Variantformat',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:b`,
        type: DataTypeDefinition.Text,
        label: 'Filformat',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:c`,
        type: DataTypeDefinition.Text,
        label: 'Fil',
        required: true,
    },
];
