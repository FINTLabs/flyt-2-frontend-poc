import type { HandleData } from '~/types/handleTypes';
import { DataTypeDefinition } from '~/types/data/datatypes';

export const dokumentbeskrivelse = (nodeID: string, handleType: 's' | 't'): HandleData[] => [
    {
        id: `${nodeID}:${handleType}:a`,
        type: DataTypeDefinition.Text,
        label: 'Tittel',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:b`,
        type: DataTypeDefinition.Text,
        label: 'Dokumentstatus',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:c`,
        type: DataTypeDefinition.Text,
        label: 'Dokumenttype',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:d`,
        type: DataTypeDefinition.Text,
        label: 'Tilknyttet registrering som',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:e`,
        type: DataTypeDefinition.Object,
        typeName: 'dokobj',
        label: 'Dokumentobjekter',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:f`,
        type: DataTypeDefinition.Object,
        typeName: 'Skjerming',
        label: 'skjerming',
        required: true,
    },
];
