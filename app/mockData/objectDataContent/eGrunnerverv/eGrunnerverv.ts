import type { HandleData } from '~/types/handleTypes';
import { DataTypeDefinition } from '~/types/data/datatypes';

const eGrunnervervHandles: HandleData[] = [
    {
        id: 'eGrunnervervMetadata:s:01-knr',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Kommunenummer',
        typeName: 'knr',
    },
    {
        id: 'eGrunnervervMetadata:s:02-gnr',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Gårdsnummer',
        typeName: 'gnr',
    },
    {
        id: 'eGrunnervervMetadata:s:03-bnr',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Bruksnummer',
        typeName: 'bnr',
    },
    {
        id: 'eGrunnervervMetadata:s:04-fnr',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Festenummer',
        typeName: 'fnr',
    },
    {
        id: 'eGrunnervervMetadata:s:05-snr',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Seksjonsnummer',
        typeName: 'snr',
    },
    {
        id: 'eGrunnervervMetadata:s:06-eierforholdskode',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Eierforholdskode',
        typeName: 'eierforholdskode',
    },
    {
        id: 'eGrunnervervMetadata:s:07-eierforholdsnavn',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Eierforholdsnavn',
        typeName: 'eierforholdsnavn',
    },
    {
        id: 'eGrunnervervMetadata:s:08-takstnummer',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Takstnummer',
        typeName: 'takstnummer',
    },
    {
        id: 'eGrunnervervMetadata:s:09-prosjektnr',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Prosjektnummer',
        typeName: 'prosjektnr',
    },
    {
        id: 'eGrunnervervMetadata:s:10-prosjektnavn',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Prosjektnavn',
        typeName: 'prosjektnavn',
    },
    {
        id: 'eGrunnervervMetadata:s:11-kommunenavn',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Kommunenavn',
        typeName: 'kommunenavn',
    },
    {
        id: 'eGrunnervervMetadata:s:12-adresse',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Adresse',
        typeName: 'adresse',
    },
    {
        id: 'eGrunnervervMetadata:s:13-tittel',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Tittel',
        typeName: 'tittel',
    },
    {
        id: 'eGrunnervervMetadata:s:14-saksansvarligEpost',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Saksansvarlig E-post',
        typeName: 'saksansvarligEpost',
    },
    {
        id: 'eGrunnervervMetadata:s:15-saksansvarlig',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Saksansvarlig',
        typeName: 'saksansvarlig',
    },
    {
        id: 'eGrunnervervMetadata:s:16-saksparter',
        type: DataTypeDefinition.CollectionObject,
        required: true,
        label: 'Saksparter',
        typeName: 'saksparter',
    },
];

export default eGrunnervervHandles;
