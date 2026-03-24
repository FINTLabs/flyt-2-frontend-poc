import type { HandleData } from '~/types/handleTypes';
import { DataTypeDefinition } from '~/types/data/datatypes';

export const klassering = (nodeID: string, handleType: 's' | 't'): HandleData[] => [
    {
        id: `${nodeID}:${handleType}:a`,
        type: DataTypeDefinition.Number,
        label: 'Rekkefølge',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:b`,
        type: DataTypeDefinition.Text,
        label: 'Klassifikasjonssystem',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:c`,
        type: DataTypeDefinition.Text,
        label: 'KlasseID',
        required: false,
    },
    {
        id: `${nodeID}:${handleType}:d`,
        type: DataTypeDefinition.Text,
        label: 'Tittel',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:e`,
        type: DataTypeDefinition.Object,
        typeName: 'skjerming',
        label: 'Skjerming',
        required: true,
    },
];
