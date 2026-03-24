import { DataTypeDefinition } from '~/types/data/datatypes';
import type { HandleData } from '~/types/handleTypes';

export const archiveSakHandles = (nodeID: string, handleType: 's' | 't'): HandleData[] => [
    {
        id: `${nodeID}:${handleType}:tittel`,
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Tittel',
        typeName: 'tittel',
    },
    {
        id: `${nodeID}:${handleType}:offentligTittel`,
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Offentlig tittel',
        typeName: 'offentligTittel',
    },
    {
        id: `${nodeID}:${handleType}:saksmappetype`,
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Saksmappetype',
        typeName: 'saksmappetype',
    },
    {
        id: `${nodeID}:${handleType}:administrativEnhet`,
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Administrativ enhet',
        typeName: 'administrativEnhet',
    },
    {
        id: `${nodeID}:${handleType}:saksansvarlig`,
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Saksansvarlig',
        typeName: 'saksansvarlig',
    },
    {
        id: `${nodeID}:${handleType}:arkivdel`,
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Arkivdel',
        typeName: 'arkivdel',
    },
    {
        id: `${nodeID}:${handleType}:saksstatus`,
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Saksstatus',
        typeName: 'saksstatus',
    },
    {
        id: `${nodeID}:${handleType}:tilgangsgruppe`,
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Tilgangsgruppe',
        typeName: 'tilgangsgruppe',
    },
    {
        id: `${nodeID}:${handleType}:part`,
        type: DataTypeDefinition.CollectionObject,
        required: true,
        label: 'Parter',
        typeName: 'part',
    },
    {
        id: `${nodeID}:${handleType}:skjerming`,
        type: DataTypeDefinition.Object,
        required: true,
        label: 'Skjerming',
        typeName: 'skjerming',
    },
    {
        id: `${nodeID}:${handleType}:klasse`,
        type: DataTypeDefinition.CollectionObject,
        required: true,
        label: 'Klassering',
        typeName: 'klasse',
    },
    {
        id: `${nodeID}:${handleType}:journalpost`,
        type: DataTypeDefinition.CollectionObject,
        required: true,
        label: 'Journalposter',
        typeName: 'journalpost',
    },
];
