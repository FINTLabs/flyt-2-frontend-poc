import type { HandleData } from '~/types/handleTypes';
import { DataTypeDefinition } from '~/types/data/datatypes';

export const korrespondansepart = (nodeID: string, handleType: 's' | 't'): HandleData[] => [
    {
        id: `${nodeID}:${handleType}:a`,
        type: DataTypeDefinition.Text,
        label: 'Korrespondanseparttype',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:b`,
        type: DataTypeDefinition.Text,
        label: 'Organisasjonsnummer',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:c`,
        type: DataTypeDefinition.Text,
        label: 'Fødselsnummer',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:d`,
        type: DataTypeDefinition.Text,
        label: 'Navn',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:e`,
        type: DataTypeDefinition.Text,
        label: 'Kontaktperson',
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
        label: 'Kontaktinformasjon',
        typeName: 'kontaktinformasjon',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:h`,
        type: DataTypeDefinition.Object,
        label: 'Skjerming',
        typeName: 'skjerming',
        required: true,
    },
];