import { DataTypeDefinition } from '~/types/data/datatypes';
import type { HandleData } from '~/types/handleTypes';

export const journalpost = (nodeID: string, handleType: 's' | 't'): HandleData[] => [
    {
        id: `${nodeID}:${handleType}:a`,
        type: DataTypeDefinition.Text,
        label: 'Tittle',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:b`,
        type: DataTypeDefinition.Text,
        label: 'Offentlig tittel',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:c`,
        type: DataTypeDefinition.Text,
        label: 'Journalposttype',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:d`,
        type: DataTypeDefinition.Text,
        label: 'Administrativ enhet',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:e`,
        type: DataTypeDefinition.Text,
        label: 'Saksbehandler',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:f`,
        type: DataTypeDefinition.Text,
        label: 'Journalstatus',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:g`,
        type: DataTypeDefinition.Text,
        label: 'Tilgangsgruppe',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:h`,
        type: DataTypeDefinition.Object,
        label: 'Skjerming',
        typeName: 'skjerming',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:i`,
        type: DataTypeDefinition.Object,
        typeName: 'korrpart',
        label: 'Korrespondansepart',
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:j`,
        type: DataTypeDefinition.Object,
        typeName: 'dokbeskr',
        label: 'Dokumentbeskrivelse',
        required: true,
    },
];
