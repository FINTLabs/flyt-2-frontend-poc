import type { HandleData } from '~/types/handleTypes';
import { DataTypeDefinition } from '~/types/data/datatypes';

export const vedleggHandles = (nodeID: string, handleType: 's' | 't'): HandleData[] => [
    {
        id: `${nodeID}:${handleType}:tittel`,
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Tittel',
        typeName: 'tittel',
    },
    {
        id: `${nodeID}:${handleType}:filnavn`,
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Filnavn',
        typeName: 'filnavn',
    },
    {
        id: `${nodeID}:${handleType}:fil`,
        type: DataTypeDefinition.File,
        required: true,
        label: 'Fil',
        typeName: 'fil',
    },
    {
        id: `${nodeID}:${handleType}:mediatype`,
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Mediatype',
        typeName: 'mediatype',
    },
];
