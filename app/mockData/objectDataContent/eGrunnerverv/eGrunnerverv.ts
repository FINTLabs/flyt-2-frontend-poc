import type { HandleData } from '~/types/handleTypes';
import { DataTypeDefinition } from '~/types/data/datatypes';

const eGrunnervervHandles: HandleData[] = [
    {
        id: '01-knr',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Kommunenummer',
        typeName: 'knr',
    },
    {
        id: '02-gnr',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Gårdsnummer',
        typeName: 'gnr',
    },
    {
        id: '03-bnr',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Bruksnummer',
        typeName: 'bnr',
    },
    {
        id: '04-fnr',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Festenummer',
        typeName: 'fnr',
    },
    {
        id: '05-snr',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Seksjonsnummer',
        typeName: 'snr',
    },
    {
        id: '06-eierforholdskode',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Eierforholdskode',
        typeName: 'eierforholdskode',
    },
    {
        id: '07-eierforholdsnavn',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Eierforholdsnavn',
        typeName: 'eierforholdsnavn',
    },
    {
        id: '08-takstnummer',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Takstnummer',
        typeName: 'takstnummer',
    },
    {
        id: '09-prosjektnr',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Prosjektnummer',
        typeName: 'prosjektnr',
    },
    {
        id: '10-prosjektnavn',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Prosjektnavn',
        typeName: 'prosjektnavn',
    },
    {
        id: '11-kommunenavn',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Kommunenavn',
        typeName: 'kommunenavn',
    },
    {
        id: '12-adresse',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Adresse',
        typeName: 'adresse',
    },
    {
        id: '13-tittel',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Tittel',
        typeName: 'tittel',
    },
    {
        id: '14-saksansvarligEpost',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Saksansvarlig E-post',
        typeName: 'saksansvarligEpost',
    },
    {
        id: '15-saksansvarlig',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Saksansvarlig',
        typeName: 'saksansvarlig',
    },
    {
        id: '16-saksparter',
        type: DataTypeDefinition.CollectionObject,
        required: true,
        label: 'Saksparter',
        typeName: 'saksparter',
    },
];

export default eGrunnervervHandles;
