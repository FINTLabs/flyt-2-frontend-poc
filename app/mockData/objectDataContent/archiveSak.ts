import { DataTypeDefinition } from '~/types/data/datatypes';

const archiveSak = [
    {
        id: 'arkivsak:t:01-title',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Tittel',
        typeName: 'tittel',
    },
    {
        id: 'arkivsak:t:02-offentligTittel',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Offentlig tittel',
        typeName: 'offentligTittel',
    },
    {
        id: 'arkivsak:t:03-saksmappetype',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Saksmappetype',
        typeName: 'saksmappetype',
    },
    {
        id: 'arkivsak:t:04-administrativEnhet',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Administrativ enhet',
        typeName: 'administrativEnhet',
    },
    {
        id: 'arkivsak:t:05-saksansvarlig',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Saksansvarlig',
        typeName: 'saksansvarlig',
    },
    {
        id: 'arkivsak:t:06-arkivdel',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Arkivdel',
        typeName: 'arkivdel',
    },
    {
        id: 'arkivsak:t:07-saksstatus',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Saksstatus',
        typeName: 'saksstatus',
    },
    {
        id: 'arkivsak:t:08-tilgangsgruppe',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Tilgangsgruppe',
        typeName: 'tilgangsgruppe',
    },
    {
        id: 'arkivsak:t:09-part',
        type: DataTypeDefinition.CollectionObject,
        required: true,
        label: 'Parter',
        typeName: 'part',
    },
    {
        id: 'arkivsak:t:10-skjerming',
        type: DataTypeDefinition.Object,
        required: true,
        label: 'Skjerming',
        typeName: 'skjerming',
    },
    {
        id: 'arkivsak:t:11-klasse',
        type: DataTypeDefinition.CollectionObject,
        required: true,
        label: 'Klassering',
        typeName: 'klasse',
    },
    {
        id: 'arkivsak:t:12-journalpost',
        type: DataTypeDefinition.CollectionObject,
        required: true,
        label: 'Journalposter',
        typeName: 'journalpost',
    },
];

export default archiveSak;
