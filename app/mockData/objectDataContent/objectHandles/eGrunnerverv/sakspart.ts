import type { HandleData } from '~/types/handleTypes';
import { DataTypeDefinition } from '~/types/data/datatypes';

export const sakspart = (nodeID: string, handleType: 's' | 't'): HandleData[] => [
    {
        id: `${nodeID}:${handleType}:a`,
        label: 'Navn',
        type: DataTypeDefinition.Text,
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:b`,
        label: 'Organisasjonsnummer',
        type: DataTypeDefinition.Text,
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:c`,
        label: 'E-post',
        type: DataTypeDefinition.Text,
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:d`,
        label: 'Telefon',
        type: DataTypeDefinition.Text,
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:e`,
        label: 'Postadresse',
        type: DataTypeDefinition.Text,
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:f`,
        label: 'Postnummer',
        type: DataTypeDefinition.Text,
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:g`,
        label: 'Poststed',
        type: DataTypeDefinition.Text,
        required: true,
    },
];
