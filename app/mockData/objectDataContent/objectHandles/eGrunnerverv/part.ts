import type { HandleData } from '~/types/handleTypes';
import { DataTypeDefinition } from '~/types/data/datatypes';

export const part = (nodeID: string, handleType: 's' | 't'): HandleData[] => [
    {
        id: `${nodeID}:${handleType}:a`,
        type: DataTypeDefinition.Text,
        label: 'Navn',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:b`,
        type: DataTypeDefinition.Text,
        label: 'Rolle',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:c`,
        type: DataTypeDefinition.Text,
        label: 'Kontaktperson',
        required: false,
    },
    {
        id: `${nodeID}:${handleType}:d`,
        type: DataTypeDefinition.Text,
        label: 'Organisasjonsnummer',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:e`,
        type: DataTypeDefinition.Text,
        label: 'Fødselsnummer',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:f`,
        type: DataTypeDefinition.Object,
        typeName: 'adresse',
        label: 'Adresse',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:g`,
        type: DataTypeDefinition.Object,
        typeName: 'kontaktinformasjon',
        label: 'Kontaktinformasjon',
        required: true,
    },
];
