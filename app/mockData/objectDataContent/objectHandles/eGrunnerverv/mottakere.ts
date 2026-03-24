import type { HandleData } from '~/types/handleTypes';
import { DataTypeDefinition } from '~/types/data/datatypes';

export const mottakereHandles = (nodeID: string, handleType: 's' | 't'): HandleData[] => [
    {
        id: `${nodeID}:${handleType}:navn`,
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Navn',
        typeName: 'navn',
    },
    {
        id: `${nodeID}:${handleType}:organisasjonsnummer`,
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Organisasjonsnummer',
        typeName: 'organisasjonsnummer',
    },
    {
        id: `${nodeID}:${handleType}:fodselsnummer`,
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Fødselsnummer',
        typeName: 'fodselsnummer',
    },
    {
        id: `${nodeID}:${handleType}:epost`,
        type: DataTypeDefinition.Text,
        required: true,
        label: 'E-post',
        typeName: 'epost',
    },
    {
        id: `${nodeID}:${handleType}:telefon`,
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Telefon',
        typeName: 'telefon',
    },
    {
        id: `${nodeID}:${handleType}:postadresse`,
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Postadresse',
        typeName: 'postadresse',
    },
    {
        id: `${nodeID}:${handleType}:postnummer`,
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Postnummer',
        typeName: 'postnummer',
    },
    {
        id: `${nodeID}:${handleType}:poststed`,
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Poststed',
        typeName: 'poststed',
    },
];
