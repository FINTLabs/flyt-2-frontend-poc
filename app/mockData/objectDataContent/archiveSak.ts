import { DataTypeDefinition } from '~/types/data/datatypes';

const archiveSak = [
    {
        id: '01-title',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Tittel',
        typeName: 'tittel',
    },
    {
        id: '02-offentligTittel',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Offentlig tittel',
        typeName: 'offentligTittel',
    },
    {
        id: '03-saksmappetype',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Saksmappetype',
        typeName: 'saksmappetype',
    },
    {
        id: '04-administrativEnhet',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Administrativ enhet',
        typeName: 'administrativEnhet',
    },
    {
        id: '05-saksansvarlig',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Saksansvarlig',
        typeName: 'saksansvarlig',
    },
    {
        id: '06-arkivdel',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Arkivdel',
        typeName: 'arkivdel',
    },
    {
        id: '07-saksstatus',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Saksstatus',
        typeName: 'saksstatus',
    },
    {
        id: '08-tilgangsgruppe',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Tilgangsgruppe',
        typeName: 'tilgangsgruppe',
    },
    {
        id: '09-part',
        type: DataTypeDefinition.CollectionObject,
        required: true,
        label: 'Parter',
        typeName: 'part',
    },
    {
        id: '10-skjerming',
        type: DataTypeDefinition.Object,
        required: true,
        label: 'Skjerming',
        typeName: 'skjerming',
    },
    {
        id: '11-klasse',
        type: DataTypeDefinition.CollectionObject,
        required: true,
        label: 'Klassering',
        typeName: 'klasse',
    },
    {
        id: '12-journalpost',
        type: DataTypeDefinition.CollectionObject,
        required: true,
        label: 'Journalposter',
        typeName: 'journalpost',
    },
];

export default archiveSak;
